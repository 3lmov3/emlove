// Emlove: prywatny prototyp usunięcia sesji. Klucze tylko po stronie serwera.
// Nie wdrażać publicznie przed testami, przeglądem uprawnień i interfejsu.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
const url=Deno.env.get('SUPABASE_URL')||'';
function defaultKey(name:string){try{return JSON.parse(Deno.env.get(name)||'{}').default||'';}catch{return '';}}
const anon=defaultKey('SUPABASE_PUBLISHABLE_KEYS')||Deno.env.get('SUPABASE_ANON_KEY')||'';
const service=defaultKey('SUPABASE_SECRET_KEYS')||Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')||'';
const origin=Deno.env.get('EMLOVE_ALLOWED_ORIGIN')||'https://3lmov3.github.io';
const headers={'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type','Access-Control-Allow-Methods':'POST, OPTIONS','Vary':'Origin','Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'};
const out=(obj:unknown,status=200)=>new Response(JSON.stringify(obj),{status,headers});
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers});
 // Domyślnie niedostępna; osobny przełącznik pozwala niezależnie testować usuwanie.
 if(Deno.env.get('MILO_DELETE_ENABLED')!=='true')return out({error:'disabled'},503);
 if(req.method!=='POST')return out({error:'method'},405);
 if(req.headers.get('origin')!==origin)return out({error:'origin'},403);
 if(!url||!anon||!service)return out({error:'not_configured'},503);
 const authorization=req.headers.get('Authorization')||'',jwt=authorization.replace(/^Bearer\s+/i,'');
 if(!jwt||jwt===authorization)return out({error:'unauthorized'},401);
 try{
  const auth=createClient(url,anon,{auth:{persistSession:false}});
  const {data:userData,error:userError}=await auth.auth.getUser(jwt);
  if(userError||!userData.user)return out({error:'unauthorized'},401);
  if(userData.user.is_anonymous!==true)return out({error:'anonymous_only'},403);
  // Na etapie testów dostęp jest ograniczony do tej samej testowej sesji co Milo.
  const allowedTester=Deno.env.get('MILO_TEST_USER_ID')||'';
  if(!allowedTester||userData.user.id!==allowedTester)return out({error:'test_access_only'},403);
  // Nie pobieramy ID z żądania: usuwamy wyłącznie zweryfikowanego użytkownika.
  const admin=createClient(url,service,{auth:{persistSession:false}});
  const {data:deleted,error}=await admin.rpc('milo_delete_own_session',{p_user:userData.user.id});
  if(error)return out({error:'deletion_unavailable'},503);
  if(deleted!==true)return out({error:'not_deleted'},409);
  return out({deleted:true});
 }catch{return out({error:'deletion_unavailable'},503);}
});
