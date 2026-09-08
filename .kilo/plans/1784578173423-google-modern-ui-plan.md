# Plan: Google Modern UI Redesign

## Cel
Przebudowa UI kalkulatora kredytowego na styl "Google Modern Workspace" z zachowaniem wszystkich istniejących funkcji, testów i danych.

## Zasady projektowe (Design Tokens)

### Kolory — do dodania w `src/index.css`
- `--surface: #F8F9FA` (bg strony)
- `--surface-container: #FFFFFF` (tło kart/sidebara)
- `--primary: #1A73E8`
- `--primary-container: #E8F0FE`
- `--on-primary-container: #174EA6`
- `--outline-variant: #DADCE0`
- `--text-primary: #202124`
- `--text-secondary: #5F6368`

Dark mode:
- `--surface: #121212`
- `--surface-container: #1E1E1E`
- `--primary: #8AB4F8`
- `--primary-container: #1A2733`
- `--text-primary: #E8EAED`
- `--text-secondary: #9AA0A6`

### Typografia
- Font: `Manrope` przez Google Fonts CDN
- H1: `font-bold text-3xl tracking-tight`
- H2: `font-semibold text-xl`
- Body: `font-normal text-base leading-relaxed text-text-secondary`
- Labels: `font-medium text-sm tracking-wide uppercase text-primary`

### Komponenty
- Sidebar: 280px, `border-r border-outline-variant`, active item `rounded-r-full bg-primary-container text-primary`
- Karty: `rounded-2xl border border-outline-variant p-6 hover:shadow-md hover:border-primary transition-all duration-200`
- Ikony: Material Symbols Rounded, weight 100–200, grade 0, optical size 24

### Animacje
- `fadeInUp` dla kart (stagger 50ms)
- CTA buttons: active `scale-98`
- Accordion: `max-height` transition `ease-out`

## Zmiany plikowe

### 1. `index.html`
Dodać w `<head>` import Manrope z Google Fonts CDN:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">
```

### 2. `src/index.css`
- Dodać nowe zmienne CSS dla palety Google Modern
- Zmienić `font-family` na `'Manrope', sans-serif`
- Dodać keyframes `fadeInUp` i klasę `.animate-card`
- Zmapować istniejące zmienne na nowe (lub zastąpić)

### 3. `src/components/layout/Sidebar.tsx`
- Szerokość: `w-[280px]`
- Aktywny item: `rounded-r-full bg-primary-container text-primary font-semibold`
- Divider: `border-outline-variant`
- Usunąć emoji jeśli jeszcze są

### 4. `src/pages/HubPage.tsx`
- Karty: `rounded-2xl border border-outline-variant p-6`
- Hover: `hover:shadow-md hover:border-primary transition-all duration-200`
- Dodać `animate-card` z stagger
- Left-align wszystko (już jest)
- Usunąć emoji z nagłówków

### 5. `tailwind.config.js`
- Rozszerzyć o nowe kolory: `surface`, `surface-container`, `primary-container`, `on-primary-container`, `outline-variant`, `text-primary`, `text-secondary`

### 6. Animacje (global)
- Dodać `fadeInUp` do tailwind config lub CSS

## CI
- Utworzyć `.github/workflows/ci.yml` z krokami: checkout, setup-node, install, lint, test, build

## Kolejność implementacji
1. Design tokens (index.html + CSS + tailwind config)
2. Sidebar
3. HubPage
4. Pozostałe strony (TopicPage, calculator pages)
5. Animacje
6. CI

## Testy
- Przebudować istniejące testy UI na nowe style
- Dodać test na nowe zmienne CSS
