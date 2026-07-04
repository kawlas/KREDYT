import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import fs from 'fs'
import path from 'path'

// Page imports
import AboutPage from '../pages/AboutPage'
import CalculatorPage from '../pages/CalculatorPage'
import AffordabilityPage from '../pages/AffordabilityPage'
import DailyInterestPage from '../pages/DailyInterestPage'
import OverpaymentPage from '../pages/OverpaymentPage'
import RefinancingPage from '../pages/RefinancingPage'
import BankComparisonPage from '../pages/BankComparisonPage'
import PaymentComparisonPage from '../pages/PaymentComparisonPage'
import WiborSimulatorPage from '../pages/WiborSimulatorPage'
import EditorialPolicyPage from '../pages/EditorialPolicyPage'
import Footer from '../components/layout/Footer'

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

// Helper: extract visible text from container
function getVisibleText(container: HTMLElement): string {
  return container.textContent?.trim() || ''
}

// Helper: get lowercase HTML
function getHtml(container: HTMLElement): string {
  return container.innerHTML.toLowerCase()
}

// Helper: get lowercase text
function getText(container: HTMLElement): string {
  return getVisibleText(container).toLowerCase()
}

// ###############################################################
// TEST 1 — AboutPage (/o-projekcie/)
// ###############################################################

describe('AboutPage — E-E-A-T', () => {
  it('zawiera >200 znaków tekstu o autorze/ekspertach/zespole', () => {
    const { container } = renderPage(<AboutPage />)
    const text = getText(container)
    expect(text.length).toBeGreaterThanOrEqual(200)
    // Must mention author/team/expertise
    const hasAuthorInfo =
      text.includes('autor') ||
      text.includes('zespół') ||
      text.includes('założyciel') ||
      text.includes('twórca') ||
      text.includes('nasza misja') ||
      text.includes('doświadczenie') ||
      text.includes('ekspert') ||
      text.includes('analityk')
    expect(hasAuthorInfo).toBe(true)
  })

  it('zawiera linki/referencje do instytucji (KNF, UOKiK, ZBP, NBP)', () => {
    const { container } = renderPage(<AboutPage />)
    const html = getHtml(container)
    const hasInstitutions =
      html.includes('knf') ||
      html.includes('uokik') ||
      html.includes('zbp') ||
      html.includes('nbp') ||
      html.includes('komisja nadzoru finansowego') ||
      html.includes('urząd ochrony konkurencji') ||
      html.includes('narodowy bank polski') ||
      html.includes('związek banków polskich')
    expect(hasInstitutions).toBe(true)
  })

  it('zawiera datę ostatniej aktualizacji lub publikacji', () => {
    const { container } = renderPage(<AboutPage />)
    const text = getText(container)
    // Must have explicit date info
    const hasDateInfo =
      (text.includes('aktualizacja') || text.includes('ostatnia')) &&
      (text.includes('2026') || text.includes('2025'))
    expect(hasDateInfo).toBe(true)
  })
})

// ###############################################################
// TEST 2 — Strony kalkulatorów (8 stron)
// ###############################################################

const calculatorPages: { name: string; component: JSX.Element }[] = [
  { name: 'CalculatorPage', component: <CalculatorPage /> },
  { name: 'AffordabilityPage', component: <AffordabilityPage /> },
  { name: 'DailyInterestPage', component: <DailyInterestPage /> },
  { name: 'OverpaymentPage', component: <OverpaymentPage /> },
  { name: 'RefinancingPage', component: <RefinancingPage /> },
  { name: 'BankComparisonPage', component: <BankComparisonPage /> },
  { name: 'PaymentComparisonPage', component: <PaymentComparisonPage /> },
  { name: 'WiborSimulatorPage', component: <WiborSimulatorPage loanAmount={350000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" /> },
]

describe('Strony kalkulatorów — Źródła danych i odniesienia prawne', () => {
  it.each(calculatorPages)('$name ma sekcję "Źródła danych" z widocznym nagłówkiem', ({ name, component }) => {
    const { container } = renderPage(component)
    const html = getHtml(container)
    const hasSourceSection =
      html.includes('źródła danych') ||
      html.includes('źródło danych') ||
      html.includes('dane pochodzą z') ||
      html.includes('na podstawie danych')
    expect(hasSourceSection).toBe(true)
  })

  it.each(calculatorPages)('$name zawiera odnośnik do Ustawy o kredycie hipotecznym lub KNF', ({ name, component }) => {
    const { container } = renderPage(component)
    const text = getText(container)
    const hasLegalRef =
      text.includes('ustawa o kredycie hipotecznym') ||
      text.includes('dz.u.') ||
      text.includes('pozycja 819') ||
      text.includes('rekomendacja s') ||
      text.includes('rekomendacja t') ||
      text.includes('rekomendacja knf') ||
      text.includes('podstawa prawna')
    expect(hasLegalRef).toBe(true)
  })
})

// ###############################################################
// TEST 3 — Polityka redakcyjna /polityka-redakcyjna/
// ###############################################################

describe('Polityka redakcyjna — /polityka-redakcyjna/', () => {
  it('strona istnieje jako plik z >500 znakami treści', () => {
    const editorialPath = path.resolve(__dirname, '../pages/EditorialPolicyPage.tsx')
    const pageExists = fs.existsSync(editorialPath)
    expect(pageExists).toBe(true)

    const { container } = renderPage(<EditorialPolicyPage />)
    const text = getVisibleText(container)
    expect(text.length).toBeGreaterThanOrEqual(500)
  })
})

// ###############################################################
// TEST 4 — Footer z linkami instytucji
// ###############################################################

describe('Footer — linki do instytucji finansowych', () => {
  it('footer zawiera linki do NBP, KNF, UOKiK lub ZBP', () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    const html = getHtml(container)
    const hasInstitutionLinks =
      html.includes('nbp') ||
      html.includes('knf') ||
      html.includes('uokik') ||
      html.includes('zbp') ||
      html.includes('narodowy bank polski') ||
      html.includes('komisja nadzoru finansowego') ||
      html.includes('urząd ochrony konkurencji') ||
      html.includes('związek banków polskich')
    expect(hasInstitutionLinks).toBe(true)
  })
})
