# Sprint 1 — Treści i struktura

## Faza S1.1 — Unikalne treści opisowe + daty publikacji

### Cel
Każda strona z kalkulatorem musi mieć:
1. Unikalną treść opisową (min. 300 słów) — kontekst, instrukcja, wskazówki
2. Datę publikacji i ostatniej aktualizacji (widoczną dla użytkownika i w structured data)
3. FAQ specyficzne dla danej strony (3-5 pytań)

### Strony do poprawy (8 stron)

| Ścieżka | Typ | Obecny stan |
|---------|-----|-------------|
| /kalkulator-raty-kredytu/ | Kalkulator raty | Tylko formularz, brak treści |
| /zdolnosc-kredytowa/ | Kalkulator zdolności | Tylko formularz, brak treści |
| /odsetki-dzienne/ | Kalkulator odsetek | Kopia strony głównej (przez _redirects) |
| /symulator-nadplat/ | Symulator nadpłat | Kopia strony głównej |
| /refinansowanie-kredytu/ | Kalkulator refinansowania | Kopia strony głównej |
| /porownanie-ofert-bankow/ | Porównanie banków | Kopia strony głównej |
| /raty-rowne-czy-malejace/ | Porównanie rat | Tylko formularz, brak treści |
| /symulacja-wibor/ | Symulacja WIBOR | Tylko formularz, brak treści |

### Struktura treści do dodania na każdej stronie
Przed komponentem kalkulatora, dodaj sekcję:

```tsx
<section className="prose max-w-none mb-8">
  <p className="text-lg text-gray-600">[Lead — 1-2 zdania wprowadzenia]</p>
  
  <h2 className="text-2xl font-bold mt-8 mb-4">Jak działa to narzędzie?</h2>
  <p>[2-3 akapity opisu]</p>
  
  <h2 className="text-2xl font-bold mt-8 mb-4">Wskazówki</h2>
  <ul>[3-5 porad]</ul>
  
  <p className="text-sm text-gray-400 mt-8">
    Ostatnia aktualizacja: <time datetime="2026-07-04">4 lipca 2026</time>
  </p>
</section>
```

### Testy do napisania (Tester)
1. **Dla każdej z 8 stron**: sprawdzić że strona zawiera sekcję z treścią opisową (min. 300 znaków tekstu)
2. **Dla każdej z 8 stron**: sprawdzić że strona zawiera datę publikacji/aktualizacji (`<time>` lub tekst "ostatnia aktualizacja")
3. **Dla każdej z 8 stron**: sprawdzić że strona ma sekcję FAQ (co najmniej 3 pytania)
4. **Test globalny**: sprawdzić że żadne 2 strony nie mają identycznej treści (hash porównawczy)

### Zadania dla agentów

#### 🔬 Researcher (zbiera dane dla Developera)
Dla każdej z 8 stron zbierz:
- Opis merytoryczny (2-3 akapity): czym jest to narzędzie, jak działa, dlaczego jest ważne
- 3-5 wskazówek eksperckich dla użytkownika
- 3-5 pytań FAQ z odpowiedziami
- Ostatnią aktualizację danych (kursy WIBOR, stopy procentowe itp.)

Zapisz wyniki w pliku: `.agent/research-content-s1.md`

#### 🧪 Tester (pisze testy PRZED kodem)
Na podstawie powyższej specyfikacji napisz testy w `src/__tests__/content-tests-s1.test.ts`.
Uruchom je — oczekiwany wynik: **FAIL** (bo treści jeszcze nie ma) — to jest TDD Red phase.
Raportuj wynik.

#### 🛠️ Developer (implementuje kod)
Po otrzymaniu treści od Researchera i testów od Testera:
1. Dodaj sekcję opisową do każdej z 8 stron (w plikach `src/pages/*.tsx`)
2. Dodaj datę publikacji/aktualizacji
3. Dodaj FAQ specyficzne dla strony (lub rozszerz istniejące)
4. Uruchom testy — oczekiwany wynik: **ALL PASS** (TDD Green)
5. Jeśli testy nie przechodzą — iteruj aż będą zielone

### Kolejność wykonania
1. Researcher zbiera dane → zapisuje do `.agent/research-content-s1.md`
2. Tester pisze testy → uruchamia → raportuje RED
3. Developer implementuje → uruchamia testy → iteruje aż GREEN
4. CEO (ja) weryfikuje i komituje

