// Emlove — synchronizacja dziennika z Supabase.
//
// Zasada: urządzenie jest źródłem prawdy. Wpisy działają offline;
// po zalogowaniu zmiany są wysyłane w tle, a przy logowaniu pobierane
// z serwera i scalane z lokalnymi. Konflikt rozstrzyga `updated_at`
// (wygrywa nowsza wersja), więc praca na dwóch urządzeniach nie nadpisuje
// danych ciszącem.
(function () {
  'use strict';

  const DIRTY_KEY = 'emlove_sync_dirty';
  const DELETED_KEY = 'emlove_sync_deleted';
  const REMOTE_IDS_PREFIX = 'emlove_sync_remote_ids_v1:';
  const FLUSH_DELAY = 2500;

  let timer = null;
  let flushing = false;
  let lastStatus = 'offline';

  function cfg() { return window.EMLOVE_CONFIG || {}; }
  function baseUrl() { return String(cfg().supabaseUrl || '').replace(/\/$/, ''); }

  function readList(key) {
    try { const v = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function writeList(key, list) { localStorage.setItem(key, JSON.stringify(list)); }

  function setStatus(text, kind) {
    lastStatus = kind || 'idle';
    document.dispatchEvent(new CustomEvent('emlove:sync', {detail: {text, kind}}));
  }

  // ── kolejkowanie zmian ──────────────────────────────────────
  function markDirty(id) {
    if (!id) return;
    const dirty = readList(DIRTY_KEY);
    if (!dirty.includes(id)) dirty.push(id);
    writeList(DIRTY_KEY, dirty);
    scheduleFlush();
  }

  function markDeleted(id) {
    if (!id) return;
    const deleted = readList(DELETED_KEY);
    if (!deleted.includes(id)) deleted.push(id);
    writeList(DELETED_KEY, deleted);
    writeList(DIRTY_KEY, readList(DIRTY_KEY).filter(x => x !== id));
    scheduleFlush();
  }

  function scheduleFlush() {
    if (!window.EmloveAuth || !window.EmloveAuth.currentUser()) return;
    clearTimeout(timer);
    timer = setTimeout(() => { flush().catch(() => {}); }, FLUSH_DELAY);
  }

  function signedIn() {
    return !!(window.EmloveAuth && window.EmloveAuth.currentUser());
  }

  // ── wysyłka ─────────────────────────────────────────────────
  async function rest(path, options) {
    const token = await window.EmloveAuth.accessToken();
    const res = await fetch(baseUrl() + path, {
      method: options.method || 'GET',
      headers: Object.assign({
        'Content-Type': 'application/json',
        apikey: cfg().supabaseAnonKey,
        Authorization: 'Bearer ' + token,
      }, options.headers || {}),
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const err = new Error(text.slice(0, 200) || ('HTTP ' + res.status));
      err.status = res.status;
      throw err;
    }
    if (res.status === 204) return null;
    try { return await res.json(); } catch (e) { return null; }
  }

  function toRow(entry, userId) {
    const row = {
      id: entry.id,
      user_id: userId,
      entry_date: entry.date,
      entry_time: entry.time,
      emotion: entry.emotion,
      emoji: entry.emoji || '',
      intensity: String(entry.intensity),
      body: Array.isArray(entry.body) ? entry.body : [],
      what: entry.what || '',
      needs: Array.isArray(entry.needs) ? entry.needs : [],
      need_text: entry.needText || '',
      i_statement: entry.iStatement || '',
      updated_at: entry.updatedAt || new Date().toISOString(),
    };
    // Optional mobile columns are omitted for old cached PWA entries so an
    // older local copy cannot erase fields written by the mobile app.
    if ('emotionId' in entry) row.emotion_id = entry.emotionId || null;
    if ('supportive' in entry) row.supportive = entry.supportive || '';
    if ('difficult' in entry) row.difficult = entry.difficult || '';
    if ('wishes' in entry) row.wishes = entry.wishes || '';
    if ('entryType' in entry || String(entry.emotion || '').startsWith('Symulacja:'))
      row.entry_type = entry.entryType || 'simulation';
    if ('simulationId' in entry) row.simulation_id = entry.simulationId || null;
    if ('simulationTitle' in entry) row.simulation_title = entry.simulationTitle || null;
    if ('simulationChoices' in entry) row.simulation_choices = Array.isArray(entry.simulationChoices) ? entry.simulationChoices : [];
    return row;
  }

  function fromRow(row) {
    return {
      id: row.id,
      date: row.entry_date,
      time: row.entry_time,
      emotion: row.emotion,
      emoji: row.emoji || '',
      intensity: row.intensity,
      body: Array.isArray(row.body) ? row.body : [],
      what: row.what || '',
      needs: Array.isArray(row.needs) ? row.needs : [],
      needText: row.need_text || '',
      iStatement: row.i_statement || '',
      emotionId: row.emotion_id || '',
      supportive: row.supportive || '',
      difficult: row.difficult || '',
      wishes: row.wishes || '',
      entryType: row.entry_type || (String(row.emotion || '').startsWith('Symulacja:') ? 'simulation' : 'checkin'),
      simulationId: row.simulation_id || '',
      simulationTitle: row.simulation_title || '',
      simulationChoices: Array.isArray(row.simulation_choices) ? row.simulation_choices : [],
      updatedAt: row.updated_at,
    };
  }

  async function flush() {
    if (!signedIn()) return;
    if (flushing) return;
    flushing = true;

    const dirty = readList(DIRTY_KEY);
    const deleted = readList(DELETED_KEY);

    try {
      if (deleted.length) {
        const ids = deleted.filter(id => typeof id === 'string');
        for (let i = 0; i < ids.length; i += 40) {
          const chunk = ids.slice(i, i + 40);
          await rest('/rest/v1/emlove_entries?id=in.(' + chunk.join(',') + ')', {method: 'DELETE'});
        }
        writeList(DELETED_KEY, []);
      }

      if (dirty.length) {
        const entries = (window.EmloveState && window.EmloveState.entries) || [];
        const byId = new Map(entries.map(e => [e.id, e]));
        const rows = dirty.map(id => byId.get(id)).filter(Boolean).map(e => toRow(e, window.EmloveAuth.currentUser().id));
        if (rows.length) {
          await rest('/rest/v1/emlove_entries?on_conflict=id', {
            method: 'POST',
            headers: {Prefer: 'resolution=merge-duplicates'},
            body: rows,
          });
        }
        writeList(DIRTY_KEY, dirty.filter(id => !byId.has(id)));
      }

      if (window.EmloveState) {
        await rest('/rest/v1/emlove_progress?on_conflict=user_id', {
          method: 'POST',
          headers: {Prefer: 'resolution=merge-duplicates'},
          body: [{
            user_id: window.EmloveAuth.currentUser().id,
            points: window.EmloveState.points,
            exercises_done: window.EmloveState.exercisesDone,
            updated_at: new Date().toISOString(),
          }],
        });
      }

      setStatus('Zapisano w chmurze', 'ok');
    } catch (e) {
      const code = e.code === 'login_required' || e.status === 401 ? 'Sesja wygasła — zaloguj się ponownie'
        : e.status === 404 ? 'Brak tabel w bazie — uruchom emlove_account.sql'
        : /schema cache|column .* does not exist/i.test(e.message || '') ? 'Baza wymaga mobile_sync_migration.sql'
        : 'Nie udało się zapisać — spróbuję ponownie';
      setStatus(code, 'error');
    } finally {
      flushing = false;
    }
  }

  // ── pobieranie ──────────────────────────────────────────────
  async function pull() {
    if (!signedIn()) return {merged: 0};
    const token = await window.EmloveAuth.accessToken();
    const res = await fetch(baseUrl() + '/rest/v1/emlove_entries?select=*&order=entry_date.desc,entry_time.desc', {
      headers: {apikey: cfg().supabaseAnonKey, Authorization: 'Bearer ' + token},
    });
    if (!res.ok) {
      if (res.status === 404) setStatus('Brak tabel w bazie — uruchom emlove_account.sql', 'error');
      throw new Error('HTTP ' + res.status);
    }
    const rows = await res.json();
    const remote = (rows || []).map(fromRow);
    const userId = window.EmloveAuth.currentUser().id;
    const remoteIds = new Set(remote.map(r => r.id).filter(Boolean));
    const knownIds = new Set(readList(REMOTE_IDS_PREFIX + userId));

    const local = (window.EmloveState && window.EmloveState.entries) || [];
    const byId = new Map();
    local.forEach(e => { if (e.id) byId.set(e.id, e); });

    let merged = 0;
    // Missing records that were present on the last sync were deleted on another device.
    knownIds.forEach(id => { if (!remoteIds.has(id) && byId.delete(id)) merged++; });
    writeList(DIRTY_KEY, readList(DIRTY_KEY).filter(id => !knownIds.has(id) || remoteIds.has(id)));

    remote.forEach(r => {
      const mine = byId.get(r.id);
      if (!mine) { byId.set(r.id, r); merged++; return; }
      const mineTs = Date.parse(mine.updatedAt || 0) || 0;
      const remoteTs = Date.parse(r.updatedAt || 0) || 0;
      if (remoteTs > mineTs) { byId.set(r.id, r); merged++; }
    });

    const deleted = new Set(readList(DELETED_KEY));
    const mergedList = [...byId.values()].filter(e => !deleted.has(e.id));
    mergedList.sort((a, b) => {
      const ka = String(a.date) + ' ' + String(a.time);
      const kb = String(b.date) + ' ' + String(b.time);
      return ka < kb ? 1 : ka > kb ? -1 : 0;
    });

    if (window.EmloveState) {
      window.EmloveState.entries = mergedList;
      if (window.EmloveSave) window.EmloveSave();
    }

    try {
      const p = await fetch(baseUrl() + '/rest/v1/emlove_progress?select=*', {
        headers: {apikey: cfg().supabaseAnonKey, Authorization: 'Bearer ' + token},
      });
      if (p.ok) {
        const rowsP = await p.json();
        const row = (rowsP || [])[0];
        if (row && window.EmloveState) {
          window.EmloveState.points = Math.max(window.EmloveState.points, row.points || 0);
          window.EmloveState.exercisesDone = Math.max(window.EmloveState.exercisesDone, row.exercises_done || 0);
          if (window.EmloveSave) window.EmloveSave();
        }
      }
    } catch (e) { /* postępy są pomocnicze */ }

    writeList(REMOTE_IDS_PREFIX + userId, [...remoteIds]);
    if (merged > 0) setStatus('Zsynchronizowano ' + merged + ' zmian z chmury', 'ok');
    else setStatus('Chmura aktualna', 'ok');
    return {merged};
  }

  async function fullSync() {
    await pull();
    await flush();
  }

  window.EmloveSync = {markDirty, markDeleted, flush, pull, fullSync, scheduleFlush, status: () => lastStatus};
})();
