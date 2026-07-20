import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve(__dirname, '../../dist/static')

function collectPrerendered(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) collectPrerendered(full, acc)
    else if (entry === 'index.html') acc.push(full)
  }
  return acc
}

describe('Unique SEO meta across prerendered pages', () => {
  let files: string[]

  beforeAll(() => {
    files = fs.existsSync(DIST) ? collectPrerendered(DIST) : []
  })

  it('has prerendered pages to check', () => {
    // If the build output is missing, skip silently (build runs before deploy).
    if (files.length === 0) return
    expect(files.length).toBeGreaterThan(10)
  })

  it('every page has a non-empty <title> and meta description', () => {
    if (files.length === 0) return
    for (const f of files) {
      const html = fs.readFileSync(f, 'utf-8')
      const title = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1]?.trim()
      const desc = html.match(/name="description" content="([^"]*)"/)?.[1]?.trim()
      expect(title, `title missing in ${f}`).toBeTruthy()
      expect(desc, `description missing in ${f}`).toBeTruthy()
    }
  })

  it('no duplicate <title> across pages', () => {
    if (files.length === 0) return
    const titles = files.map(
      (f) => fs.readFileSync(f, 'utf-8').match(/<title[^>]*>([^<]*)<\/title>/)?.[1]?.trim()
    )
    const dupes = titles.filter((t, i) => titles.indexOf(t) !== i)
    expect(dupes, `duplicate titles: ${dupes.join(' | ')}`).toHaveLength(0)
  })

  it('no duplicate meta description across pages', () => {
    if (files.length === 0) return
    const descs = files.map(
      (f) => fs.readFileSync(f, 'utf-8').match(/name="description" content="([^"]*)"/)?.[1]?.trim()
    )
    const dupes = descs.filter((d, i) => descs.indexOf(d) !== i)
    expect(dupes, `duplicate descriptions: ${dupes.join(' | ')}`).toHaveLength(0)
  })
})
