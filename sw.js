// Emlove PWA: pliki i dźwięki dostępne offline po pierwszej instalacji.
const CACHE = 'emlove-v66';
const ASSETS = ['./','./index.html','./polityka-prywatnosci.html','./style.css','./config.js','./app.js','./auth.js','./sync.js','./providers.js','./byok.js','./milo-online.js','./summary-mail.js','./wheel-view.js','./locales.js','./simulations-locales.js','./milo-locales.js','./wheel-reference.json','./ambient.js','./personality.js','./wheel.js','./exercises2.js','./exercises3.js','./content-loader.js','./express.js','./ladder-data.js','./ladder.js','./milo-client.js','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png?v=14','./phoenix-award.jpg','./og-emlove.jpg','./audio/rain.mp3','./audio/ocean.mp3','./audio/fire.mp3','./audio/forest.mp3','./audio/LICENCJE.html'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('emlove-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
 if(e.request.method!=='GET')return;
 e.respondWith((async()=>{
  const cache=await caches.open(CACHE), range=e.request.headers.get('range');
  const plain=new Request(e.request.url,{method:'GET'}), cached=await cache.match(plain);
  if(cached && range){
   const m=range.match(/^bytes=(\d+)-(\d*)$/);if(!m)return fetch(e.request);
   const bytes=await cached.arrayBuffer(),start=Number(m[1]),end=m[2]?Math.min(Number(m[2]),bytes.byteLength-1):bytes.byteLength-1;
   if(start>=bytes.byteLength || end<start)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${bytes.byteLength}`}});
   return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':cached.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${start}-${end}/${bytes.byteLength}`,'Content-Length':String(end-start+1),'Accept-Ranges':'bytes'}});
  }
  if(cached)return cached;
  try { const res=await fetch(e.request);if(res.ok && !range && new URL(e.request.url).origin===self.location.origin)cache.put(e.request,res.clone());return res; }
  catch(err){return e.request.mode==='navigate' ? (await cache.match('./index.html')||Response.error()) : Response.error();}
 })());
});
