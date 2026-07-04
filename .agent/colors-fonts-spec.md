# Sprint UI Colors & Fonts — Specyfikacja

## 1. Pozostałe emoji

### CompendiumsListPage.tsx
Linie 18 i 25: `icon: '📊',` i `icon: '📈',` — usunąć te pola (wraz z przecinkiem przed).

## 2. Kolory kart PaymentComparison

### Obecnie (źle):
- "Raty równe gdy:" → zielony (bg-green-50, border-green-200, text-green-900)
- "Raty malejące gdy:" → niebieski (bg-blue-50, border-blue-200, text-blue-900)
- "Oszczędność" → zielony (bg-green-50, text-green-600)
- "Jak zmieniają się raty?" → niebieski (bg-blue-50)
- ComparisonCard LEPSZY WYBÓR → zielony badge
- Savings indicator → zielony

### Docelowo: spójny schemat kolorystyczny
Użyj JEDNEGO koloru dla WSZYSTKICH kart:
- Główne karty (Raty równe gdy / Raty malejące gdy): `bg-blue-50 border-blue-200` 
- Karta oszczędności: `bg-blue-50 border-blue-200 text-blue-600`
- "Jak zmieniają się raty?": `bg-blue-50 border-blue-200`
- LEPSZY WYBÓR badge: `bg-blue-500 text-white`
- Savings indicator: `bg-blue-100 text-blue-800`

### Dlaczego?
- Niebieski = kolor primary aplikacji (logo, buttony, sidebar)
- Jeden kolor = spójność, czytelność
- Brak mieszania zielonego i niebieskiego

## 3. Font sizes — audyt i ujednolicenie

### Zasady globalne (z index.css):
```
h1, .text-heading-1 → text-3xl (1.875rem) font-bold
h2, .text-heading-2 → text-2xl (1.5rem) font-bold  
h3, .text-heading-3 → text-xl (1.25rem) font-semibold
h4, .text-heading-4 → text-base (1rem) font-semibold
p, .text-body       → text-base (1rem)
.text-small         → text-sm (0.875rem)
.text-tiny          → text-xs (0.75rem)
```

### Sprawdzić i poprawić w PaymentComparison.tsx:
- `text-lg font-semibold text-gray-900 mb-4` → to jest h3, powinno być `text-xl` lub `text-lg`
- `text-2xl font-bold text-gray-900` → OK dla liczb
- `text-sm text-gray-600` → OK dla opisów
- `text-xs font-bold` → OK dla badge

## Pliki do modyfikacji:
1. `src/pages/CompendiumsListPage.tsx` — usuń icon: '📊' i icon: '📈'
2. `src/components/calculators/PaymentComparison.tsx` — kolory niebieskie, font size cleanup
