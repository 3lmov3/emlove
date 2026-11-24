# Treść comiesięczna — jak to działa

Od teraz zadania i symulacje **nie siedzą w kodzie**. Wgrywasz jeden plik JSON raz w miesiącu.

---

## Struktura

```
content/
├── manifest.json              ← lista aktywnych paczek
└── packs/
    ├── 2026-11.json           ← paczka listopada
    └── 2026-12.json           ← paczka grudnia
```

---

## Jak dodać nowy miesiąc

### Krok 1 — napisz treść

Skopiuj `content/packs/2026-12.SZABLON.json`, zmień nazwę na np. `2026-12.json`.

Każdy scenariusz musi mieć **dokładnie 4 pytania**, każde z **4 opcjami**.
**Poprawna odpowiedź zawsze pierwsza** — silnik sam losuje kolejność.

```json
{
  "id": "2026-12",
  "scenarios": [
    {
      "id": "twoj-id-1",
      "title": "Krótki tytuł",
      "story": "Opis sytuacji zwykłym językiem.",
      "qs": [
        ["Pytanie najłatwiejsze?", ["Poprawna", "Zła", "Zła", "Zła"]],
        ["Pytanie 2?",            ["Poprawna", "Zła", "Zła", "Zła"]],
        ["Pytanie 3?",            ["Poprawna", "Zła", "Zła", "Zła"]],
        ["Pytanie najtrudniejsze?", ["Poprawna", "Zła", "Zła", "Zła"]]
      ]
    }
  ],
  "rozroznij": [ … ],
  "simulations": [ … ]
}
```

### Krok 2 — dopisz do manifestu

`content/manifest.json`:

```json
{
  "version": "2026-11",
  "packs": ["2026-11", "2026-12"]
}
```

Paczki **kumulują się** — stary miesiąc zostaje w puli, nowy się dokłada.

### Krok 3 — wgraj na GitHub

Dwa pliki: `content/manifest.json` i `content/packs/2026-12.json`.
**Kod aplikacji zostaje nietknięty.**

---

## Co się dzieje u użytkownika

| sytuacja | efekt |
|---|---|
| pierwszy raz po aktualizacji | pobiera manifest + paczkę, dokłada do puli |
| kolejne wejścia | czyta z cache, nie pobiera ponownie |
| offline | dane wbudowane + to, co już zcache'ował |
| błąd w paczce | pomija ją, reszta działa |

---

## Zasady treści

**Scenariusz**
- `id` — unikalny, po nim rozpoznaje duplikaty
- `story` — 2–4 zdania, **zwykły język, bez terminów**
- `qs` — **dokładnie 4**, od najłatwiejszego do najtrudniejszego
- poziom 1 bierze pierwsze 2, poziom 2 pierwsze 3, poziom 3 wszystkie 4

**Rozróżnij**
- 4 pytania, każde o 4 opcjach
- pytania o słowa z koła emocji

**Symulacja**
- `steps` — 3 kroki, każdy z 3 wyborami
- każdy wybór ma `t` (treść) i `next` (reakcja Milo)

---

## Co jest walidowane

Paczka zostaje **odrzucona w całości lub po elemencie**, gdy:

- scenariusz nie ma 4 pytań
- pytanie nie ma 4 opcji
- któraś opcja jest pusta
- brakuje `id`, `title` lub `story`
- symulacja nie ma kroków albo wybory nie mają reakcji

Odrzucone elementy są pomijane — reszta paczki działa.

---

## Limity

| | |
|---|---|
| rozmiar pojedynczej paczki | 400 KB |
| cache w localStorage | ~3 MB |

Przy 10 zadaniach miesięcznie paczka to ok. 15–20 KB — limity nie mają znaczenia.
