---
trigger: always_on
---

# PHASE 2: ENHANCED FEATURES - DETAILED SPECIFICATION

**Version:** 1.0  
**Start Date:** 2025-12-30  
**Status:** In Progress  
**Parent Doc:** PROJECT-MASTER-REFERENCE.md

---

## 🎯 OVERVIEW

**Goal:** Transform MVP into world-class loan calculator  
**Timeline:** 10 working days (2 weeks)  
**Features:** 12 new calculators/features  
**Strategy:** Incremental development, test after each task

---

## 📋 TASK BREAKDOWN

### WEEK 1: TIER S - Core Value (6 features)

Day 1: Task 7 - Infrastructure Setup (2h)
Day 2: Task 8 - Total Cost Breakdown (4h)
Day 3: Task 9 - Affordability Calculator (6h)
Day 4: Task 10 - Payment Comparison (6h)
Day 5: Task 11 - WIBOR Simulator (5h)
Day 5: Task 12 - Overpayment Calculator (3h)

text

### WEEK 2: TIER A - High Value (6 features)

Day 6-7: Task 13 - LTV Calculator (4h)
Day 7-8: Task 14 - Refinancing Calculator (6h)
Day 8-9: Task 15 - Smart Amortization (6h)
Day 9-10: Task 16-18 - Polish (Export, Share, etc.)

text

---

## 🏗️ TASK 7: INFRASTRUCTURE SETUP

**Estimated Time:** 2 hours  
**Model:** Gemini 3 Flash  
**Status:** 📋 Not Started

### Goal
Set up folder structure and shared components without breaking existing app.

### Subtasks

#### 7.1: Create Folder Structure (30 min)
src/
├── components/
│ ├── calculators/ 🆕
│ ├── shared/ 🆕
│ └── layout/ 🆕
├── utils/ (expand existing)
├── data/ 🆕
└── types/ (expand existing)

text

#### 7.2: Shared UI Components (1h)
Create:
- `Card.tsx` - Consistent card wrapper
- `Alert.tsx` - Warning/info/success boxes
- `Tooltip.tsx` - Inline help
- `Slider.tsx` - Interactive range input

#### 7.3: Constants & Formatters (30 min)
Create:
- `types/constants.ts` - All loan constants (LTV thresholds, fees, etc.)
- `utils/formatters.ts` - Currency, percent, number formatters

### Success Criteria
✅ Folders created  
✅ Shared components render without errors  
✅ Existing app still works (localhost:5173)  
✅ TypeScript no errors  
✅ Git committed

---

## 🏗️ TASK 8: TOTAL COST BREAKDOWN

**Estimated Time:** 4 hours  
**Model:** Gemini 3 Flash  
**Status:** 📋 Not Started  
**Depends On:** Task 7

### Goal
Upgrade ResultsCard to show ALL costs (not just monthly payment).

### Features
1. **Upfront Costs Breakdown:**
   - Prowizja (2%)
   - Notariusz (500-2000 PLN)
   - Wycena (1000-3000 PLN)
   - Wpis do księgi (200 PLN)
   - Ubezpieczenie pomostowe (300 PLN/mc × 3)

2. **Yearly Costs:**
   - Ubezpieczenie nieruchomości (800 PLN/rok)
   - Ubezpieczenie kredytu (jeśli LTV>80%: 600 PLN/rok)

3. **Real Amount Received:**
   - Kwota kredytu - Prowizja = faktycznie na rękę

4. **RRSO vs Nominalne:**
   - Side-by-side comparison
   - Wyjaśnienie różnicy

5. **Grand Total:**
   - Suma rat + koszty początkowe + koszty roczne × 25 lat

### Subtasks

#### 8.1: Cost Calculation Utilities (1h)
Create:
- `utils/costBreakdown.ts`
- `utils/rrsoCalculations.ts`

Functions:
calculateCostBreakdown(
loanAmount: number,
propertyValue: number,
totalInterest: number,
monthlyPayment: number,
loanTermYears: number
): CostBreakdown

calculateRRSO(
loanAmount: number,
monthlyPayment: number,
loanTermMonths: number,
upfrontCosts: number
): number

text

#### 8.2: Upgrade ResultsCard Component (2h)
Modify: `src/components/ResultsCard.tsx`

Add props:
- loanAmount
- propertyValue
- wibor
- margin
- loanTermYears

New sections:
1. Miesięczna rata (existing)
2. 💰 Ile naprawdę zapłacę? (NOWE)
3. 📋 Koszty dodatkowe (NOWE)
4. 📅 Koszty roczne (NOWE)
5. 📊 RRSO vs nominalne (NOWE)
6. 🚨 Grand Total (NOWE)

#### 8.3: Update App.tsx (30 min)
Pass new props to ResultsCard from form data.

#### 8.4: Testing (30 min)
Test cases:
- 400k loan, 500k property, 25 years
- Check all costs calculate correctly
- Mobile responsive
- No console errors

### Success Criteria
✅ All 6 sections display correctly  
✅ Numbers match manual calculations  
✅ Mobile responsive  
✅ Tooltips work  
✅ Existing save/compare works  
✅ Git committed

---

## 🏗️ TASK 9: AFFORDABILITY CALCULATOR

**Estimated Time:** 6 hours  
**Model:** Gemini 3 Flash  
**Status:** 📋 Not Started  
**Depends On:** Task 7

### Goal
"Czy mnie na to stać?" - Calculate how much loan user can afford.

### Features

**Inputs:**
- Dochód netto miesięczny (główny + współkredytobiorca)
- Typ zatrudnienia: UoP / B2B / Samozatrudnienie
- Zobowiązania miesięczne (inne kredyty, karty)
- Liczba osób na utrzymaniu
- Wiek (młodszy kredytobiorca)

**Outputs:**
- Maksymalna zdolność kredytowa (PLN)
- Maksymalna rata (PLN)
- Możliwa wartość nieruchomości (z 20% wkładem)
- Maksymalny okres (do 70. roku życia)

**Alerts:**
- "B2B: liczymy tylko 60% przychodu"
- "Zobowiązanie 800 zł obniża zdolność o X PLN"
- "Za 2 lata możesz pożyczyć o Y% więcej"

### Subtasks

#### 9.1: Affordability Formulas (1.5h)
Create: `utils/affordabilityFormulas.ts`

Key formula:
calculateAffordability(
income: number,
employmentType: 'UOP' | 'B2B' | 'CONTRACT',
obligations: number,
dependents: number,
age: number,
wibor: number,
margin: number
): AffordabilityResult

text

Logic:
- Effective income = income × multiplier (1.0 / 0.6 / 0.7)
- Min living cost = 1200 PLN × (dependents + 1)
- Available = (Effective income - obligations - min living) × 0.5
- Max loan = Available / (monthly payment per 1000 PLN)
- Max term = (70 - age) × 12 months

#### 9.2: AffordabilityCalc Component (3h)
Create: `components/calculators/AffordabilityCalc.tsx`

UI:
- Form: 6 inputs
- Real-time calculation
- Result card with 4 key numbers
- 3-4 contextual alerts

#### 9.3: Integration (1h)
Add to App.tsx as new section/tab.

#### 9.4: Testing (30 min)
Test cases:
- UoP: 10k, no obligations, 2 dependents, age 30
- B2B: 15k, 800 obligations, 1 dependent, age 35
- Edge: age 60 (max 10 years)

### Success Criteria
✅ Calculations accurate  
✅ Alerts show correctly  
✅ Mobile responsive  
✅ Integration smooth  
✅ Git committed

---

## 🏗️ TASK 10-12: [CONTINUED IN NEXT SECTIONS]

*(Specification continues with Tasks 10-18)*

---

## ✅ GENERAL VERIFICATION (Every Task)

### Pre-Implementation
- [ ] Read this spec + Master Reference
- [ ] Check dependencies (previous tasks done?)
- [ ] Clear understanding of goal

### During Implementation
- [ ] Incremental commits (subtask by subtask)
- [ ] TypeScript strict (no errors)
- [ ] Existing app still works
- [ ] Console clean (no errors)

### Post-Implementation
- [ ] `npm run dev` works
- [ ] Manual testing (checklist specific to task)
- [ ] Mobile responsive (resize browser)
- [ ] Screenshot (before/after)
- [ ] Git commit with clear message
- [ ] Push to GitHub

### Commit Template
feat: [task-X] [feature name]

Implemented [subtask 1]

Implemented [subtask 2]

Tested on [scenarios]

No breaking changes

Closes #X (if GitHub issue)

text

---

## 🚨 EMERGENCY PROTOCOLS

### If App Breaks
1. **STOP** coding immediately
2. Check console errors (F12)
3. `git status` - what changed?
4. `git diff` - see exact changes
5. Try `npm run dev` restart
6. If still broken: `git checkout -- [file]` (restore)
7. Report to manager (user) with error details

### If TypeScript Errors
1. Read error carefully
2. Check types in `types/` folder
3. Ensure imports correct
4. Run `npm run build` to see all errors
5. Fix one by one
6. Don't use `@ts-ignore` (fix properly)

### If Calculation Wrong
1. Console.log intermediate values
2. Compare with manual calculation
3. Check formula in Master Reference
4. Test with simple numbers first (100k, 10 years)
5. Then test real scenario (400k, 25 years)

---

## 📊 PROGRESS TRACKING

Update this section after each task:

✅ Task 7: Infrastructure Setup - DONE (2025-12-30)
⏳ Task 8: Total Cost Breakdown - IN PROGRESS
📋 Task 9: Affordability Calculator - NOT STARTED
📋 Task 10-18: ...

text

---

**END OF PHASE 2 SPECIFICATION**

*Update this file as you progress through tasks.*