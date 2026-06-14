# 🏠 Kalkulator Kredytu Hipotecznego

**Live:** https://kredytkalkulator.netlify.app/

Najlepszy kalkulator kredytowy w Polsce. Pokazuje PRAWDĘ o kosztach kredytu - bez ukrytych opłat.

---

## ✨ Features (MVP)

- ✅ Kalkulator raty (równe/malejące)
- ✅ RRSO (rzeczywisty koszt)
- ✅ Porównanie ofert
- ✅ Responsywny design
- ✅ Zapisywanie w przeglądarce

---

## 🚀 Phase 2 (In Development)

**Week 1:**
1. "Czy mnie na to stać?" - kalkulator zdolności
2. Wszystkie koszty breakdown
3. Porównanie równe vs malejące
4. Symulator WIBOR
5. Kalkulator nadpłat
6. LTV impact calculator

**Week 2:**
- Refinansowanie
- Harmonogram spłat
- Export PDF
- Share links

---

## 🛠️ Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Motion.dev

---

## Automatyczna aktualizacja WIBOR

WIBOR jest automatycznie aktualizowany raz dziennie o 9:00 CET przez GitHub Actions.

- **Dane:** `public/wibor.json`
- **Workflow:** `.github/workflows/update-wibor.yml`
- **Skrypt:** `scripts/fetch-wibor.js`

### Ręczne uruchomienie
1. Przejdź do zakładki **Actions** w GitHub
2. Wybierz workflow "Update WIBOR Daily"
3. Kliknij "Run workflow"

### Użycie w kodzie
```javascript
const response = await fetch('/wibor.json');
const { rates, updated } = await response.json();
console.log('WIBOR 3M:', rates['3M']);
```


---

## 📊 Źródła danych o ofertach bankowych

Aplikacja wykorzystuje dane o aktualnych marżach kredytowych z następujących źródeł:

### Aktualne źródło (bezpłatne)
- **Bankier.pl** - ranking kredytów hipotecznych (dane publicznie dostępne)
- Automatyczna aktualizacja przez GitHub Actions co tydzień
- Skrypt: `scripts/fetch-bank-offers.js`
- Workflow: `.github/workflows/update-bank-offers.yml`

### Alternatywne źródła (planowane na przyszłość)
- **Rankomat.pl** - posiada szczegółowe dane B2B, wymaga płatnego dostępu API
- **TotalMoney.pl** - porównywarka produktów finansowych, dane dostępne w modelu B2B
- Możliwość integracji w przyszłości po uzyskaniu odpowiednich licencji dostępu do danych

> ℹ️ Źródła Rankomat i TotalMoney oferują bardziej szczegółowe dane B2B, ale obecnie wymagają płatnych subskrypcji. Ich integracja jest możliwa w przyszłości jako rozwinięcie funkcjonalności porównywarki ofert.

