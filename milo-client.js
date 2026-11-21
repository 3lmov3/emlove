// Połączenie do własnej funkcji Supabase. Klucz OpenRouter nigdy nie jest w przeglądarce.
const MiloClient={
 configured(){const c=window.EMLOVE_CONFIG||{};return !!(c.supabaseUrl&&c.supabaseAnonKey&&c.turnstileSiteKey);},
 async captcha(){
  const sitekey=window.EMLOVE_CONFIG.turnstileSiteKey;
  if(!sitekey)throw Error('Brak konfiguracji weryfikacji');
  if(!window.turnstile){
   await new Promise((resolve,reject)=>{const s=document.createElement('script');let settled=false;const finish=(ok)=>{if(settled)return;settled=true;clearTimeout(timer);ok?resolve():reject(Error('Nie udało się uruchomić weryfikacji'));};const timer=setTimeout(()=>finish(false),15000);s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';s.async=true;s.onload=()=>finish(!!window.turnstile);s.onerror=()=>finish(false);document.head.appendChild(s);});
  }
  return await new Promise((resolve,reject)=>{
   const overlay=document.createElement('div');overlay.className='milo-captcha-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-labelledby','milo-captcha-title');
   overlay.innerHTML='<div class="milo-captcha-card"><h2 id="milo-captcha-title">Potwierdzenie dostępu do Milo</h2><p>Jednorazowa weryfikacja chroni Milo przed nadużyciami. Usługa Cloudflare otrzyma dane techniczne połączenia, w tym adres IP. Jeśli nie chcesz kontynuować, możesz korzystać z lokalnej wersji.</p><div id="milo-captcha-widget"></div><button type="button" class="btn btn-secondary" id="milo-captcha-cancel">Anuluj</button></div>';
   document.body.appendChild(overlay);let widget,done=false;const timer=setTimeout(()=>finish(null),120000);
   function finish(token){if(done)return;done=true;clearTimeout(timer);try{if(widget!==undefined)window.turnstile.remove(widget);}catch(e){}overlay.remove();token?resolve(token):reject(Error('Weryfikacja nie została ukończona'));}
   overlay.querySelector('#milo-captcha-cancel').onclick=()=>finish(null);
   try{widget=window.turnstile.render(overlay.querySelector('#milo-captcha-widget'),{sitekey,callback:token=>finish(token),'error-callback':()=>finish(null),'expired-callback':()=>finish(null)});}catch(e){finish(null);}
  });
 },
 async session(){
  if(!this._sessionPromise)this._sessionPromise=this._session().finally(()=>{this._sessionPromise=null;});
  return this._sessionPromise;
 },
 async _session(){
  const c=window.EMLOVE_CONFIG,url=c.supabaseUrl.replace(/\/$/,'');let session;
  try{session=JSON.parse(localStorage.getItem('emlove_milo_session')||'null');}catch(e){}
  if(session&&session.access_token&&session.expires_at>Date.now()/1000+60)return session.access_token;
  const headers={'Content-Type':'application/json','apikey':c.supabaseAnonKey};
  let result;
  if(session?.refresh_token){try{const r=await fetch(url+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers,body:JSON.stringify({refresh_token:session.refresh_token})});if(r.ok)result=await r.json();}catch(e){}}
  if(!result){const captchaToken=await this.captcha();const r=await fetch(url+'/auth/v1/signup',{method:'POST',headers,body:JSON.stringify({gotrue_meta_security:{captcha_token:captchaToken}})});if(!r.ok)throw Error('Nie udało się otworzyć sesji Milo');result=await r.json();}
  if(!result.access_token)throw Error('Brak sesji Milo');
  result.expires_at=result.expires_at||Math.floor(Date.now()/1000)+(result.expires_in||3600);
  localStorage.setItem('emlove_milo_session',JSON.stringify({access_token:result.access_token,refresh_token:result.refresh_token,expires_at:result.expires_at}));
  return result.access_token;
 },
 async request(type,payload={}){
  if(!this.configured())throw Error('Milo lokalny');const c=window.EMLOVE_CONFIG;
  const token=await this.session();
  const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),18000);
  try{const r=await fetch(c.supabaseUrl.replace(/\/$/,'')+'/functions/v1/milo',{method:'POST',headers:{'Content-Type':'application/json','apikey':c.supabaseAnonKey,'Authorization':'Bearer '+token},body:JSON.stringify({type,...payload}),signal:ac.signal});if(!r.ok)throw Error('Milo chwilowo niedostępny');return await r.json();}finally{clearTimeout(timer);}
 },
 async contexts(){const data=await this.request('contexts');if(!Array.isArray(data.contexts)||data.contexts.length!==5)throw Error('Nieprawidłowa odpowiedź');return data.contexts.map(x=>typeof x==='string'?x.trim().slice(0,160):'');},
 async feedback(text){
  if(/samobój|zabi(ję|c|ć) się|odebrać sobie życie|nie chcę żyć|skrzywdzić siebie|samookalecz/i.test(text))return {local:true,text:'Przykro mi, że przeżywasz coś tak trudnego. Czy możesz teraz skontaktować się z kimś zaufanym? Jeśli grozi Ci bezpośrednie niebezpieczeństwo, zadzwoń pod 112. Możesz też zadzwonić pod 116 123.'};
  if(!this.configured())return {local:true,text:'Dziękuję, że to zapisujesz. Który fragment najlepiej oddaje to, co chcesz wyrazić?'};
  try{const data=await this.request('feedback',{text});if(typeof data.text!=='string'||!data.text.trim())throw Error('Pusta odpowiedź');return {local:false,text:data.text.trim().slice(0,1200)};}
  catch(e){return {local:true,text:'Nie udało mi się teraz połączyć. Który fragment Twoich słów jest dla Ciebie najważniejszy?'};}
 }
};
window.MiloClient=MiloClient;
