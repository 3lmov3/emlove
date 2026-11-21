// ============================================================
// Emlove — konfiguracja administratora
// Ten plik ustawia JEDEN administrator. Użytkownik nie widzi
// żadnych pól z kluczami — decydujesz tutaj, czy Milo ma być
// „pełny” (odpowiada z modelu językowego), czy lokalny.
//
// ZASADA BEZPIECZEŃSTWA: klucza API NIE wpisuj tutaj, jeśli
// repo jest publiczne. Wskaż adres własnego pośrednika
// (np. funkcji Supabase / Cloudflare Worker), który trzyma klucz.
// ============================================================
window.EMLOVE_CONFIG = {
  // Adres Supabase i publiczny klucz anon/publishable (NIE klucz OpenRouter ani service_role).
  // Wymaga wdrożenia funkcji i ustawienia sekretów po stronie serwera.
  supabaseUrl: 'https://dwvcdpipjgpgcjycjcpt.supabase.co',
  supabaseAnonKey: 'sb_publishable_I40qrtffaEh-pl0hbGS0NQ_QRWzsMLN',
  // Publiczny site key Turnstile; sekret Turnstile jest wyłącznie w Supabase.
  turnstileSiteKey: '0x4AAAAAAGLoHxGNlKV3AxUL',
  // Adres pośrednika zgodnego z OpenAI (endpoint /chat/completions).
  // Przykłady:
  //   Supabase Edge Function: 'https://twojprojekt.supabase.co/functions/v1/ai'
  //   Cloudflare Worker:      'https://emlove-ai.twojadomena.workers.dev/v1'
  // Puste = Milo działa lokalnie (bez internetu, z gotowych zwrotów).
  aiEndpoint: '',

  // Nazwa modelu przekazywana do pośrednika (opcjonalnie — może być ustawiona po stronie serwera).
  aiModel: '',

  // Czy pokazywać użytkownikowi informację, że rozmawia z modelem językowym.
  showAiBadge: true,

  // Wersja aplikacji (wyświetlana w stopce ustawień).
  version: '3.0',
};
