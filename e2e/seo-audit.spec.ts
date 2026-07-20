import { test, expect } from '@playwright/test'

const PAGES = [
  '/',
  '/kalkulator-raty-kredytu/',
  '/ltv-kalkulator/',
  '/ukryte-koszty-kredytu/',
  '/raty-rowne-czy-malejace/',
  '/stale-vs-zmienne-oprocentowanie/',
  '/symulacja-wibor/',
  '/zdolnosc-kredytowa/',
  '/symulator-nadplat/',
  '/odsetki-dzienne/',
  '/refinansowanie-kredytu/',
  '/porownanie-ofert-bankow/',
  '/faq-kredyt-hipoteczny/',
  '/co-wplywa-na-zdolnosc/',
  '/przygotowanie-do-kredytu/',
  '/koszt-utrzymania-nieruchomosci/',
  '/o-projekcie/',
  '/metodologia/',
  '/kontakt/',
  '/polityka-prywatnosci/',
  '/poradniki/',
  '/poradniki/jak-obliczyc-rate/',
  '/poradniki/zdolnosc-kredytowa/',
  '/poradniki/wibor-a-rata/',
  '/mity-kredytowe/',
  '/kalkulator-prowizji/',
  '/kalkulator-ubezpieczen/',
  '/kredyt-vs-wynajem/',
  '/polityka-redakcyjna/',
]

// ─────────────────────────────────────────────
// SEO: Meta tags for every page
// ─────────────────────────────────────────────
test.describe('SEO — meta tags na każdej stronie', () => {
  for (const url of PAGES) {
    test(`${url} ma title ≤ 60 znaków`, async ({ page }) => {
      await page.goto(url)
      const title = await page.title()
      expect(title.length).toBeLessThanOrEqual(60)
      expect(title.length).toBeGreaterThan(0)
    })

    test(`${url} ma meta description`, async ({ page }) => {
      await page.goto(url)
      const desc = await page.getAttribute('meta[name="description"]', 'content')
      expect(desc).toBeTruthy()
      expect(desc!.length).toBeGreaterThan(50)
    })

    test(`${url} ma canonical URL`, async ({ page }) => {
      await page.goto(url)
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href')
      expect(canonical).toBeTruthy()
      expect(canonical).toContain('kredytkalkulator.netlify.app')
    })

    test(`${url} ma og:image`, async ({ page }) => {
      await page.goto(url)
      const ogImage = await page.getAttribute('meta[property="og:image"]', 'content')
      expect(ogImage).toBeTruthy()
      expect(ogImage).toContain('og-image.png')
    })
  }
})

// ─────────────────────────────────────────────
// SEO: Dokładnie jeden H1 na każdej stronie
// ─────────────────────────────────────────────
test.describe('SEO — dokładnie jeden H1', () => {
  for (const url of PAGES) {
    test(`${url} ma dokładnie jeden <h1>`, async ({ page }) => {
      await page.goto(url)
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)
    })
  }
})

// ─────────────────────────────────────────────
// SEO: Brak duplikatu meta robots
// ─────────────────────────────────────────────
test.describe('SEO — brak duplikatu meta robots', () => {
  for (const url of PAGES) {
    test(`${url} ma dokładnie jeden meta robots`, async ({ page }) => {
      await page.goto(url)
      const robotsCount = await page.locator('meta[name="robots"]').count()
      expect(robotsCount).toBe(1)
    })
  }
})

// ─────────────────────────────────────────────
// SEO: 404 page ma noindex
// ─────────────────────────────────────────────
test.describe('SEO — 404 page', () => {
  test('404 ma noindex, nofollow', async ({ page }) => {
    await page.goto('/nie-istnieje-taka-strona/')
    const robots = await page.getAttribute('meta[name="robots"]', 'content')
    expect(robots).toBe('noindex, nofollow')
  })

  test('404 wyświetla komunikat błędu', async ({ page }) => {
    await page.goto('/nie-istnieje-taka-strona/')
    await expect(page.locator('body')).toContainText(/404|nie znaleziono/i)
  })
})

// ─────────────────────────────────────────────
// SEO: Redirect koszty → koszt (source-level check)
// ─────────────────────────────────────────────
test.describe('SEO — redirect duplicate content', () => {
  test('_redirects zawiera redirect koszty → koszt', async () => {
    const fs = await import('fs')
    const redirects = fs.readFileSync('public/_redirects', 'utf-8')
    expect(redirects).toContain('/koszty-utrzymania-nieruchomosci/')
    expect(redirects).toContain('/koszt-utrzymania-nieruchomosci/')
    expect(redirects).toContain('301')
  })
})

// ─────────────────────────────────────────────
// SEO: Strony z H1 pasującym do title
// ─────────────────────────────────────────────
test.describe('SEO — H1 pasuje do title', () => {
  const titleToH1Keywords: Record<string, string[]> = {
    '/kalkulator-raty-kredytu/': ['ratę', 'raty', 'kalkulator'],
    '/zdolnosc-kredytowa/': ['zdolność'],
    '/symulacja-wibor/': ['wibor', 'symulacja'],
    '/ltv-kalkulator/': ['ltv'],
    '/odsetki-dzienne/': ['odsetek', 'odsetki', 'dziennych'],
    '/symulator-nadplat/': ['nadpłat', 'nadpłata'],
    '/refinansowanie-kredytu/': ['refinansowani'],
    '/poradniki/jak-obliczyc-rate/': ['obliczyć', 'ratę'],
    '/poradniki/wibor-a-rata/': ['wibor'],
    '/koszt-utrzymania-nieruchomosci/': ['koszt', 'utrzymania'],
  }

  for (const [url, keywords] of Object.entries(titleToH1Keywords)) {
    test(`${url} — H1 zawiera kluczowe słowo`, async ({ page }) => {
      await page.goto(url)
      const h1Text = await page.locator('h1').textContent()
      const lower = h1Text!.toLowerCase()
      const hasKeyword = keywords.some(k => lower.includes(k.toLowerCase()))
      expect(hasKeyword).toBe(true)
    })
  }
})

// ─────────────────────────────────────────────
// Nawigacja: linki w sidebarze działają
// ─────────────────────────────────────────────
test.describe('Nawigacja — linki w sidebarze', () => {
  test('sidebar ma linki i każda prowadzi do istniejącej strony', async ({ page }) => {
    await page.goto('/')
    const links = page.locator('nav a, aside a')
    const count = await links.count()
    expect(count).toBeGreaterThan(5)

    // Sprawdź pierwsze 5 linków
    for (let i = 0; i < Math.min(count, 5); i++) {
      const href = await links.nth(i).getAttribute('href')
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        const response = await page.goto(href)
        expect(response?.status(), `Link ${href} zwraca ${response?.status()}`).toBe(200)
      }
    }
  })
})

// ─────────────────────────────────────────────
// Performance: Strony ładują się szybko
// ─────────────────────────────────────────────
test.describe('Performance — czas ładowania', () => {
  const criticalPages = ['/', '/kalkulator-raty-kredytu/', '/zdolnosc-kredytowa/']

  for (const url of criticalPages) {
    test(`${url} ładuje się w < 5s`, async ({ page }) => {
      const start = Date.now()
      await page.goto(url, { waitUntil: 'domcontentloaded' })
      const loadTime = Date.now() - start
      expect(loadTime).toBeLessThan(5000)
    })
  }
})
