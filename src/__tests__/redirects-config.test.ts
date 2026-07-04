import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('public/_redirects - reguły dla prerenderowanych stron', () => {
  const redirectsPath = path.resolve(__dirname, '../../public/_redirects')
  const content = fs.readFileSync(redirectsPath, 'utf-8')
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'))

  it('zawiera regułę dla /odsetki-dzienne/*', () => {
    expect(content).toContain('/odsetki-dzienne/*')
    expect(content).toContain('/odsetki-dzienne/index.html')
    expect(content).toContain('200')
  })

  it('zawiera regułę dla /symulator-nadplat/*', () => {
    expect(content).toContain('/symulator-nadplat/*')
    expect(content).toContain('/symulator-nadplat/index.html')
    expect(content).toContain('200')
  })

  it('zawiera regułę dla /refinansowanie-kredytu/*', () => {
    expect(content).toContain('/refinansowanie-kredytu/*')
    expect(content).toContain('/refinansowanie-kredytu/index.html')
  })

  it('zawiera regułę dla /porownanie-ofert-bankow/*', () => {
    expect(content).toContain('/porownanie-ofert-bankow/*')
    expect(content).toContain('/porownanie-ofert-bankow/index.html')
  })

  it('zawiera SPA fallback /* /index.html 200 na końcu', () => {
    expect(content).toContain('/* /index.html 200')
    // SPA fallback powinien być ostatnią regułą
    const lastRule = lines[lines.length - 1]
    expect(lastRule).toMatch(/\/\*.*index\.html.*200/)
  })

  it('reguły prerenderowanych stron są PRZED SPA fallback', () => {
    const odsetkiIdx = content.indexOf('/odsetki-dzienne/*')
    const fallbackIdx = content.indexOf('/* /index.html 200')
    expect(odsetkiIdx).toBeGreaterThan(-1)
    expect(fallbackIdx).toBeGreaterThan(-1)
    expect(odsetkiIdx).toBeLessThan(fallbackIdx)
  })

  it('zawiera stare redirecty (/kalkulator-kredytu-hipotecznego/ → /)', () => {
    expect(content).toContain('/kalkulator-kredytu-hipotecznego/')
    expect(content).toContain('301')
  })

  it('nie ma błędnych reguł z netlify.toml (nie powinno tam być redirectów)', () => {
    // Upewnij się że netlify.toml nie ma [[redirects]] które by kolidowały
    const netlifyToml = fs.readFileSync(
      path.resolve(__dirname, '../../netlify.toml'),
      'utf-8'
    )
    expect(netlifyToml).not.toContain('[[redirects]]')
  })
})
