# Koło emocji w PWA — jak w aplikacji mobilnej

Zastępuje dotychczasowe koło (8 segmentów) wektorowym kołem 3-poziomowym,
identycznym z tym w aplikacji mobilnej.

---

## Pliki do wgrania

```
wheel-view.js            NOWY   — komponent koła (SVG)
wheel-reference.json     NOWY   — dane (z Emlove-ExpoGo/data/)
index.html               nadpisz
app.js                   nadpisz
style.css                nadpisz
sw.js                    nadpisz  (cache v23)
```

## Co jest w środku

| element | opis |
|---|---|
| 7 obszarów | Słaby, Lękliwy, Rozgniewany, Zniesmaczony, Smutny, Szczęśliwy, Zaskoczony |
| środek | ♥ Łaska |
| 41 grup | pierścień wewnętrzny |
| 82 słowa | pierścień zewnętrzny |
| 123 ścieżki SVG | zweryfikowane — zero błędów geometrii |

## Jak działa

```
koło główne (7 wycinków)
   └─ klik w obszar → koło szczegółowe
        ├─ pierścień grup (promień 64–140)
        └─ pierścień słów (promień 140–230)
             └─ klik w słowo → karta refleksji
```

Etykiety są obracane radialnie — czyta się je od środka, tak jak na oryginale.

## Źródło danych

`wheel-reference.json` to **ten sam plik**, który czyta aplikacja mobilna:

```ts
import reference from '../../data/wheel-reference.json';
```

Dzięki temu koło w PWA i na telefonie są identyczne. Zmiana w jednym miejscu
wymaga aktualizacji obu — ale treść się nie rozjedzie.

## Fallback

Gdyby `wheel-reference.json` nie istniał, `wheel-view.js` wywołuje
`window.legacyWheel()` — czyli dotychczasowe koło 8-segmentowe.
Aplikacja nie pokaże pustego ekranu.

## Stary skan — usunięty

`wheel-reference.jpg` nie jest już ani renderowany, ani cache'owany.
**Usuń go z repo** `3lmov3/emlove` — to ~830 KB, które nic już nie robią.

Po usunięciu wgraj ponownie `sw.js` (cache v23), żeby service worker
przestał próbować pobierać plik, którego nie ma.

---

## Uwaga do danych

W obszarze **Smutny** grupa „Zraniony" występuje **dwukrotnie**
(raz z „prześladowany, słabowity", raz z „rozczarowany, zlekceważony").
To tak samo jest w aplikacji mobilnej — komponent obsługuje to poprawnie,
bo identyfikatory są nadawane po indeksie, nie po nazwie.

Jeśli to literówka w oryginale, popraw ją w `data/wheel-reference.json`
w `Emlove-ExpoGo` i skopiuj do obu miejsc.
