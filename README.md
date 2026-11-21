# Emlove — PWA (web + instalacja na telefon)

**Emlove** = *emotions + love*. Delikatne narzędzie edukacyjne **tylko dla dorosłych (18+)** do rozpoznawania, nazywania i wyrażania emocji.

## Szata graficzna
Turkusowa zasłona (tło, nawigacja) · czerń (typografia, karty nocne) · róż (akcent ciepła) · kształt wyraźny (promienie 8–12 px).
Ikona: złoty emblemat (plik użytkownika) — `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`.

## Co nowego w v3.1
- **Ćwiczenia w rundach po 5 zadań z serduszkami** — brak podpowiedzi po każdym zadaniu; informacja zwrotna dopiero w podsumowaniu (♥ za każde poprawne), z wyborem „Idziemy dalej (poziom +1)” albo „Poprawiamy tę rundę”. Poziom trudności rośnie: więcej opcji, trudniejsze pytania („najsłabsze” zamiast „najsilniejsze”), dodatkowe wskazówki przy poziomie 3+
- **Dźwięki tła naprawione** — nowy silnik (`ambient.js`): deszcz, ocean, kominek, las z odblokowaniem audio po pierwszym dotknięciu, płynnym wejściem, wskaźnikiem „deszcz gra”, obsługą wyciszenia i wznowieniem po powrocie do karty
- **Konfiguracja Milo tylko dla administratora** — usunięte z aplikacji pola klucza API, dostawcy i modelu. O tym, czy Milo jest „pełny”, decyduje `config.js` (adres pośrednika). Użytkownik nic nie konfiguruje i nie widzi kluczy
- **Poprawna odmiana polszczyzny** — „mój królik”, „moja wydra”, „blisko Ci do orła” (każde zwierzę ma formę dzierżawczą i dopełniacz)
- **Serduszka w pasku postępu** („serduszek: N”) i brak poziomego przewijania strony na telefonie

## Co nowego w v3
- **7 typów ćwiczeń**: Rozpoznaj · Nazwij · Wyraź · **Rozróżnij** (bliskie słowa: zlekceważony vs odrzucony) · **Natężenie** (drabiny siły) · **Ciało → emocja** · **Emocja → potrzeba**
- **10 symulacji**, w tym **6 rozbudowanych** (4 kroki: ciało → słowo → potrzeba → decyzja): rozmowa z szefem, odmowa bez poczucia winy, zazdrość, samotność wśród ludzi, relacja z ciałem, zawiedziona nadzieja
- **Koło emocji 3-poziomowe z obrazka użytkownika**: 8 rodzin → klastry → **128 precyzyjnych słów**, także w bibliotece z wyszukiwaniem
- **Język**: zamiast „AI” mówimy **Milo** („Włącz pełnego Milo”, „Poproś Milo o nową sytuację”, „Podsumowanie od Milo”)
- **Mobilna szuflada menu** — aplikacja otwiera się od razu na treści, menu wysuwa się z boku
- Dźwięk nie może już zablokować interfejsu (zabezpieczony silnik audio)

## Funkcje
- **Check-in** — emocja, siła 1–10, sygnały ciała (w tym **„miejsce intymne”**), potrzeby, komunikat „Ja”
- **Koło emocji** — 8 rodzin, 3 poziomy (rodzina → niuans → słowo precyzyjne), 128 słów
- **Ćwiczenia** (Rozpoznaj / Nazwij / Wyraź) i **symulacje** sytuacji
- **Milo** — towarzysz: słucha, pyta, tworzy sytuacje; nie przejmuje wypowiedzi, nie decyduje, nie ocenia
- **Test osobowości** — 30 podskal wielkiej piątki + **zwierzę-towarzysz** (17 zwierząt)
- **Dziennik** z eksportem JSON, **biblioteka emocji**, **minuta oddechu**
- **Dźwięk** — tła (deszcz/ocean/kominek/las), efekty, głos Milo (TTS polski)
- **Prawdziwe AI** — OpenRouter / OpenAI / Ollama; klucz tylko w Twojej przeglądarce
- **PWA** — instalowalna, offline (Service Worker)

## Uruchomienie
```bash
python3 -m http.server 8001
# http://localhost:8001
```

## Publikacja na GitHub Pages (konto: 3lmov3)
1. GitHub → New repository → `emlove` → Public
2. Wgraj wszystkie pliki z tego folderu (15 plików: index.html, style.css, app.js, config.js, ambient.js, wheel.js, exercises2.js, exercises3.js, personality.js, manifest.json, sw.js, icon-192.png, icon-512.png, apple-touch-icon.png, README.md)
3. Settings → Pages → Source: `main / (root)` → Save
4. Adres: `https://3lmov3.github.io/emlove/`

**Instalacja na telefonie:** Android (Chrome) → ⋮ → „Zainstaluj aplikację”; iPhone (Safari) → Udostępnij → „Dodaj do ekranu początkowego”.

## Bezpieczeństwo i konfiguracja
- **W aplikacji nie ma żadnych pól na klucze API.** O tym, czy Milo jest „pełny” (odpowiada z modelu), decyduje administrator w pliku `config.js` → `aiEndpoint`.
- `aiEndpoint` powinien wskazywać na **Twój pośrednik** (np. funkcja Supabase / Cloudflare Worker), który trzyma klucz OpenRouter w sekretach. Wtedy klucz nigdy nie trafia do przeglądarki ani do repozytorium.
- Puste `aiEndpoint` = Milo działa lokalnie, bez internetu.
- Emlove to nie terapia. W kryzysie: **116 123** (wsparcie emocjonalne) · **112** (zagrożenie życia).
