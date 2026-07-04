# Sprint 1.2 — Structured Data (JSON-LD Schema.org)

## Cel
Dodać znaczniki schema.org JSON-LD do każdej strony, aby:
- AI search engines (Google AI Overviews, ChatGPT, Perplexity) lepiej indeksowały treści
- Zwiększyć szansę na rich snippets w wynikach wyszukiwania
- Spełnić wymogi AI Agent Discovery (sekcja 5.2 w PLAN-ROZWOJU.md)

## Schematy do dodania

### 1. BreadcrumbList (na KAŻDEJ stronie)
Ścieżka nawigacyjna, np. dla `/kalkulator-raty-kredytu/`:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://kredytkalkulator.netlify.app/" },
    { "@type": "ListItem", "position": 2, "name": "Kalkulator raty kredytu", "item": "https://kredytkalkulator.netlify.app/kalkulator-raty-kredytu/" }
  ]
}
```

### 2. WebApplication (dla stron z kalkulatorami)
8 stron kalkulatorów:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kalkulator Raty Kredytu Hipotecznego",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "description": "Oblicz miesięczną ratę kredytu hipotecznego...",
  "url": "https://kredytkalkulator.netlify.app/kalkulator-raty-kredytu/",
  "dateModified": "2026-07-04"
}
```

### 3. FAQPage (dla sekcji FAQ na każdej stronie)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Pytanie?", "acceptedAnswer": { "@type": "Answer", "text": "Odpowiedź..." } }
  ]
}
```

### 4. Organization (na wszystkich stronach)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KredytKalkulator",
  "url": "https://kredytkalkulator.netlify.app/",
  "description": "Darmowe kalkulatory kredytu hipotecznego i narzędzia finansowe"
}
```

### 5. Article (dla stron treściowych: O Projekcie, Metodologia, Polityka prywatności)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "O Projekcie",
  "datePublished": "2026-01-15",
  "dateModified": "2026-07-04",
  "author": { "@type": "Organization", "name": "KredytKalkulator" }
}
```

## Implementacja

### Opcja A: Komponent SEOHead (zalecana)
Dodać propy do SEOHead:
```tsx
<SEOHead 
  title="..."
  description="..."
  breadcrumbs={[
    { name: "Strona główna", path: "/" },
    { name: "Kalkulator raty", path: "/kalkulator-raty-kredytu/" }
  ]}
  schemaType="WebApplication"
  faqItems={[...]}
/>
```

W `SEOHead.tsx` dodać generowanie JSON-LD na podstawie propów.

### Opcja B: Osobny komponent JsonLd
```tsx
<JsonLd 
  schemas={[breadcrumbSchema, webAppSchema, organizationSchema]}
/>
```

## Testy (Tester)

### Dla KAŻDEJ strony (23 strony):
1. **BreadcrumbList**: Renderowana strona zawiera `<script type="application/ld+json">` z `"@type": "BreadcrumbList"`
2. **Organization**: Każda strona zawiera Organization schema
3. **Spójność**: URL w schema zgadza się ze ścieżką strony

### Dodatkowo:
4. **WebApplication**: Strony kalkulatorów zawierają `"@type": "WebApplication"`
5. **FAQPage**: Strony z FAQ zawierają `"@type": "FAQPage"` z min. 1 pytaniem
6. **Article**: Strony treściowe (About, Methodology, Privacy) zawierają `"@type": "Article"`

### Walidacja:
7. **Poprawność JSON**: Każdy `ld+json` na stronie jest poprawnym JSONem (można sparsować)
8. **Unikalność URL**: breadcrumbs mają unikalne URL-e i pozycje

## Kolejność wykonania

1. **Researcher** — opcjonalnie, jeśli potrzebne dane (np. daty publikacji dla Article)
2. **Tester** — pisze testy (RED phase)
3. **Developer** — implementuje w SEOHead.tsx + dodaje propy do stron (GREEN phase)
4. **CEO** — review + commit
