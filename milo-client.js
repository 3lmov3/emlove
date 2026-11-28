// Połączenie do własnej funkcji Supabase. Klucz OpenRouter nigdy nie jest w przeglądarce.
//
// ── 2026-11-23 ─────────────────────────────────────────────────────────────
// Stara funkcja Supabase „milo" została USUNIĘTA (Dashboard → Edge Functions).
// Milo w ćwiczeniach (Drabina, „Wyraź") działa teraz WYŁĄCZNIE lokalnie:
// nie ma przycisków wysyłających tekst ani pobierających tła z serwera.
//
// Aby kiedyś przywrócić tryb online: odtwórz funkcję „milo" w Supabase,
// dodaj CORS i ustaw poniższą flagę na false.
// ───────────────────────────────────────────────────────────────────────────
const MILO_ONLINE_DISABLED = true;

const MiloClient={
 configured(){
  if(MILO_ONLINE_DISABLED)return false;
  const c=window.EMLOVE_CONFIG||{};return !!(c.supabaseUrl&&c.supabaseAnonKey&&c.turnstileSiteKey);
 },
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
  // Milo online korzysta z sesji KONTA (EmloveAuth). Anonimowe konta zostały
  // wyłączone, więc bez zalogowania Milo działa tylko lokalnie.
  if(!window.EmloveAuth)throw Error('Milo lokalny');
  if(!window.EmloveAuth.currentUser())throw Error('login_required');
  return await window.EmloveAuth.accessToken();
 },
 async request(type,payload={}){
  if(!this.configured())throw Error('Milo lokalny');const c=window.EMLOVE_CONFIG;
  const token=await this.session();
  const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),18000);
  try{const r=await fetch(c.supabaseUrl.replace(/\/$/,'')+'/functions/v1/milo',{method:'POST',headers:{'Content-Type':'application/json','apikey':c.supabaseAnonKey,'Authorization':'Bearer '+token},body:JSON.stringify({type,...payload}),signal:ac.signal});if(!r.ok)throw Error('Milo chwilowo niedostępny');return await r.json();}finally{clearTimeout(timer);}
 },
 // Nie tworzymy nowej sesji podczas usuwania: korzystamy wyłącznie z istniejącej.
 // Osobna anonimowa sesja Milo już nie istnieje — Milo korzysta z konta.
 // Usunięcie konta odbywa się w Ustawienia -> „Usuń konto z chmury”.
 async deleteCurrentSession(){throw Error('account_managed');},
 async contexts(){const data=await this.request('contexts');if(!Array.isArray(data.contexts)||data.contexts.length!==5)throw Error('Nieprawidłowa odpowiedź');return data.contexts.map(x=>typeof x==='string'?x.trim().slice(0,160):'');},
 async localFeedback(text){
  if(/samobój|zabi(ję|c|ć) się|odebrać sobie życie|nie chcę żyć|skrzywdzić siebie|samookalecz/i.test(text))return {local:true,text:window.EmloveLocale?window.EmloveLocale.crisisReply():'Skontaktuj się z zaufaną osobą lub lokalnymi służbami ratunkowymi.'};
  return {local:true,text:'Dziękuję, że to zapisujesz. Który fragment najlepiej oddaje to, co chcesz wyrazić?'};
 },
 async feedback(text){
  if(/samobój|zabi(ję|c|ć) się|odebrać sobie życie|nie chcę żyć|skrzywdzić siebie|samookalecz/i.test(text))return this.localFeedback(text);
  if(!this.configured())return {local:true,text:'Dziękuję, że to zapisujesz. Który fragment najlepiej oddaje to, co chcesz wyrazić?'};
  try{const data=await this.request('feedback',{text});if(typeof data.text!=='string'||!data.text.trim())throw Error('Pusta odpowiedź');return {local:false,text:data.text.trim().slice(0,1200)};}
  catch(e){return {local:true,text:'Nie udało mi się teraz połączyć. Który fragment Twoich słów jest dla Ciebie najważniejszy?'};}
 }
};
window.MiloClient=MiloClient;
