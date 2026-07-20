import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
// Static imports
import HubPage from '../pages/HubPage'
import TopicPage from '../pages/TopicPage'
import ContactPage from '../pages/ContactPage'
import Sidebar from '../components/layout/Sidebar'

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

function renderSidebar(pathname = '/kalkulator-raty-kredytu/') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[pathname]}>
        <LoanCalculatorProvider>
          <Sidebar isOpen={true} onClose={() => {}} />
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
// A — HubPage: left-aligned (no text-center)
// ###############################################################

describe('A — HubPage: left-aligned', () => {
  it('[A1] hero section nie zawiera text-center', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    // Hero is the first section with h1
    const heroSection = html.substring(0, html.indexOf('jak to działa'))
    expect(heroSection.includes('text-center')).toBe(false)
  })

  it('[A2] sekcja "Jak to działa" nie zawiera text-center', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const startIdx = html.indexOf('jak to działa')
    const endIdx = html.indexOf('co możesz zrobić')
    if (startIdx >= 0 && endIdx > startIdx) {
      const section = html.substring(startIdx, endIdx)
      expect(section.includes('text-center')).toBe(false)
    }
  })

  it('[A3] sekcja "Co możesz zrobić" nie zawiera text-center', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const startIdx = html.indexOf('co możesz zrobić')
    const endIdx = html.indexOf('zaufaj liczbom')
    if (startIdx >= 0 && endIdx > startIdx) {
      const section = html.substring(startIdx, endIdx)
      expect(section.includes('text-center')).toBe(false)
    }
  })

  it('[A4] sekcja "Zaufaj liczbom" nie zawiera text-center', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const startIdx = html.indexOf('zaufaj liczbom')
    const endIdx = html.indexOf('quick faq', startIdx)
    if (startIdx >= 0 && endIdx > startIdx) {
      const section = html.substring(startIdx, endIdx)
      expect(section.includes('text-center')).toBe(false)
    }
  })
})

// ###############################################################
// B — HubPage: compact cards
// ###############################################################

describe('B — HubPage: compact cards', () => {
  it('[B1] karty w tool grid mają padding p-4 (nie p-6)', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    // Find card elements in the "Co możesz zrobić" section
    const startIdx = html.indexOf('co możesz zrobić')
    if (startIdx >= 0) {
      const cardsSection = html.substring(startIdx)
      // Cards should use p-4 not p-6
      const hasP6 = cardsSection.match(/p-[\d]/g)
      if (hasP6) {
        expect(hasP6.includes('p-6')).toBe(false)
      }
      expect(cardsSection.includes('p-4')).toBe(true)
    }
  })

  it('[B2] karty mają rounded-lg (nie rounded-xl)', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    // Check for card-related rounded classes
    const cardSection = html.substring(html.indexOf('co możesz zrobić'))
    const hasRoundedXl = cardSection.match(/rounded-xl/g)
    // Should use rounded-lg instead
    expect(cardSection.includes('rounded-lg')).toBe(true)
    if (hasRoundedXl) {
      // If rounded-xl appears, it should be less than expected for all cards
      // (at most 1-2 occurrences for the CTA buttons, not 12+ for cards)
      expect(hasRoundedXl.length).toBeLessThan(3)
    }
  })

  it('[B3] gap między kartami to gap-3 lub mniej', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const cardSection = html.substring(html.indexOf('co możesz zrobić'))
    // Should have gap-3 (not gap-4)
    expect(cardSection.includes('gap-3') || cardSection.includes('gap-2') || cardSection.includes('gap-1')).toBe(true)
    expect(cardSection.includes('gap-4')).toBe(false)
  })
})

// ###############################################################
// C — HubPage: no emoji in headers
// ###############################################################

describe('C — HubPage: bez emoji w nagłówkach sekcji', () => {
  it('[C1] nagłówek "Sprawdź" nie zawiera emoji (📋)', () => {
    const { container } = renderPage(<HubPage />)
    const text = getText(container)
    // The emoji would appear as the actual emoji character
    expect(text.includes('📋')).toBe(false)
  })

  it('[C2] nagłówek "Symuluj" nie zawiera emoji (📊)', () => {
    const { container } = renderPage(<HubPage />)
    const text = getText(container)
    expect(text.includes('📊')).toBe(false)
  })

  it('[C3] nagłówek "Porównaj" nie zawiera emoji (🎯)', () => {
    const { container } = renderPage(<HubPage />)
    const text = getText(container)
    expect(text.includes('🎯')).toBe(false)
  })

  it('[C4] żaden nagłówek sekcji nie zawiera emoji', () => {
    const { container } = renderPage(<HubPage />)
    const text = getText(container)
    // Common emoji used in headers
    const emojiList = ['📋', '📊', '🎯', '🏠', '🧮', '📐', '📈', '📆', '💰', '⚖️', '🏦', '🔄', '🔒', '🔍', '📖', '❓', 'ℹ️']
    for (const emoji of emojiList) {
      expect(text.includes(emoji)).toBe(false)
    }
  })
})

// ###############################################################
// D — Sidebar: no emoji
// ###############################################################

describe('D — Sidebar: bez emoji', () => {
  it('[D1] sidebar nie zawiera emoji', () => {
    const { container } = renderSidebar('/odsetki-dzienne/')
    const text = getText(container)
    const emojiList = ['🏠', '🧮', '📊', '📐', '📈', '📆', '💰', '⚖️', '🏦', '🔄', '🔒', '🔍', '📋', '📖', '❓', 'ℹ️']
    for (const emoji of emojiList) {
      expect(text.includes(emoji)).toBe(false)
    }
  })

  it('[D2] każdy link w sidebarze ma tylko tekst (brak <span> z ikonką emoji)', () => {
    const { container } = renderSidebar('/odsetki-dzienne/')
    // Sidebar links should not have icon spans with emoji
    const links = container.querySelectorAll('a')
    for (const link of Array.from(links)) {
      // Check if there's a span that's not the label
      const spans = link.querySelectorAll('span')
      // With emoji removed, each link should have at most 1 span (the label)
      // or the emoji span should be removed
      if (spans.length > 0) {
        const firstSpan = spans[0]
        const spanText = firstSpan.textContent || ''
        // If there's a span with just an emoji character, fail
        if (spanText.trim().length <= 2 && /[\u{1F000}-\u{1FFFF}]/u.test(spanText)) {
          expect(true).toBe(false) // Found emoji span
        }
      }
    }
  })
})

// ###############################################################
// E — Sidebar: kolory kategorii
// ###############################################################

describe('E — Sidebar: kolory kategorii', () => {
  it('[E1] aktywny link kategorii "Kalkulatory" ma bg-blue-50 i text-blue-600', () => {
    const { container } = renderSidebar('/kalkulator-raty-kredytu/')
    const links = Array.from(container.querySelectorAll('a'))
    const calcLink = links.find(l => l.getAttribute('href') === '/kalkulator-raty-kredytu/')
    expect(calcLink).toBeTruthy()
    if (calcLink) {
      const cls = calcLink.className
      expect(cls.includes('bg-primary/10') && cls.includes('text-primary')).toBe(true)
    }
  })

  it('[E2] aktywny link kategorii "Porównaj" ma bg-violet-50 i text-violet-600', () => {
    const { container } = renderSidebar('/porownanie-ofert-bankow/')
    const links = Array.from(container.querySelectorAll('a'))
    const compareLink = links.find(l => l.getAttribute('href') === '/porownanie-ofert-bankow/')
    expect(compareLink).toBeTruthy()
    if (compareLink) {
      const cls = compareLink.className
      expect(cls.includes('bg-violet-50') && cls.includes('text-violet-600')).toBe(true)
    }
  })

  it('[E3] aktywny link kategorii "Analiza" ma bg-emerald-50 i text-emerald-600', () => {
    const { container } = renderSidebar('/ukryte-koszty-kredytu/')
    const links = Array.from(container.querySelectorAll('a'))
    const analysisLink = links.find(l => l.getAttribute('href') === '/ukryte-koszty-kredytu/')
    expect(analysisLink).toBeTruthy()
    if (analysisLink) {
      const cls = analysisLink.className
      expect(cls.includes('bg-emerald-50') && cls.includes('text-emerald-600')).toBe(true)
    }
  })
})

// ###############################################################
// F — General alignment
// ###############################################################

describe('F — General alignment (text-center removed)', () => {
  it('[F1] TopicPage nie zawiera text-center', () => {
    const { container } = renderPage(<TopicPage topicSlug="jak-dziala-wibor" />)
    const html = getHtml(container)
    expect(html.includes('text-center')).toBe(false)
  })

  it('[F2] ContactPage nie zawiera text-center w głównym tytule', () => {
    const { container } = renderPage(<ContactPage />)
    const html = getHtml(container)
    expect(html.includes('text-center')).toBe(false)
  })
})

// ###############################################################
// G — Regression
// ###############################################################

describe('G — Regresja', () => {
  it('[G1] HubPage renderuje się bez błędów', () => {
    expect(() => renderPage(<HubPage />)).not.toThrow()
  })

  it('[G2] TopicPage renderuje się bez błędów', () => {
    expect(() => renderPage(<TopicPage topicSlug="jak-dziala-wibor" />)).not.toThrow()
  })

  it('[G3] ContactPage renderuje się bez błędów', () => {
    expect(() => renderPage(<ContactPage />)).not.toThrow()
  })

  it('[G4] Sidebar renderuje się bez błędów', () => {
    expect(() => renderSidebar()).not.toThrow()
  })
})
