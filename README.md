# 🏦 Kalkulator Kredytu Hipotecznego

**Live:** [https://kredytkalkulator.netlify.app/](https://kredytkalkulator.netlify.app/)

Najlepszy kalkulator kredytowy w Polsce. Pokazuje **PRAWDĘ** o kosztach kredytu — bez ukrytych opłat. Obliczenia zgodne z rekomendacją KNF, uwzględniające bufor na wzrost stóp.

---

## ✨ Wszystkie funkcjonalności

### 🧮 Kalkulatory
| Funkcja | Opis | Status |
|---|---|---|
| **Podstawowa rata** | Równe i malejące, z harmonogramem spłat | ✅ |
| **RRSO** | Rzeczywista roczna stopa oprocentowania z uwzględnieniem prowizji i kosztów | ✅ |
| **Zdolność kredytowa** | Według rekomendacji KNF (dochód, zobowiązania, liczba osób w gospodarstwie) | ✅ |
| **Porównanie rat** | Równe vs malejące — różnica w odsetkach i całkowitym koszcie | ✅ |
| **Symulator WIBOR** | Jak zmiana stóp wpływa na ratę, z strefą bezpieczeństwa DSTI | ✅ |
| **Nadpłaty** | Jednorazowe i cykliczne, skrócenie okresu lub zmniejszenie raty | ✅ |
| **Odsetki dzienne** | ACT/365 vs ACT/360, skumulowane odsetki | ✅ |
| **Refinansowanie** | Analiza opłacalności (oszczędności vs koszty, break-even) | ✅ |
| **Porównanie ofert banków** | Ranking 7 banków po całkowitym koszcie z buforem KNF | ✅ |

### 💾 Zapisywanie i udostępnianie
- Zapisywanie ofert w localStorage (max 5)
- Parametry w URL dla udostępniania (`?amount=&period=&wibor=&margin=&type=`)

### 🌐 SEO i treści
- FAQ blok z danymi strukturalnymi (Schema.org)
- Strony tematyczne (slug-based)
- Meta tags per-page (react-helmet-async)
- Polityka prywatności, o projekcie, metodologia, kontakt

### 📡 Automatyczne aktualizacje
- **WIBOR** — codziennie 9:00 CET (GitHub Actions → `public/wibor.json`)
- **Oferty banków** — co tydzień (GitHub Actions → `public/bank-offers.json`)

---

## 🛠️ Tech Stack

| Warstwa | Technologia |
|---|---|
| Framework | React 18 + TypeScript |
| Budowanie | Vite 5 |
| Stylowanie | Tailwind CSS 3 |
| Formularze | React Hook Form 7 |
| Routing | React Router 7 |
| Animacje | Motion 11 |
| Testy | Vitest 2 + Testing Library |
| SSR | Vite SSR + prerender (Node script) |
| Deployment | Netlify + Netlify Functions |
| CI/CD | GitHub Actions |

---

## 🧪 Testy

```bash
npm test              # vitest run — 75 testów, 12 plików, wszystkie zielone
npm run test:coverage # pokrycie kodu
npm run test:watch    # watch mode
```

### Pokrycie testami
| Moduł | Testy |
|---|---|
| `loanCalculations` | Obliczenia rat, RRSO, całkowity koszt |
| `overpayment` | Symulacja nadpłat + brzegowe przypadki (ujemne wartości) |
| `refinancing` | Pozostałe saldo, analiza opłacalności |
| `paymentComparison` | Porównanie rat równe vs malejące |
| `affordabilityFormulas` | Zdolność kredytowa według KNF |
| `dailyInterest` | Odsetki ACT/365 i ACT/360 |
| `costBreakdown` | Podział kosztów kredytu |
| `calculationStorage` | localStorage operations |
| `wiborFetcher` | Fetch + fallback + cache |
| `bankComparison` | Sortowanie, allInCost, generowanie ofert |
| `App` | Renderowanie tytułu aplikacji |
| `CalculatorPage` | Debounced auto-obliczenia |

---

## 🚀 Quick Start

```bash
git clone https://github.com/kawlas/KREDYT.git
cd KREDYT
npm install
npm run dev        # lokalny serwer deweloperski
npm run build      # build produkcyjny + prerender
npm run preview    # podgląd builda
```

## 🔧 Skrypty

| Komenda | Opis |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Full build (client + server + prerender) |
| `npm run test` | Uruchom testy |
| `npm run test:watch` | Testy w watch mode |
| `npm run test:coverage` | Testy z raportem pokrycia |
| `npm run lint` | ESLint |
| `npm run preview` | Podgląd builda produkcyjnego |

---

## 📊 Źródła danych

### WIBOR
- **Źródło:** Stooq.pl (darmowe API CSV)
- **Aktualizacja:** Codziennie 9:00 CET przez GitHub Actions
- **Fallback:** 5.85% gdy API niedostępne

### Oferty banków
- **Źródło:** Bankier.pl — ranking kredytów hipotecznych (dane publiczne)
- **Aktualizacja:** Co tydzień przez GitHub Actions
- **Banki:** PKO BP, ING, Santander, mBank, Millennium, Pekao, Alior

---

## 📄 Licencja

MIT