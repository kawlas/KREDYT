import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const appTsx = fs.readFileSync(
  path.resolve(__dirname, '../../src/App.tsx'),
  'utf-8'
)

const topicsTs = fs.readFileSync(
  path.resolve(__dirname, '../../src/data/topics.ts'),
  'utf-8'
)

const redirectsContent = fs.readFileSync(
  path.resolve(__dirname, '../../public/_redirects'),
  'utf-8'
)

describe('Brak duplicate content - koszt vs koszty utrzymania', () => {
  it('nie ma sluga koszty-utrzymania-nieruchomosci w topics.ts', () => {
    expect(topicsTs).not.toContain("slug: 'koszty-utrzymania-nieruchomosci'")
  })

  it('nie ma route /koszty-utrzymania-nieruchomosci/ w App.tsx', () => {
    expect(appTsx).not.toContain('/koszty-utrzymania-nieruchomosci/')
  })

  it('redirect /koszty-utrzymania-nieruchomosci/ → /koszt-utrzymania-nieruchomosci/', () => {
    expect(redirectsContent).toContain('/koszty-utrzymania-nieruchomosci/')
    expect(redirectsContent).toContain('/koszt-utrzymania-nieruchomosci/')
    expect(redirectsContent).toContain('301')
  })

  it('/koszt-utrzymania-nieruchomosci/ ma H1 w komponencie', () => {
    const trueCostCalc = fs.readFileSync(
      path.resolve(__dirname, '../../src/components/calculators/TrueCostCalc.tsx'),
      'utf-8'
    )
    expect(trueCostCalc).toContain('<h1')
  })
})
