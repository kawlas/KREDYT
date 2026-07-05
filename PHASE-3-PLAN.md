# PHASE 3: ENHANCED FEATURES & E-E-A-T — PLAN ROZWOJU

**Version:** 1.2 — COMPLETED ✅
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
| 10 | ✅ ~~Porównywarka banków~~ → **Honestny kalkulator raty** | 12 (przebudowane) | ✅ DONE |

> **Uwaga do Task 10:** Pierwotna implementacja zawierała tabelę porównawczą banków ze zmyślonymi danymi (fałszywe marże, nazwy banków po rebrandingu, nieistniejące linki). Po krytyce użytkownika **całość usunięto i zastąpiono uczciwym kalkulatorem**: użytkownik wpisuje własną marżę, kalkulator liczy ratę + koszt całkowity + KNF stress test. Źródła WIBOR: live ze stooq.pl / Bankier.pl. Linki zewnętrzne do realnych porównywarek (Bankier.pl, TotalMoney.pl).

### 🟢 PRIORITY 3: Narzędzia utrzymaniowe

| # | Task | Status |
|---|------|--------|
| 11 | ✅ **Skrypt `scripts/fetch-wibor.js`** — scrapuje WIBOR z Bankier.pl (static HTML) | ✅ DONE |
| 12 | ✅ **Skrypt `scripts/update-margins.cjs`** — interaktywna aktualizacja marż (auto-scrape PKO BP + prompt dla reszty) | ✅ DONE |
| 13 | ✅ **Netlify function `wibor.ts`** — live WIBOR ze stooq.pl (działa na serwerze) | ✅ DONE |
| 14 | ✅ **npm scripts**: `update-margins`, `check-margins` | ✅ DONE |
| 15 | ✅ **Unifikacja CSS** — wszystkie strony używają jednego wzorca `space-y-8` + globalne fonty | ✅ DONE |

---

## 📊 STATYSTYKI KOŃCOWE

| Metryka | Wartość |
|---------|---------|
| **Pliki testowe** | 60 |
| **Testy (wszystkie zielone)** | 760 |
| **Nowe komponenty** | 11 |
| **Nowe strony** | 5 (Commission, Insurance, RentVsBuy + chart + dark mode) |
| **Nowe utility** | 6 (commissionCalc, insuranceCalc, csvExport, rentVsBuy, bankComparisonEnhanced, useTheme) |
| **Commity w tej sesji** | 10+ |
| **Dark mode** | ✅ (class-based, localStorage, system preference) |
| **E-E-A-T** | ✅ (Tony Halik we wszystkich schematach + byline + editorial) |

---

## 🏗️ ARCHITEKTURA (v3.1)

```
src/
├── components/
│   ├── calculators/
│   │   ├── FixedVsVariableChart.tsx    # Wykres porównawczy SVG
│   │   ├── CommissionCalc.tsx          # Prowizja bankowa
│   │   ├── InsuranceCalc.tsx           # UNWW / Life / Pomostowe
│   │   ├── RentVsBuyCalc.tsx           # Kredyt vs wynajem
│   │   ├── BankComparisonChart.tsx     # 🗑️ Dead code (nieużywany)
│   │   └── BankComparisonCalc.tsx      # Honestny kalkulator (bez tabeli)
│   └── shared/
│       ├── CsvExportButton.tsx         # Export CSV harmonogramu
│       └── ThemeToggle.tsx             # Dark mode przełącznik
├── utils/
│   ├── commissionCalc.ts              # Logika prowizji
│   ├── insuranceCalc.ts               # Logika ubezpieczeń
│   ├── csvExport.ts                   # Export CSV
│   ├── rentVsBuy.ts                   # Logika kredyt vs wynajem
│   └── bankComparisonEnhanced.ts      # 🗑️ Dead code (nieużywany)
├── hooks/
│   └── useTheme.tsx                   # Dark mode hook + provider
├── pages/
│   ├── CommissionPage.tsx             # Strona prowizji
│   ├── InsurancePage.tsx              # Strona ubezpieczeń
│   └── RentVsBuyPage.tsx             # Strona kredyt vs wynajem
├── scripts/
│   ├── fetch-wibor.js                 # Scraper WIBOR z Bankier.pl
│   ├── update-margins.cjs             # Interaktywna aktualizacja marż
│   └── fetch-bank-offers.js           # 🗑️ Próba scrapowania (SPA — nie działa)
└── netlify/functions/
    ├── bank-offers.ts                 # 🗑️ Nieużywana (była dla tabeli banków)
    └── wibor.ts                       # Live WIBOR ze stooq.pl
```

---

## 🔮 CO DALEJ?

### 🔴 Phase 4 (planowane)

| # | Cel | Uzasadnienie |
|---|-----|-------------|
| 1 | **E2E Playwright** — 3 ścieżki krytyczne (kalkulator → wynik, nawigacja, 404) | Bez E2E nie ma pewności, że strona działa |
| 2 | **PWA (offline)** — Service Worker + manifest | Użytkownicy mobilni, słaby internet |
| 3 | **Analityka** — Google Analytics 4 + Netlify Analytics | Dowiedzieć się, co działa, a co nie |
| 4 | **Konsolidacja dead code** — usunąć nieużywane pliki | Czysty kod, łatwiejsze utrzymanie |

### 🟡 Średni termin

| # | Cel | Status |
|---|-----|--------|
| 5 | **System porównań zapisanych symulacji** (localStorage + export) | Pomysł |
| 6 | **Automatyczna aktualizacja WIBOR** (Netlify cron — scheduled function) | Możliwe, ale ograniczenia darmowego planu |
| 7 | **User-contributed data** ("Zgłoś aktualną marżę" → form → PR) | Pomysł |

### ⚪ Długi termin — odrzucone / wstrzymane

| # | Cel | Status |
|---|-----|--------|
| — | Integracja z API banków | ❌ **Nie istnieje publiczne API do marż banków w Polsce.** Wszystkie porównywarki (Bankier.pl, TotalMoney.pl, Comperia.pl) aktualizują dane ręcznie co miesiąc. |
| — | Kalkulator kredytu walutowego | ❌ Małe zainteresowanie, wysokie ryzyko |
| — | Rozszerzona wyszukiwarka ofert (filtry: LTV, okres, kwota) | ❌ Wymaga danych, których nie mamy |

---

## 📚 LEKCJE Z PHASE 3

### ❌ Co poszło źle

1. **Zmyślone dane banków** — wygenerowałem fałszywe marże, nazwy banków (ING Bank Śląski nie istnieje, Santander zmienił nazwę), fałszywe linki weryfikacyjne. Użytkownik słusznie skrytykował.
2. **Założyłem, że istnieje API** — zanim sprawdziłem, czy dane są dostępne, już zacząłem implementować tabelę.
3. **Scraper Bankier.pl** — ranking kredytów to Next.js SPA, JS-renderowany. Nie da się scrapować statycznie.

### ✅ Co zadziałało

1. **Honestny kalkulator** — użytkownik wpisuje własną marżę, kalkulator liczy. Zero zmyślonych danych.
2. **WIBOR live ze stooq.pl** — działa na Netlify, nawet jeśli jest blokowany z localhosta.
3. **Skrypt update-margins** — interaktywny, pomaga przy ręcznej miesięcznej aktualizacji.
4. **Unifikacja CSS** — wszystkie strony wyglądają spójnie.

### 🔑 Wnioski na przyszłość

> **Never fabricate data for financial tools.** Jeśli nie masz prawdziwych danych — nie udawaj. Zrób kalkulator, narzędzie, poradnik — cokolwiek uczciwego. Użytkownik woli "nie wiem" niż "wiem źle".

---

**END OF PHASE 3 PLAN** 🚀
