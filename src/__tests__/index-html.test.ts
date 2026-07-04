import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const indexHtml = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf-8'
)

describe('index.html - brak hardcoded tagów SEO', () => {
  it('nie zawiera hardcoded <title>', () => {
    expect(indexHtml).not.toContain('<title>')
  })

  it('nie zawiera <meta name="description"', () => {
    expect(indexHtml).not.toContain('name="description"')
  })

  it('nie zawiera <meta name="keywords"', () => {
    expect(indexHtml).not.toContain('name="keywords"')
  })

  it('nie zawiera <link rel="canonical"', () => {
    expect(indexHtml).not.toContain('rel="canonical"')
  })

  it('nie zawiera <meta property="og:image"', () => {
    expect(indexHtml).not.toContain('property="og:image"')
  })

  it('zawiera <!--app-head--> placeholder', () => {
    expect(indexHtml).toContain('<!--app-head-->')
  })

  it('zawiera kod AdSense adsbygoogle.js', () => {
    expect(indexHtml).toContain('adsbygoogle.js')
  })

  it('zawiera <meta charset="UTF-8" />', () => {
    expect(indexHtml).toContain('charset="UTF-8"')
  })

  it('zawiera <div id="root">', () => {
    expect(indexHtml).toContain('<div id="root">')
  })

  it('zawiera konsent script', () => {
    expect(indexHtml).toContain('cookie_consent')
  })

  it('zawiera favicon link', () => {
    expect(indexHtml).toContain('favicon.svg')
  })
})
