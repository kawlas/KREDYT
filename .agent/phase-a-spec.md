# Faza A — Kompendia wiedzy + Nawigacja

## Struktura URL

```
/poradniki/                    → lista wszystkich kompendiow
/poradniki/jak-obliczyc-rate/  → Kompendium: Jak obliczyc rate kredytu?
/poradniki/zdolnosc-kredytowa/ → Kompendium: Zdolnosc kredytowa
/poradniki/wibor-a-rata/       → Kompendium: WIBOR a rata kredytu
```

## Nawigacja (NavBar.tsx)

### Problem
Obecnie 14 pozycji w jednym rzędzie = za długo, nieczytelnie.

### Rozwiązanie
Podzielić na wyraźne grupy. Proponowana struktura:

```
[Logo] | Narzędzia ▼ | Poradniki | FAQ | O projekcie
```

**"Narzędzia"** — dropdown z podziałem na kategorie (wzorowane na HubPage):

| Kategoria | Pozycje |
|-----------|---------|
| Kalkulatory | Kalkulator raty, Zdolność kredytowa, LTV, Odsetki dzienne, Symulacja WIBOR |
| Porównaj | Raty równe/malejące, Porównanie banków, Refinansowanie, Stałe/Zmienne |
| Analiza | Ukryte koszty, Scoring BIK, Nadpłaty |

**"Poradniki"** — link do `/poradniki/`

**"FAQ"** — link do `/faq-kredyt-hipoteczny/`

**"O projekcie"** — link do `/o-projekcie/`

### Wariant awaryjny (jeśli dropdown za trudny)
Dwa rzędy:
- Rząd 1: Start, Kalkulator raty, Zdolność, LTV, WIBOR, Poradniki
- Rząd 2: Raty, Banki, Refinansowanie, Odsetki, Nadpłaty, Ukryte koszty, FAQ

### Mobile
Hamburger menu (obecne działa dobrze, wystarczy zaktualizować listę linków)

## Strony kompendiów

### /poradniki/ (lista wszystkich)
- Tytuł: "Poradniki kredytowe — Kompendium wiedzy"
- Opis: "Dowiedz się wszystkiego o kredytach hipotecznych..."
- Lista 3 kompendiów z opisem i CTA
- SEOHead z Article schema

### /poradniki/jak-obliczyc-rate/ — treść z Editora
- Tytuł z `<h1>`: "Jak obliczyć ratę kredytu hipotecznego? — Kompendium"
- Treść: ~3000-5000 słów (z pliku .agent/articles-content.md)
- CTA link do `/kalkulator-raty-kredytu/`
- Ramka eksperta
- Data publikacji
- Źródła

### /poradniki/zdolnosc-kredytowa/ — analogicznie
### /poradniki/wibor-a-rata/ — analogicznie

## Linkowanie (bez zmian w kalkulatorach)

Tylko dodać w stopce kalkulatorów sekcję:
```tsx
<section className="mt-8 border-t border-gray-100 pt-6">
  <h3 className="text-sm font-bold text-gray-700 mb-3">📖 Zobacz także:</h3>
  <ul className="space-y-1">
    <li><Link to="/poradniki/jak-obliczyc-rate/">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
    <li><Link to="/poradniki/zdolnosc-kredytowa/">Zdolność kredytowa — Kompendium wiedzy</Link></li>
  </ul>
</section>
```

## Testy (Tester)

### Dla każdej strony kompendium:
1. Strona ma `<h1>` z tytułem kompendium
2. Strona ma minimum 3000 znaków widocznego tekstu
3. Strona zawiera CTA z linkiem do odpowiedniego kalkulatora
4. Strona zawiera ramkę eksperta (tekst "Ekspert" lub "analityk")
5. Strona zawiera datę publikacji (`<time>` lub "2026")
6. Strona zawiera źródła (linki do NBP, KNF itp.)
7. JSON-LD Article schema z headline i datePublished

### Dla /poradniki/ (lista):
8. Strona zawiera listę co najmniej 3 poradników z linkami
9. Strona ma SEOHead z title i description

### Dla nawigacji:
10. NavBar zawiera link "Poradniki" prowadzący do `/poradniki/`
11. NavBar ma maksymalnie 6 głównych pozycji (nie licząc dropdownów)
12. NavBar na desktopie mieści się w jednym rzędzie

### Dla linkowania:
13. Każda z 8 stron kalkulatorów zawiera sekcję "Zobacz także" z linkiem do poradnika

### Code review (Tester po implementacji):
14. Brak błędów TypeScript
15. Brak regresji w istniejących testach
16. Strony renderują się bez błędów

## Kolejność
1. **Editor** — pisze treści do `.agent/articles-content.md`
2. **Tester** — pisze testy (RED phase)
3. **Developer** — implementuje:
   a. NavBar z dropdown
   b. 4 nowe strony (/poradniki/, /poradniki/jak-obliczyc-rate/, itd.)
   c. Linki w stopkach kalkulatorów
4. **Tester** — code review + testy (GREEN phase)
5. **CEO** — weryfikacja i commit
