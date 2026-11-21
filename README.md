# Emlove — aplikacja PWA

Emlove to edukacyjna aplikacja dla dorosłych (18+), nie terapia. Milo słucha i zadaje pytania; nie podejmuje decyzji za użytkownika.

## Droga przez koło

Ćwiczenia wykorzystują trzy pierścienie przesłanego koła. Poziom 1 to 50 zadań o grupach głównych, poziom 2 to 40 zadań o podgrupach, a poziom 3 — 30 zadań o konkretnych słowach. Pytania oraz odpowiedzi są losowane. Zadania sprawdzają położenie słów na kole, a nie stwierdzają, jakie emocje dana osoba „powinna” odczuwać. Ze względu na ograniczoną liczbę słów pytania mogą się powtarzać.

Po pięciu zadaniach pokazuje się podsumowanie; za poprawną odpowiedź jest serduszko. Powtórka jest treningiem i nie zmienia pierwszego wyniku. Po ukończeniu 120 zadań wynik od 114/120 (95%) daje odznakę feniksa, a niższy — odznakę białego serca. Jeśli w 30 dni od rozpoczęcia pierwszej rundy nie ukończono wszystkich zadań, cykl resetuje się bez odznaki. Ukończony cykl też resetuje się po 30 dniach. Data i postępy przechowywane są w pamięci przeglądarki na urządzeniu; wyczyszczenie pamięci lub zmiana urządzenia je usuwa. Zegar urządzenia może wpływać na termin.

## Dźwięki i ikona

Cztery syntetycznie wygenerowane, zapętlone pliki MP3 znajdują się w katalogu `audio/`. Przeglądarka może wymagać dotknięcia ekranu i włączenia dźwięku. Obsługa offline wymaga pierwszego poprawnego pobrania aplikacji i zakończenia instalacji pamięci podręcznej. Ikona aplikacji przedstawia białe serce; zdjęcie feniksa służy jako odznaka.

## Publikacja na GitHub Pages

Wgraj całą zawartość katalogu do katalogu głównego repozytorium `emlove`, **z zachowaniem folderu `audio/`**. W ustawieniach repozytorium wybierz Pages → Deploy from a branch → `main` / `(root)`. Adres: `https://3lmov3.github.io/emlove/`. Szczegóły są w `INSTRUKCJA_GITHUB.html` dołączonej osobno.

## Milo i bezpieczeństwo

Domyślnie Milo działa lokalnie, na gotowych zwrotach; pośrednik do modelu nie jest jeszcze skonfigurowany. Administrator może ustawić adres pośrednika w `config.js`. Klucz OpenRouter należy umieścić wyłącznie w sekretach zabezpieczonego pośrednika (np. Supabase Edge Function), nigdy w kodzie publicznym ani w aplikacji. Użytkownik nie wprowadza klucza.

Emlove nie zastępuje terapii. W kryzysie: 116 123 (wsparcie emocjonalne dorosłych), 116 111 (dzieci i młodzież), 112 (bezpośrednie zagrożenie).
