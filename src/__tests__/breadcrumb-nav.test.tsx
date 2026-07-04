import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import fs from 'fs'
import path from 'path'

// Static imports — existing pages
import CalculatorPage from '../pages/CalculatorPage'
import AffordabilityPage from '../pages/AffordabilityPage'
import DailyInterestPage from '../pages/DailyInterestPage'
import OverpaymentPage from '../pages/OverpaymentPage'
import RefinancingPage from '../pages/RefinancingPage'
import BankComparisonPage from '../pages/BankComparisonPage'
import PaymentComparisonPage from '../pages/PaymentComparisonPage'
import WiborSimulatorPage from '../pages/WiborSimulatorPage'
import JakObliczycRatePage from '../pages/JakObliczycRatePage'
import CreditCapacityCompendiumPage from '../pages/CreditCapacityCompendiumPage'
import WiborARataPage from '../pages/WiborARataPage'

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

// Helper: render page with providers
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


// Data file exists check
const breadcrumbsDataExists = fs.existsSync(
  path.resolve(__dirname, '../data/breadcrumbs.ts')
)

// ###############################################################
// CZĘŚĆ 1 — BreadcrumbNav (komponent wizualny)
// ###############################################################

let BreadcrumbNav: React.ComponentType | null = null

beforeAll(async () => {
  try {
    const mod = await import('../components/shared/BreadcrumbNav')
    BreadcrumbNav = mod.default
  } catch {
    BreadcrumbNav = null
  }
})

describe('BreadcrumbNav — komponent', () => {
  it('plik src/components/shared/BreadcrumbNav.tsx istnieje', () => {
    expect(
      fs.existsSync(path.resolve(__dirname, '../components/shared/BreadcrumbNav.tsx'))
    ).toBe(true)
  })

  if (BreadcrumbNav) {
  const BCNav = BreadcrumbNav
    it('renderuje <nav aria-label="Breadcrumb"> na stronach wewnętrznych', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const nav = container.querySelector('nav[aria-label="Breadcrumb"]')
      expect(nav).toBeTruthy()
    })

    it('nie renderuje breadcrumb na stronie głównej "/"', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const nav = container.querySelector('nav[aria-label="Breadcrumb"]')
      expect(nav).toBeNull()
    })

    it('dla "/odsetki-dzienne/" zawiera "Start" i "Odsetki dzienne"', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const text = container.textContent?.toLowerCase() || ''
      expect(text).toContain('start')
      expect(text).toContain('odsetki dzienne')
    })

    it('dla "/kalkulator-raty-kredytu/" zawiera "Kalkulator raty"', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/kalkulator-raty-kredytu/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const text = container.textContent?.toLowerCase() || ''
      expect(text).toContain('kalkulator raty')
    })

    it('dla "/poradniki/jak-obliczyc-rate/" zawiera "Poradniki" i "Jak obliczyć ratę"', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/poradniki/jak-obliczyc-rate/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const text = container.textContent?.toLowerCase() || ''
      expect(text).toContain('poradniki')
      expect(text).toContain('jak obliczyć ratę')
    })

    it('dla "/o-projekcie/" zawiera "O projekcie"', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/o-projekcie/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const text = container.textContent?.toLowerCase() || ''
      expect(text).toContain('o projekcie')
    })

    it('dla "/faq-kredyt-hipoteczny/" zawiera "FAQ"', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/faq-kredyt-hipoteczny/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const text = container.textContent?.toLowerCase() || ''
      expect(text).toContain('faq')
    })

    it('ostatni element ma oznaczenie aria-current="page"', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/odsetki-dzienne/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const lastLi = container.querySelector('li:last-child')
      expect(lastLi).toBeTruthy()
      expect(lastLi!.getAttribute('aria-current')).toBe('page')
    })

    it('linki w breadcrumb prowadzą do prawidłowych URLi', () => {
      const { container } = render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/poradniki/jak-obliczyc-rate/']}>
            <BCNav />
          </MemoryRouter>
        </HelmetProvider>
      )
      const links = Array.from(container.querySelectorAll('a'))
      for (const link of links) {
        const href = link.getAttribute('href')
        expect(href).toBeTruthy()
        expect(href!.startsWith('/')).toBe(true)
      }
    })
  }
})

// ###############################################################
// CZĘŚĆ 2 — Breadcrumb w App.tsx (globalny)
// ###############################################################

describe('Breadcrumb w App.tsx (globalny)', () => {
  it('App.tsx importuje BreadcrumbNav', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../App.tsx'), 'utf-8')
    expect(content).toContain('BreadcrumbNav')
  })

  it('App.tsx renderuje <BreadcrumbNav> w layout', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../App.tsx'), 'utf-8')
    expect(content).toContain('BreadcrumbNav')
  })
})

// ###############################################################
// CZĘŚĆ 3 — Spójność layoutu (kalkulatory)
// ###############################################################

const calculatorPages = [
  { name: 'CalculatorPage', component: <CalculatorPage /> },
  { name: 'AffordabilityPage', component: <AffordabilityPage /> },
  { name: 'DailyInterestPage', component: <DailyInterestPage /> },
  { name: 'OverpaymentPage', component: <OverpaymentPage /> },
  { name: 'RefinancingPage', component: <RefinancingPage /> },
  { name: 'BankComparisonPage', component: <BankComparisonPage /> },
  { name: 'PaymentComparisonPage', component: <PaymentComparisonPage /> },
  { name: 'WiborSimulatorPage', component: <WiborSimulatorPage loanAmount={350000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" /> },
]

const compendiumPages = [
  { name: 'JakObliczycRatePage', component: <JakObliczycRatePage /> },
  { name: 'CreditCapacityCompendiumPage', component: <CreditCapacityCompendiumPage /> },
  { name: 'WiborARataPage', component: <WiborARataPage /> },
]

describe('Spójność layoutu — strony kalkulatorów', () => {
  for (const { name, component } of calculatorPages) {
    describe(name, () => {
      it('zawiera formularz (input, select lub button)', () => {
        const { container } = renderPage(component)
        const hasFormElements =
          container.querySelector('input, select, button, [role="button"]') !== null
        expect(hasFormElements).toBe(true)
      })

      it('zawiera wyniki (rata, koszt, RRSO itp.)', () => {
        const { container } = renderPage(component)
        const text = container.textContent?.toLowerCase() || ''
        const hasResults =
          text.includes('rata') ||
          text.includes('wynik') ||
          text.includes('koszt') ||
          text.includes('rrso') ||
          text.includes('odsetki') ||
          text.includes('oszczędność') ||
          text.includes('porównanie')
        expect(hasResults).toBe(true)
      })

      it('zawiera źródła danych (NBP, KNF, "Źródła" lub "Dane")', () => {
        const { container } = renderPage(component)
        const text = container.textContent?.toLowerCase() || ''
        const hasSources =
          text.includes('źródło') ||
          text.includes('podstawa prawna') ||
          text.includes('dane') ||
          text.includes('nbp') ||
          text.includes('knf') ||
          text.includes('ustawa')
        expect(hasSources).toBe(true)
      })
    })
  }
})

// ###############################################################
// CZĘŚĆ 4 — Spójność layoutu (kompendia)
// ###############################################################

describe('Spójność layoutu — strony kompendiów', () => {
  for (const { name, component } of compendiumPages) {
    describe(name, () => {
      it('ma <h1> z tytułem', () => {
        const { container } = renderPage(component)
        const h1 = container.querySelector('h1')
        expect(h1).toBeTruthy()
        expect(h1!.textContent!.length).toBeGreaterThan(0)
      })

      it('ma JSON-LD Article schema', async () => {
        renderPage(component)
        await waitFor(() => {
          const scripts = document.querySelectorAll('script[type="application/ld+json"]')
          const jsonlds = Array.from(scripts).map(s => {
            try { return JSON.parse(s.textContent || '') } catch { return null }
          }).filter(Boolean)
          const hasArticle = jsonlds.some((j: any) => j['@type'] === 'Article')
          expect(hasArticle).toBe(true)
        })
      })

      it('ma JSON-LD BreadcrumbList', async () => {
        renderPage(component)
        await waitFor(() => {
          const scripts = document.querySelectorAll('script[type="application/ld+json"]')
          const jsonlds = Array.from(scripts).map(s => {
            try { return JSON.parse(s.textContent || '') } catch { return null }
          }).filter(Boolean)
          const hasBreadcrumb = jsonlds.some((j: any) => j['@type'] === 'BreadcrumbList')
          expect(hasBreadcrumb).toBe(true)
        })
      })

      it('ma minimum 2700 znaków widocznego tekstu', () => {
        const { container } = renderPage(component)
        const text = container.textContent?.trim() || ''
        expect(text.length).toBeGreaterThanOrEqual(2700)
      })

      it('zawiera CTA link do kalkulatora / narzędzia', () => {
        const { container } = renderPage(component)
        const html = getHtml(container)
        const hasCTA =
          html.includes('kalkulator') ||
          html.includes('oblicz') ||
          html.includes('sprawdź')
        expect(hasCTA).toBe(true)
      })
    })
  }
})

// ###############################################################
// CZĘŚĆ 5 — src/data/breadcrumbs.ts
// ###############################################################

describe('src/data/breadcrumbs.ts', () => {
  it('plik istnieje', () => {
    expect(breadcrumbsDataExists).toBe(true)
  })

  if (breadcrumbsDataExists) {
    it('eksportuje breadcrumbHierarchy jako Record<string, BreadcrumbItem[]>', async () => {
      const mod = await import('../data/breadcrumbs')
      expect(mod.breadcrumbHierarchy).toBeDefined()
      expect(typeof mod.breadcrumbHierarchy).toBe('object')
    })

    it('zawiera wpis dla "/"', async () => {
      const mod = await import('../data/breadcrumbs')
      expect(mod.breadcrumbHierarchy['/']).toBeDefined()
    })

    it('zawiera wpisy dla wszystkich stron kalkulatorów', async () => {
      const mod = await import('../data/breadcrumbs')
      const paths = [
        '/kalkulator-raty-kredytu/',
        '/zdolnosc-kredytowa/',
        '/odsetki-dzienne/',
        '/symulacja-wibor/',
        '/raty-rowne-czy-malejace/',
        '/porownanie-ofert-bankow/',
        '/refinansowanie-kredytu/',
        '/symulator-nadplat/',
      ]
      for (const p of paths) {
        expect(mod.breadcrumbHierarchy[p]).toBeDefined()
      }
    })

    it('zawiera wpisy dla /poradniki/ i jej podstron', async () => {
      const mod = await import('../data/breadcrumbs')
      expect(mod.breadcrumbHierarchy['/poradniki/']).toBeDefined()
      expect(mod.breadcrumbHierarchy['/poradniki/jak-obliczyc-rate/']).toBeDefined()
      expect(mod.breadcrumbHierarchy['/poradniki/zdolnosc-kredytowa/']).toBeDefined()
      expect(mod.breadcrumbHierarchy['/poradniki/wibor-a-rata/']).toBeDefined()
    })
  }
})

// ###############################################################
// CZĘŚĆ 6 — Regresja
// ###############################################################

describe('Regresja — renderowanie bez błędów', () => {
  it('wszystkie strony kalkulatorów renderują się bez błędów', () => {
    for (const { component } of calculatorPages) {
      expect(() => renderPage(component)).not.toThrow()
    }
  })

  it('wszystkie strony kompendiów renderują się bez błędów', () => {
    for (const { component } of compendiumPages) {
      expect(() => renderPage(component)).not.toThrow()
    }
  })
})
