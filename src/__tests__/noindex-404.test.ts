import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const seoHead = fs.readFileSync(
  path.resolve(__dirname, '../components/shared/SEOHead.tsx'),
  'utf-8'
)

const notFoundPage = fs.readFileSync(
  path.resolve(__dirname, '../pages/NotFoundPage.tsx'),
  'utf-8'
)

describe('404 page ma noindex', () => {
  it('SEOHead wspiera prop noIndex', () => {
    expect(seoHead).toContain('noIndex')
    expect(seoHead).toContain('noindex, nofollow')
  })

  it('NotFoundPage przekazuje noIndex do SEOHead', () => {
    expect(notFoundPage).toContain('noIndex')
  })
})
