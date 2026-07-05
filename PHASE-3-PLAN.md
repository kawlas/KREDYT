# PHASE 3: ENHANCED FEATURES & E-E-A-T — PLAN ROZWOJU

**Version:** 1.0 — COMPLETED ✅
**Start Date:** 2026-07-05
**Completion Date:** 2026-07-05
**Status:** ✅ DONE
**Parent Doc:** PROJECT-MASTER-REFERENCE.md

---

## 🎯 OVERVIEW

**Goal:** Transform kalkulator w autorytatywny serwis finansowy z pełnym zestawem narzędzi
**Strategy:** TDD (Test-Driven Development) — każda funkcja: test → kod → refactor
**Autor:** Tony Halik — ekspert rynku kredytowego

---

## 📋 TASK LIST — WSZYSTKIE WYKONANE ✅

### 🔴 PRIORITY 1: E-E-A-T & Content Fixes

| # | Task | Testy | Status |
|---|------|-------|--------|
| 1 | ✅ Autor "Tony Halik" w SEOHead + structured data (Organization, Article, WebApplication) | 4 testy SEOHead.test.tsx | ✅ DONE |
| 2 | ✅ Homepage — zwiększenie treści do 500+ słów (+ autor w hero, "Zaufaj liczbom") | — | ✅ DONE |
| 3 | ✅ Autor w topicach/artykułach + AboutPage + EditorialPolicyPage | — | ✅ DONE |

### 🟡 PRIORITY 2: Nowe kalkulatory (TDD)

| # | Task | Testy | Status |
|---|------|-------|--------|
| 4 | ✅ Porównanie stałe vs zmienne z wykresem SVG | 5 (wykres) | ✅ DONE |
| 5 | ✅ Kalkulator prowizji bankowej | 9 (util) + 6 (komponent) = 15 | ✅ DONE |
| 6 | ✅ Kalkulator ubezpieczeń (UNWW/Life/Pomostowe/Utrata pracy) | 11 (util) + 7 (komponent) = 18 | ✅ DONE |
| 7 | ✅ Export CSV harmonogramu spłat | 9 (util) + 7 (komponent) = 16 | ✅ DONE |
| 8 | ✅ Ciemny motyw (dark mode) — ThemeProvider + przełącznik | 8 (ThemeToggle) | ✅ DONE |
| 9 | ✅ Kalkulator "Kredyt vs wynajem" z tabelą roczną | 9 (util) + 3 (komponent) = 12 | ✅ DONE |
| 10 | ✅ Porównywarka banków — rozszerzenie (sortowanie + wykres) | 9 (util) + 3 (wykres) = 12 | ✅ DONE |

---

## 📊 STATYSTYKI KOŃCOWE

| Metryka | Wartość |
|---------|---------|
| **Pliki testowe** | 60 |
| **Testy (wszystkie zielone)** | 760 |
| **Nowe komponenty** | 11 |
| **Nowe strony** | 5 (Commission, Insurance, RentVsBuy + chart + dark mode) |
| **Nowe utility** | 6 (commissionCalc, insuranceCalc, csvExport, rentVsBuy, bankComparisonEnhanced, useTheme) |
| **Commity w tej sesji** | 9 |
| **Dark mode** | ✅ (class-based, localStorage, system preference) |
| **E-E-A-T** | ✅ (Tony Halik we wszystkich schematach + byline + editorial) |

---

## 🏗️ NOWA ARCHITEKTURA

```
src/
├── components/
│   ├── calculators/
│   │   ├── FixedVsVariableChart.tsx    # Wykres porównawczy SVG
│   │   ├── CommissionCalc.tsx          # Prowizja bankowa
│   │   ├── InsuranceCalc.tsx           # UNWW / Life / Pomostowe
│   │   ├── RentVsBuyCalc.tsx           # Kredyt vs wynajem
│   │   ├── BankComparisonChart.tsx     # Wykres słupkowy banków
│   │   └── BankComparisonCalc.tsx      # Rozszerzona o sortowanie
│   └── shared/
│       ├── CsvExportButton.tsx         # Export CSV harmonogramu
│       └── ThemeToggle.tsx             # Dark mode przełącznik
├── utils/
│   ├── commissionCalc.ts              # Logika prowizji
│   ├── insuranceCalc.ts               # Logika ubezpieczeń
│   ├── csvExport.ts                   # Export CSV
│   ├── rentVsBuy.ts                   # Logika kredyt vs wynajem
│   └── bankComparisonEnhanced.ts      # Sortowanie, filtrowanie, chart data
├── hooks/
│   └── useTheme.tsx                   # Dark mode hook + provider
├── pages/
│   ├── CommissionPage.tsx             # Strona prowizji
│   ├── InsurancePage.tsx              # Strona ubezpieczeń
│   └── RentVsBuyPage.tsx             # Strona kredyt vs wynajem
```

---

## 🔮 CO DALEJ?

Potencjalne rozszerzenia na przyszłość:
- **Kalkulator kredytu walutowego** (odłożony — małe zainteresowanie)
- **Integracja z API banków** (rzeczywiste stawki)
- **System porównań zapisanych symulacji** (historia)
- **PWA (offline)**
- **Rozszerzona wyszukiwarka ofert** (filtry: LTV, okres, kwota)

---

**END OF PHASE 3 PLAN** 🚀
