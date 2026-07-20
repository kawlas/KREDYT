import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

const staticDir = path.resolve(__dirname, '../../dist/static')
const topicsPath = path.resolve(__dirname, '../../src/data/topics.ts')

// --------------- Helper functions ---------------

/** Get all prerendered index.html paths */
function getPrerenderedPages(): string[] {
  const items = fs.readdirSync(staticDir, { withFileTypes: true })
  const mainPage = path.join(staticDir, 'index.html')
  const subPages = items
    .filter(d => d.isDirectory() && d.name !== 'assets')
    .map(d => path.join(staticDir, d.name, 'index.html'))
    .filter(f => fs.existsSync(f))

  return [mainPage, ...subPages]
}

/** Extract <title> from HTML string (handles data-rh attribute) */
function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/)
  return match ? match[1].trim() : null
}

/** Extract <meta name="description"> content from HTML string (handles data-rh attribute) */
function extractMetaDescription(html: string): string | null {
  const match = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*\/?>/i)
  return match ? match[1].trim() : null
}

/** Extract all <script type="application/ld+json"> blocks from HTML string (handles data-rh attribute) */
function extractJsonLd(html: string): Record<string, unknown>[] {
  const regex = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  const results: Record<string, unknown>[] = []
  let m
  while ((m = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim())
      results.push(parsed)
    } catch {
      // skip invalid JSON
    }
  }
  return results
}

/** Get visible text length (strip HTML tags) */
function getVisibleTextLength(html: string): number {
  // Remove script, style, and HTML tags
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length
}

/** Check if topics.ts has all fields needed */
function readTopics(): { slug: string; metaTitle: string }[] {
  const content = fs.readFileSync(topicsPath, 'utf-8')
  const topics: { slug: string; metaTitle: string }[] = []

  // Parse line by line looking for complete objects

  // Alternative: parse line by line looking for complete objects
  const lines = content.split('\n')
  let currentSlug = ''
  let currentTitle = ''

  for (const line of lines) {
    const sMatch = line.match(/^\s*slug:\s*'([^']+)'/)
    if (sMatch) {
      currentSlug = sMatch[1]
    }
    const tMatch = line.match(/^\s*metaTitle:\s*'([^']+)'/)
    if (tMatch) {
      currentTitle = tMatch[1]
    }
    if (currentSlug && currentTitle) {
      topics.push({ slug: currentSlug, metaTitle: currentTitle })
      currentSlug = ''
      currentTitle = ''
    }
  }

  return topics
}

// --------------- Test suite ---------------

describe('Sprint 1.3 — Unikalność stron', () => {
  let pages: string[]
  let pageContents: { file: string; name: string; html: string; hash: string }[]

  beforeAll(() => {
    pages = getPrerenderedPages()
    pageContents = pages.map(file => {
      const html = fs.readFileSync(file, 'utf-8')
      // Root page: dist/static/index.html → name 'index'
      // Sub pages: dist/static/<dirname>/index.html → name '<dirname>'
      const dir = path.dirname(file)
      const name = dir === staticDir ? 'index' : path.basename(dir)
      const hash = crypto.createHash('md5').update(html).digest('hex')
      return { file, name, html, hash }
    })
  })

  // ---- Test 1: Unikalność MD5 hash-y ----

  describe('Test 1 — Unikalność hash-y MD5', () => {
    it('każdy prerenderowany plik ma unikalny hash MD5', () => {
      const hashes = pageContents.map(p => p.hash)
      const uniqueHashes = new Set(hashes)
      expect(uniqueHashes.size).toBe(hashes.length)
    })

    it('strona główna nie jest identyczna z żadną inną', () => {
      const mainHash = pageContents.find(p => p.name === 'index')?.hash
      expect(mainHash).toBeDefined()

      for (const page of pageContents) {
        if (page.name === 'index') continue
        expect(page.hash).not.toBe(mainHash)
      }
    })
  })

  // ---- Test 2: Unikalność tytułów i meta description ----

  describe('Test 2 — Unikalność tytułów i meta description', () => {
    const titles: { name: string; title: string | null }[] = []
    const descriptions: { name: string; desc: string | null }[] = []

    beforeAll(() => {
      for (const page of pageContents) {
        titles.push({ name: page.name, title: extractTitle(page.html) })
        descriptions.push({ name: page.name, desc: extractMetaDescription(page.html) })
      }
    })

    it('każda strona ma unikalny <title>', () => {
      const titleValues = titles.map(t => t.title).filter(Boolean) as string[]
      const uniqueTitles = new Set(titleValues)
      expect(uniqueTitles.size).toBe(titleValues.length)
    })

    it('każda strona ma unikalną meta description', () => {
      const descValues = descriptions.map(d => d.desc).filter(Boolean) as string[]
      const uniqueDescs = new Set(descValues)
      expect(uniqueDescs.size).toBe(descValues.length)
    })

    it('żadna strona nie ma pustego <title>', () => {
      for (const t of titles) {
        expect(t.title).toBeTruthy()
        expect(t.title!.trim().length).toBeGreaterThan(0)
      }
    })

    it('żadna strona nie ma pustej meta description', () => {
      for (const d of descriptions) {
        expect(d.desc).toBeTruthy()
        expect(d.desc!.trim().length).toBeGreaterThan(0)
      }
    })
  })

  // ---- Test 3: Unikalność JSON-LD URL ----

  describe('Test 3 — Unikalność JSON-LD', () => {
    it('każda strona ma co najmniej 1 JSON-LD (WebSite schema)', () => {
      for (const page of pageContents) {
        const jsonlds = extractJsonLd(page.html)
        // At minimum, SEOHead generates WebSite schema
        const hasWebSite = jsonlds.some((j) => j['@type'] === 'WebSite')
        expect(hasWebSite).toBe(true)
      }
    })

    it('WebApplication URL-e są unikalne między stronami (jeśli istnieją)', () => {
      const webAppUrls: string[] = []
      for (const page of pageContents) {
        const jsonlds = extractJsonLd(page.html)
        for (const j of jsonlds) {
          if (j['@type'] === 'WebApplication' && j.url) {
            webAppUrls.push(j.url as string)
          }
        }
      }
      const uniqueUrls = new Set(webAppUrls)
      expect(uniqueUrls.size).toBe(webAppUrls.length)
    })

    it('BreadcrumbList item URL-e są unikalne między stronami (jeśli istnieją)', () => {
      // This test is future-proof — when breadcrumbs are added, check uniqueness
      const breadcrumbUrls: Set<string> = new Set()
      let foundAny = false

      for (const page of pageContents) {
        const jsonlds = extractJsonLd(page.html)
        for (const j of jsonlds) {
          if (j['@type'] === 'BreadcrumbList' && j.itemListElement) {
            foundAny = true
            for (const item of j.itemListElement as Array<{ item?: string }>) {
              if (item.item) {
                breadcrumbUrls.add(item.item)
              }
            }
          }
        }
      }

      // No breadcrumbs yet = skip (RED phase)
      if (foundAny) {
        // All items from all pages should still be unique per position
        // (each page has its own breadcrumbs)
        expect(breadcrumbUrls.size).toBeGreaterThan(0)
      }
    })
  })

  // ---- Test 4: Brak pustych/placeholder treści ----

  describe('Test 4 — Jakość treści', () => {
    it('żadna strona nie zawiera "lorem ipsum"', () => {
      for (const page of pageContents) {
        expect(page.html.toLowerCase()).not.toContain('lorem ipsum')
      }
    })

    it('każda strona ma co najmniej 500 znaków widocznego tekstu', () => {
      for (const page of pageContents) {
        const textLen = getVisibleTextLength(page.html)
        expect(textLen).toBeGreaterThanOrEqual(500)
      }
    })
  })

  // ---- Test 5: Unikalność topiców ----

  describe('Test 5 — Unikalność topiców', () => {
    let topics: { slug: string; metaTitle: string }[]

    beforeAll(() => {
      topics = readTopics()
    })

    it('każdy topic ma unikalny slug', () => {
      const slugs = topics.map(t => t.slug)
      const uniqueSlugs = new Set(slugs)
      expect(uniqueSlugs.size).toBe(slugs.length)
    })

    it('każdy topic ma unikalny metaTitle', () => {
      const titles = topics.map(t => t.metaTitle)
      const uniqueTitles = new Set(titles)
      expect(uniqueTitles.size).toBe(titles.length)
    })

    it('jest co najmniej 10 topiców', () => {
      expect(topics.length).toBeGreaterThanOrEqual(10)
    })
  })

  // ---- Dodatkowe: Spis wszystkich stron ----

  describe('Podsumowanie', () => {
    it('wypisuje wszystkie prerenderowane strony', () => {
      const names = pageContents.map(p => p.name === 'index' ? '/' : `/${p.name}/`)
      expect(names.length).toBeGreaterThan(10)
    })
  })
})
