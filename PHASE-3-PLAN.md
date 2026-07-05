# PHASE 3: ENHANCED FEATURES & E-E-A-T - PLAN ROZWOJU

**Version:** 1.0
**Start Date:** 2026-07-05
**Status:** In Progress
**Parent Doc:** PROJECT-MASTER-REFERENCE.md

---

## 🎯 OVERVIEW

**Goal:** Transform kalkulator w autorytatywny serwis finansowy z pełnym zestawem narzędzi
**Strategy:** TDD (Test-Driven Development) — każda funkcja: test → kod → refactor
**Autor:** Tony Halik — ekspert rynku kredytowego

---

## 📋 TASK LIST (kolejność wykonania)

### 🔴 PRIORITY 1: E-E-A-T & Content Fixes

| # | Task | Szac. czas | Status |
|---|------|------------|--------|
| 1 | Dodanie autora "Tony Halik" do stron (SEOHead + structured data) | 1h | 📋 |
| 2 | Homepage — zwiększenie treści do 500+ słów | 0.5h | 📋 |
| 3 | Dodanie autora przy artykułach/topicach | 1h | 📋 |

### 🟡 PRIORITY 2: Nowe kalkulatory (TDD)

| # | Task | Szac. czas | Status |
|---|------|------------|--------|
| 4 | Porównanie stałe vs zmienne z wykresem | 4h | 📋 |
| 5 | Kalkulator prowizji bankowej | 3h | 📋 |
| 6 | Kalkulator ubezpieczenia (UNWW/Life) | 4h | 📋 |
| 7 | Export CSV harmonogramu spłat | 3h | 📋 |
| 8 | Ciemny motyw (dark mode) | 5h | 📋 |
| 9 | Kalkulator "Kredyt vs wynajem" | 5h | 📋 |
| 10 | Porównywarka kredytów (multi-bank) — rozszerzenie istniejącej | 4h | 📋 |

---

## 🏗️ ARCHITEKTURA

### Nowe komponenty:
```
src/
├── components/
│   ├── calculators/
│   │   ├── FixedVsVariableChart.tsx    # Wykres porównawczy
│   │   ├── CommissionCalc.tsx          # Prowizja bankowa
│   │   ├── InsuranceCalc.tsx           # UNWW / Life
│   │   ├── RentVsBuyCalc.tsx           # Kredyt vs wynajem
│   │   └── BankComparisonEnhanced.tsx  # Rozszerzona porównywarka
│   └── shared/
│       ├── CsvExport.tsx              # Export CSV
│       └── ThemeToggle.tsx            # Dark mode toggle
├── utils/
│   ├── fixedVsVariable.ts             # Logika porównania
│   ├── commissionCalc.ts              # Logika prowizji
│   ├── insuranceCalc.ts               # Logika ubezpieczenia
│   ├── csvExport.ts                   # Export CSV
│   └── rentVsBuy.ts                   # Logika kredyt vs wynajem
├── hooks/
│   └── useTheme.ts                    # Dark mode hook
├── pages/
│   ├── FixedVsVariablePage.tsx        # Strona porównania
│   ├── CommissionPage.tsx             # Strona prowizji
│   ├── InsurancePage.tsx              # Strona ubezpieczenia
│   ├── RentVsBuyPage.tsx              # Strona kredyt vs wynajem
│   └── BankComparisonEnhancedPage.tsx # Rozszerzona strona
```

### E-E-A-T:
- Structured data: `author`, `datePublished`, `dateModified`
- SEOHead: domyślny author
- Stopka: informacja o autorze
- Polityka redakcyjna: rozszerzenie o autorze

---

## 🔄 DEVELOPMENT WORKFLOW (TDD)

Dla każdego zadania:
1. **CEL**: Zdefiniuj cel zadania
2. **TEST (RED)**: Napisz testy jednostkowe/integracyjne
3. **KOD (GREEN)**: Zaimplementuj funkcję
4. **REFACTOR**: Popraw jakość kodu
5. **INTEGRACJA**: Dodaj routing, sidebar, prerender
6. **VERIFY**: `npm test` — wszystko zielone

---

## 📐 KEY METRICS

- **Test coverage**: Minimum 90% dla nowego kodu
- **Bundle size**: < 5KB per new calculator (gzipped)
- **Lighthouse**: 95+ performance, 90+ accessibility
- **AdSense ready**: E-E-A-T, unique content, 500+ words per page

---

## 📚 POLISH MARKET CONTEXT

- **Autor**: Tony Halik — ekspert rynku kredytowego, analityk finansowy
- **E-E-A-T**: Experience, Expertise, Authoritativeness, Trustworthiness
- **WIBOR obecny**: 3.85% (aktualizacja 2026-07-04)

---

**END OF PHASE 3 PLAN**
