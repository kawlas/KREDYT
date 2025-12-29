---
trigger: always_on
---

# 🎯 KALKULATOR KREDYTU - MASTER REFERENCE
**WERSJA:** 1.0 | **ŹRÓDŁO PRAWDY DLA WSZYSTKICH AGENTÓW**

---

## ⚠️ ZASADA NADRZĘDNA

**ŻADEN AGENT NIE MOŻE ZMIENIĆ BEZ POZWOLENIA:**
- Struktury folderów (§2)
- Tech stacku (§3)
- Typów TypeScript (§4)
- Konwencji nazewnictwa (§5)

**Jeśli chcesz zmienić:** ZATRZYMAJ SIĘ → zgłoś w komentarzu → CZEKAJ na zatwierdzenie

---

## 1. ZAKRES MVP

✅ **IMPLEMENTUJ:**
- Kalkulator: kwota, okres, WIBOR, marża, typ rat
- Porównanie 2-3 ofert
- Wyświetlanie: rata, koszt całkowity, odsetki, RRSO
- LocalStorage (max 3 oferty)
- Animacje (Motion.dev, subtelne)
- Mobile-first responsive

❌ **NIE IMPLEMENTUJ (post-MVP):**
- Harmonogram spłat (tabela 360 miesięcy)
- Refinansowanie
- Wykresy/charts
- Backend/API
- Export PDF

---

## 2. STRUKTURA PROJEKTU (LOCKED)

src/
├── components/ ← LoanForm.tsx, ResultsCard.tsx, ComparisonTable.tsx
├── utils/ ← loanCalculations.ts, formatters.ts
├── hooks/ ← useLoanCalculator.ts
├── types/ ← index.ts (NIE ZMIENIAJ!)
├── App.tsx
├── main.tsx
└── index.css

text

**ZASADY:**
- ❌ NIE dodawaj/usuwaj folderów
- ❌ NIE przenoś plików
- ✅ Nowe komponenty → `/components/`
- ✅ Nowe funkcje → `/utils/`

---

## 3. TECH STACK (LOCKED)

**Frontend:**
- React 18 + TypeScript 5 (strict mode)
- Vite 5
- Tailwind CSS 3

**Biblioteki:**
- React Hook Form 7.52
- Motion 11 (NIE Framer Motion!)
- Vitest

**❌ NIE DODAWAJ:** Redux, Zustand, Axios, GraphQL, innych bibliotek bez zgody

---

## 4. TYPY TYPESCRIPT (LOCKED)

**Plik:** `/src/types/index.ts`

export interface LoanFormData {
principal: number // Kwota PLN
years: number // Okres lat
wibor: number // WIBOR 3M %
margin: number // Marża %
installmentType: 'equal' | 'declining'
commission?: number // Prowizja PLN
}

export interface LoanResults {
monthlyPayment: number // Rata PLN
totalCost: number // Koszt całkowity PLN
totalInterest: number // Suma odsetek PLN
rrso: number // RRSO %
}

export interface LoanOffer {
id: string
name: string
formData: LoanFormData
results: LoanResults
savedAt: string // ISO date
}

text

**❌ NIE ZMIENIAJ tej struktury! Jeśli musisz - zgłoś w komentarzu.**

---

## 5. KONWENCJE NAZEWNICTWA (LOCKED)

**Pliki:**
- Komponenty: `PascalCase.tsx` (LoanForm.tsx)
- Utils: `camelCase.ts` (loanCalculations.ts)
- Hooks: `useCamelCase.ts` (useLoanCalculator.ts)

**Kod:**
- Komponenty: `PascalCase` - `const LoanForm: FC<Props>`
- Funkcje: `camelCase` - `calculateMonthlyPayment()`
- Stałe: `UPPER_SNAKE_CASE` - `MAX_LOAN_AMOUNT`
- Interfaces: `PascalCase` - `interface LoanFormData`

**Imports:**
// ✅ DOBRE
import { LoanFormData } from '@/types'
// ❌ ZŁE
import { LoanFormData } from '../../types'

text

---

## 6. ZASADY KODOWANIA

**React:**
// ✅ DOBRE
import { FC } from 'react'
interface Props { ... }
export const LoanForm: FC<Props> = ({ prop }) => { ... }

// ❌ ZŁE
class LoanForm extends Component { ... } // NIE class!
const LoanForm = (props: any) => { ... } // NIE any!

text

**TypeScript:**
- Strict mode ZAWSZE
- ❌ NIE używaj `any` (użyj `unknown`)
- ✅ Wszystkie funkcje z typami parametrów i return type
- ✅ Props z interface

**Tailwind:**
- ✅ TYLKO Tailwind classes
- ❌ NIE używaj: inline styles, CSS modules, custom CSS

---

## 7. DESIGN SYSTEM (LOCKED)

**Kolory:**
- Primary: `blue-600`, hover: `blue-700`
- Background: `white`, `gray-50`
- Text: `gray-900`, secondary: `gray-600`
- Success: `green-600`, Error: `red-600`

**Spacing:**
- Card padding: `p-6`
- Form gap: `gap-4`
- Section margin: `mb-6`

**Components:**
// Card

<div className="bg-white rounded-lg shadow-md p-6">
// Button
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-sm">

text

---

## 8. WZORY FINANSOWE (LOCKED)

**Rata równa:**
const monthlyRate = (wibor + margin) / 12 / 100
const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
(Math.pow(1 + monthlyRate, months) - 1)

text

**Rata malejąca:**
const principalPart = principal / months
const firstInterest = principal * monthlyRate

text

**❌ NIE ZMIENIAJ wzorów bez zgody!**

---

## 9. WALIDACJA

**Limity:**
principal: 50000 - 2000000 PLN
years: 1 - 35
wibor: 0 - 20%
margin: 0.5 - 5%
commission: 0 - 100000 PLN

text

**Błędy (po polsku!):**
"Kwota kredytu musi być między 50 000 a 2 000 000 PLN"
"Okres kredytowania: 1-35 lat"
"WIBOR musi być wartością dodatnią"

text

---

## 10. FORMATOWANIE (Polski rynek!)

// PLN z separatorem
const formatCurrency = (amount: number): string => {
return new Intl.NumberFormat('pl-PL', {
style: 'currency',
currency: 'PLN',
}).format(amount)
}
// 123456.78 → "123 456,78 PLN"

text

---

## 11. ANIMACJE (Motion.dev)

**Zasady:**
- ✅ TYLKO `transform` i `opacity`
- ❌ NIE animuj: width, height, margin, padding
- ✅ Max duration: 300ms
- ✅ 60fps target
- ✅ Respektuj `prefers-reduced-motion`

// ✅ Fade in
animate(el, { opacity:, y: }, { duration: 0.3 })
​

// ❌ ZŁE
animate(el, { width: }) // Wolne!

text

---

## 12. LOCALSTORAGE

**Klucz:** `'loan-calculator-offers'`
**Limit:** Max 3 oferty (MVP)
**❌ NIE przechowuj:** wrażliwych danych, tokenów, > 3 ofert

---

## 13. PERFORMANCE

**Wymagania:**
- Bundle: < 500KB (gzipped)
- Lighthouse: > 90
- LCP: < 2.5s
- FID: < 100ms

**Optymalizacje:**
- Code splitting (React.lazy)
- Debouncing inputów (500ms)
- React.memo dla expensive components

---

## 14. TESTY

**Każda funkcja w `/utils/` MUSI mieć testy:**

describe('calculateMonthlyPayment', () => {
it('oblicza ratę dla 400k, 25 lat, 6%', () => {
const result = calculateMonthlyPayment(400000, 6, 300, 'equal')
expect(result).toBeCloseTo(2577.03, 2)
})

it('rzuca błąd dla wartości ujemnych', () => {
expect(() => calculateMonthlyPayment(-100, 6, 300, 'equal')).toThrow()
})
})

text

**Coverage:** > 80% funkcji, 100% calculations

---

## 15. KOMUNIKACJA Z MANAGEREM

**ZATRZYMAJ SIĘ i zapytaj gdy:**
1. Chcesz zmienić coś LOCKED
2. Dodać nową bibliotekę
3. Napotkasz niezrozumiały błąd
4. Prompt jest niejasny
5. Chcesz zrobić inaczej niż w tym dokumencie

**Format:**
🚨 ZATRZYMUJĘ SIĘ - DECYZJA WYMAGANA

Sytuacja: [co się dzieje]
Problem: [opisz]
Proponuję: [rozwiązanie]

Czekam na decyzję.

text

---

## 16. CHECKLIST PRZED COMMITEM

- [ ] TypeScript - brak `any`
- [ ] `npm run dev` działa
- [ ] `npm run test` przechodzi
- [ ] Console - brak błędów
- [ ] Mobile/Desktop responsive
- [ ] Lighthouse > 90



## AUTOMATED VERIFICATION (updated)

Po zakończeniu implementacji:

1. ✅ Unit tests: npm run test
2. ✅ Dev server: npm run dev (sprawdź terminal - no errors)
3. ✅ Code analysis: 
   - Check imports
   - Check TypeScript errors
   - Check file structure

4. ⚠️ Browser testing (jeśli Browser Extension działa):
   - Open localhost:[port]
   - Verify UI renders
   - Test basic interactions
   - Screenshot results
   
   JEŚLI browser subagent się zawiesza:
   - POMIŃ browser testing
   - Manager zweryfikuje ręcznie
   - Mark task as complete

5. ❌ NIE blokuj task completion jeśli browser testing fails

---

## 🎯 PODSUMOWANIE

1. ✅ Czytaj ten dokument przed każdym taskiem
2. ✅ Trzymaj się struktury
3. ❌ NIE zmieniaj LOCKED bez zgody
4. 🚨 ZATRZYMAJ SIĘ gdy wątpliwości
5. 💬 Komunikuj się

**TEN DOKUMENT = ŹRÓDŁO PRAWDY**

---
END