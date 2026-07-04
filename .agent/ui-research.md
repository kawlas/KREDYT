# UI Research — KredytKalkulator
**Data:** 2026-07-04
**Researcher:** PI A (UI/UX Specialist)

---

## Analiza konkurencyjnych wzorców

### 1. Totalmoney.pl
| Aspekt | Obserwacja |
|--------|-----------|
| **Layout** | 1-kolumnowy, szeroki, z sekcjami poziomymi. Mega-menu z kategoriami. |
| **Nawigacja** | Górne mega-menu z podziałem na: Kredyty, Pożyczki, Konta, Lokaty, Ubezpieczenia itp. Wyszukiwarka. |
| **Kalkulatory** | Duży header z formularzem + 3 liczbami (rata, RRSO, całkowity koszt). Tabs: Kredyt hipoteczny / gotówkowy / konsolidacyjny. |
| **Content** | Artykuły poniżej kalkulatora. Sekcja "Eksperci" z autorytetami. |
| **Co adoptować** | Mega-menu z kategoriami, header z numbers (social proof), tabs dla różnych typów kredytów. |

### 2. Bankier.pl
| Aspekt | Obserwacja |
|--------|-----------|
| **Layout** | 1-kolumnowy, portalowy. Gęsty, dużo treści. |
| **Nawigacja** | Poziome menu z wieloma kategoriami (Rynki, Twoje finanse, Biznes, Narzędzia i kalkulatory). |
| **Kalkulatory** | W sidebarze lub na podstronach. Formularz + wyniki osobno. |
| **Content** | Artykuły, rankingi, sekcja "Najlepsze produkty finansowe" z kalkulatorami embed. |
| **Co adoptować** | Sekcja "Narzędzia i kalkulatory" jako kategoria. Sidebar z kalkulatorami na stronach contentowych. |

### 3. MortgageCalculator.org (US)
| Aspekt | Obserwacja |
|--------|-----------|
| **Layout** | 2-kolumnowy: lewa formularz, prawa wyniki (chart + podsumowanie). |
| **Nawigacja** | Minimalna — tylko navbar z narzędziami + sekcje edukacyjne. |
| **Kalkulatory** | Split layout: formularz (lewo) + wyniki (prawo). Wykres spłaty, tabela amortyzacyjna. |
| **Content** | Artykuły poniżej kalkulatora. Sekcja "Best Mortgage Rates" z danymi lokalnymi. |
| **Co adoptować** | Split layout (formularz + wyniki obok siebie). Wykres spłaty. Tabela amortyzacyjna. |

### 4. NerdWallet.com (US)
| Aspekt | Obserwacja |
|--------|-----------|
| **Layout** | 1-kolumnowy, ale z card-grid dla narzędzi. Czytelna typografia. |
| **Nawigacja** | Górna nawigacja + sticky. Narzędzia jako cards w gridzie. |
| **Kalkulatory** | Formularz na górze, wyniki poniżej (stacked). Progress indicators. |
| **Content** | Artykuły jako osobne kompendia. "Expert tips" w boxach. |
| **Co adoptować** | Card grid dla narzędzi. Stacked layout dla kalkulatorów na mobile. Expert tips w boxach. |

### 5. ComparetheMarket.com (UK)
| Aspekt | Obserwacja |
|--------|-----------|
| **Layout** | 1-kolumnowy, czysty design. Duże CTA. |
| **Nawigacja** | Prosta: produkty jako główne kategorie, podkategorie w dropdown. |
| **Kalkulatory** | Wizard-style (krok po kroku) lub formularz + wyniki. |
| **Content** | Edukacyjne sekcje "How it works" z ikonami. |
| **Co adoptować** | Wizard flow dla skomplikowanych obliczeń. "How it works" z ikonami. |

### 6. Rankomat.pl
| Aspekt | Obserwacja |
|--------|-----------|
| **Layout** | 1-kolumnowy. Nagłówek z formularzem, wyniki w tabeli poniżej. |
| **Nawigacja** | Top menu: Kredyty, Konta, Ubezpieczenia itp. |
| **Kalkulatory** | Formularz + wyniki w jednej kolumnie (stacked). |
| **Content** | Rankingi banków, sekcja "Warto wiedzieć", FAQ. |
| **Co adoptować** | Ranking banków w tabeli. Sekcja "Warto wiedzieć" z linkami do kompendiów. |

---

## Rekomendacje dla naszej strony

### A. Strona główna (HubPage)

**Rekomendacja: 1 kolumna, 5 sekcji**

```
┌────────────────────────────────────┐
│  🔍 HERO — H1 + CTA (2 buttony)   │
│  "Kalkulator Kredytu Hipotecznego" │
│  [Oblicz ratę] [Sprawdź zdolność]  │
├────────────────────────────────────┤
│  HOW IT WORKS — 3 kroki (cards)    │
│  Sprawdź → Symuluj → Porównaj      │
├────────────────────────────────────┤
│  SOCIAL PROOF — 3 liczby           │
│  (61 testów, aktualny WIBOR,       │
│   zgodność z ustawą)               │
├────────────────────────────────────┤
│  CO MOŻESZ ZROBIĆ — Narzędzia      │
│  Grid 1-2-4 kolumny z cardami      │
│  (Sprawdź, Symuluj, Porównaj)      │
├────────────────────────────────────┤
│  FAQ (tzw. "accordion")            │
│  + CTA "Zobacz wszystkie FAQ"      │
└────────────────────────────────────┘
```

**Aktualny stan:** Nasza strona główna MA już tę strukturę! Jednak brakuje:
- Mega-menu z kategoriami (Sprawdź / Symuluj / Porównaj) w navbarze
- Wyszukiwarki w navbarze
- Sekcji "Najnowsze kompendia" lub "Polecane artykuły"

**Rekomendowane zmiany na stronie głównej:**
1. **Dodać sekcję "Kompendia wiedzy"** — 3-4 ostatnie artykuły w formie cardów
2. **Wzmocnić nawigację** — kategorie narzędzi powinny być dostępne z poziomu navbaru (dropdown z kategoriami Sprawdź/Symuluj/Porównaj)
3. **Dodać sekcję "Dlaczego my?"** (zaufanie, dane, law)

### B. Strony kalkulatorów

**Rekomendacja: 2 kolumny na desktop, 1 kolumna na mobile**

```
DESKTOP (≥1024px):
┌─────────────────┬─────────────────┐
│   FORMULARZ     │     WYNIKI      │
│  (lewa kolumna) │ (prawa kolumna) │
│                 │                 │
│  Kwota kredytu  │ Rata: 2.450 zł │
│  Okres spłaty   │ RRSO: 7.2%     │
│  Oprocentowanie │ Koszt: 180.000 │
│  Typ rat        │                 │
│                 │  [Wykres spłaty] │
│  [Oblicz]       │                 │
└─────────────────┴─────────────────┘
│  TREŚCI EDUKACYJNE (full width)   │
│  Opis narzędzia, wskazówki, FAQ   │
└────────────────────────────────────┘
│  "ZOBACZ TAKŻE" — related tools   │
│  Grid 2-3 kolumny z cardami       │
└────────────────────────────────────┘
```

**Aktualny stan:** Na desktopie mamy grid 2-kolumnowy z formularzem i wynikami obok siebie. Na mobile przechodzi w 1 kolumnę. To jest DOBRE. Treści edukacyjne są już dodawane (opis, wskazówki, FAQ).

**Rekomendowane zmiany dla kalkulatorów:**
1. **Utrzymać 2-kolumnowy layout** na desktopie (formularz + wyniki obok siebie)
2. **Na mobile** formularz na górze, wyniki poniżej (stack)
3. **Treści edukacyjne** poniżej kalkulatora, na pełną szerokość
4. **Dodać "Źródła danych"** jako małą stopkę na dole sekcji kalkulatora
5. **Dodać sticky header** z nazwą narzędzia podczas scrolla

### C. Strony kompendiów (artykuły)

**Rekomendacja: 1 kolumna (blog-style), max-width 3xl (≈768px)**

```
┌────────────────────────────────────┐
│  Breadcrumb                        │
│  Strona główna > Poradniki > WIBOR │
├────────────────────────────────────┤
│  TYTUŁ ARTYKUŁU (H1)              │
│  Lead (1-2 zdania, text-lg)        │
├────────────────────────────────────┤
│  Treść artykułu                    │
│  - Nagłówki H2, H3                │
│  - Listy, cytaty, wyróżnienia     │
│  - Sekcja FAQ na dole             │
├────────────────────────────────────┤
│  RELATED TOOLS (karty)             │
└────────────────────────────────────┘
```

**Aktualny stan:** Kompendia (WiborARataPage, CreditCapacityCompendiumPage, JakObliczycRatePage) już mają zbliżoną strukturę — 1 kolumna, prose, max-width 3xl. To jest DOBRE.

**Rekomendowane zmiany dla kompendiów:**
1. **Dodać breadcrumb** (już jest w SEOHead, ale nie wizualnie)
2. **Dodać sidebar** na desktopie z "Spis treści" (tabela contents) i "Powiązane narzędzia"
3. **Dodać date publikacji/aktualizacji** (wymóg AdSense)
4. **Dodać autora** (E-E-A-T requirement)
5. **Dodać CTA** do odpowiedniego kalkulatora w treści

### D. System spójności (design system)

**Rekomendowane wartości:**

| Element | Wartość | Uwagi |
|---------|---------|-------|
| **Spacing (gap/margin/padding)** | 4/8/12/16/24/32/48/64px | Bazować na Tailwind (1=4px) |
| **Max-width strony** | 1280px (max-w-7xl) | Obecne: ok. 7xl |
| **Max-width tekstu** | 768px (max-w-3xl) | Dla czytelności artykułów |
| **Border-radius** | 8px (xl), 12px (2xl), 16px (3xl) | Spójne zaokrąglenia |
| **Font family** | Inter lub system sans-serif | Obecnie: systemowy |
| **Font sizes** | 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl), 30px (3xl), 36px (4xl) | Tailwind scale |
| **Colors** | blue-600 (primary), gray-900 (text), gray-500 (secondary), blue-50 (bg highlight) | Tailwind palette |
| **Shadow** | shadow-sm (karty), shadow-md (hover cards) | Obecnie: już stosowane |
| **Cards** | bg-white, border, rounded-xl, p-6, hover:shadow-md | Jednolity wzór |
| **Buttons** | rounded-xl, px-8 py-4, font-semibold, text-lg | CTA primary/secondary |
| **Form fields** | border, rounded-lg, p-3, focus:ring-blue-500 | Spójne z Tailwind |

**Aktualny stan spójności:**
- Spacing: OK (Tailwind conventions)
- Kolory: OK (blue-600 primary, gray-900 text)
- Karty: OK (Card component już istnieje)
- Formularze: OK (LoanForm component)
- Typografia: OK (Tailwind prose)

**Luki:**
1. Brak spójnego breadcrumb — na stronach głównych jest (w SEOHead), ale nie jako komponent wizualny
2. Brak spójnego schematu dla dat publikacji
3. Brak spójnych "Źródeł danych" na stronach kalkulatorów
4. Brak spójnego sidebaru na stronach kompendiów

---

## Kluczowe wnioski i priorytety

### Priorytet 1 (HIGH - wymogi AdSense/YMYL)
- Dodać breadcrumb wizualnie na wszystkich stronach
- Dodać datę publikacji/aktualizacji
- Dodać źródła danych i autorytety

### Priorytet 2 (MEDIUM - UX)
- Ujednolicić layout kalkulatorów (2 kolumny desktop, 1 mobile)
- Dodać sekcję kompendiów na stronie głównej
- Dodać mega-menu z kategoriami narzędzi
- Dodać "Related tools" na stronach kompendiów

### Priorytet 3 (LOW - design system)
- Stworzyć spójny design system (zmienne CSS)
- Ujednolicić breadcrumb jako komponent
- Dodać skeleton loading dla kalkulatorów

---

## Podsumowanie wdrożenia

| Obszar | Co zmienić | Plik |
|--------|-----------|------|
| **Navbar** | Dodać kategorie (dropdown ze Sprawdź/Symuluj/Porównaj) | `NavBar.tsx` |
| **Strona główna** | Dodać sekcję "Kompendia wiedzy" | `HubPage.tsx` |
| **Kalkulatory** | Utrzymać 2-kolumnowy layout, dodać źródła danych | `CalculatorPage.tsx` i inne |
| **Kompendia** | Dodać breadcrumb wizualny, sidebar, datę, autora | pliki `*CompendiumPage.tsx` |
| **Breadcrumb** | Stworzyć komponent `<Breadcrumb />` | nowy plik w `components/shared/` |
| **Źródła danych** | Stworzyć komponent `<DataSourceBanner />` | już istnieje w `shared/` |
| **Date/Author** | Stworzyć komponent `<ArticleMeta />` | nowy plik w `components/shared/` |

---

**Raport UI/UX Research gotowy do implementacji!** 🚀
