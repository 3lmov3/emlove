// Dźwięki tła: lokalne pliki MP3, odtwarzane dopiero po geście użytkownika.
const Ambient = {
  audio: null, type: 'off', volume: 70, muted: false, pending: false, token: 0,
  labels: {rain:'deszcz', ocean:'ocean', fire:'kominek', forest:'las'},
  set(type) {
    const token = ++this.token;
    if (this.audio) { this.audio.pause(); this.audio.removeAttribute('src'); this.audio.load(); this.audio = null; }
    this.type = Object.hasOwn(this.labels, type) ? type : 'off';
    this.pending = false;
    if (this.type === 'off') { this.updateUI(); return; }
    const a = this.audio = new Audio('audio/' + this.type + '.mp3');
    a.loop = true; a.preload = 'auto'; a.volume = Math.min(1, Math.max(0, this.volume / 100)); a.muted = this.muted;
    a.addEventListener('error', () => { if (token === this.token) this.updateUI('error'); });
    a.addEventListener('playing', () => { if (token === this.token) { this.pending = false; this.updateUI(); } });
    this.updateUI('loading');
    const p = a.play();
    if (p && p.catch) p.catch(err => { if (token !== this.token) return; this.pending = err.name === 'NotAllowedError'; this.updateUI(this.pending ? 'blocked' : 'error'); });
  },
  retryPending() {
    if (!this.pending || !this.audio) return;
    this.pending = false;
    const a = this.audio, token = this.token;
    const p = a.play();
    if (p && p.catch) p.catch(err => { if (token !== this.token) return; this.pending = err.name === 'NotAllowedError'; this.updateUI(this.pending ? 'blocked' : 'error'); });
  },
  setVolume(v) { this.volume = Math.min(100, Math.max(0, Number(v) || 0)); if (this.audio) this.audio.volume = this.volume / 100; this.updateUI(); },
  setMuted(m) { this.muted = !!m; if (this.audio) this.audio.muted = this.muted; this.updateUI(); },
  stop() { this.set('off'); },
  updateUI(status) {
    const box = document.getElementById('ambientStatus');
    const sel = document.getElementById('ambientSelect');
    const settings = document.getElementById('setAmbient');
    if (sel) sel.value = this.type; if (settings) settings.value = this.type;
    if (!box) return;
    box.className = 'ambient-status';
    if (this.type === 'off') { box.textContent = ''; return; }
    if (status === 'error') { box.textContent = '⚠️ Nie udało się odtworzyć pliku'; box.classList.add('warn'); return; }
    if (status === 'blocked' || this.pending) { box.textContent = '🔒 Dotknij ekranu, aby włączyć dźwięk'; box.classList.add('warn'); return; }
    if (this.muted || this.volume === 0) { box.textContent = '🔇 dźwięk wyciszony'; return; }
    if (status === 'loading' || !this.audio || this.audio.paused) { box.textContent = '⏳ Uruchamianie dźwięku'; return; }
    box.textContent = '♪ ' + this.labels[this.type] + ' gra'; box.classList.add('live');
  }
};
window.setAmbient = function(v) { aiSettings.ambient = v; saveAISettings(); Ambient.set(v); };
document.addEventListener('DOMContentLoaded', () => {
  Ambient.volume = aiSettings.volume; Ambient.muted = !aiSettings.soundEnabled;
  if (aiSettings.ambient && aiSettings.ambient !== 'off') {
    Ambient.type = aiSettings.ambient; Ambient.pending = true; Ambient.updateUI('blocked');
    const start = () => { if (Ambient.pending && !Ambient.audio) { Ambient.pending = false; Ambient.set(Ambient.type); } else Ambient.retryPending(); };
    ['pointerdown','keydown'].forEach(ev => document.addEventListener(ev, start, {passive:true}));
  } else {
    ['pointerdown','keydown'].forEach(ev => document.addEventListener(ev, () => Ambient.retryPending(), {passive:true}));
  }
});
