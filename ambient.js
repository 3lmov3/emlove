// ============================================================
// Emlove — dźwięki tła (osobny, odporny silnik)
// Działa po pierwszym dotknięciu ekranu (wymóg iOS/Chrome),
// ma płynne wejście/wyjście, wskaźnik stanu i obsługę wyciszenia.
// ============================================================
const Ambient = {
  ctx: null,
  master: null,
  nodes: null,
  type: 'off',
  pending: null,
  volume: 0.7,
  muted: false,
  _timers: [],
  _fade: null,

  supported() { return !!(window.AudioContext || window.webkitAudioContext); },

  unlock() {
    if (!this.supported()) return false;
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx.state === 'running';
    } catch (e) { return false; }
  },

  noiseBuffer(kind) {
    const ctx = this.ctx;
    const len = Math.floor(ctx.sampleRate * 3);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    if (kind === 'brown') {
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        d[i] = last * 3.5;
      }
    } else {
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    return buf;
  },

  build(type) {
    const ctx = this.ctx;
    const out = ctx.createGain();
    out.gain.value = 0;
    out.connect(this.master);

    const src = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const level = ctx.createGain();

    if (type === 'rain') {
      src.buffer = this.noiseBuffer('white'); src.loop = true;
      filter.type = 'highpass'; filter.frequency.value = 900; filter.Q.value = 0.6;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 7000;
      level.gain.value = 0.55;
      src.connect(filter); filter.connect(lp); lp.connect(level);
      // pojedyncze krople
      this._timers.push(setInterval(() => {
        if (Math.random() > 0.45) this.drop(1400 + Math.random() * 2200);
      }, 320));
    } else if (type === 'ocean') {
      src.buffer = this.noiseBuffer('brown'); src.loop = true;
      filter.type = 'lowpass'; filter.frequency.value = 620; filter.Q.value = 0.7;
      level.gain.value = 0.85;
      src.connect(filter); filter.connect(level);
      // fale: wolna modulacja głośności
      const lfo = ctx.createOscillator(), lfoGain = ctx.createGain();
      lfo.type = 'sine'; lfo.frequency.value = 0.08; lfoGain.gain.value = 0.35;
      lfo.connect(lfoGain); lfoGain.connect(level.gain); lfo.start();
      this._lfo = lfo;
    } else if (type === 'fire') {
      src.buffer = this.noiseBuffer('brown'); src.loop = true;
      filter.type = 'lowpass'; filter.frequency.value = 480; filter.Q.value = 0.5;
      level.gain.value = 0.9;
      src.connect(filter); filter.connect(level);
      // trzaski
      this._timers.push(setInterval(() => {
        if (Math.random() > 0.55) this.crackle();
      }, 260));
    } else if (type === 'forest') {
      src.buffer = this.noiseBuffer('white'); src.loop = true;
      filter.type = 'bandpass'; filter.frequency.value = 1300; filter.Q.value = 0.5;
      level.gain.value = 0.28;
      src.connect(filter); filter.connect(level);
      // ptaki
      this._timers.push(setInterval(() => {
        if (Math.random() > 0.5) this.bird();
      }, 2600));
    } else {
      return null;
    }

    level.connect(out);
    src.start();
    return { src, filter, level, out };
  },

  drop(freq) {
    try {
      const ctx = this.ctx, t = ctx.currentTime;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(freq, t);
      o.frequency.exponentialRampToValueAtTime(freq * 0.55, t + 0.09);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.03, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.2);
    } catch (e) {}
  },

  crackle() {
    try {
      const ctx = this.ctx, t = ctx.currentTime;
      const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6);
      const s = ctx.createBufferSource(); s.buffer = buf;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900 + Math.random() * 1500; f.Q.value = 1.2;
      const g = ctx.createGain(); g.gain.value = 0.5;
      s.connect(f); f.connect(g); g.connect(this.master); s.start(t);
    } catch (e) {}
  },

  bird() {
    try {
      const ctx = this.ctx, t = ctx.currentTime;
      const base = 2200 + Math.random() * 1400;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(base, t);
      o.frequency.exponentialRampToValueAtTime(base * 1.5, t + 0.07);
      o.frequency.exponentialRampToValueAtTime(base * 0.9, t + 0.16);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.035, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(g); g.connect(this.master); o.start(t); o.stop(t + 0.26);
    } catch (e) {}
  },

  clearTimers() {
    this._timers.forEach(t => clearInterval(t));
    this._timers = [];
    if (this._lfo) { try { this._lfo.stop(); } catch (e) {} this._lfo = null; }
  },

  stop() {
    this.clearTimers();
    if (this.nodes) {
      const n = this.nodes;
      try {
        const t = this.ctx.currentTime;
        n.out.gain.cancelScheduledValues(t);
        n.out.gain.setValueAtTime(n.out.gain.value || 0.0001, t);
        n.out.gain.linearRampToValueAtTime(0.0001, t + 0.6);
        setTimeout(() => { try { n.src.stop(); } catch (e) {} }, 700);
      } catch (e) {}
      this.nodes = null;
    }
    this.type = 'off';
  },

  set(type) {
    this.stop();          // najpierw zatrzymaj poprzednie tło
    this.type = type;     // dopiero potem ustaw nowy typ
    if (type === 'off') { this.updateUI(); return; }
    if (!this.unlock()) { this.pending = type; this.updateUI('blocked'); return; }
    try {
      const nodes = this.build(type);
      if (!nodes) { this.updateUI(); return; }
      this.nodes = nodes;
      // płynne wejście: warstwa 0 → 1, dopiero potem głośność globalna
      try {
        const t = this.ctx.currentTime;
        nodes.out.gain.cancelScheduledValues(t);
        nodes.out.gain.setValueAtTime(0.0001, t);
        nodes.out.gain.linearRampToValueAtTime(1, t + 1.4);
      } catch (e) {}
      this.applyVolume(true);
      this.updateUI('playing');
    } catch (e) { this.updateUI('error'); }
  },

  applyVolume(fade) {
    if (!this.master || !this.ctx) return;
    const target = this.muted ? 0.0001 : Math.max(0.0001, (this.volume / 100) * 0.55);
    try {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), t);
      this.master.gain.linearRampToValueAtTime(target, t + (fade ? 1.2 : 0.25));
    } catch (e) {}
  },

  setVolume(v) { this.volume = Number(v) || 0; this.applyVolume(false); },

  setMuted(m) {
    this.muted = !!m;
    this.applyVolume(true);
    this.updateUI();
  },

  // jeśli przeglądarka zablokowała dźwięk, uruchom po geście
  retryPending() {
    if (this.pending) { const p = this.pending; this.pending = null; this.set(p); }
  },

  updateUI(state) {
    const label = { off: 'wyłączone', rain: 'deszcz', ocean: 'ocean', fire: 'kominek', forest: 'las' }[this.type] || this.type;
    const box = document.getElementById('ambientStatus');
    const sel = document.getElementById('ambientSelect');
    if (sel && sel.value !== this.type) sel.value = this.type;
    const sset = document.getElementById('setAmbient');
    if (sset && sset.value !== this.type) sset.value = this.type;
    if (!box) return;
    if (this.type === 'off') { box.textContent = ''; box.className = 'ambient-status'; return; }
    if (state === 'blocked' || !this.supported()) {
      box.innerHTML = '🔒 dotknij ekranu, aby włączyć dźwięk';
      box.className = 'ambient-status warn';
      return;
    }
    if (state === 'error') {
      box.innerHTML = '⚠️ ta przeglądarka nie odtwarza tła';
      box.className = 'ambient-status warn';
      return;
    }
    box.innerHTML = `<span class="eq"><i></i><i></i><i></i></span> ${label} gra`;
    box.className = 'ambient-status live';
  },
};

// ---- podłączenie do interfejsu ----
window.setAmbient = function (v) {
  aiSettings.ambient = v;
  saveAISettings();
  Ambient.set(v);
};

// wyciszenie: SFX + tło
document.addEventListener('DOMContentLoaded', () => {
  Ambient.volume = aiSettings.volume;
  const sel = document.getElementById('ambientSelect');
  if (sel && aiSettings.ambient && aiSettings.ambient !== 'off') Ambient.type = aiSettings.ambient;
  if (aiSettings.ambient && aiSettings.ambient !== 'off') Ambient.pending = aiSettings.ambient;
  Ambient.setMuted(!aiSettings.soundEnabled);
  Ambient.updateUI();
});

// odblokowanie dźwięku przy pierwszym geście
['pointerdown', 'touchstart', 'click', 'keydown'].forEach(ev =>
  document.addEventListener(ev, () => {
    if (!Ambient.supported()) return;
    const ok = Ambient.unlock();
    if (ok) {
      if (Ambient.pending) Ambient.retryPending();
      else if (Ambient.type && Ambient.type !== 'off' && !Ambient.nodes) Ambient.set(Ambient.type);
    }
  }, { passive: true })
);

// powrót do karty — wznowienie kontekstu
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && Ambient.ctx && Ambient.ctx.state === 'suspended') {
    Ambient.ctx.resume();
  }
});
