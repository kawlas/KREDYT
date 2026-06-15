# Plan poprawek — KREDYT (Kalkulator Kredytu Hipotecznego)

**Data utworzenia:** 2026-06-14
**Status:** ✅ Faza 1 (P0) i Faza 2 (P1) zrealizowane

> **Aktualizacja 2026-06-15:** Przeprowadzono pełny audyt kodu + 3 cykle TDD Red-Green. Naprawiono bug krytyczny (`paid is not defined`), dodano 13 nowych testów (75 łącznie), wyeliminowano niebezpieczne `!` assertions, dodano walidację ujemnych wartości. Wszystkie testy przechodzą.

## Kontekst audytu

Aplikacja React 18 + Vite + TypeScript + Tailwind, SSR (prerender), AdSense, GitHub Actions do aktualizacji WIBOR. Audyt wykazał 50 problemów w 4 kategoriach priorytetów. Plan realizacji poniżej.

## Legenda priorytetów
- **P0** — krytyczne (poprawność obliczeń / bezpieczeństwo)
- **P1** — ważne (logika / UX)
- **P2** — optymalizacja / czystość kodu
- **P3** — porządkowe

---


## Faza 1 — Krytyczne (P0)

### 1. RRSO — jedno źródło prawdy, oparte na harmonogramie
- **Pliki:** `src/utils/loanCalculations.ts:147-185`, `src/utils/rrsoCalculations.ts`, `src/utils/index.ts`
- **Problem:** Dwie sprzeczne implementacje `calculateRRSO`. Obecna używa średniej raty — niepoprawne dla rat malejących. Druga w `rrsoCalculations.ts` jest uproszczona i nie bierze pod uwagę prowizji.
- **Fix:** Zostawić jedną implementację w `loanCalculations.ts` opartą na `generateAmortizationSchedule`. Bisekcja po `r` na sumie `Σ payment_i / (1+r)^i`. Dodać prowizję w miesiącu 0. Usunąć `rrsoCalculations.ts`. Zaktualizować eksporty. Dodać testy.

### 2. AdSlot: brak slotu = brak komponentu
- **Pliki:** `src/components/shared/AdSlot.tsx`
- **Problem:** Hardcoded `YOUR_AD_SLOT_ID` gdy brak `slot`. AdSense zapycha kolejkę i rzuca `TagError`.
- **Fix:** Jeśli brak `slot`, `return null`. W dev: `console.warn`. Zachować bezpieczeństwo typów.

### 3. `crypto.randomUUID()` polyfill
- **Pliki:** `src/context/LoanCalculatorContext.tsx:218`
- **Problem:** Stare przeglądarki (Safari < 15.4) rzucą wyjątek.
- **Fix:** Helper `safeRandomId()` w utils, używa `crypto.randomUUID` jeśli dostępne, w przeciwnym razie `${Date.now()}-${Math.random()...}`.

### 4. ErrorBoundary
- **Pliki:** `src/App.tsx`, `src/pages/CalculatorPage.tsx`
- **Problem:** Crash w `localStorage.getItem` (tryb prywatny) lub `useWIBOR` = biały ekran.
- **Fix:** Nowy `src/components/shared/ErrorBoundary.tsx`, opakować `<Routes>` w `App.tsx` oraz krytyczne widoki.

### 5. AffordabilityCalc ignoruje `wibor` z formularza
- **Pliki:** `src/components/calculators/AffordabilityCalc.tsx:38-44`
- **Problem:** Hardcoded `wibor: 5.85` — użytkownik widzi obliczenia dla 5.85% mimo że ustawił inną wartość.
- **Fix:** `wibor: values.wibor ?? 5.85`. Dodać test.

### 6. Walidacja zakresu `annualRate` w `calculateMonthlyPayment`
- **Pliki:** `src/utils/loanCalculations.ts:24-58`
- **Problem:** `Math.pow(1+999, 300) = Infinity` → NaN w UI.
- **Fix:** Rzucić `RangeError` jeśli `annualRate > 100` lub `months > 600` (50 lat).

---

## Faza 2 — Ważne (P1)

### 7. Usuń martwy `useLoanCalculator.ts` z hooks
- **Pliki:** `src/hooks/useLoanCalculator.ts`
- **Problem:** Duplikuje logikę, mówi o 3 ofertach (reszta mówi 5). Nikt go nie importuje.
- **Fix:** Usunąć. Zostawić jedynie `useLoanCalculator` z contextu.

### 8. Walidacja age/income/dependents w AffordabilityCalc
- **Pliki:** `src/components/calculators/AffordabilityCalc.tsx`
- **Problem:** `age=15` akceptowane, `age=80` daje 0 z kiepskim komunikatem.
- **Fix:** Dodać `min/max` w `register`. Alert jeśli poza zakresem.

### 9. Walidacja URL params w `LoanCalculatorContext`
- **Pliki:** `src/context/LoanCalculatorContext.tsx:155-180`
- **Problem:** `?amount=abc` → `Number("abc") = NaN`. Cicha akceptacja lub crash RHF.
- **Fix:** Helper `parseFiniteNumber()`, sprawdza `Number.isFinite && > 0`.

### 10. Bezpieczny dostęp do `localStorage` w SSR
- **Pliki:** `src/utils/wiborFetcher.ts`, `src/utils/calculationStorage.ts`
- **Problem:** Bezpośredni `localStorage.getItem` może rzucić w trybie prywatnym.
- **Fix:** Helper `utils/safeStorage.ts` z try/catch. Wszystkie użycia przez helper.

### 11. Pojedynczy magazyn kalkulacji
- **Pliki:** `src/context/LoanCalculatorContext.tsx`, `src/utils/calculationStorage.ts`
- **Problem:** Dwa klucze `localStorage` — `loan-calculator-offers` i `mortgage_calculator_saved_calculations`. Niezsynchronizowane.
- **Fix:** Wybrać `calculationStorage` jako jedyne źródło. Zaktualizować `LoanCalculatorContext` żeby delegował do utils. Dodać deduplikację po `name` w `saveOffer`.

### 12. Usuń `console.log` w produkcji
- **Pliki:** `src/main.tsx`, `src/utils/wiborFetcher.ts`
- **Fix:** Usunąć lub owinąć w `if (import.meta.env.DEV)`.

### 13. Usuń typy `any` z `CalculatorPage`, `ShareButton`, `entry-server`
- **Pliki:** `src/pages/CalculatorPage.tsx:21-35`, `src/components/shared/ShareButton.tsx:4`, `src/entry-server.tsx:9`, `src/context/LoanCalculatorContext.tsx:280`
- **Fix:** Zdefiniować `CalculatorPageProps`. W `entry-server` import `HelmetContext`. Usunąć `@ts-ignore`.

---

## Faza 3 — Optymalizacja (P2)

### 14. `useMemo` w `PaymentComparison` i `WiborSimulator`
- **Pliki:** `src/components/calculators/PaymentComparison.tsx:33-35`
- **Fix:** `useMemo(() => comparePaymentTypes(...), [loanAmount, annualRate, loanTermYears])`.

### 15. Napraw subskrypcje `watch` w `LoanCalculatorContext`
- **Pliki:** `src/context/LoanCalculatorContext.tsx:64, 96`
- **Fix:** Użyj pustej tablicy deps, sub w `useEffect` z cleanup. Unikaj re-subskrypcji.

### 16. `useState` zgrupowany w `useWIBOR`
- **Pliki:** `src/hooks/useWIBOR.ts`
- **Fix:** Jeden `useState<WIBORState>`, akcje `setState((p) => ({...p, wibor: x}))`.

### 17. Napraw `utils/index.ts` — pojedyncze RRSO, czyste eksporty
- **Pliki:** `src/utils/index.ts`
- **Fix:** Jawne eksporty zamiast `export *`. Brak shadowing.

### 18. Usuń nieużywany `formatNumber`
- **Pliki:** `src/utils/formatters.ts:21`
- **Fix:** Usunąć po sprawdzeniu czy nigdzie nie jest importowany.

### 19. Alert → Toast (komponent + zamiana wywołań)
- **Pliki:** `src/context/LoanCalculatorContext.tsx:211`, `src/pages/CalculatorPage.tsx:75`, `src/pages/ContactPage.tsx:24`
- **Fix:** Nowy `src/components/shared/Toast.tsx` + context. Prosty stos 1-2 toastów. Animowany, auto-dismiss.

### 20. Walidacja `margin > 100` w `costBreakdown` itd.
- **Pliki:** `src/utils/loanCalculations.ts`
- **Fix:** clamp na wejściu, `Math.max(0, Math.min(annualRate, 100))`.

### 21. `AdSlot` z obsługą `compact` + bezpieczeństwa typów
- **Pliki:** `src/components/shared/AdSlot.tsx`
- **Fix:** Dodaj `compact?: boolean` jak w `WIBORDisplay`. Type guard dla `slot`.

### 22. Polskie literówki
- **Pliki:** `src/components/ResultsCard.tsx:355`
- **Fix:** Popraw "koszy kredytu?" → "koszty kredytu?". Porządek tekstów.

### 23. Popraw `prerender.js` — unikaj regex
- **Pliki:** `prerender.js:23-24`
- **Fix:** Wyekstrahuj slugi do `src/data/topics.json` w build kroku, albo czytaj z `dist` po tsc.

### 24. AdSense script w `index.html` vs `prerender.js`
- **Pliki:** `index.html:7-8`, `prerender.js:42-50`
- **Problem:** AdSense script ładowany z `index.html` **i** z `helmet` — podwójne ładowanie.
- **Fix:** Wywalić z `index.html`, zostawić tylko w `App` jako side-effect lub w `prerender` wstrzykiwać w `<head>`.

### 25. Centralne `constants` (timing, MAX_OFFERS)
- **Pliki:** `src/types/constants.ts`, `src/context/LoanCalculatorContext.tsx`, `src/components/LoanForm.tsx`
- **Fix:** `MAX_OFFERS = 5`, `HYDRATION_DELAY_MS = 200`, `DEBOUNCE_VALIDATION_MS = 500`, `FAKE_LOADING_MS = 300` w `constants.ts`.

---

## Faza 4 — Porządkowe (P3)

### 26. `.env.example` + env vars w kodzie
- **Pliki:** `src/components/shared/SEOHead.tsx`, `src/components/shared/AdSlot.tsx`
- **Fix:** Nowy `.env.example` z `VITE_SITE_URL`, `VITE_ADSENSE_PUB_ID`. Komponenty używają env.

### 27. ESLint reguły
- **Pliki:** `eslint.config.js`
- **Fix:** Dodać `no-console: warn`, `@typescript-eslint/no-explicit-any: error`.

### 28. Testy dla nowych ścieżek
- **Pliki:** testy dla `costBreakdown`, `paymentComparison`, `wiborFetcher`, `calculationStorage`, `loanCalculations` (RRSO).
- **Fix:** Dodać `src/utils/costBreakdown.test.ts`, `paymentComparison.test.ts`, `wiborFetcher.test.ts`, `calculationStorage.test.ts`.

### 29. Scripts test w `package.json`
- **Pliki:** `package.json`
- **Fix:** `"test": "vitest run"`, `"test:watch": "vitest"`, `"test:coverage": "vitest run --coverage"`.

### 30. Type `source` w `WIBORDisplay` — dodaj `"bankier"`
- **Pliki:** `src/components/shared/WIBORDisplay.tsx:7`
- **Fix:** Rozszerzyć unii.

### 31. `aria-live` na wynikach kalkulatora
- **Pliki:** `src/components/ResultsCard.tsx:51-80`
- **Fix:** `aria-live="polite"`.

### 32. Ogólne — favicon, schema.org Organization
- **Pliki:** `index.html`, `src/components/shared/SEOHead.tsx`
- **Fix:** Custom favicon, dodać Organization JSON-LD w `SEOHead`.

### 33. `vite.config.ts` — proxy mock
- **Pliki:** `vite.config.ts:14-28`
- **Fix:** Mock pod `?mock=true`, w innym razie prawdziwy fetch z `public/wibor.json`.

---

## Konwencja commitów

Każda faza kończy się **jednym commitem** (lub kilkoma, jeśli naturalny podział):

- `fix(critical): ...` dla P0
- `fix(important): ...` dla P1
- `refactor: ...` dla P2
- `chore: ...` dla P3

Branch: `codex/audit-fixes-2026-06` (odgałęzienie od `main` po `git pull`).

---

## Weryfikacja końcowa

- `npm run lint` — zero błędów
- `npm test` — wszystkie testy zielone
- `npm run build` — sukces
- `git diff main` — kontrola wzrokowa

