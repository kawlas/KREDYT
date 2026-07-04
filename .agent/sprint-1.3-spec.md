# Sprint 1.3 — Rozwiązanie duplikacji stron

## Cel
Po dodaniu unikalnych treści (S1.1) i structured data (S1.2), upewnić się że:
1. Żadne 2 strony nie zwracają identycznego HTML (unikalne hashe)
2. Prerenderowane pliki w `dist/static/` są poprawnie generowane z unikalną treścią
3. Strony które wcześniej były kopiami strony głównej (`/odsetki-dzienne/`, `/symulator-nadplat/`, `/refinansowanie-kredytu/`, `/porownanie-ofert-bankow/`) mają teraz unikalną treść

## Testy (Tester)

### 1. Test unikalności prerenderowanych plików
- Uruchomić build: `npm run build`
- Dla każdego pliku `dist/static/*/index.html` obliczyć hash MD5
- ASSERT: Wszystkie hashe są unikalne (żadne 2 pliki nie mają tego samego hasha)
- ASSERT: Plik strony głównej (`dist/static/index.html`) nie jest identyczny z żadnym innym

### 2. Test unikalności tytułów
- Dla każdego prerenderowanego pliku wyciągnąć `<title>` i `<meta name="description">`
- ASSERT: Żadne 2 strony nie mają tego samego title
- ASSERT: Żadne 2 strony nie mają tej samej meta description

### 3. Test JSON-LD unikalności
- Dla każdego prerenderowanego pliku wyciągnąć `application/ld+json`
- ASSERT: BreadcrumbList ma unikalne URL-e dla każdej strony
- ASSERT: WebApplication ma unikalny `url` i `name`

## Implementacja (Developer)

### Opcja A — Jeśli po rebuildzie testy przechodzą
- Nic nie robić — problem już rozwiązany przez S1.1 + P0.3
- Raportować że duplikacja rozwiązana

### Opcja B — Jeśli rebuild wykazuje duplikaty
- Dla stron które mają identyczny HTML co strona główna:
  - Dodać unikalne treści (jeśli brak)
  - Lub dodać przekierowanie 301 z duplikatu na właściwą stronę
  - Lub zablokować w robots.txt (opcja ostateczna)

### Opcja C — Dla stron tematycznych (TopicPage)
- Upewnić się że każdy topic ma unikalny title i opis (SEOHead z propem topicSlug)
- Dodać test unikalności dla wszystkich topiców z `src/data/topics.ts`

## Kolejność
1. **Tester** — pisze testy unikalności (RED — oczekiwane FAIL jeśli są duplikaty)
2. **Developer** — rebuild + testy + ewentualne poprawki (GREEN)
3. **CEO** — weryfikuje i komituje
