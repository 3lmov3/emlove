# Emlove — PWA (web + instalacja na telefon)

**Emlove** = *emotions + love*. Delikatne narzędzie edukacyjne **tylko dla dorosłych (18+)** do rozpoznawania, nazywania i wyrażania emocji.

## Szata graficzna
Turkusowa zasłona (tło, nawigacja) · czerń (typografia, karty nocne) · róż (akcent ciepła) · kształt wyraźny (promienie 8–12 px).
Ikona: złoty emblemat (plik użytkownika) — `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`.

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
- **Test osobowości** — 30 podskal wielkiej piątki + **zwierzę-towarzysz** (16 zwierząt)
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
2. Wgraj wszystkie pliki z tego folderu (12 plików: index.html, style.css, app.js, wheel.js, exercises2.js, personality.js, manifest.json, sw.js, icon-192.png, icon-512.png, apple-touch-icon.png, README.md)
3. Settings → Pages → Source: `main / (root)` → Save
4. Adres: `https://3lmov3.github.io/emlove/`

**Instalacja na telefonie:** Android (Chrome) → ⋮ → „Zainstaluj aplikację”; iPhone (Safari) → Udostępnij → „Dodaj do ekranu początkowego”.

## Bezpieczeństwo
- Klucz OpenRouter **nigdy** nie trafia do repozytorium — wpisujesz go tylko lokalnie w ⚙️ Ustawieniach.
- W aplikacji mobilnej klucz będzie wyłącznie w sekretach Supabase (Edge Function).
- Emlove to nie terapia. W kryzysie: **116 123** (wsparcie emocjonalne) · **112** (zagrożenie życia).
