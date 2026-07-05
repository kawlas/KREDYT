# KALKULATOR KREDYTU HIPOTECZNEGO — MASTER REFERENCE

**Version:** 3.1
**Status:** Phase 1 ✅ | Phase 2 ✅ | Phase 3 ✅
**Live URL:** https://kredytkalkulator.netlify.app/
**Last Updated:** 2026-07-05
**Autor:** Tony Halik — Ekspert rynku kredytowego

---

## 🎯 PROJECT VISION

Stwórz **najlepszy kalkulator kredytowy w Polsce**, który:
- Pokazuje PRAWDĘ o kosztach kredytu (nie ukrywa niczego)
- Rozwiązuje realne problemy kredytobiorców
- Jest intuicyjny i edukacyjny
- Przewyższa konkurencję funkcjonalnością

**Target Users:** Osoby planujące kredyt hipoteczny (first-time buyers + refinancing)

---

## 📊 CURRENT STATE (2026-07-05)

### Phase 1 — MVP ✅
- Kalkulator raty kredytu (równe/malejące) + RRSO + całkowity koszt
- Porównanie stałe vs zmienne
- Responsywny design + animacje

### Phase 2 — Enhanced Features ✅
- WIBOR Simulator z analizą ryzyka (3 strefy: zielony/żółty/czerwony)
- Kalkulator zdolności kredytowej z buforem KNF
- Porównanie rat równe vs malejące
- Symulator nadpłat
- Kalkulator LTV
- Ukryte koszty kredytu (checklista 20+ pozycji)
- Export PDF (jsPDF z danymi kalkulacji)
- Mity kredytowe — strona edukacyjna
- 6 nowych topiców (PayPo, B2B, wakacje, inflacja, koszty utrzymania, harmonogram)
- Strony: O projekcie, Polityka redakcyjna, Kontakt, FAQ
- Refinansowanie, stałe vs zmienne, odsetki dzienne

### Phase 3 — Enhanced Features ✅

| # | Feature | Status | Uwagi |
|---|---------|--------|-------|
| 1 | **E-E-A-T**: Autor Tony Halik (SEOHead + structured data + byline) | ✅ DONE | 4 testy |
| 2 | Homepage: rozszerzona treść (500+ słów) | ✅ DONE | |
| 3 | Autor w topicach + AboutPage + Editorial | ✅ DONE | |
| 4 | **Wykres porównania stałe vs zmienne** (SVG) | ✅ DONE | 5 testów |
| 5 | **Kalkulator prowizji bankowej** | ✅ DONE | 15 testów |
| 6 | **Kalkulator ubezpieczeń** (UNWW, życie, pomostowe, utrata pracy) | ✅ DONE | 18 testów |
| 7 | **Export CSV harmonogramu spłat** (Excel-compatible) | ✅ DONE | 16 testów |
| 8 | **Ciemny motyw** (class-based, localStorage, system preference) | ✅ DONE | 8 testów |
| 9 | **Kredyt vs Wynajem** (roczna tabela, break-even, net worth) | ✅ DONE | 12 testów |
| 10 | **Honestny kalkulator kredytu** (bez fałszywej tabeli) | ✅ DONE | 12 testów |

> **Task 10 — historia:** Pierwotnie zaimplementowano jako tabelę porównawczą banków z automatycznie pobieranymi marżami. Po odkryciu, że:
> - marże są zmyślone
> - nazwy banków nieaktualne (ING Bank Śląski, Santander)
> - linki weryfikacyjne nie działają
> - nie istnieje API do marż banków w Polsce
> 
> **Usunięto całą tabelę i zastąpiono uczciwym kalkulatorem:** użytkownik wpisuje własną marżę, kalkulator liczy ratę + całkowity koszt + KNF stress test. WIBOR pobierany live ze stooq.pl. Linki do realnych porównywarek (Bankier.pl, TotalMoney.pl).

### Narzędzia utrzymaniowe (Phase 3 — dodatkowe)

| # | Feature | Status |
|---|---------|--------|
| 11 | **Skrypt `scripts/fetch-wibor.js`** — scrapuje WIBOR z Bankier.pl (static HTML) | ✅ DONE |
| 12 | **Skrypt `scripts/update-margins.cjs`** — interaktywna aktualizacja marż | ✅ DONE |
| 13 | **Netlify function `wibor.ts`** — live WIBOR ze stooq.pl | ✅ DONE |
| 14 | **npm scripts**: `update-margins`, `check-margins` | ✅ DONE |
| 15 | **Unifikacja CSS** — jeden globalny styl `space-y-8` na wszystkich stronach | ✅ DONE |

---

## 🧪 TESTING METHODOLOGY & STRATEGY

### Filozofia: TDD-first, E2E-gap, Monitoring-live

Opieramy się na wywiadzie z Kentem Beckiem (twórcą TDD) oraz własnym doświadczeniu.

### 🥇 Primary: Test-Driven Development (TDD)

**Cykl:** RED (napisz test) → GREEN (zaimplementuj) → REFACTOR (popraw)

**Gdzie TDD sprawdza się najlepiej:**
| Warstwa | Metoda | Przykład |
|---------|--------|----------|
| **Utility/logika biznesowa** | TDD 🔴🟢🔵 | `commissionCalc.ts`, `rentVsBuy.ts`, `insuranceCalc.ts` |
| **Komponenty React** | Testy po fakcie (render + interakcje) | `CommissionCalc.tsx`, `CsvExportButton.tsx` |
| **Strony (Page)** | Smoke test (nie rzuca błędem) | `CommissionPage.tsx` |

**Dlaczego TDD?**
1. **Kalkulatory to matematyka** — test mówi natychmiast, czy wzór jest dobry
2. **Refaktor bez strachu** — zmiana wrappera? 760 testów mówi: „lecisz dalej"
3. **Dokumentacja, która nie dezaktualizuje** — test `'oblicza UNWW gdy LTV > 80%'` jest lepszy niż komentarz

### 🥈 Gap: End-to-End (Planowane)

Obecnie brak E2E. Planujemy 3 krytyczne ścieżki z Playwright:
1. **Kalkulator raty** → wypełnij formularz → rata się pojawiła
2. **Nawigacja** → kliknij sidebar → strona się załadowała
3. **404** → zła ścieżka → strona błędu

### 🥉 Live: Monitoring + Observability
- Konsola przeglądarki (errors, warnings)
- Netlify Analytics (planowane)
- Automatyczny rollback w przypadku błędów

---

## 📊 TEST METRICS

| Metryka | Wartość |
|---------|---------|
| **Pliki testowe** | 60 |
| **Testy (wszystkie zielone)** | 760 |
| **Pokrycie utility** | ~95% |
| **Pokrycie komponentów** | ~85% |
| **Czas wykonania** | ~8s |
| **Ostatni test** | 760 passed, 0 failed ✅ |

---

## 🏗️ ARCHITEKTURA (v3.1)

```
kredyt-kalkulator/
├── src/
│   ├── App.tsx                    # Routes + ThemeProvider + layout
│   │
│   ├── hooks/
│   │   ├── useLoanCalculator.ts
│   │   ├── useWIBOR.ts            # WIBOR live + fallback
│   │   └── useTheme.tsx           # Dark mode (localStorage + system pref)
│   │
│   ├── components/
│   │   ├── calculators/
│   │   │   ├── AffordabilityCalc.tsx
│   │   │   ├── PaymentComparison.tsx
│   │   │   ├── WiborSimulator.tsx
│   │   │   ├── OverpaymentCalc.tsx
│   │   │   ├── LTVCalculator.tsx
│   │   │   ├── FixedVsVariableCalc.tsx + FixedVsVariableChart.tsx
│   │   │   ├── CommissionCalc.tsx
│   │   │   ├── InsuranceCalc.tsx
│   │   │   ├── RentVsBuyCalc.tsx
│   │   │   ├── BankComparisonCalc.tsx  # Honestny kalkulator
│   │   │   ├── BankComparisonChart.tsx # 🗑️ Dead code
│   │   │   └── BIKSimulator.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── Card.tsx, Alert.tsx, Tooltip.tsx, Slider.tsx
│   │   │   ├── SEOHead.tsx           # E-E-A-T: Tony Halik
│   │   │   ├── ExportPdfButton.tsx
│   │   │   ├── CsvExportButton.tsx
│   │   │   └── ThemeToggle.tsx
│   │   │
│   │   └── layout/
│   │       ├── Sidebar.tsx
│   │       ├── NavBar.tsx
│   │       └── TabContainer.tsx
│   │
│   ├── utils/
│   │   ├── loanCalculations.ts    # AmortizationRow exported
│   │   ├── affordabilityFormulas.ts
│   │   ├── costBreakdown.ts
│   │   ├── formatters.ts
│   │   ├── fixedVsVariable.ts
│   │   ├── commissionCalc.ts
│   │   ├── insuranceCalc.ts
│   │   ├── csvExport.ts
│   │   ├── rentVsBuy.ts
│   │   ├── bankComparisonEnhanced.ts  # 🗑️ Dead code
│   │   └── exportPdf.ts
│   │
│   ├── pages/
│   │   ├── HubPage.tsx, CalculatorPage.tsx
│   │   ├── CommissionPage.tsx
│   │   ├── InsurancePage.tsx
│   │   ├── RentVsBuyPage.tsx
│   │   ├── BankComparisonPage.tsx     # Strona z honestnym kalkulatorem
│   │   ├── MityPage.tsx
│   │   └── TopicPage.tsx (autor byline + E-E-A-T)
│   │
│   └── data/
│       ├── bankProfiles.ts           # Tylko referencyjne dane banków
│       └── ...
│
├── scripts/
│   ├── fetch-wibor.js             # Scraper WIBOR z Bankier.pl
│   ├── update-margins.cjs         # Interaktywna aktualizacja marż
│   └── fetch-bank-offers.js       # 🗑️ Próba scrapowania (SPA — nie działa)
│
├── netlify/functions/
│   ├── wibor.ts                   # Live WIBOR ze stooq.pl (używany)
│   └── bank-offers.ts             # 🗑️ Nieużywana
│
├── public/
│   └── bank-offers.json           # 🗑️ Nieużywany (były marże referencyjne)
│
├── tailwind.config.js             # darkMode: 'class'
└── prerender.js                   # Wszystkie strony prerenderowane
```

---

## 🔧 TECH STACK

| Technologia | Wersja | Użycie |
|-------------|--------|--------|
| React | ^18.2.0 | UI framework |
| TypeScript | ^5.0.0 | Typowanie |
| Vite | ^5.0.0 | Build tool |
| Tailwind CSS | ^3.4.0 + darkMode: 'class' | Styling |
| Motion | ^11.x | Animacje |
| jsPDF | ^2.5.x | Export PDF |
| react-helmet-async | ^2.0.x | SEO head management |
| Vitest | ^2.1.x | Test runner |
| Testing Library | ^14.x | React test utilities |

---

## 🔄 DEVELOPMENT WORKFLOW

1. **Planning**: PHASE-3-PLAN.md
2. **Implementation**: TDD (RED → GREEN → REFACTOR)
3. **Verification**: `npm test` (760 testów musi być zielone)
4. **Git**: `git add -A && git commit -m "opis"` po każdym zadaniu
5. **Deploy**: `npm run build` → commit → push (Netlify auto-deploy)

---

## 🌐 ŹRÓDŁA DANYCH

| Dane | Źródło | Automatyzacja |
|------|--------|---------------|
| **WIBOR 3M** | `stooq.pl` (Netlify function) + `bankier.pl` (fallback) | ✅ Live (on page load) |
| **Marże banków** | — | ❌ **Brak API.** Wszystkie porównywarki (Bankier.pl, TotalMoney.pl, Comperia.pl) aktualizują ręcznie co miesiąc |
| **Rankingi ofert** | Bankier.pl, TotalMoney.pl | Linki zewnętrzne |

---

## 📚 POLISH MARKET CONTEXT

- **WIBOR** = Warsaw Interbank Offered Rate (aktualny: ~3.85%, 2026-07)
- **LTV** = Loan-to-Value (wskaźnik wartości kredytu)
- **RRSO** = Rzeczywista Roczna Stopa Oprocentowania
- **UNWW** = Ubezpieczenie Niskiego Wkładu Własnego
- **KNF** = Komisja Nadzoru Finansowego (Rekomendacja S)
- **Autor**: Tony Halik — ekspert rynku kredytowego

---

## 🔮 DEVELOPMENT PLAN — CO DALEJ?

### Phase 4 — Następna sesja

| Priority | Feature | Status |
|----------|---------|--------|
| 🔴 P1 | **E2E Playwright** — 3 ścieżki krytyczne | Planowane |
| 🔴 P1 | **PWA (offline)** — Service Worker + manifest | Planowane |
| 🟡 P2 | **GA4 + Netlify Analytics** | Planowane |
| 🟡 P2 | **Konsolidacja dead code** — usunąć nieużywane pliki | Planowane |
| 🟢 P3 | **Automatyczna aktualizacja WIBOR** (Netlify cron) | Do przemyślenia |

### Pomysły (średni termin)
- System porównań zapisanych symulacji (localStorage + export)
- User-contributed data ("Zgłoś aktualną marżę" → form → PR)
- Rozszerzona treść na stronie głównej (poradniki, artykuły)

### Odrzucone / wstrzymane
| Pomysł | Powód |
|--------|-------|
| Integracja z API banków | ❌ **Nie istnieje publiczne API do marż banków w Polsce** |
| Tabela porównawcza banków | ❌ Wymaga danych, które nie są dostępne automatycznie |
| Kalkulator walutowy | ❌ Małe zainteresowanie, wysokie ryzyko |

---

## 🔑 KLUCZOWE LEKCJE

1. **Never fabricate data for financial tools.** Jeśli nie masz prawdziwych danych — nie udawaj.
2. **Sprawdź dostępność źródła danych przed implementacją.** Nie zakładaj, że API istnieje.
3. **Honestny kalkulator > fałszywa tabela.** Użytkownik woli "nie wiem" niż "wiem źle".
4. **Unifikacja CSS to podstawa.** Jeden globalny wzorzec (`space-y-8` + h1 + p) na wszystkich stronach.
5. **760 testów to siła.** Refactor bez strachu.

---

**END OF MASTER REFERENCE** 🚀
