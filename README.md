# Emlove — PWA

Emlove to edukacyjna aplikacja dla dorosłych (18+), nie terapia. Milo słucha i pyta, nie decyduje i nie pisze za użytkownika.

## Drabina emocji

Jedna ścieżka przeplata sześć rodzajów zadań: Rozpoznaj, Nazwij, Rozróżnij, Ciało, Natężenie i Potrzeba. Zadania korzystają z koła oraz przykładowych wypowiedzi. Sygnał ciała nie jest traktowany jako dowód konkretnej emocji, a potrzeby pochodzą z wypowiedzi opisanej osoby. Wypowiedzi nie są oceną uczuć użytkownika.

Trzy poziomy mają odpowiednio 50, 40 i 30 zadań i tyle samo możliwych serduszek. Świeży cykl rozkłada zadania możliwie równo: poziom 1 to 8 lub 9 zadań na każdy szczebel, poziom 2 — 6 lub 7, a poziom 3 — po 5. Kolejność i pytania są losowane. Runda ma pięć zadań; podsumowanie jest na końcu. Już rozpoczęty cykl zachowuje wcześniejszy postęp, więc podział sześciu szczebli będzie w pełni równy od następnego nowego cyklu.

Widoczny licznik „jeszcze do zdobycia” to liczba zadań, które pozostały w bieżącym poziomie, a nie różnica między maksymalną pulą a dotąd zdobytymi serduszkami. Błędne odpowiedzi zużywają szansę na dane serduszko; powtórka to trening, bez zmiany wyniku.

Po 120 zadaniach wynik co najmniej 114/120 (95%) daje odznakę feniksa; niższy — odznakę białego serca. Po 30 dniach od pierwszej rundy cykl resetuje się. Niedokończony cykl nie daje odznaki. Wyniki i czas są lokalne dla przeglądarki; czyszczenie danych je usuwa, a zmiana zegara urządzenia wpływa na termin.

## Wyraź

Własna wypowiedź nie jest punktowana. W trybie lokalnym Milo odpowiada gotowym pytaniem. Po skonfigurowaniu funkcji serwerowej wypowiedź jest wysyłana do serwera i dostawcy modelu dopiero po kliknięciu przycisku; użytkownik widzi informację o tym fakcie. Nie wysyłaj danych wrażliwych.

## Nagrania

Dźwięki w `audio/` wykorzystują nagrania z Wikimedia Commons, poddane delikatnemu filtrowaniu, ograniczeniu głośnych szczytów i wyciszeniu brzegów. Pełne źródła, autorzy, licencje i opis zmian są w `audio/LICENCJE.html`. Po opuszczeniu aplikacji tło jest wstrzymywane; wznawia je ikona głośnika po powrocie. Nie ma gwarancji identycznej obsługi na wszystkich telefonach — przetestuj na docelowych iOS i Androidzie.

## Automatyzacja Milo — etap przygotowawczy

Domyślnie aplikacja używa wyłącznie lokalnych zadań i gotowego pytania. W `supabase/` dołączono niewdrożoną funkcję i migrację limitów. Po ich poprawnym wdrożeniu, konfiguracji projektu i uruchomieniu anonimowych sesji, Milo może generować neutralne konteksty do rund oraz krótkie odpowiedzi w zakładce Wyraź. **Pytania i ich klucze odpowiedzi nadal pochodzą z lokalnej puli** — model nie generuje ich samodzielnie i nie ma gwarancji braku powtórzeń po 30 dniach. Odpowiedzi na punktowane zadania nie są wysyłane na serwer. To nie jest jeszcze pełna automatyzacja całej aplikacji ani wdrożony serwis; konfiguracja wymaga pracy administratora opisanej w `SUPABASE_MILO.md`.

Połączenie jest opcjonalne. Klucz OpenRouter należy przechowywać wyłącznie jako sekret funkcji serwerowej. Nie wpisuj klucza do czatu, publicznego repozytorium ani `config.js`. Potrzebne są też limity kosztów i zabezpieczenia antynadużyciowe przed wdrożeniem publicznym.

## Publikacja PWA

Wgraj zawartość katalogu do głównego katalogu repozytorium `3lmov3/emlove`, zachowując katalogi `audio/` i `supabase/`. W Settings → Pages wybierz branch `main` i folder `/(root)`. https://3lmov3.github.io/emlove/

W kryzysie: **116 123** (wsparcie emocjonalne dorosłych), **116 111** (dzieci i młodzież), **112** (bezpośrednie zagrożenie).
