import { describe, it, expect, beforeAll, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import type { ReactElement } from 'react'
import crypto from 'crypto'

// --- Page imports ---
import CalculatorPage from '../pages/CalculatorPage'
import AffordabilityPage from '../pages/AffordabilityPage'
import DailyInterestPage from '../pages/DailyInterestPage'
import OverpaymentPage from '../pages/OverpaymentPage'
import RefinancingPage from '../pages/RefinancingPage'
import BankComparisonPage from '../pages/BankComparisonPage'
import PaymentComparisonPage from '../pages/PaymentComparisonPage'
import WiborSimulatorPage from '../pages/WiborSimulatorPage'

// --- Mocks ---
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

// --- Helper: extract all visible text from rendered DOM ---
function getVisibleText(container: HTMLElement): string {
  // screen.debug() alternative: collect textContent from all non-hidden elements
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null)
  const parts: string[] = []
  let node: Text | null
  while ((node = walker.nextNode() as Text | null)) {
    const text = node.textContent?.trim()
    if (text && node.parentElement && node.parentElement.offsetParent !== null) {
      // Only collect text from visible elements (offsetParent !== null means visible)
      parts.push(text)
    } else if (text) {
      // If offsetParent is null but element is in the DOM, still collect
      // (jsdom doesn't compute layout, so offsetParent might be null)
      parts.push(text)
    }
  }
  return parts.join(' ')
}

// --- Strony i ich konfiguracja ---
interface PageConfig {
  name: string
  route: string
  component: ReactElement
  expectedKeywords: string[]
}

// Helper wrapper for consistent rendering
function renderPage(element: ReactElement) {
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

// --- DEFINIOWANIE STRON ---
const pages: PageConfig[] = [
  {
    name: 'CalculatorPage',
    route: '/kalkulator-raty-kredytu/',
    component: <CalculatorPage />,
    expectedKeywords: ['rata', 'kredyt', 'kalkulator'],
  },
  {
    name: 'AffordabilityPage',
    route: '/zdolnosc-kredytowa/',
    component: <AffordabilityPage />,
    expectedKeywords: ['zdolność', 'kredyt'],
  },
  {
    name: 'DailyInterestPage',
    route: '/odsetki-dzienne/',
    component: <DailyInterestPage />,
    expectedKeywords: ['odsetki', 'dzienne'],
  },
  {
    name: 'OverpaymentPage',
    route: '/symulator-nadplat/',
    component: <OverpaymentPage />,
    expectedKeywords: ['nadpłat'],
  },
  {
    name: 'RefinancingPage',
    route: '/refinansowanie-kredytu/',
    component: <RefinancingPage />,
    expectedKeywords: ['refinansowanie'],
  },
  {
    name: 'BankComparisonPage',
    route: '/porownanie-ofert-bankow/',
    component: <BankComparisonPage />,
    expectedKeywords: ['porównanie', 'bank'],
  },
  {
    name: 'PaymentComparisonPage',
    route: '/raty-rowne-czy-malejace/',
    component: <PaymentComparisonPage />,
    expectedKeywords: ['raty', 'równe', 'malejące'],
  },
  {
    name: 'WiborSimulatorPage',
    route: '/symulacja-wibor/',
    component: (
      <WiborSimulatorPage
        loanAmount={350000}
        loanTermYears={25}
        margin={2.0}
        baseWibor={5.75}
        installmentType="equal"
      />
    ),
    expectedKeywords: ['wibor', 'symulacja'],
  },
]

// ########## TESTY INDYWIDUALNE DLA KAŻDEJ STRONY ##########

describe.each(pages)('$name - treść i struktura', ({ name, component, expectedKeywords }) => {
  // Render once per test (vitest creates clean DOM per it() by default with jsdom)
  // We'll render inside each test for isolation

  it('renderuje się bez błędów', () => {
    expect(() => renderPage(component)).not.toThrow()
  })

  it('zawiera co najmniej 300 znaków widocznej treści', () => {
    const { container } = renderPage(component)
    const text = getVisibleText(container)
    expect(text.length).toBeGreaterThanOrEqual(300)
  })

  it('zawiera informację o dacie (aktualizacja / data / 2026)', () => {
    const { container } = renderPage(component)

    // Check for <time> element
    const timeElements = container.querySelectorAll('time')
    if (timeElements.length > 0) {
      expect(timeElements.length).toBeGreaterThanOrEqual(1)
      return // pass
    }

    // Check for text containing date-related keywords
    const text = getVisibleText(container).toLowerCase()
    const hasDateInfo =
      text.includes('aktualizacja') ||
      text.includes('data publikacji') ||
      text.includes('ostatnia') ||
      text.includes('2026')
    expect(hasDateInfo).toBe(true)
  })

  it('zawiera sekcję FAQ z co najmniej 3 pytaniami', () => {
    const { container } = renderPage(component)

    // Check for <details>/<summary> elements (FaqBlock pattern)
    const details = container.querySelectorAll('details')
    const summaries = container.querySelectorAll('summary')

    // Check for heading with "częste pytania" or "FAQ"
    const text = getVisibleText(container).toLowerCase()
    const hasFaqHeading =
      text.includes('częste pytania') ||
      text.includes('faq') ||
      text.includes('pytanie')

    const questionCount = details.length > 0 ? details.length : summaries.length
    expect(questionCount).toBeGreaterThanOrEqual(3)
  })
})

// ########## TESTY GLOBALNE ##########

describe('Globalne - brak duplikacji treści', () => {
  const pageTexts: { name: string; hash: string; text: string }[] = []

  beforeAll(() => {
    for (const page of pages) {
      const { container } = renderPage(page.component)
      const text = getVisibleText(container)
      const hash = crypto.createHash('md5').update(text).digest('hex')
      pageTexts.push({ name: page.name, hash, text })
    }
  })

  it('każda strona ma unikalną zawartość (różne hashe MD5)', () => {
    const hashes = pageTexts.map(p => p.hash)
    const uniqueHashes = new Set(hashes)
    expect(uniqueHashes.size).toBe(hashes.length)
  })

  it('żadne dwie strony nie mają identycznego tekstu', () => {
    for (let i = 0; i < pageTexts.length; i++) {
      for (let j = i + 1; j < pageTexts.length; j++) {
        if (pageTexts[i].text === pageTexts[j].text) {
          // This would be caught by the hash test too, but explicit is clearer
          expect(pageTexts[i].text).not.toEqual(pageTexts[j].text)
        }
      }
    }
  })
})

describe('Globalne - renderowanie bez błędów', () => {
  it.each(pages)('$name renderuje się bez exception', ({ name, component }) => {
    expect(() => renderPage(component)).not.toThrow()
  })
})
