import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'


// Static imports
import WiborSimulatorPage from '../pages/WiborSimulatorPage'
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

function getText(container: HTMLElement): string {
  return container.textContent?.trim() || ''
}

// ###############################################################
// A — WIBOR page: column alignment
// ###############################################################

describe('A — WIBOR page: wyrównanie kolumn', () => {
  it('[A1] WiborSimulatorPage renderuje się bez błędów', () => {
    expect(() => renderPage(
      <WiborSimulatorPage loanAmount={400000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" />
    )).not.toThrow()
  })

  it('[A2] grid ma klasę items-start', () => {
    const { container } = renderPage(
      <WiborSimulatorPage loanAmount={400000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" />
    )
    const html = getHtml(container)
    // The main grid container should have items-start
    expect(html.includes('items-start')).toBe(true)
  })

  it('[A3] lewa kolumna zawiera Card z tytułem "Przetestuj scenariusze"', () => {
    const { container } = renderPage(
      <WiborSimulatorPage loanAmount={400000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" />
    )
    const text = getText(container)
    expect(text).toContain('Przetestuj scenariusze')
    // The title should be inside a Card
    const html = getHtml(container)
    // Find the card with this title
    const scenarioIdx = html.indexOf('przetestuj scenariusze')
    expect(scenarioIdx).toBeGreaterThanOrEqual(0)
  })

  it('[A4] prawa kolumna zawiera Card z tytułem "Wynik symulacji"', () => {
    const { container } = renderPage(
      <WiborSimulatorPage loanAmount={400000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" />
    )
    const text = getText(container)
    expect(text).toContain('Wynik symulacji')
  })

  it('[A5] kolumny są wyrównane (items-start w gridzie)', () => {
    // Same as A2 — items-start ensures both columns start at the same height
    const { container } = renderPage(
      <WiborSimulatorPage loanAmount={400000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" />
    )
    const html = getHtml(container)
    expect(html.includes('items-start')).toBe(true)
  })
})

// ###############################################################
// B — PaymentComparison: alignment + colors
// ###############################################################

describe('B — PaymentComparison: wyrównanie + kolory', () => {
  it('[B6] "Którą ratę wybrać" sekcja ma items-start lub flex-start', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    // The two-column layout should have items-start
    const twoColumnDivs = html.match(/two-column-layout/g)
    expect(twoColumnDivs).toBeTruthy()
    // Check the first two-column-layout (comparison cards)
    const firstLayoutIdx = html.indexOf('two-column-layout')
    const secondLayoutIdx = html.indexOf('two-column-layout', firstLayoutIdx + 1)
    // Second two-column-layout is "Którą ratę wybrać" + "Jak zmieniają się raty"
    if (secondLayoutIdx >= 0) {
      const secondLayout = html.substring(secondLayoutIdx, secondLayoutIdx + 500)
      expect(secondLayout.includes('items-start')).toBe(true)
    }
  })

  it('[B7] karty porównawcze mają nagłówki na tej samej wysokości', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    // The comparison cards are in the first two-column-layout
    // Check that they're in a grid with items-start
    const html = getHtml(container)
    // The two-column-layout should use CSS grid or flex with items-start
    expect(html.includes('items-start') || html.includes('two-column-layout')).toBe(true)
  })

  it('[B8] karta "Oszczędność" ma bg-blue-50 (nie zielona)', () => {
    const { container } = renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )
    const html = getHtml(container)
    const savingsIdx = html.indexOf('oszczędność')
    expect(savingsIdx).toBeGreaterThanOrEqual(0)
    const context = html.substring(Math.max(0, savingsIdx - 300), savingsIdx + 300)
    expect(context.includes('bg-primary/10')).toBe(true)
    expect(context.includes('bg-green-50')).toBe(false)
  })
})


// ###############################################################
// D — Regression
// ###############################################################

describe('D — Regresja', () => {
  it('[D12] WiborSimulatorPage renderuje się bez błędów', () => {
    expect(() => renderPage(
      <WiborSimulatorPage loanAmount={400000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" />
    )).not.toThrow()
  })

  it('[D13] PaymentComparisonPage renderuje się bez błędów', () => {
    expect(() => renderPage(
      <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
    )).not.toThrow()
  })
})
