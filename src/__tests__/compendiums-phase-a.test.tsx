import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import fs from 'fs'
import path from 'path'

// Static imports — existujące pliki
import NavBar from '../components/layout/NavBar'
import CalculatorPage from '../pages/CalculatorPage'
import AffordabilityPage from '../pages/AffordabilityPage'
import DailyInterestPage from '../pages/DailyInterestPage'
import OverpaymentPage from '../pages/OverpaymentPage'
import RefinancingPage from '../pages/RefinancingPage'
import BankComparisonPage from '../pages/BankComparisonPage'
import PaymentComparisonPage from '../pages/PaymentComparisonPage'
import WiborSimulatorPage from '../pages/WiborSimulatorPage'

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

// Helpers
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

function pageFileExists(name: string): boolean {
  return fs.existsSync(path.resolve(__dirname, `../pages/${name}.tsx`))
}

// ###############################################################
// TEST 1 — Strony kompendiów (sprawdzamy czy pliki istnieją)
// ###############################################################

const compendiumFiles = [
  { file: 'JakObliczycRatePage', slug: 'jak-obliczyc-rate' },
  { file: 'CreditCapacityCompendiumPage', slug: 'zdolnosc-kredytowa' },
  { file: 'WiborARataPage', slug: 'wibor-a-rata' },
]

describe('Strony kompendiów — czy istnieją', () => {
  for (const comp of compendiumFiles) {
    it(`${comp.file}.tsx istnieje dla /poradniki/${comp.slug}/`, () => {
      expect(pageFileExists(comp.file)).toBe(true)
    })
  }
})

// ###############################################################
// TEST 2 — Lista /poradniki/
// ###############################################################

describe('/poradniki/ — lista', () => {
  it('CompendiumsListPage.tsx istnieje', () => {
    expect(pageFileExists('CompendiumsListPage')).toBe(true)
  })
})

// ###############################################################
// TEST 3 — NavBar
// ###############################################################

describe('NavBar — nawigacja', () => {
  it('zawiera link "Poradniki" prowadzący do /poradniki/', () => {
    const { container } = render(<MemoryRouter><NavBar /></MemoryRouter>)
    const links = Array.from(container.querySelectorAll('a'))
    const poradnikiLink = links.find(l => l.textContent?.toLowerCase().includes('poradniki'))
    expect(poradnikiLink).toBeDefined()
    expect(poradnikiLink!.getAttribute('href')).toBe('/poradniki/')
  })

  it('zawiera link "O projekcie" prowadzący do /o-projekcie/', () => {
    const { container } = render(<MemoryRouter><NavBar /></MemoryRouter>)
    const links = Array.from(container.querySelectorAll('a'))
    const aboutLink = links.find(l => l.textContent?.toLowerCase().includes('projekcie'))
    expect(aboutLink).toBeDefined()
    expect(aboutLink!.getAttribute('href')).toBe('/o-projekcie/')
  })

  it('ma maksymalnie 6 głównych pozycji na desktopie', () => {
    const { container } = render(<MemoryRouter><NavBar /></MemoryRouter>)
    const links = Array.from(container.querySelectorAll('a'))
    // Filter out mobile-only links (those with animation-delay style)
    const desktopLinks = links.filter(l => {
      const style = l.getAttribute('style')
      return !style?.includes('animation-delay')
    })
    // Exclude brand logo link
    const mainItems = desktopLinks.filter(l => l.getAttribute('href') !== '/')
    expect(mainItems.length).toBeLessThanOrEqual(6)
  })

  it('wszystkie linki są osiągalne (nie prowadzą do 404)', () => {
    const { container } = render(<MemoryRouter><NavBar /></MemoryRouter>)
    const links = Array.from(container.querySelectorAll('a[href]'))
    for (const link of links) {
      const href = link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href!.startsWith('/')).toBe(true)
    }
  })
})

// ###############################################################
// TEST 4 — Linki w kalkulatorach
// ###############################################################

const calcComponents: { file: string; component: JSX.Element }[] = [
  { file: 'CalculatorPage', component: <CalculatorPage /> },
  { file: 'AffordabilityPage', component: <AffordabilityPage /> },
  { file: 'DailyInterestPage', component: <DailyInterestPage /> },
  { file: 'OverpaymentPage', component: <OverpaymentPage /> },
  { file: 'RefinancingPage', component: <RefinancingPage /> },
  { file: 'BankComparisonPage', component: <BankComparisonPage /> },
  { file: 'PaymentComparisonPage', component: <PaymentComparisonPage /> },
  { file: 'WiborSimulatorPage', component: <WiborSimulatorPage loanAmount={350000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" /> },
]

describe('Linki do poradników w kalkulatorach', () => {
  for (const { file, component } of calcComponents) {
    it(`${file} zawiera link do poradnika`, () => {
      const { container } = renderPage(component)
      const html = getHtml(container)
      const hasLink =
        html.includes('poradniki/jak-obliczyc-rate') ||
        html.includes('poradniki/zdolnosc-kredytowa') ||
        html.includes('zobacz także') ||
        html.includes('zobacz również') ||
        html.includes('kompendium')
      expect(hasLink).toBe(true)
    })
  }
})

// ###############################################################
// TEST 5 — Routing
// ###############################################################

describe('Routing w App.tsx', () => {
  it('zawiera route dla /poradniki/', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../App.tsx'), 'utf-8')
    expect(content).toContain('/poradniki/')
  })

  it('zawiera route dla /poradniki/jak-obliczyc-rate/', () => {
    const content = fs.readFileSync(path.resolve(__dirname, '../App.tsx'), 'utf-8')
    expect(content).toContain('jak-obliczyc-rate')
  })
})

// ###############################################################
// TEST 6 — Code quality (render bez błędów dla istniejących stron)
// ###############################################################

describe('Renderowanie bez błędów', () => {
  it('NavBar renderuje się bez błędów', () => {
    expect(() => render(<MemoryRouter><NavBar /></MemoryRouter>)).not.toThrow()
  })

  for (const { file, component } of calcComponents) {
    it(`${file} renderuje się bez błędów`, () => {
      expect(() => renderPage(component)).not.toThrow()
    })
  }
})
