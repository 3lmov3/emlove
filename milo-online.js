// Emlove — Milo online kluczem administratora, przez funkcję Supabase.
// Klucz administratora NIGDY nie trafia do przeglądarki.
//
// Funkcja chroni przed nadużyciem limitem dziennym (emlove_private_26_take_quota).
// Wcześniej była też bramka na jeden userid testowy — ta została zdjęta,
// gdy rejestracja stała się otwarta.
(function () {
  'use strict';

  const MAX_TEXT = 1500;

  function cfg() { return window.EMLOVE_CONFIG || {}; }
  function baseUrl() { return String(cfg().supabaseUrl || '').replace(/\/$/, ''); }

  const MESSAGES = {
    login_required: 'Zaloguj się, aby rozmawiać z Milo online.',
    test_access_only: 'To konto nie ma jeszcze dostępu do Milo online. Funkcja wymaga aktualizacji po stronie serwera.',
    limit: 'Osiągnięto limit rozmów na dziś. Spróbuj ponownie jutro.',
    quota_unavailable: 'Nie udało się sprawdzić limitu. Spróbuj za chwilę.',
    not_configured: 'Milo online nie jest skonfigurowane na serwerze.',
    provider_error: 'Dostawca modelu odrzucił żądanie.',
    service: 'Milo nie mógł teraz odpowiedzieć. Spróbuj ponownie.',
    network: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.',
    // Kody zwracane przez funkcję private26 — bez tego wyciekały do czatu.
    quota_exceeded: 'Osiągnięto dzienny limit rozmów. Spróbuj ponownie jutro.',
    provider_unavailable: 'Dostawca modelu jest chwilowo niedostępny. Spróbuj za chwilę.',
    provider_empty: 'Model nie zwrócił odpowiedzi. Spróbuj ponownie.',
    unavailable: 'Serwer jest chwilowo niedostępny. Spróbuj ponownie.',
    too_large: 'Wiadomość jest za długa.',
    disabled: 'Milo online jest wyłączone.',
    method: 'Nieprawidłowa metoda żądania.',
  };

  function messageOf(error, fallback) {
    const code = error && error.code;
    return (code && MESSAGES[code]) || (error && error.message && MESSAGES[error.message]) || fallback;
  }

  /**
   * @param {string} text
   * @param {Array<{role:string,content:string}>} history  max 4 ostatnie tury
   * @param {AbortSignal} [signal]
   * @returns {Promise<string>}
   */
  async function ask(text, history, signal) {
    const auth = window.EmloveAuth;

    if (!auth || !auth.currentUser()) {
      throw Object.assign(new Error('login_required'), {code: 'login_required'});
    }
    if (!cfg().supabaseUrl || !cfg().supabaseAnonKey) {
      throw Object.assign(new Error('not_configured'), {code: 'not_configured'});
    }

    const accessToken = await auth.accessToken();

    let response;
    try {
      response = await fetch(baseUrl() + '/functions/v1/milo-mobile-private26', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg().supabaseAnonKey,
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
          text: String(text).slice(0, MAX_TEXT),
          history: (history || []).slice(-4),
        }),
        signal,
      });
    } catch (e) {
      if (e && e.name === 'AbortError') throw e;
      throw Object.assign(new Error('network'), {code: 'network'});
    }

    if (!response.ok) {
      let body = null;
      try { body = await response.json(); } catch (e) {}

      const code =
        (body && body.error) ||
        (response.status === 401 ? 'login_required' :
         response.status === 429 ? 'limit' :
         response.status === 503 ? 'not_configured' :
         'service');

      throw Object.assign(new Error(code), {
        code,
        detail: body && body.missing ? body.missing.join(', ') : '',
        source: 'private26',
      });
    }

    let obj = null;
    try { obj = await response.json(); } catch (e) {}
    if (!obj || typeof obj.text !== 'string' || !obj.text.trim()) {
      throw Object.assign(new Error('service'), {code: 'service'});
    }
    return obj.text.trim();
  }

  window.EmloveOnline = {ask, messageOf, MESSAGES};
})();
