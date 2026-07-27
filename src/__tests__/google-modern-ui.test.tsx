import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import fs from 'fs'
import path from 'path'

// Static imports
import HubPage from '../pages/HubPage'
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

// ###############################################################
// A — Design Tokens: CSS variables
// ###############################################################

describe('A — Design Tokens: CSS variables', () => {
  const cssPath = path.resolve(__dirname, '../index.css')
  const cssContent = fs.readFileSync(cssPath, 'utf-8')

  it('[A1] istnieje zmienna --surface (#F8F9FA light / #121212 dark)', () => {
    expect(cssContent).toContain('--surface:')
  })

  it('[A2] istnieje zmienna --primary (#1A73E8)', () => {
    expect(cssContent).toContain('--primary:')
  })

  it('[A3] istnieje zmienna --primary-container (#E8F0FE)', () => {
    expect(cssContent).toContain('--primary-container:')
  })

  it('[A4] istnieje zmienna --outline-variant (#DADCE0)', () => {
    expect(cssContent).toContain('--outline-variant:')
  })

  it('[A5] istnieje zmienna --text-primary (#202124)', () => {
    expect(cssContent).toContain('--text-primary:')
  })

  it('[A6] istnieje zmienna --text-secondary (#5F6368)', () => {
    expect(cssContent).toContain('--text-secondary:')
  })
})

// ###############################################################
// B — Typography: Manrope font
// ###############################################################

describe('B — Typography: Manrope font', () => {
  it('[B1] index.html ładuje Manrope z Google Fonts', () => {
    const htmlPath = path.resolve(__dirname, '../../index.html')
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8')
    expect(htmlContent).toContain('fonts.googleapis.com/css2?family=Manrope')
  })

  it('[B2] index.css używa Manrope w body', () => {
    const cssPath = path.resolve(__dirname, '../index.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')
    expect(cssContent).toContain("'Manrope'")
  })
})

// ###############################################################
// C — Sidebar: 280px i style
// ###############################################################

describe('C — Sidebar: 280px i style', () => {
  it('[C1] sidebar ma szerokość w-[280px]', () => {
    const { container } = renderSidebar('/odsetki-dzienne/')
    const html = getHtml(container)
    expect(html.includes('w-[280px]')).toBe(true)
  })

  it('[C2] aktywny link ma rounded-r-full', () => {
    const { container } = renderSidebar('/odsetki-dzienne/')
    const html = getHtml(container)
    expect(html.includes('rounded-r-full')).toBe(true)
  })

  it('[C3] aktywny link ma bg-primary-container', () => {
    const { container } = renderSidebar('/odsetki-dzienne/')
    const html = getHtml(container)
    expect(html.includes('bg-primary-container')).toBe(true)
  })

  it('[C4] sidebar ma border-outline-variant', () => {
    const { container } = renderSidebar('/odsetki-dzienne/')
    const html = getHtml(container)
    expect(html.includes('border-outline-variant')).toBe(true)
  })
})

// ###############################################################
// D — HubPage: karty bento grid
// ###############################################################

describe('D — HubPage: karty bento grid', () => {
  it('[D1] karty mają rounded-2xl', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const cardSection = html.substring(html.indexOf('co możesz zrobić'))
    expect(cardSection.includes('rounded-2xl')).toBe(true)
  })

  it('[D2] karty mają border-outline-variant', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const cardSection = html.substring(html.indexOf('co możesz zrobić'))
    expect(cardSection.includes('border-outline-variant')).toBe(true)
  })

  it('[D3] karty mają animate-card', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const cardSection = html.substring(html.indexOf('co możesz zrobić'))
    expect(cardSection.includes('animate-card')).toBe(true)
  })
})

// ###############################################################
// E — Animacje: fadeInUp
// ###############################################################

describe('E — Animacje: fadeInUp', () => {
  it('[E1] index.css ma keyframes fadeInUp', () => {
    const cssPath = path.resolve(__dirname, '../index.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')
    expect(cssContent).toContain('@keyframes fadeInUp')
  })

  it('[E2] index.css ma klasę .animate-card', () => {
    const cssPath = path.resolve(__dirname, '../index.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')
    expect(cssContent).toContain('.animate-card')
  })
})

// ###############################################################
// F — CTA buttons: rounded-lg i scale-98
// ###############################################################

describe('F — CTA buttons: rounded-lg i scale-98', () => {
  it('[F1] przyciski CTA na HubPage mają rounded-lg', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    const roundedLg = html.match(/rounded-lg/g) || []
    expect(roundedLg.length).toBeGreaterThan(0)
  })

  it('[F2] HubPage ma active:scale-98 na przyciskach', () => {
    const { container } = renderPage(<HubPage />)
    const html = getHtml(container)
    expect(html.includes('active:scale-98') || html.includes('active:scale-95')).toBe(true)
  })
})

// ###############################################################
// G — Regresja
// ###############################################################

describe('G — Regresja', () => {
  it('[G1] HubPage renderuje się bez błędów', () => {
    expect(() => renderPage(<HubPage />)).not.toThrow()
  })

  it('[G2] Sidebar renderuje się bez błędów', () => {
    expect(() => renderSidebar()).not.toThrow()
  })
})
