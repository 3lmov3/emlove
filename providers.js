// Emlove — wybór dostawcy modelu i przechowywanie własnych kluczy API (BYOK).
//
// UWAGA (web): w przeglądarce nie ma SecureStore. Klucz trafia do localStorage
// tego pochodzenia. To oznacza, że każdy skrypt działający w tej domenie może
// go odczytać — dlatego Emlove nie ładuje skryptów firm trzecich poza
// Cloudflare Turnstile i nie ma tu żadnej reklamy.
//
// Kolejność zgodna z aplikacją mobilną: administrator, Grok, Anthropic, OpenAI, OpenRouter.
(function () {
  'use strict';

  const ACTIVE_KEY = 'emlove.provider.active';
  const PREFIX = 'emlove.provider.';

  const PROVIDERS = [
    {
      id: 'admin',
      label: 'Klucz administratora',
      model: '',
      hint: 'Używa klucza ustawionego w Supabase. Nie musisz nic wpisywać.',
      keyPrefix: '',
    },
    {
      id: 'grok',
      label: 'Grok (xAI)',
      model: 'grok-4',
      hint: 'console.x.ai — klucz zwykle zaczyna się od xai-',
      keyPrefix: 'xai-',
    },
    {
      id: 'anthropic',
      label: 'Anthropic Claude',
      model: 'claude-3-5-haiku-latest',
      hint: 'console.anthropic.com — klucz zwykle zaczyna się od sk-ant-',
      keyPrefix: 'sk-ant-',
    },
    {
      id: 'openai',
      label: 'OpenAI',
      model: 'gpt-4o-mini',
      hint: 'platform.openai.com — klucz zwykle zaczyna się od sk-',
      keyPrefix: 'sk-',
    },
    {
      id: 'openrouter',
      label: 'OpenRouter',
      model: 'openai/gpt-4o-mini',
      hint: 'openrouter.ai/keys — klucz zwykle zaczyna się od sk-or-v1-',
      keyPrefix: 'sk-or-v1-',
    },
  ];

  function read(name) {
    try { return localStorage.getItem(name) || ''; } catch (e) { return ''; }
  }
  function write(name, value) {
    try { localStorage.setItem(name, value); return true; } catch (e) { return false; }
  }
  function remove(name) {
    try { localStorage.removeItem(name); } catch (e) {}
  }

  const keyName = id => PREFIX + 'key.' + id;
  const modelName = id => PREFIX + 'model.' + id;

  const isProviderId = value =>
    typeof value === 'string' && PROVIDERS.some(p => p.id === value);

  const providerById = id => PROVIDERS.find(p => p.id === id) || PROVIDERS[0];

  function activeProvider() {
    const value = read(ACTIVE_KEY);
    return isProviderId(value) ? value : 'admin';
  }

  function setActiveProvider(id) {
    if (!isProviderId(id)) return false;
    return write(ACTIVE_KEY, id);
  }

  function getApiKey(id) {
    if (id === 'admin') return '';
    return read(keyName(id));
  }

  function setApiKey(id, key) {
    if (id === 'admin') return false;
    const value = String(key || '').trim();
    if (value) return write(keyName(id), value);
    remove(keyName(id));
    return true;
  }

  function clearApiKey(id) {
    if (id === 'admin') return;
    remove(keyName(id));
  }

  function getModel(id) {
    if (id === 'admin') return '';
    return read(modelName(id)) || providerById(id).model || '';
  }

  function setModel(id, model) {
    if (id === 'admin') return false;
    const value = String(model || '').trim();
    if (value) return write(modelName(id), value);
    remove(modelName(id));
    return true;
  }

  /** Luźna walidacja formatu — nie blokuje zapisu, tylko pomaga wykryć literówkę. */
  function keyLooksValid(id, key) {
    const prefix = providerById(id).keyPrefix;
    return !prefix || String(key || '').startsWith(prefix);
  }

  window.EmloveProviders = {
    PROVIDERS,
    activeProvider,
    setActiveProvider,
    getApiKey,
    setApiKey,
    clearApiKey,
    getModel,
    setModel,
    keyLooksValid,
    providerById,
  };
})();
