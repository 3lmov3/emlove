// Emlove — konto użytkownika: rejestracja, logowanie, reset hasła, usunięcie konta.
// Bezpośrednie wywołania GoTrue (Supabase Auth), bez zewnętrznych bibliotek,
// żeby service worker mógł cache'ować wszystko z tej samej domeny.
//
// Klucz anon pochodzi z config.js i jest PUBLICZNY — może być w przeglądarce.
// Klucz service_role nigdy tu nie trafia: usuwanie konta robi edge function.
(function () {
  'use strict';

  const SESSION_KEY = 'emlove_auth_session';
  const cfg = () => window.EMLOVE_CONFIG || {};

  function baseUrl() {
    return String(cfg().supabaseUrl || '').replace(/\/$/, '');
  }
  function anonKey() {
    return cfg().supabaseAnonKey || '';
  }
  function configured() {
    return !!(baseUrl() && anonKey());
  }

  // ── sesja ────────────────────────────────────────────────────
  function readSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch (e) { return null; }
  }
  function writeSession(session) {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
    document.dispatchEvent(new CustomEvent('emlove:auth', {detail: {user: currentUser()}}));
  }

  function currentUser() {
    const s = readSession();
    return s && s.user ? s.user : null;
  }

  async function request(path, options) {
    const headers = Object.assign(
      {'Content-Type': 'application/json', apikey: anonKey()},
      options.headers || {}
    );
    const res = await fetch(baseUrl() + path, {
      method: options.method || 'POST',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* pusta odpowiedź */ }
    if (!res.ok) {
      const err = new Error((data && (data.error_description || data.msg || data.error)) || ('HTTP ' + res.status));
      err.status = res.status;
      err.code = (data && (data.error_code || data.code || data.error)) || '';
      throw err;
    }
    return data;
  }

  /** Zwraca ważny access token; odświeża go, gdy kończy się za mniej niż minutę. */
  async function accessToken() {
    const s = readSession();
    if (!s || !s.access_token) throw Object.assign(new Error('login_required'), {code: 'login_required'});

    const now = Math.floor(Date.now() / 1000);
    if (s.expires_at && s.expires_at > now + 60) return s.access_token;

    if (!s.refresh_token) throw Object.assign(new Error('login_required'), {code: 'login_required'});
    const data = await request('/auth/v1/token?grant_type=refresh_token', {
      body: {refresh_token: s.refresh_token},
    });
    if (!data.access_token) throw Object.assign(new Error('login_required'), {code: 'login_required'});
    writeSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token || s.refresh_token,
      expires_at: data.expires_at || Math.floor(Date.now() / 1000) + (data.expires_in || 3600),
      user: data.user || s.user,
    });
    return data.access_token;
  }

  function authHeaders() {
    return {Authorization: 'Bearer ' + accessToken()};
  }

  // ── rejestracja / logowanie ─────────────────────────────────
  async function signUp(email, password, captchaToken) {
    if (!configured()) throw Object.assign(new Error('not_configured'), {code: 'not_configured'});
    const data = await request('/auth/v1/signup', {
      body: {
        email: email.trim(),
        password,
        gotrue_meta_security: captchaToken ? {captcha_token: captchaToken} : undefined,
      },
    });
    // Przy włączonym potwierdzeniu adresu Supabase nie zwraca sesji.
    if (data.session && data.session.access_token) {
      writeSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at || Math.floor(Date.now() / 1000) + (data.session.expires_in || 3600),
        user: data.user || data.session.user,
      });
      return {needsConfirmation: false};
    }
    return {needsConfirmation: true};
  }

  async function signIn(email, password, captchaToken) {
    if (!configured()) throw Object.assign(new Error('not_configured'), {code: 'not_configured'});
    const data = await request('/auth/v1/token?grant_type=password', {
      body: {
        email: email.trim(),
        password,
        gotrue_meta_security: captchaToken ? {captcha_token: captchaToken} : undefined,
      },
    });
    if (!data.access_token) throw Object.assign(new Error('auth_failed'), {code: 'auth_failed'});
    writeSession({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at || Math.floor(Date.now() / 1000) + (data.expires_in || 3600),
      user: data.user,
    });
    return data.user;
  }

  async function signOut() {
    try {
      await request('/auth/v1/logout?scope=global', {
        method: 'POST',
        headers: await authHeaders().catch(() => ({})),
        body: {},
      });
    } catch (e) { /* sesja i tak znika lokalnie */ }
    writeSession(null);
  }

  async function resetPassword(email, captchaToken) {
    if (!configured()) throw Object.assign(new Error('not_configured'), {code: 'not_configured'});
    await request('/auth/v1/recover', {
      body: {
        email: email.trim(),
        gotrue_meta_security: captchaToken ? {captcha_token: captchaToken} : undefined,
      },
    });
  }

  /** Usuwa konto przez edge function z service role (klucz anon nie wystarcza). */
  async function deleteAccount() {
    if (!configured()) throw Object.assign(new Error('not_configured'), {code: 'not_configured'});
    const token = await accessToken();
    let res;
    try {
      res = await fetch(baseUrl() + '/functions/v1/milo-account-delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', apikey: anonKey(), Authorization: 'Bearer ' + token},
        body: '{}',
      });
    } catch (e) {
      throw Object.assign(new Error('network'), {code: 'network'});
    }
    if (!res.ok) {
      const code = res.status === 401 ? 'login_required' : 'delete_failed';
      throw Object.assign(new Error(code), {code});
    }
    writeSession(null);
  }

  // ── weryfikacja Turnstile ───────────────────────────────────
  // Wspólna dla konta i dla Milo. Token jest jednorazowy.
  async function captcha(title) {
    const sitekey = cfg().turnstileSiteKey;
    if (!sitekey) return null;

    if (!window.turnstile) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        let settled = false;
        const timer = setTimeout(() => finish(false), 15000);
        function finish(ok) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          ok ? resolve() : reject(new Error('captcha_unavailable'));
        }
        s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.onload = () => finish(!!window.turnstile);
        s.onerror = () => finish(false);
        document.head.appendChild(s);
      });
    }

    return await new Promise((resolve, reject) => {
      const overlay = document.createElement('div');
      overlay.className = 'milo-captcha-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-labelledby', 'emlove-captcha-title');
      overlay.innerHTML =
        '<div class="milo-captcha-card">' +
        '<h2 id="emlove-captcha-title">' + (title || 'Potwierdzenie') + '</h2>' +
        '<p>Jednorazowa weryfikacja chroni usługę przed nadużyciami. Cloudflare otrzyma dane techniczne połączenia, w tym adres IP.</p>' +
        '<div id="emlove-captcha-widget"></div>' +
        '<button type="button" class="btn btn-secondary" id="emlove-captcha-cancel">Anuluj</button>' +
        '</div>';
      document.body.appendChild(overlay);

      let widget;
      let done = false;
      const timer = setTimeout(() => finish(null), 120000);

      function finish(token) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try { if (widget !== undefined) window.turnstile.remove(widget); } catch (e) {}
        overlay.remove();
        token ? resolve(token) : reject(Object.assign(new Error('captcha_failed'), {code: 'captcha_failed'}));
      }

      overlay.querySelector('#emlove-captcha-cancel').onclick = () => finish(null);
      try {
        widget = window.turnstile.render(overlay.querySelector('#emlove-captcha-widget'), {
          sitekey,
          callback: token => finish(token),
          'error-callback': () => finish(null),
          'expired-callback': () => finish(null),
        });
      } catch (e) { finish(null); }
    });
  }

  window.EmloveAuth = {
    configured,
    currentUser,
    accessToken,
    signUp,
    signIn,
    signOut,
    resetPassword,
    deleteAccount,
    captcha,
    session: readSession,
  };
})();
