// Lokalny odtwarzacz: tło wstrzymuje się w tle i jest wznawiane głośnikiem.
const Ambient = {
 audio:null,type:'off',volume:70,muted:false,pending:false,needsGesture:false,token:0,playSeq:0,lastError:false,
 labels:{rain:'deszcz',ocean:'ocean',fire:'kominek',forest:'las'},
 set(type){
  const token=++this.token;this.playSeq++;
  if(this.audio){this.audio.pause();this.audio.removeAttribute('src');this.audio.load();this.audio=null;}
  this.type=Object.prototype.hasOwnProperty.call(this.labels,type)?type:'off';this.pending=false;this.needsGesture=false;this.lastError=false;
  if(this.type==='off'){this.updateUI();return;}
  const a=this.audio=new Audio('audio/'+this.type+'.mp3');a.loop=true;a.preload='auto';a.volume=Math.min(1,Math.max(0,this.volume/100));a.muted=this.muted;
  a.addEventListener('error',()=>{if(token===this.token){this.lastError=true;this.updateUI();}});
  a.addEventListener('playing',()=>{if(token!==this.token)return;if(document.visibilityState==='hidden'){this.suspendForBackground();return;}this.pending=false;this.needsGesture=false;this.lastError=false;this.updateUI();});
  a.addEventListener('pause',()=>{if(token===this.token)this.updateUI();});
  if(this.muted){this.updateUI();return;} this.play();
 },
 play(){
  if(this.type==='off')return;
  if(!this.audio){this.set(this.type);return;}
  if(this.muted)return;
  const token=this.token,seq=++this.playSeq;this.pending=true;this.lastError=false;this.updateUI();
  let p;try{p=this.audio.play();}catch(e){this.pending=false;this.needsGesture=true;this.updateUI();return;}
  if(p&&p.then)p.then(()=>{if(token===this.token&&seq===this.playSeq){this.pending=false;this.needsGesture=false;this.updateUI();}}).catch(e=>{if(token!==this.token||seq!==this.playSeq)return;this.pending=false;if(e.name==='NotAllowedError'||e.name==='AbortError')this.needsGesture=true;else this.lastError=true;this.updateUI();});
 },
 suspendForBackground(){if(this.audio&&!this.muted){this.playSeq++;this.audio.pause();this.pending=false;this.needsGesture=true;this.updateUI();}},
 setVolume(v){this.volume=Math.min(100,Math.max(0,Number(v)||0));if(this.audio)this.audio.volume=this.volume/100;this.updateUI();},
 setMuted(m){this.muted=!!m;if(this.audio){this.audio.muted=this.muted;if(this.muted)this.audio.pause();else if(!this.needsGesture)this.play();}this.updateUI();},
 stop(){this.set('off');},
 updateUI(){
  const sel=document.getElementById('ambientSelect'),settings=document.getElementById('setAmbient'),box=document.getElementById('ambientStatus'),btn=document.getElementById('muteBtn');
  if(sel)sel.value=this.type;if(settings)settings.value=this.type;
  const paused=this.type!=='off'&&!this.muted&&(this.needsGesture||(!this.pending&&(!this.audio||this.audio.paused)));
  if(btn){const silent=this.muted||paused;btn.textContent=silent?'🔇':'🔊';btn.title=paused?'Wznów dźwięk tła':'Włącz/wyłącz dźwięk';btn.setAttribute('aria-label',btn.title);}
  if(!box)return;box.className='ambient-status';
  if(this.type==='off'){box.textContent='';return;}
  if(this.lastError){box.textContent='⚠️ Nie udało się odtworzyć pliku';box.classList.add('warn');return;}
  if(this.muted||this.volume===0){box.textContent='🔇 dźwięk wyciszony';return;}
  if(paused){box.textContent='⏸ Wstrzymano — naciśnij głośnik';box.classList.add('warn');return;}
  if(this.pending||!this.audio||this.audio.readyState<2){box.textContent='⏳ Uruchamianie dźwięku';return;}
  box.textContent='♪ '+this.labels[this.type]+' odtwarzanie';box.classList.add('live');
 }
};
window.setAmbient=function(v){aiSettings.ambient=v;saveAISettings();Ambient.set(v);};
document.addEventListener('DOMContentLoaded',()=>{Ambient.volume=aiSettings.volume;Ambient.muted=!aiSettings.soundEnabled;if(aiSettings.ambient&&aiSettings.ambient!=='off'){Ambient.type=aiSettings.ambient;Ambient.needsGesture=true;}Ambient.updateUI();});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')Ambient.suspendForBackground();else Ambient.updateUI();});
window.addEventListener('pagehide',()=>Ambient.suspendForBackground());
window.addEventListener('pageshow',()=>Ambient.updateUI());
