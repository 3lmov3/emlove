# Milo — przygotowanie pośrednika Supabase / OpenRouter

**Status:** kod funkcji i migracji jest przygotowany, ale nie został wdrożony ani sprawdzony z prawdziwym projektem i rzeczywistym kluczem. Aplikacja działa lokalnie bez niego. Przed publicznym uruchomieniem potrzebny jest przegląd bezpieczeństwa, testy na prawdziwym projekcie, polityka prywatności i limity kosztów.

## Co jest podłączone

- Funkcja `supabase/functions/milo/index.ts` obsługuje wyłącznie generowanie pięciu neutralnych kontekstów do rundy oraz odpowiedź na wypowiedź użytkownika w Wyraź.
- Wynik punktowanych zadań i poprawna odpowiedź pozostają wyznaczone lokalnie. Model nie tworzy jeszcze pełnych ocenianych zadań; pytania mogą się powtarzać.
- Użytkownik widzi przed wysłaniem swojej wypowiedzi informację o przekazaniu jej do serwera i dostawcy modelu. Odpowiedzi w Drabinie nie są wysyłane. Do funkcji trafiają adres IP i anonimowa sesja — uwzględnij to w polityce prywatności, weryfikując też zasady Supabase i OpenRouter.
- Funkcja sprawdza token użytkownika, nakłada limit konta 60 wywołań dziennie i nie przyjmuje nazwy modelu ani dowolnego systemowego promptu z przeglądarki.

## Wdrożenie przez administratora

1. Utwórz projekt Supabase i zainstaluj oficjalne Supabase CLI. Zaloguj CLI (`supabase login`) i połącz projekt (`supabase link --project-ref ID_PROJEKTU`). Z katalogu aplikacji zastosuj migrację `supabase db push`. Identyfikator projektu odczytaj z własnego panelu, nie używaj przykładowego identyfikatora.
2. W Supabase Authentication włącz Anonymous Sign-Ins dla testów. Przed publikacją zabezpiecz tworzenie anonimowych kont przed botami (w tym CAPTCHA, ochroną IP i limitami usług). Aktualny klient nie ma jeszcze integracji CAPTCHA — jeśli ją włączysz, należy najpierw dopisać odpowiedni interfejs i przekazać token przy logowaniu. Limit per anonimowe konto **nie zapobiega tworzeniu kolejnych kont**. Ustaw również twardy budżet i limity w OpenRouter oraz monitorowanie kosztów. Nie publikuj funkcji bez odpowiednich zabezpieczeń.
3. Ustaw w sekretach Edge Function `OPENROUTER_API_KEY`, `MILO_MODEL` (dokładny identyfikator wybranego modelu OpenRouter) i `EMLOVE_ALLOWED_ORIGIN` (dokładny origin strony, np. `https://3lmov3.github.io`). Supabase dostarcza funkcji `SUPABASE_URL`, `SUPABASE_ANON_KEY` i `SUPABASE_SERVICE_ROLE_KEY`. Nie zapisuj tych sekretów w publicznym repozytorium. Sekrety można ustawić w panelu Supabase albo przez CLI z lokalnego pliku poza repozytorium za pomocą `supabase secrets set --env-file ŚCIEŻKA_DO_PRYWATNEGO_PLIKU`. Nie wklejaj klucza w czacie.
4. Wdróż `supabase functions deploy milo`. Pozostaw włączoną weryfikację JWT (`verify_jwt = true`). Zweryfikuj z prawdziwego urządzenia: logowanie anonimowe, CORS, działanie limitu i odpowiedź przy braku internetu.
5. W publicznym `config.js` ustaw wyłącznie `supabaseUrl` i **publiczny** klucz `supabaseAnonKey` (anon/publishable z panelu projektu). Nigdy nie podawaj tu OpenRouter API key ani service role. Jeśli dowolne z tych pól jest puste, Drabina i Wyraź pracują lokalnie.
6. Ogranicz przydziały, zbadaj bezpieczeństwo odpowiedzi modelu i uzyskaj potrzebne zgody prywatności. Model może się mylić; istniejący filtr bezpieczeństwa to tylko pomoc, a nie gwarancja. Nie uruchamiaj płatnej integracji publicznie, dopóki ryzyko nadużyć i ochronę danych nie zostały ocenione.

`aiEndpoint` w `config.js` jest starszą, osobną integracją konwersacyjnego Milo. Opisywana funkcja `milo` nie obsługuje endpointu `/chat/completions` i nie włącza tej starszej rozmowy automatycznie. Ustawianie tam adresu funkcji `milo` nie zadziała.
