---
trigger: always_on
---

# KALKULATOR KREDYTU HIPOTECZNEGO - MASTER REFERENCE

**Version:** 2.0  
**Status:** Phase 1 Complete ✅ | Phase 2 In Planning  
**Live URL:** https://kredytkalkulator.netlify.app/  
**Last Updated:** 2025-12-30

---

## 🎯 PROJECT VISION

Stwórz **najlepszy kalkulator kredytowy w Polsce**, który:
- Pokazuje PRAWDĘ o kosztach kredytu (nie ukrywa niczego)
- Rozwiązuje realne problemy kredytobiorców
- Jest intuicyjny i edukacyjny
- Przewyższa konkurencję funkcjonalnością

**Target Users:** Osoby planujące kredyt hipoteczny (first-time buyers + refinancing)

---

## 📊 CURRENT STATUS (Phase 1 Complete)

### ✅ IMPLEMENTED (MVP - Live)

**Core Features:**
- Kalkulator raty kredytu (równe/malejące)
- Obliczanie RRSO
- Całkowity koszt kredytu
- Zapisywanie ofert (LocalStorage)
- Porównywarka ofert (tabela)
- Responsywny design
- Animacje (Motion.dev)

**Tech Stack:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Motion.dev
- Deployed: Netlify

**Metryki MVP:**
- Bundle size: ~50KB gzipped
- Lighthouse: 95+ performance
- Mobile-first: ✅
- TypeScript strict: ✅

---

## 🚀 PHASE 2: ENHANCED FEATURES

### 🎯 GOALS

**Week 1 (5 dni):** TIER S - Core Value (6 funkcji)  
**Week 2 (5 dni):** TIER A - High Value (6 funkcji)  
**Week 3:** TIER B - Polish & Charts (opcjonalne)

---

### 📋 TIER S: MUST-HAVE (Week 1)

| # | Feature | Value | Effort | Days | Status |
|---|---------|-------|--------|------|--------|
| 1 | "Czy mnie na to stać?" (Zdolność) | 5 | 2 | 1 | 📋 Planned |
| 2 | "Ile naprawdę zapłacę?" (Koszty) | 5 | 2 | 1 | 📋 Planned |
| 3 | Porównanie równe vs malejące | 5 | 2 | 1 | 📋 Planned |
| 4 | Symulator WIBOR | 5 | 2 | 1 | 📋 Planned |
| 5 | Kalkulator nadpłat | 5 | 2 | 1 | 📋 Planned |
| 6 | LTV Impact | 4 | 2 | 1 | 📋 Planned |

---

### 📋 TIER A: HIGH VALUE (Week 2)

| # | Feature | Value | Effort | Days | Status |
|---|---------|-------|--------|------|--------|
| 7 | Refinansowanie | 4 | 3 | 1.5 | 📋 Planned |
| 8 | Harmonogram spłat | 5 | 3 | 1.5 | 📋 Planned |
| 9 | B2B vs UoP zdolność | 4 | 2 | 1 | 📋 Planned |
| 10 | Wszystkie koszty | 4 | 2 | 1 | 📋 Planned |
| 11 | Export PDF | 3 | 3 | 1 | 📋 Planned |
| 12 | Share link | 3 | 2 | 1 | 📋 Planned |

---

## 🏗️ ARCHITECTURE

### Current Structure (Phase 1)

kredyt-kalkulator/
├── src/
│ ├── App.tsx
│ ├── hooks/
│ │ └── useLoanCalculator.ts
│ ├── components/
│ │ ├── LoanForm.tsx
│ │ ├── ResultsCard.tsx
│ │ └── ComparisonTable.tsx
│ ├── utils/
│ │ └── loanCalculations.ts
│ └── types/
│ └── loan.types.ts
└── package.json

text

### Planned Structure (Phase 2)

kredyt-kalkulator/
├── src/
│ ├── hooks/
│ │ ├── useLoanCalculator.ts (keep)
│ │ ├── useAffordabilityCalc.ts 🆕
│ │ ├── useOverpaymentCalc.ts 🆕
│ │ ├── useWiborSimulator.ts 🆕
│ │ └── useLTVCalculator.ts 🆕
│ │
│ ├── components/
│ │ ├── calculators/ 🆕
│ │ │ ├── AffordabilityCalc.tsx
│ │ │ ├── PaymentComparison.tsx
│ │ │ ├── WiborSimulator.tsx
│ │ │ ├── OverpaymentCalc.tsx
│ │ │ └── LTVCalculator.tsx
│ │ │
│ │ ├── shared/ 🆕
│ │ │ ├── Card.tsx
│ │ │ ├── Alert.tsx
│ │ │ ├── Tooltip.tsx
│ │ │ └── Slider.tsx
│ │ │
│ │ └── layout/ 🆕
│ │ └── Tabs.tsx
│ │
│ ├── utils/
│ │ ├── loanCalculations.ts (extend)
│ │ ├── affordabilityFormulas.ts 🆕
│ │ ├── overpaymentFormulas.ts 🆕
│ │ ├── rrsoCalculations.ts 🆕
│ │ ├── costBreakdown.ts 🆕
│ │ └── formatters.ts 🆕
│ │
│ └── types/
│ ├── loan.types.ts (extend)
│ └── constants.ts 🆕

text

---

## 🔧 TECH STACK

### Dependencies (current + planned)

{
"dependencies": {
"react": "^18.2.0",
"react-hook-form": "^7.x",
"motion": "^11.x"
},
"devDependencies": {
"typescript": "^5.0.0",
"vite": "^5.0.0",
"tailwindcss": "^3.4.0"
}
}

text

**Add later (Phase 2):**
- chart.js (wykresy - opcjonalnie)
- jspdf (PDF export - opcjonalnie)

---

## 📐 KEY FORMULAS

### Rata równa (annuity)
M = P × [i(1 + i)^n] / [(1 + i)^n - 1]

M = miesięczna rata
P = kwota kredytu
i = oprocentowanie miesięczne (roczne / 12)
n = liczba miesięcy

text

### Zdolność kredytowa
Zdolność = [(Dochód × multiplier - Zobowiązania - MinLife) × 0.5] / (Rata na 1000 PLN)

multiplier: 1.0 (UoP), 0.6 (B2B), 0.7 (kontrakt)
MinLife = 1200 PLN × liczba osób

text

### RRSO (uproszczony)
RRSO = [(Total Paid - Effective Amount) / Effective Amount] / Years × 100

Effective Amount = kwota - koszty z góry

text

---

## 🔄 DEVELOPMENT WORKFLOW

### Branch Strategy

main (production)
└─ develop (integration)
├─ feature/task-7-infrastructure
├─ feature/task-8-cost-breakdown
└─ feature/task-9-affordability

text

### Commit Convention

feat: nowa funkcjonalność
fix: naprawa buga
chore: setup, config
docs: dokumentacja
refactor: zmiana kodu bez zmiany funkcji

text

### Task Workflow

1. **Planning** (Claude Opus 4.5 Thinking)
   - Przeczytaj PHASE-2-SPECIFICATION.md
   - Zaprojektuj architekturę

2. **Implementation** (Gemini 3 Flash)
   - Koduj feature
   - Commit po każdym subtasku

3. **Review** (Claude Sonnet 4.5 Thinking)
   - Code review
   - Edge cases

4. **Manual Testing**
   - Test w przeglądarce
   - Mobile responsive
   - Console errors

5. **Commit & Push**

---

## ✅ VERIFICATION CHECKLIST

### Pre-Implementation
- [ ] Przeczytaj PHASE-2-SPECIFICATION.md
- [ ] Zrozum requirements
- [ ] Check dependencies

### During Implementation
- [ ] Incremental commits
- [ ] TypeScript bez błędów
- [ ] Existing features work

### Post-Implementation
- [ ] `npm run dev` działa
- [ ] Localhost test
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Git commit + push

---

## 🚨 CRITICAL RULES

### DO's ✅
- ALWAYS test before commit
- Keep existing functionality working
- Incremental changes
- TypeScript strict
- Mobile-first
- Polish locale (pl-PL)

### DON'Ts ❌
- Never break existing features
- No big bang commits
- No untyped code
- No hard-coded values
- No console.log in production
- No TODO comments

---

## 📚 POLISH MARKET TERMS

- **WIBOR** = Warsaw Interbank Offered Rate (zmienne oprocentowanie)
- **LTV** = Loan-to-Value (kredyt / wartość nieruchomości)
- **RRSO** = Rzeczywista Roczna Stopa Oprocentowania (APR)
- **Prowizja** = upfront fee (0-2%)
- **Raty równe** = annuity payment
- **Raty malejące** = decreasing payment

---

## 🎯 SUCCESS METRICS

### Phase 2 Goals

**Functional:**
- [ ] 12 new features
- [ ] 0 broken features
- [ ] <2s time-to-result
- [ ] 90+ mobile score

**Code Quality:**
- [ ] 100% TypeScript
- [ ] 0 ESLint errors
- [ ] DRY principle

---

## 🔮 FUTURE (Post Phase 2)

**Don't implement now:**
- Backend (cloud save)
- API NBP (live WIBOR)
- Ranking banków
- Analytics

---

## 📝 CHANGELOG

### v2.0 (2025-12-30) - Phase 2 Planning
- Market research
- Devil's advocate analysis
- Architecture plan

### v1.0 (2025-12-29) - MVP Launch
- Basic calculator
- Deployed to Netlify

---

**END OF MASTER REFERENCE**

*Single source of truth. All agents read this first.*
*Update when major changes occur.*