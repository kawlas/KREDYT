---
trigger: always_on
---

# Zasady kodowania

## Style
- Używaj TypeScript strict mode
- Wszystkie komponenty funkcyjne (nie class components)
- Props z TypeScript interface
- Eksportuj typy oddzielnie

## Performance
- Lazy loading dla komponentów (React.lazy)
- Memo dla expensive calculations
- Debounce dla inputów (500ms)

## Animacje
- TYLKO transform i opacity (GPU-accelerated)
- Respektuj prefers-reduced-motion
- Max 300ms duration
- 60fps target

## Polski rynek
- Kwoty w PLN z separatorem tysięcy (123 456,78)
- Procenty z 2 miejscami po przecinku
- WIBOR jako domyślny wskaźnik
