import { describe, it, expect } from 'vitest'

describe('Faza 3 — nowe artykuły (PayPo, B2B, Wakacje)', () => {
  it('topic PayPo o zdolności istnieje', async () => {
    const fs = await import('fs')
    const t = fs.readFileSync('src/data/topics.ts', 'utf-8')
    expect(t).toMatch(/slug:\s*['"]paypo-a-zdolnosc-kredytowa['"]/)
  })

  it('topic B2B istnieje', async () => {
    const fs = await import('fs')
    const t = fs.readFileSync('src/data/topics.ts', 'utf-8')
    expect(t).toMatch(/slug:\s*['"]kredyt-na-b2b['"]/)
  })

  it('topic Wakacje kredytowe istnieje', async () => {
    const fs = await import('fs')
    const t = fs.readFileSync('src/data/topics.ts', 'utf-8')
    expect(t).toMatch(/slug:\s*['"]wakacje-kredytowe['"]/)
  })

  it('topic Inflacja a kredyt istnieje', async () => {
    const fs = await import('fs')
    const t = fs.readFileSync('src/data/topics.ts', 'utf-8')
    expect(t).toMatch(/slug:\s*['"]inflacja-a-kredyt['"]/)
  })

  it('topic Harmonogram spłat istnieje', async () => {
    const fs = await import('fs')
    const t = fs.readFileSync('src/data/topics.ts', 'utf-8')
    expect(t).toMatch(/slug:\s*['"]harmonogram-splat-jak-czytac['"]/)
  })

  it('każdy nowy topic ma wszystkie wymagane pola', async () => {
    const { TOPICS } = await import('../data/topics')
    const requiredFields = ['slug', 'metaTitle', 'metaDescription', 'h1', 'intro', 'sections', 'faqs', 'ctas', 'related']
    const newSlugs = ['paypo-a-zdolnosc-kredytowa', 'kredyt-na-b2b', 'wakacje-kredytowe', 'inflacja-a-kredyt']
    for (const slug of newSlugs) {
      const t = TOPICS.find(t => t.slug === slug)
      expect(t, `topic ${slug} should exist`).toBeDefined()
      if (t) {
        for (const field of requiredFields) {
          expect((t as any)[field], `topic ${slug} missing field ${field}`).toBeDefined()
        }
      }
    }
  })

  it('każdy nowy topic ma minimum 300 znaków intro', async () => {
    const { TOPICS } = await import('../data/topics')
    const newSlugs = ['paypo-a-zdolnosc-kredytowa', 'kredyt-na-b2b', 'wakacje-kredytowe', 'inflacja-a-kredyt']
    for (const slug of newSlugs) {
      const t = TOPICS.find(t => t.slug === slug)
      if (t) {
        expect(t.intro.length, `topic ${slug} intro too short`).toBeGreaterThanOrEqual(300)
      }
    }
  })

  it('każdy nowy topic ma minimum 3 sekcje', async () => {
    const { TOPICS } = await import('../data/topics')
    const newSlugs = ['paypo-a-zdolnosc-kredytowa', 'kredyt-na-b2b', 'wakacje-kredytowe', 'inflacja-a-kredyt']
    for (const slug of newSlugs) {
      const t = TOPICS.find(t => t.slug === slug)
      if (t) {
        expect(t.sections.length, `topic ${slug} should have at least 3 sections`).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('każdy nowy topic ma minimum 3 FAQ', async () => {
    const { TOPICS } = await import('../data/topics')
    const newSlugs = ['paypo-a-zdolnosc-kredytowa', 'kredyt-na-b2b', 'wakacje-kredytowe', 'inflacja-a-kredyt']
    for (const slug of newSlugs) {
      const t = TOPICS.find(t => t.slug === slug)
      if (t) {
        expect(t.faqs.length, `topic ${slug} should have at least 3 FAQs`).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('każdy nowy topic ma CTA', async () => {
    const { TOPICS } = await import('../data/topics')
    const newSlugs = ['paypo-a-zdolnosc-kredytowa', 'kredyt-na-b2b', 'wakacje-kredytowe', 'inflacja-a-kredyt']
    for (const slug of newSlugs) {
      const t = TOPICS.find(t => t.slug === slug)
      if (t) {
        expect(t.ctas.length, `topic ${slug} should have at least 1 CTA`).toBeGreaterThanOrEqual(1)
      }
    }
  })
})

describe('Faza 3 — strona Mity kredytowe', () => {
  it('MityPage istnieje', async () => {
    const fs = await import('fs')
    expect(fs.existsSync('src/pages/MityPage.tsx')).toBe(true)
  })

  it('App.tsx ma Route /mity-kredytowe/', async () => {
    const fs = await import('fs')
    const app = fs.readFileSync('src/App.tsx', 'utf-8')
    expect(app).toContain('"/mity-kredytowe/"')
  })

  it('prerender.js ma /mity-kredytowe/', async () => {
    const fs = await import('fs')
    const pr = fs.readFileSync('prerender.js', 'utf-8')
    expect(pr).toContain("'/mity-kredytowe/'")
  })

  it('Sidebar zawiera link Mity', async () => {
    const fs = await import('fs')
    const s = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf-8')
    expect(s).toContain('/mity-kredytowe/')
  })

  it('breadcrumbs.ts ma mapę dla /mity-kredytowe/', async () => {
    const fs = await import('fs')
    const b = fs.readFileSync('src/data/breadcrumbs.ts', 'utf-8')
    expect(b).toContain("'/mity-kredytowe/'")
  })
})
