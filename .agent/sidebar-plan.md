# Sidebar Navigation — Plan wdrożenia

## Struktura (po zmianie)

```
DESKTOP:
┌──────────┬────────────────────────────────────────────┐
│ SIDEBAR  │  CONTENT                                  │
│ (wąski)  │                                           │
│ ~240px   │  Start › Narzędzia › Kalkulatory › Odsetki │
│ sticky   │                                           │
│ h-screen │  ┌──────────┐  ┌──────────┐               │
│          │  │Formularz │  │ Wyniki   │               │
│          │  └──────────┘  └──────────┘               │
│          │                                           │
│          │  Footer                                   │
└──────────┴────────────────────────────────────────────┘

MOBILE:
┌──────────────────────────────────────────────────────┐
│ [Logo]                                        [☰]    │ ← top bar
├──────────────────────────────────────────────────────┤
│  CONTENT (full width)                                │
│                                                      │
│  ☰ → Sidebar jako overlay z lewej                    │
└──────────────────────────────────────────────────────┘
```

## Lista zmian

### 1. Nowy plik: `src/components/layout/Sidebar.tsx`

```tsx
// Stałe dane nawigacji
const sidebarItems = [
  { type: 'link', label: 'Strona główna', path: '/', icon: '🏠' },
  { type: 'divider' },
  { type: 'category', label: 'Kalkulatory' },
  { type: 'link', label: 'Kalkulator raty', path: '/kalkulator-raty-kredytu/', icon: '🧮' },
  { type: 'link', label: 'Zdolność kredytowa', path: '/zdolnosc-kredytowa/', icon: '📊' },
  { type: 'link', label: 'Kalkulator LTV', path: '/ltv-kalkulator/', icon: '📐' },
  { type: 'link', label: 'Symulacja WIBOR', path: '/symulacja-wibor/', icon: '📈' },
  { type: 'link', label: 'Odsetki dzienne', path: '/odsetki-dzienne/', icon: '📆' },
  { type: 'divider' },
  { type: 'category', label: 'Porównaj' },
  { type: 'link', label: 'Raty równe/malejące', path: '/raty-rowne-czy-malejace/', icon: '⚖️' },
  { type: 'link', label: 'Porównanie banków', path: '/porownanie-ofert-bankow/', icon: '🏦' },
  { type: 'link', label: 'Refinansowanie', path: '/refinansowanie-kredytu/', icon: '🔄' },
  { type: 'link', label: 'Stałe/Zmienne', path: '/stale-vs-zmienne-oprocentowanie/', icon: '🔒' },
  { type: 'divider' },
  { type: 'category', label: 'Analiza' },
  { type: 'link', label: 'Ukryte koszty', path: '/ukryte-koszty-kredytu/', icon: '🔍' },
  { type: 'link', label: 'Scoring BIK', path: '/co-wplywa-na-zdolnosc/', icon: '📋' },
  { type: 'link', label: 'Nadpłaty', path: '/symulator-nadplat/', icon: '💰' },
  { type: 'divider' },
  { type: 'link', label: 'Poradniki', path: '/poradniki/', icon: '📖' },
  { type: 'link', label: 'FAQ', path: '/faq-kredyt-hipoteczny/', icon: '❓' },
  { type: 'link', label: 'O projekcie', path: '/o-projekcie/', icon: 'ℹ️' },
]
```

**Wygląd:**
- Desktop: fixed/sticky, h-screen, overflow-y-auto, border-r
- Szerokość: w-60 (240px) lub w-56 (224px)
- Aktywna strona: podświetlona (bg-blue-50 text-blue-600)
- Kategorie: bold, text-xs, uppercase, text-gray-400
- Linki: flex items-center gap-3 px-4 py-2.5
- Divider: border-t my-3

**Na mobile:**
- Sidebar hidden (translate-x-[-100%]) domyślnie
- Overlay z backdrop (bg-black/50)
- Hamburger otwiera/zamyka
- Po kliknięciu linku → zamyka sidebar

### 2. Modyfikacja `NavBar.tsx`

Current NavBar ma dużo linków → zostaje tylko logo na desktop, logo+hamburger na mobile:
- Desktop: tylko logo (link do /)
- Mobile: logo + hamburger (który otwiera sidebar)

Lub po prostu:
- Nowy prosty `TopBar.tsx` z logo + hamburger
- Stary `NavBar.tsx` usunięty lub uproszczony

### 3. Modyfikacja `App.tsx`

```tsx
<div className="min-h-screen bg-white">
  <ScrollToTop />
  <a href="#main-content">...</a>
  
  <div className="flex min-h-screen">
    {/* Sidebar */}
    <Sidebar />
    
    {/* Main content */}
    <div className="flex-1 min-w-0">
      {/* TopBar tylko na mobile */}
      <TopBar onMenuClick={...} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BreadcrumbNav />
        <main id="main-content">
          <ErrorBoundary>
            <Routes>...</Routes>
          </ErrorBoundary>
        </main>
      </div>
      
      <Footer />
    </div>
  </div>
  
  <ToastContainer />
  <CookieConsent />
</div>
```

### 4. Modyfikacja `Footer.tsx`

Footer może pozostać bez zmian (linki do NBP, KNF itp.)
Można usunąć duplikujące się linki narzędzi z footera (zostawić tylko instytucje i prawne).

### 5. Aktualizacja breadcrumbs w `breadcrumbs.ts`

Po usunięciu NavBara, breadcrumb w formie `Start > Narzędzia > Kalkulatory > Odsetki dzienne` nadal ma sens jako wskazanie gdzie jesteś.

## Kolejność implementacji

1. **Tester** → pisze testy dla Sidebar (RED)
2. **Developer** → tworzy Sidebar + modyfikuje App.tsx + upraszcza NavBar
3. **Tester** → code review, testy (GREEN)
4. **Build** → npm run build, sprawdza czy działa
5. **Commit + push**

## Testy (Tester)

### Plik: `src/__tests__/sidebar-nav.test.tsx`

1. Sidebar istnieje i renderuje nawigację
2. Desktop: sidebar jest widoczny (class zawiera "w-60" lub "w-56")
3. Mobile: sidebar jest ukryty (class zawiera "translate-x-[-100%]" lub "-translate-x-full")
4. Sidebar zawiera link do Strona główna (/)
5. Sidebar zawiera link Kalkulator raty (/kalkulator-raty-kredytu/)
6. Sidebar zawiera link Zdolność kredytowa (/zdolnosc-kredytowa/)
7. Sidebar zawiera link Poradniki (/poradniki/)
8. Sidebar zawiera link FAQ (/faq-kredyt-hipoteczny/)
9. Sidebar zawiera link O projekcie (/o-projekcie/)
10. Sidebar zawiera kategorie: Kalkulatory, Porównaj, Analiza
11. Aktywna strona (current path) ma klasę "text-blue-600" lub "bg-blue-50"
12. Sidebar zawiera co najmniej 15 pozycji (linków)
13. Sidebar ma overflow-y-auto
14. Hamburger (przycisk) istnieje na mobile
15. Kliknięcie linku w sidebarze zamyka sidebar (na mobile)
16. NavBar został uproszczony (nie zawiera linków narzędzi)
17. Wszystkie poprzednie testy nadal PASS
18. Build przechodzi bez błędów
19. Footer nie ma duplikatów linków narzędzi (opcjonalnie)
20. Breadcrumb działa poprawnie w nowym layoutcie
