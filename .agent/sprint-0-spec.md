# Sprint 0 — Specyfikacja faz i testów

## Faza P0.1 — Oczyszczenie index.html

### Cel
Usunąć z `index.html` wszystkie tagi które będą ustawiane przez Helmet/SEOHead, aby po prerenderze nie było duplikatów.

### Co usunąć (konkretne linie)
- `<title>Kalkulator Kredytu Hipotecznego — Darmowe Narzędzia Online</title>`
- `<meta name="description" content="Darmowy kalkulator kredytu hipotecznego...">`
- `<meta name="keywords" content="kalkulator kredytu, kredyt hipoteczny...">`
- `<link rel="canonical" href="https://kredytkalkulator.netlify.app/" />`
- `<meta property="og:image" content="/og-image.svg" />`

### Co musi ZOSTAĆ
- `<!--app-head-->` (placeholder dla Helmeta)
- `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js...">` (AdSense)
- `<meta charset="UTF-8" />`
- `<meta name="robots" content="index, follow" />`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
- `<meta name="theme-color" content="#ffffff" />`
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
- `<link rel="apple-touch-icon" href="/favicon.svg" />`
- `<link rel="preconnect" ...>` (fonty)
- `<div id="root"><!--app-html--></div>`
- consent script

### Testy do napisania (przez Testera)

Test 1: `src/__tests__/index-html.test.ts`
- [ ] Wczytać `index.html` jako string
- [ ] ASSERT: Nie zawiera `<title>` (bez `data-rh`)
- [ ] ASSERT: Nie zawiera `<meta name="description"`
- [ ] ASSERT: Nie zawiera `<meta name="keywords"`
- [ ] ASSERT: Nie zawiera `<link rel="canonical"` 
- [ ] ASSERT: Nie zawiera `<meta property="og:image"`
- [ ] ASSERT: Zawiera `<!--app-head-->`
- [ ] ASSERT: Zawiera `adsbygoogle.js`
- [ ] ASSERT: Zawiera `<meta charset="UTF-8" />`
- [ ] ASSERT: Zawiera `<div id="root">`
- [ ] ASSERT: Nie zawiera podwójnego `<!--app-head-->`

---

## Faza P0.2 — Naprawa prerender.js

### Cel
Przed wstawieniem tagów Helmeta, usunąć stare tagi z template (index.html które już nie ma tych tagów, ale zabezpieczenie na przyszłość).

### Zmiana w `prerender.js`
Przed `template.replace('<!--app-head-->', ...)` dodać:
```js
// Usuń potencjalne stare tagi które mogą być nadpisane przez Helmet
let cleanTemplate = template
  .replace(/<title>[^<]*<\/title>/, '')
  .replace(/<meta name="description"[^>]*>/g, '')
  .replace(/<meta name="keywords"[^>]*>/g, '')
  .replace(/<link rel="canonical"[^>]*>/g, '')
  .replace(/<meta property="og:image"[^>]*>/g, '')
```

Użyć `cleanTemplate` zamiast `template` w dalszej części.

### Testy do napisania (przez Testera)

Test 2: `src/__tests__/prerender-output.test.ts`
- [ ] Uruchomić `node prerender.js` (lub sprawdzić logikę)
- [ ] Dla każdego prerenderowanego pliku w `dist/static/`:
  - [ ] ASSERT: Ma dokładnie 1 `<title>` tag
  - [ ] ASSERT: Ma dokładnie 1 `<link rel="canonical"` tag
  - [ ] ASSERT: Tytuł pasuje do oczekiwanego (na podstawie SEOHead danej strony)
  - [ ] ASSERT: Canonical URL pasuje do ścieżki strony
  - [ ] ASSERT: Nie zawiera `<!--app-head-->` (został zastąpiony)
- [ ] Dla pliku `dist/static/index.html`:
  - [ ] ASSERT: Tytuł to "Kalkulator Kredytu Hipotecznego — Sprawdź Ratę, RRSO i Zdolność"

Test 3: `src/__tests__/prerender-logic.test.ts` (opcjonalnie)
- [ ] Mock template z hardcoded title
- [ ] Uruchomić logikę czyszczenia
- [ ] ASSERT: Po czyszczeniu nie ma starego title
- [ ] ASSERT: Po czyszczeniu `<!--app-head-->` wciąż istnieje

---

## Faza P0.3 — Reguły Netlify redirect

### Cel
Dodać do `netlify.toml` reguły redirect status=200 dla prerenderowanych stron.

### Co dodać
```toml
[[redirects]]
  from = "/odsetki-dzienne/*"
  to = "/odsetki-dzienne/index.html"
  status = 200

[[redirects]]
  from = "/symulator-nadplat/*"
  to = "/symulator-nadplat/index.html"
  status = 200

[[redirects]]
  from = "/refinansowanie-kredytu/*"
  to = "/refinansowanie-kredytu/index.html"
  status = 200

[[redirects]]
  from = "/porownanie-ofert-bankow/*"
  to = "/porownanie-ofert-bankow/index.html"
  status = 200
```

### Testy do napisania (przez Testera)

Test 4: `src/__tests__/netlify-config.test.ts`
- [ ] Wczytać `netlify.toml` jako string
- [ ] ASSERT: Zawiera redirect dla `/odsetki-dzienne/*`
- [ ] ASSERT: Zawiera redirect dla `/symulator-nadplat/*`
- [ ] ASSERT: Zawiera redirect dla `/refinansowanie-kredytu/*`
- [ ] ASSERT: Zawiera redirect dla `/porownanie-ofert-bankow/*`
- [ ] ASSERT: Każdy redirect ma `status = 200`

---

## Faza P0.4 — H1 na stronach ✅ NIE WYMAGA ZMIAN

### Ustalenie
Wszystkie 4 strony (DailyInterest, Overpayment, Refinancing, BankComparison) **JUŻ mają H1** przez komponent `TabContainer` który renderuje `<h1>` z unikalnym tytułem. Testy napisane przez Testera przeszły 16/16 — strony mają dokładnie 1 H1 każda.

**Decyzja:** P0.4 pomijamy — brak zmian.

---

## Faza P0.3 — Naprawa public/_redirects (Netlify)

### Cel
Dodać reguły dla prerenderowanych stron PRZED SPA fallback, aby Netlify serwował poprawne statyczne pliki HTML zamiast strony głównej.

### Przyczyna problemu
Plik `public/_redirects` zawiera:
```
# SPA/History Fallback
/* /index.html 200
```
Ta reguła sprawia, że WSZYSTKIE ścieżki (w tym `/odsetki-dzienne/`, `/symulator-nadplat/` itd.) zwracają stronę główną, nadpisując prerenderowane pliki.

### Rozwiązanie
Dodać reguły dla prerenderowanych stron PRZED SPA fallback. Netlify czyta `_redirects` od góry do dołu — pierwsza pasująca wygrywa.

### Ostateczna treść `public/_redirects`:
```
# Redirect old Hub URL to root
/kalkulator-kredytu-hipotecznego/  /  301

# Handle assets
/assets/*  /assets/:splat  200

# Prerendered pages — serve static HTML files (before SPA fallback)
/odsetki-dzienne/*  /odsetki-dzienne/index.html  200
/symulator-nadplat/*  /symulator-nadplat/index.html  200
/refinansowanie-kredytu/*  /refinansowanie-kredytu/index.html  200
/porownanie-ofert-bankow/*  /porownanie-ofert-bankow/index.html  200

# SPA/History Fallback — only if no prerendered page matches
/* /index.html 200
```

### Testy do napisania (przez Testera)

Test: `src/__tests__/redirects-config.test.ts`
- [ ] Wczytać `public/_redirects` jako string
- [ ] ASSERT: Zawiera `/odsetki-dzienne/*  /odsetki-dzienne/index.html  200`
- [ ] ASSERT: Zawiera `/symulator-nadplat/*  /symulator-nadplat/index.html  200`
- [ ] ASSERT: Zawiera `/refinansowanie-kredytu/*  /refinansowanie-kredytu/index.html  200`
- [ ] ASSERT: Zawiera `/porownanie-ofert-bankow/*  /porownanie-ofert-bankow/index.html  200`
- [ ] ASSERT: Reguły prerenderowanych stron są PRZED `/* /index.html 200`
- [ ] ASSERT: Zawiera SPA fallback `/* /index.html 200` na końcu
- [ ] ASSERT: Zawiera stare redirecty (/kalkulator-kredytu-hipotecznego/ → /)

---

## Zasady dla Testera
1. Każdy test piszesz w osobnym pliku `.test.ts` lub `.test.tsx`
2. Używasz `describe` + `it` + `expect` (vitest)
3. Testy muszą być deterministyczne — nie mogą zależeć od random/warunków brzegowych
4. Nie mockujesz oryginalnego kodu — testujesz rzeczywiste pliki
5. Po napisaniu testu → uruchamiasz go → raportujesz wynik (PASS/FAIL)

## Zasady dla Developera
1. Implementujesz tylko to co jest w specyfikacji — nie dodajesz własnych pomysłów
2. Po implementacji → uruchamiasz testy (npm test)
3. Raportujesz do CEO: co zrobiłeś, czy testy przechodzą
4. Jeśli testy FAIL → poprawiasz i raportujesz ponownie
