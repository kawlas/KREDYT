import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const indexHtml = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf-8'
)

const seoHead = fs.readFileSync(
  path.resolve(__dirname, '../components/shared/SEOHead.tsx'),
  'utf-8'
)

describe('Brak duplikatu meta robots', () => {
  it('index.html nie zawiera hardcoded meta robots', () => {
    expect(indexHtml).not.toMatch(/<meta\s+name="robots"/)
  })

  it('SEOHead renderuje meta robots (jedyne źródło)', () => {
    expect(seoHead).toContain('<meta name="robots"')
  })
})
