# PLAN WDROŻENIOWY: Zaawansowany Moduł Nadpłat i Globalna Pamięć Kredytu

## 1. Cel Projektu
Stworzenie najbardziej przejrzystego i wiarygodnego kalkulatora nadpłat w Polsce, w pełni zintegrowanego z globalną pamięcią stanu kredytu (brak konieczności wielokrotnego wpisywania tych samych danych), wyposażonego w transparentne źródła prawne (np. Ustawa o kredycie hipotecznym, wyroki UOKiK) oraz automatyczne testy jednostkowe i e2e (Playwright).

---

## 2. Podział Zadań dla Zespołu (Agenci)

### 🏛️ 1. Compliance & Legal Expert (Ekspert Prawny)
- **Zadanie:** Opracowanie sekcji źródeł prawnych oraz informatorów o prowizjach bankowych.
- **Szczegóły:** 
  - Ustawa o kredycie hipotecznym oraz o nadzorzie nad pośrednikami kredytowymi i agentami z dnia 23 marca 2017 r. (Art. 40 – prowizja max 3% przez pierwsze 36 miesięcy, po 3 latach 0%).
  - Rekomendacje KNF dot. wyliczania zdolności i buforów.
  - Informator o prawie do proporcjonalnego zwrotu prowizji przy wcześniejszej spłacie.

### 🧮 2. Financial Mathematician / Tech Lead (Architekt Algorytmów)
- **Zadanie:** Rozbudowa silnika obliczeniowego nadpłat.
- **Szczegóły:**
  - Iteracyjna symulacja miesiąc po miesiącu.
  - Dwa warianty: Skrócenie okresu vs Zmniejszenie raty.
  - Obsługa nadpłat jednorazowych oraz cyklicznych miesięcznych.
  - Automatyczne wyliczanie prowizji bankowej dla kredytów młodszych niż 36 miesięcy.

### 💾 3. State & Integration Specialist (Frontend / Context)
- **Zadanie:** Globalna pamięć kredytu i obsługa stanu.
- **Szczegóły:**
  - Rozszerzenie `LoanCalculatorContext` o parametry nadpłat oraz synchronizację z `sessionStorage` i URL.
  - Implementacja globalnego przycisku **Reset** przywracającego domyślne parametry kredytu.
  - Automatyczne przepływanie danych do wszystkich podstron kalkulatora.

### 🎨 4. UI/UX Designer
- **Zadanie:** Projekt widoku symulatora nadpłat i banerów edukacyjnych.
- **Szczegóły:**
  - Czytelne karty porównawcze (Stary harmonogram vs Nowy harmonogram).
  - Wykresy oszczędności na odsetkach oraz skrócenia czasu kredytowania.
  - Sekcja „Podstawa prawna i źródła” z bezpośrednimi odnośnikami i tooltipami.

### 🧪 5. QA & Test Engineer
- **Zadanie:** Testy jednostkowe (Vitest) i e2e (Playwright).
- **Szczegóły:**
  - Testy algorytmów nadpłat przy skrajnych przypadkach (np. nadpłata większa niż saldo).
  - Testy e2e sprawdzające globalną pamięć stanu przy przełączaniu podstron.

---

## 3. Harmonogram Realizacji (Krok po Kroku)

1. **Etap 1:** Utworzenie pliku specyfikacji w `docs/overpayment-specification.md` oraz źródeł prawnych w kodzie.
2. **Etap 2:** Rozbudowa `LoanCalculatorContext` o globalny stan nadpłat i funkcję `reset`.
3. **Etap 3:** Implementacja silnika matematycznego nadpłat w `src/utils/overpaymentEngine.ts` wraz z testami unit (`src/utils/overpaymentEngine.test.ts`).
4. **Etap 4:** Przebudowa komponentu `OverpaymentCalc.tsx` oraz podstrony `OverpaymentPage.tsx` z uwzględnieniem źródeł prawnych i wyboru strategii.
5. **Etap 5:** Uruchomienie pełnego zestawu testów `npm test` oraz e2e `npm run test:e2e`.
6. **Etap 6:** Build produkcyjny i deploy (zielone testy = automatyczny deploy).
