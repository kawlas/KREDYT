
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

Day 1: Task 7 - Infrastructure Setup (2h) ✅ DONE
Day 2: Task 8 - Total Cost Breakdown (4h) ✅ DONE
Day 3: Task 9 - Affordability Calculator (6h) ✅ DONE
Day 4: Task 10 - Payment Comparison (6h) ✅ DONE
Day 5: Task 11 - WIBOR Simulator (5h) 📋 TO DO
Day 5: Task 12 - Overpayment Calculator (3h) 📋 TO DO

### WEEK 2: TIER A - High Value (6 features)

Day 6-7: Task 13 - LTV Calculator (4h) 📋 TO DO
Day 7-8: Task 14 - Refinancing Calculator (6h) 📋 TO DO
Day 8-9: Task 15 - Smart Amortization (6h) 📋 TO DO
Day 9-10: Task 16-18 - Polish (Export, Share, etc.) 📋 TO DO

---

## 🏗️ TASK 7: INFRASTRUCTURE SETUP ✅

**Status:** Done (2025-12-30)

- Created folder structure
- Shared components: `Card`, `Alert`, `Tooltip`
- Constants & Formatters

---

## 🏗️ TASK 8: TOTAL COST BREAKDOWN ✅

**Status:** Done (2025-12-30)

- `costBreakdown.ts`: Implemented cost calculations
- `rrsoCalculations.ts`: RRSO logic
- `ResultsCard.tsx`: Updated with new sections (Upfront costs, Yearly costs, Grand total)
- Integration verified

---

## 🏗️ TASK 9: AFFORDABILITY CALCULATOR ✅

**Status:** Done (2025-12-30)

- `affordabilityFormulas.ts`: Implemented logic
- `AffordabilityCalc.tsx`: UI implemented
- `App.tsx`: Added Tabs and integration

---

## 🏗️ TASK 10: PAYMENT COMPARISON (Równe vs Malejące)

**Estimated Time:** 6 hours  
**Status:** 📋 Not Started

### Goal
Show clear visual comparison between Equal and Declining installments.

### Features
- Side-by-side comparison card
- "Ile zaoszczędzisz?" total difference highlight
- Visual chart (bar/line - optional for later, or simple CSS bars)
- Recommendations ("Malejące: Płacisz X mniej, ale wyższa rata startowa")

### Subtasks
#### 10.1: Comparison Logic
- Extend `loanCalculations.ts` to return both schedules/totals simultaneously for comparison.

#### 10.2: PaymentComparison Component
- Create `components/calculators/PaymentComparison.tsx`
- Display key differences.

---

## 🏗️ TASK 11: WIBOR SIMULATOR

**Estimated Time:** 5 hours  
**Status:** 📋 Not Started

### Goal
"Co jeśli WIBOR wzrośnie?" - Stress test for user's budget.

### Features
- Slider `-2%` to `+5%`
- Instant impact on monthly payment
- Safe/Warning/Danger zones (based on Affordability)

---

## 📊 PROGRESS TRACKING

✅ Task 7: Infrastructure Setup - DONE
✅ Task 8: Total Cost Breakdown - DONE
✅ Task 9: Affordability Calculator - DONE
✅ Task 10: Payment Comparison - DONE
⏳ Task 11: WIBOR Simulator - NEXT

---

**END OF PHASE 2 SPECIFICATION**
