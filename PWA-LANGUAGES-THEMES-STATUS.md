# PWA: języki, Milo i motywy — etap 1

## Wdrożone w źródłach
- Odblokowano wybór PL/EN/DE/FR/HU/UK oraz tryb Auto (język przeglądarki/urządzenia).
- Dodano zapisany lokalnie wybór motywu: Miętowy, Nocny i Lawendowy. Logo wewnątrz aplikacji zmienia wariant; ikona launchera na ekranie telefonu/desktopu, favicon, Apple Touch i manifest pozostają jedną wspólną ikoną-fuzją. System może nie odświeżyć ikony ekranu głównego aplikacji, która była już zainstalowana.
- Klient Milo przekazuje wybrany język do ścieżek online administratora i BYOK; odpowiedź bez potwierdzenia zgodnego języka jest odrzucana.
- Edge Functions mają lokalizowane prompty i odpowiedzi kryzysowe dla sześciu języków, bez dobierania numeru pomocy na podstawie języka.
- Lokalny Milo oraz cztery wbudowane symulacje korzystają z zatwierdzonych zasobów tłumaczeń.
- Service worker otrzymał nową wersję cache i zasoby tych funkcji.

## Ważne: zakres nie jest jeszcze pełnym tłumaczeniem PWA
Pozostałe widoki i treści — m.in. większość check-inu, ćwiczeń, biblioteki, osobowości, dziennika, ustawień, komunikatów, strony logowania i polityki prywatności — nadal mają polskie teksty lub wymagają lokalizacji i testów. Interfejs pokazuje ten stan jako ostrzeżenie. Nie należy traktować tej paczki jako ukończonej, pełnej lokalizacji.

## Weryfikacja
- `node tests/pwa-locale-settings.test.mjs` — OK.
- `node --check` dla zmodyfikowanych skryptów JavaScript — OK.
- Testy zasobów promptów Milo — wszystkie sześć języków obecne.
- `git diff --check` — OK.
- Nie uruchamiano buildu ani wdrożenia.
- Nie wykonano testów online: środowisko plików nie udostępniało istniejącej zalogowanej sesji. Żadne konto ani token nie zostały użyte.
