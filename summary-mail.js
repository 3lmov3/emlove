// Emlove — wysyłka podsumowania dziennika mailem.
//
// Funkcja milo-journal-summary-mail bierze odbiorcę WYŁĄCZNIE z JWT
// (user.email), więc nie jest otwartym relay-em — nie da się przez nią
// wysłać maila na dowolny adres.
//
// Limit: 5 maili na minutę na użytkownika (wymuszany po stronie serwera).
(function () {
  'use strict';

  const MAX_SUMMARY = 4000;

  const MESSAGES = {
    login_required: 'Zaloguj się, aby wysłać podsumowanie mailem.',
    no_email_on_account: 'To konto nie ma przypisanego adresu e-mail.',
    rate_limited: 'Wysłałeś już kilka maili w tej minucie. Poczekaj chwilę.',
    mail_not_configured: 'Serwer nie ma skonfigurowanej wysyłki maili (RESEND_API_KEY).',
    mail_failed: 'Nie udało się wysłać maila. Spróbuj ponownie.',
    disabled: 'Wysyłka maili jest wyłączona na serwerze.',
    env_missing: 'Serwer nie ma konfiguracji Supabase.',
    bad_summary: 'Podsumowanie jest puste.',
    too_large: 'Podsumowanie jest za długie.',
    network: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.',
  };

  function messageOf(error, fallback) {
    const code = error && error.code;
    return (code && MESSAGES[code]) || (error && error.message && MESSAGES[error.message]) || fallback;
  }

  function cfg() { return window.EMLOVE_CONFIG || {}; }
  function baseUrl() { return String(cfg().supabaseUrl || '').replace(/\/$/, ''); }

  /** @param {string} summary — treść podsumowania do wysłania */
  async function send(summary) {
    const auth = window.EmloveAuth;

    if (!auth || !auth.currentUser()) {
      throw Object.assign(new Error('login_required'), {code: 'login_required'});
    }
    if (!cfg().supabaseUrl || !cfg().supabaseAnonKey) {
      throw Object.assign(new Error('env_missing'), {code: 'env_missing'});
    }

    const text = String(summary || '').trim();
    if (!text) throw Object.assign(new Error('bad_summary'), {code: 'bad_summary'});
    if (text.length > MAX_SUMMARY) throw Object.assign(new Error('too_large'), {code: 'too_large'});

    const accessToken = await auth.accessToken();

    let response;
    try {
      response = await fetch(baseUrl() + '/functions/v1/milo-journal-summary-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg().supabaseAnonKey,
          Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({summary: text.slice(0, MAX_SUMMARY)}),
      });
    } catch (e) {
      throw Object.assign(new Error('network'), {code: 'network'});
    }

    if (!response.ok) {
      let body = null;
      try { body = await response.json(); } catch (e) {}
      const code = (body && body.error) || (response.status === 401 ? 'login_required' : 'mail_failed');
      throw Object.assign(new Error(code), {code});
    }

    let result = null;
    try { result = await response.json(); } catch (e) {}
    if (!result || result.ok !== true) {
      throw Object.assign(new Error('mail_failed'), {code: 'mail_failed'});
    }
    return result.to; // adres, na który poszło
  }

  window.EmloveSummaryMail = {send, messageOf, MESSAGES};
})();
