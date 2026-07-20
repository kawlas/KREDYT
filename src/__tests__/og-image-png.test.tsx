import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import SEOHead from '../components/shared/SEOHead'

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

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <LoanCalculatorProvider>
          {ui}
        </LoanCalculatorProvider>
      </HelmetProvider>
    </MemoryRouter>
  )
}

describe('og:image musi być PNG, nie SVG', () => {
  it('SEOHead renderuje og:image z rozszerzeniem PNG lub JPG', async () => {
    renderWithProviders(
      <SEOHead title="Test" description="Test description" />
    )

    await new Promise(r => setTimeout(r, 50))

    const metas = document.querySelectorAll('meta[property="og:image"]')
    expect(metas.length).toBeGreaterThanOrEqual(1)

    const content = metas[0]?.getAttribute('content') || ''
    expect(content).toMatch(/\.(png|jpg|jpeg|webp)(\?.*)?$/i)
    expect(content).not.toMatch(/\.svg/i)
  })

  it('og:image ma poprawne wymiary 1200x630', async () => {
    renderWithProviders(
      <SEOHead title="Test" description="Test description" />
    )

    await new Promise(r => setTimeout(r, 50))

    const ogWidth = document.querySelector('meta[property="og:image:width"]')
    const ogHeight = document.querySelector('meta[property="og:image:height"]')

    expect(ogWidth?.getAttribute('content')).toBe('1200')
    expect(ogHeight?.getAttribute('content')).toBe('630')
  })

  it('og:image zawiera pełny URL (absolutny)', async () => {
    renderWithProviders(
      <SEOHead title="Test" description="Test description" />
    )

    await new Promise(r => setTimeout(r, 50))

    const metas = document.querySelectorAll('meta[property="og:image"]')
    const content = metas[0]?.getAttribute('content') || ''
    expect(content).toMatch(/^https?:\/\//)
  })
})
