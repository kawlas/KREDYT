import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const prerenderJs = fs.readFileSync(
  path.resolve(__dirname, '../../prerender.js'),
  'utf-8'
)

describe('Sitemap i robots.txt spójność', () => {
  it('prerender.js nie blokuje /kontakt/ w robots.txt', () => {
    expect(prerenderJs).not.toMatch(/Disallow:\s*\/kontakt\//)
  })

  it('prerender.js nie blokuje /polityka-prywatnosci/ w robots.txt', () => {
    expect(prerenderJs).not.toMatch(/Disallow:\s*\/polityka-prywatnosci\//)
  })

  it('prerender.js generuje Disallow tylko dla /404/', () => {
    const disallowMatches = prerenderJs.match(/Disallow:\s*\//g)
    expect(disallowMatches).toHaveLength(1)
    expect(prerenderJs).toContain('Disallow: /404/')
  })

  it('prerender.js generuje sitemap z /kontakt/ i /polityka-prywatnosci/', () => {
    expect(prerenderJs).toContain("'/kontakt/'")
    expect(prerenderJs).toContain("'/polityka-prywatnosci/'")
  })
})
