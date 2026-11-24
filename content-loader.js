// ============================================================
// Loader treści — comiesięczne paczki zadań i symulacji.
//
// Zasada działania:
//   1. Przy starcie ładowane są dane WBUDOWANE (ladder-data.js, app.js).
//   2. Potem pobierany jest content/manifest.json.
//   3. Każda paczka z manifestu jest doklejana do puli — stare zadania ZOSTAJĄ.
//   4. Pobrane paczki są cache'owane w localStorage, więc offline też działa.
//   5. Brak sieci albo błąd → aplikacja działa na danych wbudowanych.
//
// Paczka ma ten sam kształt co dane wbudowane, więc nie trzeba nic przekształcać.
// ============================================================
(function () {
  'use strict';

  const CACHE_KEY = 'emlove_content_packs_v1';
  const MAX_PACK_BYTES = 400000;

  function cacheRead() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch (e) { return {}; }
  }

  function cacheWrite(obj) {
    try {
      const raw = JSON.stringify(obj);
      if (raw.length < 3_000_000) localStorage.setItem(CACHE_KEY, raw);
    } catch (e) { /* brak miejsca — działa bez cache */ }
  }

  // ── walidacja ──────────────────────────────────────────────
  function validScenario(s) {
    return s && typeof s.id === 'string' && typeof s.title === 'string' &&
      typeof s.story === 'string' && Array.isArray(s.qs) && s.qs.length === 4 &&
      s.qs.every(q => Array.isArray(q) && typeof q[0] === 'string' && q[0].trim() &&
        Array.isArray(q[1]) && q[1].length === 4 && q[1].every(x => typeof x === 'string' && x.trim()));
  }

  function validSet(r) {
    return r && typeof r.id === 'string' && Array.isArray(r.qs) && r.qs.length === 4 &&
      r.qs.every(q => Array.isArray(q) && typeof q[0] === 'string' && q[0].trim() &&
        Array.isArray(q[1]) && q[1].length === 4 && q[1].every(x => typeof x === 'string' && x.trim()));
  }

  function validSim(s) {
    return s && typeof s.id === 'string' && typeof s.title === 'string' &&
      typeof s.story === 'string' && Array.isArray(s.steps) && s.steps.length > 0 &&
      s.steps.every(st => typeof st.q === 'string' && Array.isArray(st.choices) && st.choices.length > 0 &&
        st.choices.every(c => typeof c.t === 'string' && typeof c.next === 'string'));
  }

  // ── scalanie ───────────────────────────────────────────────
  function pushUnique(pool, item) {
    if (pool.some(x => x.id === item.id)) return false;
    pool.push(item);
    return true;
  }

  function merge(pack) {
    let added = 0, skipped = 0;
    (pack.scenarios || []).forEach(s => {
      if (validScenario(s) && pushUnique(SCENARIOS, s)) added++;
      else skipped++;
    });
    (pack.rozroznij || []).forEach(r => {
      if (validSet(r) && pushUnique(ROZROZNIJ_SETS, r)) added++;
      else skipped++;
    });
    (pack.simulations || []).forEach(s => {
      if (validSim(s) && pushUnique(SIMULATIONS, s)) added++;
      else skipped++;
    });
    return {added, skipped};
  }

  async function fetchJson(url) {
    const res = await fetch(url, {cache: 'no-store'});
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const text = await res.text();
    if (text.length > MAX_PACK_BYTES) throw new Error('too_large');
    return JSON.parse(text);
  }

  async function loadPack(name) {
    const url = 'content/packs/' + name + '.json';
    const cached = cacheRead();
    if (cached[name]) return cached[name];

    const data = await fetchJson(url);
    const all = cacheRead();
    all[name] = data;
    cacheWrite(all);
    return data;
  }

  let merged = {added: 0, skipped: 0, packs: []};

  async function load() {
    try {
      const manifest = await fetchJson('content/manifest.json');
      const packs = Array.isArray(manifest.packs) ? manifest.packs : [];
      for (const name of packs) {
        if (typeof name !== 'string' || !/^[\w.-]+$/.test(name)) continue;
        try {
          const pack = await loadPack(name);
          const res = merge(pack);
          merged.added += res.added;
          merged.skipped += res.skipped;
          merged.packs.push(name);
        } catch (e) { /* jedna paczka nie blokuje reszty */ }
      }
    } catch (e) { /* offline albo brak manifestu — dane wbudowane wystarczą */ }

    // Odśwież listę symulacji, jeśli jest już narysowana.
    if (typeof renderSims === 'function') renderSims();

    return merged;
  }

  window.EmloveContent = {load, merge, status: () => merged};
})();
