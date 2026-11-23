// Emlove — Milo kluczem użytkownika (BYOK).
//
// Klucz jest przekazywany WYŁĄCZNIE w treści żądania do funkcji Supabase.
// Funkcja nie zapisuje go i nie loguje. To ta sama funkcja, której używa
// aplikacja mobilna — dzięki temu PWA i telefon zachowują się identycznie.
(function () {
  'use strict';

  const MAX_TEXT = 2000;

  function cfg() { return window.EMLOVE_CONFIG || {}; }
  function baseUrl() { return String(cfg().supabaseUrl || '').replace(/\/$/, ''); }

  /**
   * @param {object} params
   * @param {string} params.provider  grok | anthropic | openai | openrouter
   * @param {string} params.model
   * @param {string} params.text      treść wiadomości użytkownika
   * @param {Array<{role:string,content:string}>} params.history
   * @param {AbortSignal} [params.signal]
   * @returns {Promise<string>} odpowiedź Milo
   */
  async function ask(params) {
    const {provider, model, text, history, signal} = params;
    const auth = window.EmloveAuth;

    if (!auth || !auth.currentUser()) {
      throw Object.assign(new Error('login_required'), {code: 'login_required'});
    }
    if (!cfg().supabaseUrl || !cfg().supabaseAnonKey) {
      throw Object.assign(new Error('not_configured'), {code: 'not_configured'});
    }

    const apiKey = window.EmloveProviders.getApiKey(provider);
    if (!apiKey) {
      throw Object.assign(new Error('missing_api_key'), {code: 'missing_api_key'});
    }

    const accessToken = await auth.accessToken();

    let response;
    try {
      response = await fetch(baseUrl() + '/functions/v1/milo-mobile-byok', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg().supabaseAnonKey,
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
          provider,
          apiKey,
          model: model || window.EmloveProviders.getModel(provider),
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
      let detail = '';
      let serverCode = '';
      try {
        detail = await response.text();
        const parsed = JSON.parse(detail);
        if (parsed && typeof parsed.error === 'string') serverCode = parsed.error;
      } catch (e) {}
      const code = serverCode ||
        (response.status === 401 || response.status === 403 ? 'login_required' :
         response.status === 429 ? 'limit' :
         response.status === 400 || response.status === 502 ? 'provider_error' :
         'service');
      throw Object.assign(new Error(code), {code, detail, source: 'byok'});
    }

    let obj = null;
    try { obj = await response.json(); } catch (e) {}
    if (!obj || typeof obj.text !== 'string' || !obj.text.trim()) {
      throw Object.assign(new Error('service'), {code: 'service'});
    }
    return obj.text.trim();
  }

  const MESSAGES = {
    login_required: 'Milo online wymaga zalogowania.',
    missing_api_key: 'Brak klucza API dla wybranego dostawcy. Uzupełnij go w „Klucze API”.',
    not_configured: 'Milo online nie jest skonfigurowane w config.js.',
    network: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.',
    limit: 'Osiągnięto limit żądań. Odczekaj chwilę.',
    provider_error: 'Dostawca odrzucił żądanie. Sprawdź klucz i nazwę modelu.',
    service: 'Milo nie mógł teraz odpowiedzieć. Spróbuj ponownie.',
  };

  function messageOf(error, fallback) {
    const code = error && error.code;
    return (code && MESSAGES[code]) || (error && error.message && MESSAGES[error.message]) || fallback;
  }

  window.EmloveByok = {ask, messageOf, MESSAGES};
})();
