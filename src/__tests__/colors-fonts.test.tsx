import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import fs from 'fs'
import path from 'path'

// Static imports
import CompendiumsListPage from '../pages/CompendiumsListPage'
import PaymentComparisonPage from '../pages/PaymentComparisonPage'

// Mock WIBOR hook
vi.mock('../hooks/useWIBOR', () => ({
  useWIBOR: () => ({
    wibor: 5.75,
    loading: false,
    error: null,
    lastUpdate: '2026-07-03',
    source: 'test',
    refresh: vi.fn(),
  }),
}))

const originalMatchMedia = window.matchMedia
const originalGetItem = Storage.prototype.getItem

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
})

afterAll(() => {
  window.matchMedia = originalMatchMedia
  Storage.prototype.getItem = originalGetItem
})

function renderPage(element: JSX.Element) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/']}>
        <LoanCalculatorProvider>
          {element}
        </LoanCalculatorProvider>
      </MemoryRouter>
    </HelmetProvider>
  )
}

function getHtml(container: HTMLElement): string {
  return container.innerHTML.toLowerCase()
}

// ###############################################################
// A — CompendiumsListPage: bez emoji
// ###############################################################

describe('A — CompendiumsListPage: bez emoji', () => {
  it('[A1] strona nie zawiera icon: \'📊\'', () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, '../pages/CompendiumsListPage.tsx'),
      'utf-8'
    )
    expect(source).not.toContain("'📊'")
  })

  it('[A2] strona nie zawiera icon: \'📈\'', () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, '../pages/CompendiumsListPage.tsx'),
      'utf-8'
    )
    expect(source).not.toContain("'📈'")
  })

  it('[A3] obiekty w liście kompendiów nie mają pola icon', () => {
    const source = fs.readFileSync(
      path.resolve(__dirname, '../pages/CompendiumsListPage.tsx'),
      'utf-8'
    )
    expect(source).not.toContain('icon:')
  })
})

// ###############################################################
// B — PaymentComparison: kolory niebieskie
// ###############################################################

describe('B — PaymentComparison: kolory niebieskie', () => {
  it('[B1] "Raty równe gdy:" karta ma bg-blue-50', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    // Find the "Raty równe gdy" section
    const equalIdx = html.indexOf('raty równe gdy')
    expect(equalIdx).toBeGreaterThanOrEqual(0)
    // The surrounding div should have bg-blue-50
    const context = html.substring(Math.max(0, equalIdx - 200), equalIdx + 200)
    expect(context.includes('bg-blue-50')).toBe(true)
    expect(context.includes('bg-green-50')).toBe(false)
  })

  it('[B2] "Raty malejące gdy:" karta ma bg-blue-50', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    const decreasingIdx = html.indexOf('raty malejące gdy')
    expect(decreasingIdx).toBeGreaterThanOrEqual(0)
    const context = html.substring(Math.max(0, decreasingIdx - 200), decreasingIdx + 200)
    expect(context.includes('bg-blue-50')).toBe(true)
  })

  it('[B3] "Oszczędność" karta ma bg-blue-50 i text-blue-600', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    const savingsIdx = html.indexOf('oszczędność')
    expect(savingsIdx).toBeGreaterThanOrEqual(0)
    const context = html.substring(Math.max(0, savingsIdx - 300), savingsIdx + 300)
    expect(context.includes('bg-blue-50')).toBe(true)
    expect(context.includes('text-blue-600')).toBe(true)
  })

  it('[B4] "Jak zmieniają się raty?" sekcja ma bg-blue-50', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    const ratesIdx = html.indexOf('jak zmieniają się raty')
    expect(ratesIdx).toBeGreaterThanOrEqual(0)
    const context = html.substring(Math.max(0, ratesIdx - 100), ratesIdx + 100)
    expect(context.includes('bg-blue-50')).toBe(true)
  })

  it('[B5] "LEPSZY WYBÓR" badge ma bg-blue-500', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    const badgeIdx = html.indexOf('lepszy wybór')
    expect(badgeIdx).toBeGreaterThanOrEqual(0)
    const context = html.substring(Math.max(0, badgeIdx - 100), badgeIdx + 100)
    expect(context.includes('bg-blue-500')).toBe(true)
    expect(context.includes('bg-green-500')).toBe(false)
  })

  it('[B6] Savings indicator ma bg-blue-100 text-blue-800', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    // Look for "Oszczędzasz" text (savings indicator in ComparisonCard)
    const saveIdx = html.indexOf('oszczędzasz')
    if (saveIdx >= 0) {
      const context = html.substring(Math.max(0, saveIdx - 200), saveIdx + 200)
      expect(context.includes('bg-blue-100')).toBe(true)
      expect(context.includes('text-blue-800')).toBe(true)
      expect(context.includes('bg-green-100')).toBe(false)
    }
  })

  it('[B7] żadna karta nie ma bg-green-* ani text-green-*', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    // Check for green classes used on cards (not general gray/green text)
    // bg-green-50, bg-green-100, bg-green-500, text-green-600, text-green-800 etc.
    const greenClasses = html.match(/bg-green-\d+|text-green-\d+|border-green-\d+/g)
    // There should be no green color classes
    expect(greenClasses).toBeNull()
  })
})

// ###############################################################
// C — Font size consistency
// ###############################################################

describe('C — Font size consistency', () => {
  // Scan all page files for h1/h2 font sizes
  const pagesDir = path.resolve(__dirname, '../pages')

  it('[C1] wszystkie h1 mają text-3xl', () => {
    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))
    for (const file of files) {
      const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8')
      // Find all h1 elements with className
      const h1Matches = content.match(/<h1[^>]*>/g)
      if (h1Matches) {
        for (const match of h1Matches) {
          // h1 should have text-3xl, not text-4xl, text-5xl etc.
          if (match.includes('className=')) {
            expect(
              match.includes('text-3xl')
            ).toBe(true)
            // Should not have non-standard sizes
            expect(match.match(/text-\[.*px\]/)).toBeNull()
          }
        }
      }
    }
  })

  it('[C2] wszystkie h2 mają text-2xl (nie text-xl, text-lg)', () => {
    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))
    const violations: string[] = []
    for (const file of files) {
      const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8')
      const h2Matches = content.match(/<h2[^>]*>/g)
      if (h2Matches) {
        for (const match of h2Matches) {
          if (match.includes('className=')) {
            if (
              !match.includes('text-2xl') &&
              !match.includes('text-xl') // Wait, the spec says all h2 should be text-2xl, so text-xl is ALSO wrong
            ) {
              violations.push(`${file}: ${match}`)
            }
          }
        }
      }
    }
    // Actually the spec says h2 → text-2xl, so text-xl and text-lg on h2 are wrong
    // Let me check properly
    for (const file of files) {
      const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8')
      const h2Matches = content.match(/<h2[^>]*>/g)
      if (h2Matches) {
        for (const match of h2Matches) {
          if (match.includes('className=')) {
            // h2 MUST have text-2xl
            expect(match.includes('text-2xl')).toBe(true)
            // Should not have non-standard sizes
            expect(match.match(/text-\[.*px\]/)).toBeNull()
          }
        }
      }
    }
  })

  it('[C3] żaden nagłówek (h1/h2) nie ma niestandardowego rozmiaru text-[*px]', () => {
    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))
    for (const file of files) {
      const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8')
      const headerMatches = content.match(/<(h1|h2)[^>]*text-\[\d+px\][^>]*>/g)
      expect(headerMatches).toBeNull()
    }
  })
})

// ###############################################################
// D — Regression
// ###############################################################

describe('D — Regresja', () => {
  it('[D1] CompendiumsListPage renderuje się bez błędów', () => {
    expect(() => renderPage(<CompendiumsListPage />)).not.toThrow()
  })

  it('[D2] PaymentComparisonPage renderuje się bez błędów', () => {
    expect(() => renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )).not.toThrow()
  })
})
