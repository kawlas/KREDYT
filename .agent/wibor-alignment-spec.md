# Sprint WIBOR + Alignment + Bankier Link — Specyfikacja

## 1. WIBOR Page — wyrównanie kolumn

**Plik:** `src/components/calculators/WiborSimulator.tsx`

### Problem
Lewa kolumna ("Przetestuj scenariusze") i prawa kolumna ("Wynik symulacji") nie są wyrównane.
- Lewa kolumna ma tytuł wewnątrz `Card`
- Prawa kolumna ("Wynik symulacji") ma inny układ — tytuł wewnątrz `Card` ale inna wysokość
- Oba nagłówki zaczynają się na innej wysokości (offset pionowy)

### Rozwiązanie
Obie kolumny powinny:
- Mieć tytuł `Card` na tej samej wysokości (items-start w gridzie)
- Używać `items-start` w głównym gridzie
- Zachować `sticky top-8` w prawej kolumnie

Zmiana: W głównym `grid grid-cols-1 md:grid-cols-2 gap-8` dodać `items-start`.

Sprawdzić też czy `Card` komponent ma spójny padding na górze (tytuł zawsze w tej samej odległości od krawędzi).

## 2. Ogólne wyrównanie kart — nagłówki na tej samej wysokości

**Pliki:** Wszystkie strony kalkulatorów (CalculatorPage, AffordabilityPage, DailyInterestPage, itp.)

### Zasada
Gdzie dwie kolumny/sekcie są obok siebie → nagłówki zaczynają się na tej samej wysokości.

### Prawdopodobne miejsca do poprawy
- PaymentComparisonPage.tsx: sekcje "Którą ratę wybrać" + "Jak zmieniają się raty"
- PaymentComparisonPage.tsx: karty porównawcze (Raty równe vs Raty malejące)
- AffordabilityPage.tsx: formularz + wyniki
- LTVPage.tsx: formularz + wyniki

Rozwiązanie: `grid items-start` na kontenerach + spójny padding w Cardach.

## 3. Bankier.pl link — naprawa

**Plik:** `public/bank-offers.json`

### Problem
`sourceUrl`: `https://www.bankier.pl/smart/mieszkaniowe/` → nie działa (500/redirect)

### Rozwiązanie
Zmienić na działający link:
- Opcja A: `https://www.bankier.pl/smart/mieszkaniowe/kredyty-hipoteczne` (jeśli działa)
- Opcja B: `https://www.bankier.pl/mieszkanie/kredyt-hipoteczny` (strona główna kredytów hipotecznych)
- Opcja C: `https://wibor.nbp.pl/` (NBP - oficjalne źródło WIBOR)

Dla wiarygodności: zmienić źródło na NBP (oficjalne dane WIBOR) a nie Bankier (rankingi).

Zmiana w bank-offers.json:
```json
"source": "NBP (wibor.nbp.pl) oraz dane rynkowe banków",
"sourceUrl": "https://wibor.nbp.pl/",
```
