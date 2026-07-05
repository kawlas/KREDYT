# KALKULATOR KREDYTU HIPOTECZNEGO — MASTER REFERENCE

**Version:** 3.0
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
- Porównywarka banków (tabela z marżami, RRSO, ratą)
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
| # | Feature | Testy |
|---|---------|-------|
| 1 | **E-E-A-T**: Autor Tony Halik (SEOHead + structured data + byline) | 4 |
| 2 | Homepage: +15 słów treści | — |
| 3 | Autor w topicach + AboutPage + Editorial | — |
| 4 | **Wykres porównania stałe vs zmienne** (SVG) | 5 |
| 5 | **Kalkulator prowizji bankowej** (optymalna prowizja, break-even) | 15 |
| 6 | **Kalkulator ubezpieczeń** (UNWW, życie, pomostowe, utrata pracy) | 18 |
| 7 | **Export CSV harmonogramu spłat** (Excel-compatible) | 16 |
| 8 | **Ciemny motyw** (class-based, localStorage, system preference) | 8 |
| 9 | **Kredyt vs Wynajem** (roczna tabela, break-even, net worth) | 12 |
| 10 | **Porównywarka banków — rozszerzenie** (sortowanie + wykres słupkowy) | 12 |

---

## 🧪 TESTING METHODOLOGY & STRATEGY

### Filozofia: TDD-first, E2E-gap, Monitoring-live

Opieramy się na wywiadzie z Kentem Beckiem (twórcą TDD) oraz własnym doświadczeniu:

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
- Google Analytics / Netlify Analytics
- Automatyczny rollback w przypadku błędów

### Alternatywy (świadomie odrzucone na ten moment)
| Metoda | Kiedy by działała | Dlaczego nie teraz |
|--------|------------------|-------------------|
| Testy manualne | UX, accessibility | Nie skaluje się |
| Code Review jako jedyna kontrola | Mały zespół, szybkie zmiany | Nie wyłapuje błędów matematycznych |
| Testy UI (Cypress) | Flow użytkownika | Za ciężkie na obecnym etapie; dodamy później |

### Kluczowa zasada
> *„TDD is not about testing. TDD is about designing."* — Kent Beck

Test w TDD to **narzędzie do projektowania interfejsów**, nie cel sam w sobie. Dopasowujemy metodę do fazy projektu i dostępnych zasobów.

---

## 📊 TEST METRICS

| Metryka | Wartość |
|---------|---------|
| **Pliki testowe** | 60 |
| **Testy (wszystkie zielone)** | 760 |
| **Pokrycie utility** | ~95% |
| **Pokrycie komponentów** | ~85% |
| **Czas wykonania** | ~8s |
| **Ostatni test: 0 failed** | ✅ |

---

## 🏗️ ARCHITECTURE (v3.0)

```
kredyt-kalkulator/
├── src/
│   ├── App.tsx                    # Routes + ThemeProvider + layout
│   │
│   ├── hooks/
│   │   ├── useLoanCalculator.ts
│   │   ├── useWIBOR.ts
│   │   └── useTheme.tsx           # Dark mode (localStorage + system pref)
│   │
│   ├── components/
│   │   ├── calculators/
│   │   │   ├── AffordabilityCalc.tsx
│   │   │   ├── PaymentComparison.tsx
│   │   │   ├── WiborSimulator.tsx
│   │   │   ├── OverpaymentCalc.tsx
│   │   │   ├── LTVCalculator.tsx
│   │   │   ├── FixedVsVariableCalc.tsx + FixedVsVariableChart.tsx 🆕
│   │   │   ├── CommissionCalc.tsx 🆕
│   │   │   ├── InsuranceCalc.tsx 🆕
│   │   │   ├── RentVsBuyCalc.tsx 🆕
│   │   │   ├── BankComparisonCalc.tsx + BankComparisonChart.tsx 🆕
│   │   │   └── BIKSimulator.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── Card.tsx, Alert.tsx, Tooltip.tsx, Slider.tsx
│   │   │   ├── SEOHead.tsx           # E-E-A-T: Tony Halik
│   │   │   ├── ExportPdfButton.tsx
│   │   │   ├── CsvExportButton.tsx 🆕
│   │   │   └── ThemeToggle.tsx 🆕
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
│   │   ├── commissionCalc.ts 🆕
│   │   ├── insuranceCalc.ts 🆕
│   │   ├── csvExport.ts 🆕
│   │   ├── rentVsBuy.ts 🆕
│   │   ├── bankComparisonEnhanced.ts 🆕
│   │   └── exportPdf.ts
│   │
│   └── pages/
│       ├── HubPage.tsx, CalculatorPage.tsx
│       ├── CommissionPage.tsx 🆕
│       ├── InsurancePage.tsx 🆕
│       ├── RentVsBuyPage.tsx 🆕
│       ├── MityPage.tsx
│       └── TopicPage.tsx (autor byline + E-E-A-T)
│
├── tailwind.config.js             # darkMode: 'class'
└── prerender.js                   # +3 nowe ścieżki
```

---

## 🔧 TECH STACK (Updated)

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
5. **Deploy**: `npm run build && netlify deploy --prod`

---

## 📚 POLISH MARKET CONTEXT

- **WIBOR** = Warsaw Interbank Offered Rate (aktualny: 3.85%, 2026-07-04)
- **LTV** = Loan-to-Value (wskaźnik wartości kredytu)
- **RRSO** = Rzeczywista Roczna Stopa Oprocentowania
- **UNWW** = Ubezpieczenie Niskiego Wkładu Własnego
- **KNF** = Komisja Nadzoru Finansowego (Rekomendacja S)
- **Autor**: Tony Halik — ekspert rynku kredytowego

---

## 🔮 NEXT STEPS

| Co | Kiedy |
|----|-------|
| E2E Playwright (3 ścieżki) | Następna sesja |
| PWA (offline) | Phase 4 |
| Integracja z API banków | Długi termin |
| Historia symulacji | Średni termin |

---

**END OF MASTER REFERENCE** 🚀
