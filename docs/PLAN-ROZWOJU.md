# PLAN ROZWOJU — KREDYT (Kalkulator Kredytu Hipotecznego)

**Data:** 2026-06-15
**Branch:** `plan-rozwoju`
**Status:** Plan zatwierdzony, oczekuje na implementację
**Cel:** Rozbudowa strony bez psucia istniejącej funkcjonalności i reklam Google AdSense

---

## SPIS TREŚCI

1. [Analiza obecnej struktury](#1-analiza-obecnej-struktury)
2. [Problemy użytkowników — research](#2-problemy-użytkowników--research)
3. [Plan zmian — podział na fazy](#3-plan-zmian--podział-na-fazy)
4. [Faza 0 — Quick Wins (P0)](#4-faza-0--quick-wins-p0)
5. [Faza 1 — Nowe narzędzia wysokiej wartości (P1)](#5-faza-1--nowe-narzędzia-wysokiej-wartości-p1)
6. [Faza 2 — Ulepszenia istniejących narzędzi (P2)](#6-faza-2--ulepszenia-istniejących-narzędzi-p2)
7. [Faza 3 — Treści edukacyjne (P3)](#7-faza-3--treści-edukacyjne-p3)
8. [Faza 4 — UX i utrzymanie (P4)](#8-faza-4--ux-i-utrzymanie-p4)
9. [Nowa architektura nawigacji](#9-nowa-architektura-nawigacji)
10. [Szczegółowa specyfikacja Payment Comparison](#10-szczegółowa-specyfikacja-payment-comparison)
11. [Decyzja: Odsetki dzienne](#11-decyzja-odsetki-dzienne)
12. [Harmonogram wdrożenia](#12-harmonogram-wdrożenia)

---

## 1. ANALIZA OBECNEJ STRUKTURY

### Obecny flow (Hub → "KROK 1-8")

| # | Narzędzie | Ścieżka | Typ |
|---|-----------|---------|-----|
| 1 | Zdolność kredytowa | `/zdolnosc-kredytowa/` | Kalkulator |
| 2 | Kalkulator raty | `/kalkulator-raty-kredytu/` | Kalkulator |
| 3 | Raty równe vs malejące | `/raty-rowne-czy-malejace/` | Kalkulator |
| 4 | Symulacja WIBOR | `/symulacja-wibor/` | Kalkulator |
| 5 | Odsetki dzienne | `/odsetki-dzienne/` | Kalkulator |
| 6 | Symulator nadpłat | `/symulator-nadplat/` | Kalkulator |
| 7 | Refinansowanie | `/refinansowanie-kredytu/` | Kalkulator |
| 8 | Porównanie banków | `/porownanie-ofert-bankow/` | Kalkulator |
| — | FAQ | `/faq-kredyt-hipoteczny/` | Informacja |
| — | 12 artykułów edukacyjnych | `/:topicSlug/` | Treść |

### Co jest dobre:
- Zdolność kredytowa jako pierwszy krok → naturalne
- Kalkulator raty jako rdzeń → słusznie
- Porównanie banków na końcu → logiczne
- Jakość kodu, testy (75), architektura → solidna

### Co wymaga poprawy:

| Problem | Konsekwencja |
|---------|-------------|
| **Kroki 1-8 sugerują liniowość** | User nie przechodzi przez nie sekwencyjnie |
| **Payment Comparison bierze dane z kalkulatora, ale nie informuje skąd** | User nie wie, że parametry są z kalkulatora głównego |
| **Brak kalkulatora LTV/wkładu własnego** | Jest w ResultsCard, ale brak samodzielnej strony |
| **Brak porównania stałe vs zmienne** | Kluczowa decyzja, jest tylko w FAQ (pytanie #6) |
| **Odsetki dzienne — niszowe, ale ważne** | Pozycja w nawigacji nie oddaje wagi (tysiące zł różnicy) |
| **12 artykułów edukacyjnych ukrytych** | Są pod dynamicznymi slugami, brak ekspozycji na hubie |
| **NavBar ma 10 pozycji** | Przeładowanie, user traci orientację |

---

## 2. PROBLEMY UŻYTKOWNIKÓW — RESEARCH

### 2.1. Czego banki nie mówią (Hidden Costs)
1. **Prowizja 0% ≠ brak kosztów** — wyższa marża lub drogie ubezpieczenie w zamian
2. **Ubezpieczenie można znaleźć taniej samodzielnie** — bank nie informuje o tym
3. **WIBOR zmienny — ryzyko +50-100% raty** — historia 2021-2022 pokazała skalę
4. **RRSO vs oprocentowanie nominalne** — nikt nie tłumaczy różnicy w prosty sposób
5. **Front-loading odsetek** — pierwsze 10 lat to głównie odsetki, nie kapitał
6. **Koszty utrzymania nieruchomości** — 1-4% wartości rocznie, kompletnie pomijane
7. **act/365 vs act/360** — różnica ~1.39% odsetek rocznie przy kredycie 400k = kilka tys. zł

### 2.2. Czego użytkownicy nie rozumieją (Calculation Confusion)
1. **Wzór na ratę** — czarna skrzynka, chcą zobaczyć jak działa
2. **Amortyzacja** — dlaczego na początku spłacam głównie odsetki
3. **WIBOR 3M vs 6M** — co oznacza dla raty w praktyce
4. **DTI/DSTI** — jaki procent dochodu może iść na ratę
5. **Stałe vs zmienne** — trade-offy, nie ma prostej odpowiedzi

### 2.3. Problemy ze zdolnością (Scoring Issues)
1. **PayPo/BNPL obniża zdolność** — mało kto wie, że AllegroPay widać w BIK
2. **Nieużywane karty kredytowej** — limit 10k = -kilkaset zł zdolności
3. **B2B vs UoP** — jak banki liczą dochód, bufory
4. **Częste składanie wniosków** — 3+ w krótkim czasie = problem
5. **BIK — brak transparentności** — co tam widać, jak sprawdzić

---

## 3. PLAN ZMIAN — PODZIAŁ NA FAZY

Struktura faz oparta na priorytetach:
- **P0** (Faza 0) — Krytyczne poprawki flow i UX
- **P1** (Faza 1) — Nowe narzędzia wysokiej wartości
- **P2** (Faza 2) — Ulepszenia istniejących narzędzi
- **P3** (Faza 3) — Treści edukacyjne
- **P4** (Faza 4) — UX i utrzymanie

---

## 4. FAZA 0 — QUICK WINS (P0)

### 4.1. Przebudowa Huba na fazy/filary

**Opis:** Zastąpienie liniowych "KROK 1-8" podziałem na fazy.

**Struktura nowego Huba:**

```
📋 FAZA 1: SPRAWDŹ (Ile mogę dostać? Ile zapłacę?)
  ├── Zdolność kredytowa
  ├── Kalkulator raty
  ├── LTV / wkład własny (NOWY)
  └── Raty równe czy malejące

📊 FAZA 2: SYMULUJ (A co jeśli?)
  ├── Symulacja WIBOR
  ├── Symulator nadpłat
  └── Odsetki dzienne

🎯 FAZA 3: PORÓWNAJ (Gdzie jest najlepiej?)
  ├── Porównanie banków
  ├── Refinansowanie
  └── Stałe vs zmienne oprocentowanie (NOWY)

📖 FAZA 4: PRZYGOTUJ SIĘ (Edukacja)
  ├── Ukryte koszty kredytu
  ├── BIK / scoring
  ├── Lista kontrolna (dokumenty)
  └── Artykuły i poradniki
```

**Pliki do zmiany:**
- `src/pages/HubPage.tsx` — przebudowa siatki narzędzi
- `src/index.css` — ewentualne nowe style dla faz

**Zasada:** Nie usuwać żadnych istniejących ścieżek. Stare linki nadal działają.

### 4.2. Payment Comparison — transparentne źródło danych

**Problem:** Strona `/raty-rowne-czy-malejace/` pobiera parametry z kalkulatora głównego przez `LoanCalculatorContext`, ale user nie widzi skąd te wartości pochodzą.

**Rozwiązanie (wybrane: Banner + link + edycja inline):**

```
┌─────────────────────────────────────────────────────────────┐
│  📎 Wartości pobrane z kalkulatora głównego                 │
│                                                             │
│  Kwota: 400 000 PLN  |  Oprocentowanie: 7.85%  |  Okres: 25 lat │
│                                                             │
│  [Edytuj parametry]  [← Zmień w kalkulatorze]              │
└─────────────────────────────────────────────────────────────┘
```

Kliknięcie "Edytuj parametry" rozwija formularz inline z polami:
- Kwota kredytu (number)
- Oprocentowanie (number, z rozpiską WIBOR + marża)
- Okres (number)

**Pliki do zmiany:**
- `src/components/calculators/PaymentComparison.tsx` — dodać źródło danych
- `src/pages/PaymentComparisonPage.tsx` — zmienić props na opcjonalne

**Szczegóły techniczne:**
- Gdy user wejdzie z kalkulatora → pokazuje wartości z contextu + banner
- Gdy user wejdzie bezpośrednio → pokazuje domyślne + banner "Wprowadź dane"
- Po edycji inline → zapisać w sessionStorage, nie wpływać na główny kalkulator

### 4.3. Samodzielny kalkulator LTV/wkładu własnego

**Opis:** Logika już istnieje w `ResultsCard.tsx`. Wyodrębnić do osobnej strony.

**Nowa ścieżka:** `/ltv-kalkulator/`

**Zawartość:**
- Wartość nieruchomości (input)
- Kwota kredytu (input)
- Wynik: LTV (%), wkład własny (PLN i %)
- Suwak "jaki % wkładu chcesz mieć?" → pokazuje wymaganą kwotę
- Edukacyjny alert: co oznacza LTV > 80% (ubezpieczenie niskiego wkładu)

**Pliki do utworzenia:**
- `src/components/calculators/LTVCalc.tsx`
- `src/pages/LTVPage.tsx`

**Pliki do zmiany:**
- `src/App.tsx` — dodać route
- `src/components/layout/NavBar.tsx` — dodać link (lub w dropdown)
- `src/components/layout/Footer.tsx` — dodać link
- `src/pages/HubPage.tsx` — dodać kartę
- `prerender.js` — dodać route do prerenderowania

### 4.4. Porównanie stałe vs zmienne oprocentowanie

**Opis:** Samodzielne narzędzie, nie tylko FAQ.

**Nowa ścieżka:** `/stale-vs-zmienne-oprocentowanie/`

**Zawartość:**
- Dwa kalkulatory obok siebie (stałe na 5 lat vs zmienne przez cały okres)
- Parametry: kwota, okres, marża dla zmiennego, marża dla stałego
- Wynik: rata dla obu, koszt całkowity, koszt odsetek
- Alert: "Po 5 latach stałe przechodzi na zmienne — rata może wzrosnąć"
- Podpowiedź: "Kiedy stałe ma sens? Kiedy zmienne?"

**Pliki do utworzenia:**
- `src/components/calculators/FixedVsVariableCalc.tsx`
- `src/pages/FixedVsVariablePage.tsx`
- `src/utils/fixedVsVariable.ts` — logika porównania

**Pliki do zmiany:**
- `src/App.tsx` — route
- `src/components/layout/NavBar.tsx` — link
- `src/components/layout/Footer.tsx` — link
- `src/pages/HubPage.tsx` — karta
- `prerender.js` — prerender

---

## 5. FAZA 1 — NOWE NARZĘDZIA WYSOKIEJ WARTOŚCI (P1)

### 5.1. Interaktywna lista "Ukryte koszty kredytu"

**Nowa ścieżka:** `/ukryte-koszty-kredytu/`

**Opis:** Kompleksowa checklista tego, co banki często pomijają w rozmowach.

**Zawartość:**
- 20+ pozycji z kategoriami (koszty startowe, roczne, ukryte w umowie, kary)
- Każda pozycja: nazwa, opis, szacunkowa kwota, czy można uniknąć
- Checkboxy: "Już wiem", "Uwzględnij w kosztorysie"
- Opcja "generuj raport" (listę do wydrukowania)
- Integracja z kalkulatorem raty (dodaje koszty do całkowitych)

**Lista pozycji (do opracowania merytorycznego):**
1. Prowizja banku (0-3%)
2. Wycena nieruchomości (400-1000 zł)
3. Notariusz (1500-3000 zł)
4. PCC 2% (rynek wtórny)
5. Wpis do księgi wieczystej (200 zł + 19 zł PCC)
6. Ubezpieczenie pomostowe (3 miesiące, ~300 zł/mc)
7. Ubezpieczenie niskiego wkładu (UNWW)
8. Ubezpieczenie nieruchomości (od ognia, zdarzeń losowych)
9. Ubezpieczenie na życie (często wymagane)
10. Prowadzenie rachunku (często 0 zł przy spełnieniu warunków)
11. Karta kredytowa do rachunku (często wymagana)
12. Opłata za wcześniejszą spłatę (0% po 1. roku przy zmiennym)
13. Opłata za zmianę warunków umowy (aneks)
14. Odsetki międzyokresowe (przy refinansowaniu)
15. Różnica act/365 vs act/360 (~1.39% więcej odsetek)
16. Opłata za wyciągi i zaświadczenia
17. Koszty windykacji i upomnień
18. Koszty utrzymania nieruchomości (1-4% wartości rocznie)
19. Remonty i wyposażenie (często pomijane w budżecie)
20. Media i opłaty administracyjne

### 5.2. Wykres amortyzacji — "Gdzie idzie Twoja rata?"

**Opis:** Wizualizacja harmonogramu spłat w głównym kalkulatorze.

**Zawartość:**
- Wykres słupkowy: każdy rok = jeden słupek, podział na odsetki (czerwony) i kapitał (zielony)
- Wykres kołowy: proporcja odsetek do kapitału w całym okresie
- Suwak: "Pokaż rok X" → szczegóły dla konkretnego roku
- Podsumowanie: "W pierwszych 10 latach zapłacisz X zł odsetek, a spłacisz tylko Y zł kapitału"

**Pliki do utworzenia:**
- `src/components/calculators/AmortizationChart.tsx` — komponent wykresu (CSS/svg, bez zewn. bibliotek)
- Wykorzystać istniejącą `generateAmortizationSchedule` z `loanCalculations.ts`

**Pliki do zmiany:**
- `src/components/ResultsCard.tsx` — dodać sekcję z wykresem

### 5.3. Symulator BIK / scoringu

**Nowa ścieżka:** `/co-wplywa-na-zdolnosc/`

**Opis:** Interaktywne narzędzie pokazujące, co wpływa na zdolność kredytową.

**Zawartość:**
- Lista czynników z przełącznikami (włącz/wyłącz):
  - "Mam nieużywaną kartę kredytową z limitem X"
  - "Mam raty (kredyt gotówkowy, telefon)"
  - "Mam PayPo / AllegroPay / inne BNPL"
  - "Pracuję na UoP / B2B / umowę zlecenie"
  - "Mam na utrzymaniu X osób"
  - "Mam X lat"
- Każdy przełącznik pokazuje: "Obniża zdolność o ~X PLN"
- Wynik: "Twoja szacunkowa zdolność to X — o Y mniej niż bez tych czynników"
- Porada: "Aby poprawić zdolność, rozważ: [lista]"

**Pliki do utworzenia:**
- `src/components/calculators/BIKSimulator.tsx`
- `src/pages/BIKSimulatorPage.tsx`
- `src/data/scoringFactors.ts` — dane o wpływie czynników

### 5.4. Koszt utrzymania nieruchomości (True Cost)

**Nowa ścieżka:** `/koszt-utrzymania-nieruchomosci/`

**Opis:** Kalkulator pokazujący, że kredyt to nie wszystko — utrzymanie to 1-4% wartości rocznie.

**Zawartość:**
- Wartość nieruchomości (input)
- Opcje: dom/mieszkanie, nowe/stare, metro/królewski/miasto/mieścina
- Wynik: miesięczny koszt utrzymania (media, remonty, fundusz remontowy, podatek)
- Całkowity koszt posiadania: rata + utrzymanie
- Zestawienie: "Kupno vs wynajem — co się opłaca?"

### 5.5. Lista kontrolna "Przygotowanie do kredytu"

**Nowa ścieżka:** `/przygotowanie-do-kredytu/`

**Opis:** Checklista z krokami do zrobienia przed złożeniem wniosku.

**Zawartość:**
- "Na 6 miesięcy przed": sprawdź BIK, zamknij zbędne karty, zbierz dokumenty
- "Na 3 miesiące przed": unikaj nowych zobowiązań, zbierz wyciągi
- "Na 1 miesiąc przed": wybierz bank, złóż wniosek
- Każdy krok z checkboxem, zapis stanu w localStorage

---

## 6. FAZA 2 — ULEPSZENIA ISTNIEJĄCYCH NARZĘDZI (P2)

### 6.1. Kalkulator raty — wykres amortyzacji

Szczegóły w sekcji 5.2. To ulepszenie istniejącego narzędzia, nie nowe.

### 6.2. WIBOR — dane historyczne i wykres

**Opis:** Pokazać historię WIBOR, aby user zrozumiał zmienność.

**Zawartość:**
- Wykres liniowy WIBOR 3M z ostatnich 10 lat
- Zaznaczone okresy: "stopy niskie (2020-2021)", "stopy wysokie (2022-2024)"
- Adnotacja: "W 2020 rata kredytu 400k = 1800 zł, w 2023 = 3200 zł"
- Dane: można serwować z rozszerzonego `public/wibor.json` (dodać historyczne)

**Pliki do zmiany:**
- `src/components/calculators/WiborSimulator.tsx` — dodać sekcję historyczną
- `public/wibor.json` — rozszerzyć o dane historyczne
- `.github/workflows/update-wibor.yml` — aktualizować też historyczne

### 6.3. Symulator nadpłat — wykres porównawczy

**Opis:** Wizualne porównanie "bez nadpłat" vs "z nadpłatami".

**Zawartość:**
- Dwa wykresy liniowe obok siebie: saldo kredytu w czasie
- "Bez nadpłat: spłata po 25 latach"
- "Z nadpłatami: spłata po X latach"
- Różnica zaznaczona kolorem

### 6.4. Zdolność kredytowa — bufor KNF

**Opis:** Pokazać zdolność przed i po buforze KNF (+2.5-3pp).

**Zawartość:**
- Dwie wartości: "Zdolność przed buforem" i "Zdolność po buforze"
- Wyjaśnienie: "KNF wymaga, aby bank sprawdził, czy poradzisz sobie ze wzrostem stóp"
- Obecnie w `bankComparison.ts` jest już bufor KNF — przenieść logikę do affordability

### 6.5. Porównanie banków — filtry

**Opis:** Filtrowanie ofert banków po parametrach.

**Zawartość:**
- Filtry: max LTV, min/max marża, prowizja, wymagane ubezpieczenie
- Sortowanie: po koszcie całkowitym, marży, RRSO

---

## 7. FAZA 3 — TREŚCI EDUKACYJNE (P3)

### 7.1. Nowe artykuły tematyczne

| # | Slug | Tytuł | Uzasadnienie |
|---|------|-------|-------------|
| 1 | `paypo-a-zdolnosc-kredytowa` | Czy PayPo obniża zdolność kredytową? | Najczęstsze pytanie na forach |
| 2 | `kredyt-na-b2b` | Kredyt hipoteczny na B2B — jak się przygotować? | Drugie najczęstsze pytanie |
| 3 | `koszty-utrzymania-nieruchomosci` | Koszty utrzymania mieszkania i domu — kompletny przewodnik | Kompletnie pomijany temat |
| 4 | `harmonogram-splat-jak-czytac` | Jak czytać harmonogram spłat kredytu? | Ludzie nie rozumieją front-loadingu |
| 5 | `wakacje-kredytowe` | Wakacje kredytowe — czy warto? Dla kogo? | Aktualny temat |
| 6 | `inflacja-a-kredyt` | Inflacja a kredyt hipoteczny — kto zyskuje, kto traci? | Edukacja makroekonomiczna |

### 7.2. Sekcja "Mity kredytowe"

**Ścieżka:** `/mity-kredytowe/`

**Lista mitów (na podstawie researchu):**

| Mit | Prawda |
|-----|--------|
| "Musisz mieć 20% wkładu własnego" | Możliwe 10% z ubezpieczeniem niskiego wkładu |
| "Stałe oprocentowanie jest zawsze lepsze" | Zależy — przy spadku stóp tracisz |
| "Długa historia kredytowa jest niezbędna" | Brak historii jest lepszy niż zła |
| "Kredyt hipoteczny to najtańszy pieniądz na rynku" | Przy RRSO 7-8% to nieprawda |
| "Niższe oprocentowanie = tańszy kredyt" | Nie, jeśli prowizja i ubezpieczenia są wyższe |
| "Bank rzetelnie liczy zdolność" | Każdy bank liczy inaczej, różnice 30-50% |
| "WIBOR oznacza stałą ratę" | WIBOR = zmienne oprocentowanie |

---

## 8. FAZA 4 — UX I UTRZYMANIE (P4)

### 8.1. Export do PDF

**Opis:** Możliwość wygenerowania raportu z kalkulatora.

**Rozwiązanie:** Użyć `window.print()` z odpowiednimi stylami CSS `@media print`, ewentualnie biblioteka `html2pdf`.

### 8.2. Breadcrumbs

**Opis:** Nawigacja kontekstowa na każdej stronie.

**Przykład:** `Start > Narzędzia > Kalkulator raty`

### 8.3. Optymalizacja NavBar

**Opis:** Zmniejszenie liczby pozycji w navbarze z 10 do 7 + dropdown.

**Nowa struktura:**

```
[Start] [Sprawdź ▾] [Symuluj ▾] [Porównaj ▾] [Edukacja] [FAQ]
          ├ Zdolność    ├ WIBOR       ├ Banki
          ├ Kalkulator  ├ Nadpłaty    ├ Refinansowanie
          ├ LTV         └ Odsetki     └ Stałe vs zmienne
          └ Typy rat
```

### 8.4. Porównanie dwóch ofert (side-by-side)

**Opis:** Alternatywny widok do tabeli — szybkie porównanie dwóch ofert obok siebie.

### 8.5. CTA "Zacznij od zdolności" na stronie głównej

**Opis:** Obok obecnego "Oblicz ratę" i "Sprawdź zdolność" dodać trzeci, bardziej kierunkowy.

---

## 9. NOWA ARCHITEKTURA NAWIGACJI

### 9.1. NavBar (docelowo)

```
[Start] [Sprawdź ▾] [Symuluj ▾] [Porównaj ▾] [Edukacja] [FAQ]
```

Na mobile: hamburger z pełną listą (jak teraz, ale pogrupowaną).

### 9.2. Hub (docelowo)

```
┌──────────────────────────────────────────────────────────────┐
│              Kalkulator Kredytu Hipotecznego                  │
│        Sprawdź ratę, zdolność i koszty w 30 sekund           │
│                                                               │
│  [Oblicz ratę]    [Sprawdź zdolność]    [Zacznij od LTV]     │
│                                                               │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  📋 FAZA 1: SPRAWDŹ                                           │
│  Ile możesz dostać? Ile zapłacisz?                            │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Zdolność      │  │ Kalkulator   │  │ LTV / wkład  │        │
│  │ kredytowa     │  │ raty + RRSO  │  │ własny       │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
│  📊 FAZA 2: SYMULUJ                                           │
│  A co jeśli?                                                  │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Symulacja    │  │ Nadpłaty     │  │ Odsetki      │        │
│  │ WIBOR        │  │ symulator    │  │ dzienne      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
│  🎯 FAZA 3: PORÓWNAJ                                          │
│  Gdzie jest najlepiej?                                        │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Porównanie   │  │ Refinan-     │  │ Stałe vs     │        │
│  │ banków       │  │ sowanie      │  │ zmienne      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
│  📖 FAZA 4: PRZYGOTUJ SIĘ                                     │
│  Zanim pójdziesz do banku...                                 │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ Co wpływa na │  │ Ukryte       │  │ Lista        │        │
│  │ zdolność?    │  │ koszty       │  │ kontrolna    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 9.3. Mapa wszystkich ścieżek (docelowo)

| Ścieżka | Strona | Faza |
|---------|--------|------|
| `/` | Hub | — |
| `/zdolnosc-kredytowa/` | Zdolność kredytowa | Faza 1 |
| `/kalkulator-raty-kredytu/` | Kalkulator raty | Faza 1 |
| `/ltv-kalkulator/` | LTV / wkład własny **NOWA** | Faza 1 |
| `/raty-rowne-czy-malejace/` | Raty równe vs malejące | Faza 1 |
| `/symulacja-wibor/` | Symulacja WIBOR | Faza 2 |
| `/symulator-nadplat/` | Symulator nadpłat | Faza 2 |
| `/odsetki-dzienne/` | Odsetki dzienne | Faza 2 |
| `/porownanie-ofert-bankow/` | Porównanie banków | Faza 3 |
| `/refinansowanie-kredytu/` | Refinansowanie | Faza 3 |
| `/stale-vs-zmienne-oprocentowanie/` | Stałe vs zmienne **NOWA** | Faza 3 |
| `/ukryte-koszty-kredytu/` | Ukryte koszty **NOWA** | Faza 4 |
| `/co-wplywa-na-zdolnosc/` | BIK/scoring **NOWA** | Faza 4 |
| `/przygotowanie-do-kredytu/` | Lista kontrolna **NOWA** | Faza 4 |
| `/koszt-utrzymania-nieruchomosci/` | True Cost **NOWA** | Faza 4 |
| `/mity-kredytowe/` | Mity kredytowe **NOWA** | Faza 4 |
| `/faq-kredyt-hipoteczny/` | FAQ | — |
| `/:topicSlug/` | Artykuły (12+6 nowych) | — |
| `/o-projekcie/` | O projekcie | — |
| `/metodologia/` | Metodologia | — |
| `/kontakt/` | Kontakt | — |
| `/polityka-prywatnosci/` | Polityka prywatności | — |

---

## 10. SZCZEGÓŁOWA SPECYFIKACJA — PAYMENT COMPARISON

### 10.1. Obecny stan

```tsx
// App.tsx
<PaymentComparisonPage
  loanAmount={Number(getValues().principal) || 400000}
  annualRate={Number(getValues().wibor || 5.85) + Number(getValues().margin || 2)}
  loanTermYears={Number(getValues().years) || 25}
/>
```

User widzi napis "Dla wybranej kalkulacji: 400 000 zł na 25 lat" w `contextInfo`, ale nie wie skąd te wartości pochodzą.

### 10.2. Rozwiązanie docelowe

**Komponent źródła danych** — nowy komponent `DataSourceBanner`:

```
┌─────────────────────────────────────────────────────────────────┐
│ 📎 Wartości pobrane z kalkulatora głównego                      │
│                                                                  │
│ Kwota kredytu:  400 000 PLN                                     │
│ Oprocentowanie: 7.85% (WIBOR 5.85% + marża 2.00%)              │
│ Okres:          25 lat                                          │
│                                                                  │
│ [Edytuj] [← Kalkulator główny]                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Po kliknięciu "Edytuj"** — formularz inline:

```
┌─────────────────────────────────────────────────────────────────┐
│ 📎 Wartości pobrane z kalkulatora głównego                      │
│                                                                  │
│ Kwota kredytu: [400000] PLN                                     │
│ Oprocentowanie: [7.85] %  (lub WIBOR [5.85] + marża [2.00])    │
│ Okres:          [25] lat                                        │
│                                                                  │
│ [Zastosuj] [Reset]                                              │
└─────────────────────────────────────────────────────────────────┘
```

**Zachowanie:**
1. Gdy user wchodzi z kalkulatora → pokazuje wartości z contextu + pasek "z kalkulatora"
2. Gdy user wchodzi bezpośrednio (URL, zakładka) → pokazuje domyślne + przycisk "Przejdź do kalkulatora"
3. Edycja inline zapisuje do stanu lokalnego komponentu (nie wpływa na główny kalkulator)
4. Przycisk "← Kalkulator główny" → link do `/kalkulator-raty-kredytu/`

### 10.3. Pliki do zmiany

- `src/components/calculators/PaymentComparison.tsx`
  - Dodać `DataSourceBanner` na górze
  - Zmienić props: sourceValues (opcjonalne) + fallbackValues
  - Dodać state dla edycji inline
- `src/pages/PaymentComparisonPage.tsx`
  - Dostosować do nowych propsów
- `src/components/shared/DataSourceBanner.tsx` — NOWY
  - Komponent uniwersalny, może być używany też przez WiborSimulator i inne

---

## 11. DECYZJA: ODSETKI DZIENNE

### 11.1. Analiza krytyczna

**Argumenty za przeniesieniem (poprzednia wersja planu):**
- Niszowe narzędzie, nie jest "krokiem" w procesie decyzyjnym
- Za dużo pozycji w NavBar

**Argumenty za pozostawieniem (po krytycznej analizie):**
- Różnica act/365 vs act/360 = ~1.39% więcej odsetek rocznie
- Przy kredycie 400k na 25 lat to tysiące złotych
- Odsetki międzyokresowe przy refinansowaniu = realne pieniądze
- Userzy często nie wiedzą, że bank nalicza odsetki codziennie
- Unikalna wartość — żaden polski kalkulator kredytowy tego nie ma

### 11.2. Decyzja

**ZOSTAJE, ale zmienia pozycję:**

1. Nie jest już "KROK 5" na hubie (znikają kroki, są fazy)
2. W NavBar ląduje w dropdown "Symuluj" (nie główny poziom)
3. Treść pozostaje bez zmian — narzędzie jest wartościowe
4. Dodać więcej kontekstu: "Czy wiesz, że banki mogą naliczać odsetki na dwa sposoby? Różnica to tysiące złotych."

**Pozycja w nowej strukturze:**
- Faza "Symuluj" (obok WIBOR i nadpłat)
- W dropdown "Symuluj ▾" w NavBar

---

## 12. HARMONOGRAM WDROŻENIA

### Założenia:
- Prace w gałęzi `plan-rozwoju` (plan) → potem merge do `main` lub nowa gałąź implementacyjna
- Każda faza kończy się: lint + test + build + weryfikacja manualna
- Google AdSense — nie ruszamy żadnych plików związanych z reklamami
- Wszystkie testy (75) muszą przechodzić przed merge

### Faza 0 — Quick Wins (P0)

| Krok | Co | Czas | Zależności |
|------|-----|------|-----------|
| 0.1 | Payment Comparison — banner + edycja inline | 4h | — |
| 0.2 | LTV kalkulator (nowa strona) | 3h | 0.1 (można równolegle) |
| 0.3 | Stałe vs zmienne — porównanie | 6h | 0.2 |
| 0.4 | Przebudowa Huba na fazy | 4h | 0.1, 0.2, 0.3 |
| **Razem** | | **~17h** | |

### Faza 1 — Nowe narzędzia (P1)

| Krok | Co | Czas | Zależności |
|------|-----|------|-----------|
| 1.1 | Lista "Ukryte koszty" | 6h | — |
| 1.2 | Wykres amortyzacji w ResultsCard | 5h | — |
| 1.3 | Symulator BIK/scoringu | 6h | — |
| 1.4 | True Cost — koszt utrzymania | 4h | — |
| 1.5 | Lista kontrolna do kredytu | 4h | — |
| **Razem** | | **~25h** | |

### Faza 2 — Ulepszenia (P2)

| Krok | Co | Czas | Zależności |
|------|-----|------|-----------|
| 2.1 | WIBOR — dane historyczne + wykres | 4h | — |
| 2.2 | Nadpłaty — wykres porównawczy | 3h | — |
| 2.3 | Zdolność — bufor KNF | 2h | — |
| 2.4 | Banki — filtry | 3h | — |
| **Razem** | | **~12h** | |

### Faza 3 — Treści (P3)

| Krok | Co | Czas | Zależności |
|------|-----|------|-----------|
| 3.1 | 6 nowych artykułów | 6h | — |
| 3.2 | Sekcja "Mity kredytowe" | 3h | — |
| **Razem** | | **~9h** | |

### Faza 4 — UX (P4)

| Krok | Co | Czas | Zależności |
|------|-----|------|-----------|
| 4.1 | Export do PDF | 4h | — |
| 4.2 | Breadcrumbs | 2h | — |
| 4.3 | Optymalizacja NavBar | 2h | Faza 0.4 |
| 4.4 | Porównanie 2 ofert | 3h | — |
| 4.5 | Nowe CTA na hubie | 1h | Faza 0.4 |
| **Razem** | | **~12h** | |

### Łączny czas: ~75h

---

## ZASADY WDROŻENIA

1. **Nie psujemy reklam** — nie ruszamy `AdSlot.tsx`, `adsbygoogle`, `ads.txt`, AdSense ID
2. **Nie psujemy istniejących ścieżek** — stare URL-e muszą działać (przekierowania 301 jeśli zmieniamy)
3. **Nie psujemy testów** — przed każdym commitem: `npm test` (75 testów zielonych)
4. **Nie psujemy builda** — przed każdym commitem: `npm run build` (SSR + prerender)
5. **Nowe gałęzie** — każda faza w osobnej gałęzi, merge do `develop` po weryfikacji
6. **Inkrementalność** — każdy commit = działająca aplikacja

---

*Koniec dokumentu PLAN-ROZWOJU.md*
