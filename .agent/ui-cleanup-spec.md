# Sprint UI Cleanup — Specyfikacja

## Cel
Ujednolicenie layoutu, usunięcie emoji, kolorystyka spójna, wszystko left-aligned.

## A. Strona główna (HubPage.tsx)

### A1. Left-align wszystko
Usuń wszystkie `text-center`:
- Hero section: H1 + opis → left-aligned
- "Jak to działa" → left (3 kroki, ale tekst do lewej)
- "Co możesz zrobić" → left
- "Zaufaj liczbom" → left
- FAQ na stronie głównej → left

### A2. Usuń emoji
Usuń: 📋, 📊, 🎯 z nagłówków sekcji "Sprawdź", "Symuluj", "Porównaj"

### A3. Karty → kompaktowe
Obecnie: `p-6 border-l-4 h-full` → za duże.
Zmień na:
```tsx
className="group block bg-white rounded-lg border border-gray-100 p-4 ..."
```
- padding: p-6 → p-4
- border-l-4 → zwykły border lub left border thinner
- mniejsze gap-y w gridzie
- zmiejszyć font-size tytułów (semibold → medium)
- ukryć badge ("Sprawdź", "Symuluj", "Porównaj") lub zrobić mniejszy

### A4. Kolory spójne z Sidebarem
- Kategoria "Sprawdź" → niebieski (blue-500/blue-50)
- Kategoria "Symuluj" → zielony (emerald-500/emerald-50) 
- Kategoria "Porównaj" → fioletowy (violet-500/violet-50)
- Te SAME kolory w Sidebarze

## B. Sidebar (Sidebar.tsx)

### B1. Usuń wszystkie emoji
Zamień ikonki na zwykły tekst:
```
🏠 Strona główna → Strona główna
🧮 Kalkulator raty → Kalkulator raty
📊 Zdolność kredytowa → Zdolność kredytowa
... itd.
```

### B2. Dodaj kolory kategorii
- "Kalkulatory" → aktywny link: bg-blue-50 text-blue-600, hover: bg-blue-50
- "Porównaj" → aktywny link: bg-violet-50 text-violet-600, hover: bg-violet-50
- "Analiza" → aktywny link: bg-emerald-50 text-emerald-600, hover: bg-emerald-50
- Reszta (Poradniki, FAQ, O projekcie) → standard: bg-gray-100 text-gray-700

```tsx
// W Sidebar.tsx - funkcja doboru koloru
function getActiveClass(path: string, isActive: boolean) {
  const category = categoryColors[path]
  if (!isActive) return 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
  if (category === 'blue') return 'text-blue-600 bg-blue-50'
  if (category === 'violet') return 'text-violet-600 bg-violet-50'
  if (category === 'emerald') return 'text-emerald-600 bg-emerald-50'
  return 'text-blue-600 bg-blue-50'
}
```

Mapowanie kategorii:
```ts
const categoryColors: Record<string, string> = {
  '/kalkulator-raty-kredytu/': 'blue',
  '/zdolnosc-kredytowa/': 'blue',
  '/ltv-kalkulator/': 'blue',
  '/symulacja-wibor/': 'blue',
  '/odsetki-dzienne/': 'blue',
  '/symulator-nadplat/': 'blue',
  '/raty-rowne-czy-malejace/': 'violet',
  '/porownanie-ofert-bankow/': 'violet',
  '/refinansowanie-kredytu/': 'violet',
  '/stale-vs-zmienne-oprocentowanie/': 'violet',
  '/ukryte-koszty-kredytu/': 'emerald',
  '/co-wplywa-na-zdolnosc/': 'emerald',
}
```

## C. General alignment cleanup

### C1. Wszystkie text-center usunięte
Przeskanować wszystkie pliki `src/pages/` i `src/components/` (poza testami) i usunąć `text-center` z:
- TabContainer.tsx (✅ już zrobione)
- FaqBlock.tsx (✅ już zrobione — heading left)
- HubPage.tsx (❌ do zrobienia)
- TopicPage.tsx (❌ do zrobienia)
- Wszystkie strony które mają centered content

### C2. Calculator two-column layout
W kalkulatorach z dwiema kolumnami (formularz + wyniki):
- Obie kolumny powinny zaczynać się na tej samej wysokości (align-items-start)
- Elementy wewnątrz kolumn powinny mieć spójne marginesy/padding
- Tabele z wynikami → wyrównane do lewej, spójne szerokości kolumn

### C3. FAQ na wszystkich stronach
FAQ block → left-aligned (już zrobione). Sprawdzić czy wszystkie strony używają FaqBlock.

## D. Pliki do modyfikacji

| Plik | Zmiany |
|------|--------|
| `src/pages/HubPage.tsx` | Left-align, compact cards, remove icons |
| `src/components/layout/Sidebar.tsx` | Remove icons, add colors |
| `src/components/layout/NavBar.tsx` | Remove mobile icons (🧮, 📊, etc.) |
| `src/pages/TopicPage.tsx` | Remove text-center |
| `src/pages/ContactPage.tsx` | Remove text-center |
| `src/components/seo/FaqBlock.tsx` | Already done ✅ |

## E. Design System (spójność)

| Element | Wartość |
|---------|---------|
| Padding kart | p-4 (compact) |
| Border kart | border border-gray-100 rounded-lg |
| Gap w grid | gap-3 (compact) |
| Font tytułów kart | font-semibold text-sm |
| Font opisu kart | text-xs text-gray-500 |
| Category badges | Ukryć lub text-[10px] |
| Kolory kategorii | blue / violet / emerald |
