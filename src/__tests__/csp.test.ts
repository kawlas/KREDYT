import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const DIST = path.resolve(__dirname, '../../dist/static')
const NETLIFY = path.resolve(__dirname, '../../netlify.toml')

function collectPrerendered(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) collectPrerendered(full, acc)
    else if (entry === 'index.html') acc.push(full)
  }
  return acc
}

function extractCspMeta(html: string): string | null {
  const m = html.match(
    /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]*)"/
  )
  return m ? m[1] : null
}

describe('CSP without unsafe-inline (build-time hashes)', () => {
  let files: string[]
  let cspMetas: string[]

  beforeAll(() => {
    files = fs.existsSync(DIST) ? collectPrerendered(DIST) : []
    cspMetas = files
      .map((f) => fs.readFileSync(f, 'utf-8'))
      .map(extractCspMeta)
      .filter(Boolean) as string[]
  })

  it('every prerendered page carries a CSP meta tag', () => {
    if (files.length === 0) return
    expect(cspMetas.length).toBe(files.length)
  })

  it('CSP script-src has NO unsafe-inline but uses sha256 hashes', () => {
    if (cspMetas.length === 0) return
    for (const csp of cspMetas) {
      const scriptSrc = csp.match(/script-src[^;]*/)?.[0] ?? csp
      expect(scriptSrc, `script-src: ${scriptSrc}`).not.toContain("'unsafe-inline'")
      expect(csp).toMatch(/'sha256-/)
    }
  })

  it('CSP script-src still allows self + AdSense origin', () => {
    if (cspMetas.length === 0) return
    for (const csp of cspMetas) {
      expect(csp).toContain("'self'")
      expect(csp).toContain('pagead2.googlesyndication.com')
    }
  })

  it('netlify.toml no longer sets a global CSP header', () => {
    const toml = fs.readFileSync(NETLIFY, 'utf-8')
    expect(toml).not.toContain('Content-Security-Policy')
  })
})
