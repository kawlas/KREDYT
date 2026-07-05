import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import fs from 'fs'
import path from 'path'

// Static imports — existing components
import NavBar from '../components/layout/NavBar'

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

// Check if Sidebar file exists
const SIDEBAR_FILE = path.resolve(__dirname, '../components/layout/Sidebar.tsx')
const sidebarExists = fs.existsSync(SIDEBAR_FILE)

// Helper to try importing Sidebar at runtime
async function getSidebarComponent(): Promise<React.ComponentType<{ isOpen?: boolean; onClose?: () => void }> | null> {
  if (!sidebarExists) return null
  try {
    // Use a dynamic path that vite won't statically analyze
    const basePath = path.resolve(__dirname, '../components/layout')
    const mod = await import(path.join(basePath, 'Sidebar'))
    return mod.default
  } catch {
    return null
  }
}

// App.tsx content
const appContent = fs.existsSync(path.resolve(__dirname, '../App.tsx'))
  ? fs.readFileSync(path.resolve(__dirname, '../App.tsx'), 'utf-8')
  : ''

// ###############################################################
// A — Sidebar istnieje i zawiera elementy
// ###############################################################

describe('A — Sidebar istnieje i zawiera elementy', () => {
  it('[A1] plik src/components/layout/Sidebar.tsx istnieje', () => {
    expect(sidebarExists).toBe(true)
  })

  it('[A1b] App.tsx importuje Sidebar', () => {
    expect(appContent).toContain('Sidebar')
  })

  if (sidebarExists) {
    // Render sidebar once for all link tests
    let sidebarHtml = ''
    beforeAll(async () => {
      const Sidebar = await getSidebarComponent()
      if (Sidebar) {
        const { container } = render(
          <HelmetProvider>
            <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
              <LoanCalculatorProvider>
                <Sidebar isOpen={true} onClose={() => {}} />
              </LoanCalculatorProvider>
            </MemoryRouter>
          </HelmetProvider>
        )
        sidebarHtml = container.innerHTML.toLowerCase()
      }
    })

    const requiredLinks = [
      { label: 'Strona główna', path: '/' },
      { label: 'Kalkulator raty', path: '/kalkulator-raty-kredytu/' },
      { label: 'Zdolność kredytowa', path: '/zdolnosc-kredytowa/' },
      { label: 'Kalkulator LTV', path: '/ltv-kalkulator/' },
      { label: 'Symulacja WIBOR', path: '/symulacja-wibor/' },
      { label: 'Odsetki dzienne', path: '/odsetki-dzienne/' },
      { label: 'Raty równe/malejące', path: '/raty-rowne-czy-malejace/' },
      { label: 'Porównanie banków', path: '/porownanie-ofert-bankow/' },
      { label: 'Refinansowanie', path: '/refinansowanie-kredytu/' },
      { label: 'Stałe/Zmienne', path: '/stale-vs-zmienne-oprocentowanie/' },
      { label: 'Ukryte koszty', path: '/ukryte-koszty-kredytu/' },
      { label: 'Scoring BIK', path: '/co-wplywa-na-zdolnosc/' },
      { label: 'Nadpłaty', path: '/symulator-nadplat/' },
      { label: 'Poradniki', path: '/poradniki/' },
      { label: 'FAQ', path: '/faq-kredyt-hipoteczny/' },
      { label: 'O projekcie', path: '/o-projekcie/' },
    ]

    for (const link of requiredLinks) {
      it(`[A2-${link.path}] zawiera link "${link.label}"`, () => {
        expect(sidebarHtml).toContain(link.path)
      })
    }

    it('[A2-sum] zawiera co najmniej 15 linków', () => {
      // Count occurrences of href patterns
      const linkCount = (sidebarHtml.match(/href="/g) || []).length
      expect(linkCount).toBeGreaterThanOrEqual(15)
    })
  }
})

// ###############################################################
// B — Kategorie
// ###############################################################

describe('B — Kategorie w sidebarze', () => {
  if (!sidebarExists) {
    it('[B1] Sidebar nie istnieje — test pominięty', () => {})
    return
  }

  let sidebarText: string
  beforeAll(async () => {
    const Sidebar = await getSidebarComponent()
    if (Sidebar) {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
            <LoanCalculatorProvider>
              <Sidebar isOpen={true} onClose={() => {}} />
            </LoanCalculatorProvider>
          </MemoryRouter>
        </HelmetProvider>
      )
      sidebarText = container.textContent || ''
    }
  })

  it('[B1] kategoria "Kalkulatory" istnieje (tekst, nie link)', () => {
    expect(sidebarText).toContain('Kalkulatory')
  })

  it('[B2] kategoria "Porównaj" istnieje', () => {
    expect(sidebarText).toContain('Porównaj')
  })

  it('[B3] kategoria "Analiza" istnieje', () => {
    expect(sidebarText).toContain('Analiza')
  })
})

// ###############################################################
// C — Stylowanie
// ###############################################################

describe('C — Stylowanie sidebaru', () => {
  if (!sidebarExists) {
    it('[C1] Sidebar nie istnieje — test pominięty', () => {})
    return
  }

  let sidebarHtml: string
  beforeAll(async () => {
    const Sidebar = await getSidebarComponent()
    if (Sidebar) {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
            <LoanCalculatorProvider>
              <Sidebar isOpen={true} onClose={() => {}} />
            </LoanCalculatorProvider>
          </MemoryRouter>
        </HelmetProvider>
      )
      sidebarHtml = container.innerHTML.toLowerCase()
    }
  })

  it('[C1] ma szerokość w-60 lub w-56 (Tailwind)', () => {
    const hasWidth = sidebarHtml.includes('w-60') || sidebarHtml.includes('w-56') ||
                     sidebarHtml.includes('w-64') || sidebarHtml.includes('w-72')
    expect(hasWidth).toBe(true)
  })

  it('[C2] ma overflow-y-auto', () => {
    expect(sidebarHtml.includes('overflow-y-auto')).toBe(true)
  })

  it('[C3] jest po lewej (border-r lub border-gray)', () => {
    expect(
      sidebarHtml.includes('border-r') ||
      sidebarHtml.includes('border-gray')
    ).toBe(true)
  })
})

// ###############################################################
// D — Desktop vs Mobile
// ###############################################################

describe('D — Desktop vs Mobile', () => {
  if (!sidebarExists) {
    it('[D1] Sidebar nie istnieje — test pominięty', () => {})
    return
  }

  let sidebarHtml: string
  beforeAll(async () => {
    const Sidebar = await getSidebarComponent()
    if (Sidebar) {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
            <LoanCalculatorProvider>
              <Sidebar isOpen={true} onClose={() => {}} />
            </LoanCalculatorProvider>
          </MemoryRouter>
        </HelmetProvider>
      )
      sidebarHtml = container.innerHTML.toLowerCase()
    }
  })

  it('[D1] desktop: sidebar widoczny (lg:block lub brak -translate-x-full)', () => {
    // On desktop, sidebar should be visible
    expect(
      sidebarHtml.includes('lg:block') ||
      sidebarHtml.includes('md:block') ||
      !sidebarHtml.includes('-translate-x-full')
    ).toBe(true)
  })

  it('[D2] mobile: sidebar domyślnie ukryty (-translate-x-full lub hidden)', () => {
    expect(
      sidebarHtml.includes('-translate-x-full') ||
      sidebarHtml.includes('translate-x-[-100%]') ||
      sidebarHtml.includes('hidden')
    ).toBe(true)
  })

  it('[D3] istnieje hamburger (button z aria-label "Menu")', () => {
    expect(
      sidebarHtml.includes('aria-label="menu"') ||
      sidebarHtml.includes('aria-label="otwórz menu"') ||
      sidebarHtml.includes('aria-label="otwórz menu"') ||
      sidebarHtml.includes('aria-label="zamknij menu"') ||
      sidebarHtml.includes('aria-label="open menu"')
    ).toBe(true)
  })
})

// ###############################################################
// E — Zachowanie
// ###############################################################

describe('E — Zachowanie sidebaru', () => {
  if (!sidebarExists) {
    it('[E1] Sidebar nie istnieje — test pominięty', () => {})
    return
  }

  it('[E1] kliknięcie linku wywołuje onClose', async () => {
    const Sidebar = await getSidebarComponent()
    if (!Sidebar) return

    const onClose = vi.fn()
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
          <LoanCalculatorProvider>
            <Sidebar isOpen={true} onClose={onClose} />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )

    const link = container.querySelector('a')
    expect(link).toBeTruthy()
    if (link) {
      fireEvent.click(link)
      expect(onClose).toHaveBeenCalled()
    }
  })

  it('[E2] aktywna strona ma text-blue-600 lub bg-blue-50', async () => {
    const Sidebar = await getSidebarComponent()
    if (!Sidebar) return

    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
          <LoanCalculatorProvider>
            <Sidebar isOpen={true} onClose={() => {}} />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )

    const links = Array.from(container.querySelectorAll('a'))
    const activeLink = links.find(l => l.getAttribute('href')?.includes('odsetki-dzienne'))
    expect(activeLink).toBeTruthy()

    if (activeLink) {
      const cls = activeLink.className || ''
      expect(
        cls.includes('text-blue-600') ||
        cls.includes('bg-blue-50') ||
        cls.includes('text-blue-500')
      ).toBe(true)
    }
  })
})

// ###############################################################
// F — NavBar uproszczony
// ###############################################################

describe('F — NavBar uproszczony', () => {
  it('[F1] NavBar NIE zawiera linków narzędzi', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <LoanCalculatorProvider>
            <NavBar />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
    const html = container.innerHTML.toLowerCase()
    const hasToolLinks =
      html.includes('kalkulator raty') ||
      html.includes('zdolność kredytowa') ||
      html.includes('odsetki dzienne') ||
      html.includes('symulacja wibor')
    // These links should have been moved to sidebar
    expect(hasToolLinks).toBe(false)
  })

  it('[F2] NavBar ma logo (link do /)', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <LoanCalculatorProvider>
            <NavBar />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
    const links = Array.from(container.querySelectorAll('a'))
    const homeLink = links.find(l => l.getAttribute('href') === '/')
    expect(homeLink).toBeTruthy()
  })

  it('[F3] NavBar ma hamburger na mobile', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <LoanCalculatorProvider>
            <NavBar />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
    const buttons = Array.from(container.querySelectorAll('button'))
    const menuButton = buttons.find(b =>
      b.getAttribute('aria-label')?.toLowerCase().includes('menu') ||
      b.getAttribute('aria-label')?.toLowerCase().includes('otwórz') ||
      b.innerHTML.includes('svg')
    )
    expect(menuButton).toBeTruthy()
  })
})

// ###############################################################
// G — Regresja
// ###############################################################

describe('G — Regresja', () => {
  it('[G1] App.tsx zawiera flex layout dla sidebar + content', () => {
    expect(appContent).toContain('flex')
  })
})
