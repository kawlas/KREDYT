import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'

// Page imports
import HubPage from '../pages/HubPage'
import CalculatorPage from '../pages/CalculatorPage'
import AffordabilityPage from '../pages/AffordabilityPage'
import DailyInterestPage from '../pages/DailyInterestPage'
import FixedVsVariablePage from '../pages/FixedVsVariablePage'
import OverpaymentPage from '../pages/OverpaymentPage'
import RefinancingPage from '../pages/RefinancingPage'
import BankComparisonPage from '../pages/BankComparisonPage'
import LTVPage from '../pages/LTVPage'
import HiddenCostsPage from '../pages/HiddenCostsPage'
import BIKSimulatorPage from '../pages/BIKSimulatorPage'
import PaymentComparisonPage from '../pages/PaymentComparisonPage'
import WiborSimulatorPage from '../pages/WiborSimulatorPage'
import FAQPage from '../pages/FAQPage'
import AboutPage from '../pages/AboutPage'
import MethodologyPage from '../pages/MethodologyPage'
import ContactPage from '../pages/ContactPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import NotFoundPage from '../pages/NotFoundPage'
import TopicPage from '../pages/TopicPage'

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

// Mock matchMedia and localStorage
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

// --- Helpers ---

/** Extract all <script type="application/ld+json"> blocks from rendered HTML */
function extractJsonLd(): string[] {
  // Helmet renders JSON-LD in document.head
  const scripts = document.querySelectorAll('script[type="application/ld+json"]')
  return Array.from(scripts)
    .map(s => s.textContent || '')
    .filter(t => t.trim().length > 0)
}

/** Parse all JSON-LD blocks into objects */
function parseJsonLd(scripts: string[]): Record<string, unknown>[] {
  return scripts.map(s => JSON.parse(s))
}

// --- Page configuration ---

interface PageConfig {
  name: string
  route: string
  component: JSX.Element
  hasCalculator: boolean   // should have WebApplication
  hasFaq: boolean          // should have FAQPage
  isContentPage: boolean   // should have Article
}

const testSlug = 'jak-dziala-wibor'

const allPages: PageConfig[] = [
  { name: 'HubPage',              route: '/',                                component: <HubPage />,                          hasCalculator: false, hasFaq: false, isContentPage: false },
  { name: 'CalculatorPage',       route: '/kalkulator-raty-kredytu/',        component: <CalculatorPage />,                    hasCalculator: true,  hasFaq: true,  isContentPage: false },
  { name: 'AffordabilityPage',    route: '/zdolnosc-kredytowa/',             component: <AffordabilityPage />,                 hasCalculator: true,  hasFaq: true,  isContentPage: false },
  { name: 'DailyInterestPage',    route: '/odsetki-dzienne/',                component: <DailyInterestPage />,                 hasCalculator: true,  hasFaq: false, isContentPage: false },
  { name: 'FixedVsVariablePage',  route: '/stale-vs-zmienne-oprocentowanie/', component: <FixedVsVariablePage />,              hasCalculator: true,  hasFaq: false, isContentPage: false },
  { name: 'OverpaymentPage',      route: '/symulator-nadplat/',              component: <OverpaymentPage />,                   hasCalculator: true,  hasFaq: false, isContentPage: false },
  { name: 'RefinancingPage',      route: '/refinansowanie-kredytu/',         component: <RefinancingPage />,                   hasCalculator: true,  hasFaq: false, isContentPage: false },
  { name: 'BankComparisonPage',   route: '/porownanie-ofert-bankow/',        component: <BankComparisonPage />,                hasCalculator: true,  hasFaq: false, isContentPage: false },
  { name: 'LTVPage',              route: '/ltv-kalkulator/',                 component: <LTVPage />,                           hasCalculator: true,  hasFaq: false, isContentPage: false },
  { name: 'HiddenCostsPage',      route: '/ukryte-koszty-kredytu/',          component: <HiddenCostsPage />,                   hasCalculator: false, hasFaq: true,  isContentPage: false },
  { name: 'BIKSimulatorPage',     route: '/co-wplywa-na-zdolnosc/',          component: <BIKSimulatorPage />,                  hasCalculator: true,  hasFaq: true,  isContentPage: false },
  { name: 'PaymentComparisonPage', route: '/raty-rowne-czy-malejace/',       component: <PaymentComparisonPage />,              hasCalculator: true,  hasFaq: false, isContentPage: false },
  { name: 'WiborSimulatorPage',   route: '/symulacja-wibor/',                component: <WiborSimulatorPage loanAmount={350000} loanTermYears={25} margin={2} baseWibor={5.75} installmentType="equal" />, hasCalculator: true, hasFaq: true, isContentPage: false },
  { name: 'FAQPage',              route: '/faq-kredyt-hipoteczny/',          component: <FAQPage />,                           hasCalculator: false, hasFaq: true,  isContentPage: false },
  { name: 'AboutPage',            route: '/o-projekcie/',                    component: <AboutPage />,                         hasCalculator: false, hasFaq: false, isContentPage: true },
  { name: 'MethodologyPage',      route: '/metodologia/',                    component: <MethodologyPage />,                   hasCalculator: false, hasFaq: false, isContentPage: true },
  { name: 'ContactPage',          route: '/kontakt/',                        component: <ContactPage />,                       hasCalculator: false, hasFaq: false, isContentPage: false },
  { name: 'PrivacyPolicyPage',    route: '/polityka-prywatnosci/',           component: <PrivacyPolicyPage />,                  hasCalculator: false, hasFaq: false, isContentPage: true },
  { name: 'TopicPage',            route: `/${testSlug}/`,                    component: <TopicPage topicSlug={testSlug} />,   hasCalculator: false, hasFaq: true,  isContentPage: true },
  { name: 'NotFoundPage',         route: '/404/',                            component: <NotFoundPage />,                      hasCalculator: false, hasFaq: false, isContentPage: false },
]

// --- Render helper ---

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

// ###############################################################
// TESTY — BreadcrumbList (na KAŻDEJ stronie)
// ###############################################################

describe('BreadcrumbList JSON-LD', () => {
  it.each(allPages)('$name ma BreadcrumbList schema', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const breadcrumbs = parsed.filter((s) => s['@type'] === 'BreadcrumbList')
      expect(breadcrumbs.length).toBeGreaterThanOrEqual(1)
    })
  })
})

// ###############################################################
// TESTY — Organization (na KAŻDEJ stronie)
// ###############################################################

describe('Organization JSON-LD', () => {
  it.each(allPages)('$name ma Organization schema', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const orgs = parsed.filter((s) => s['@type'] === 'Organization')
      expect(orgs.length).toBeGreaterThanOrEqual(1)
    })
  })
})

// ###############################################################
// TESTY — WebApplication (dla stron kalkulatorów)
// ###############################################################

describe('WebApplication JSON-LD (strony kalkulatorów)', () => {
  const calcPages = allPages.filter(p => p.hasCalculator)

  it.each(calcPages)('$name ma WebApplication schema', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const apps = parsed.filter((s) => s['@type'] === 'WebApplication')
      expect(apps.length).toBeGreaterThanOrEqual(1)
    })
  })

  it.each(calcPages)('$name WebApplication ma applicationCategory FinanceApplication', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const app = parsed.find((s) => s['@type'] === 'WebApplication')
      expect(app).toBeDefined()
      expect(app!.applicationCategory).toBe('FinanceApplication')
    })
  })
})

// ###############################################################
// TESTY — FAQPage (dla stron z FAQ)
// ###############################################################

describe('FAQPage JSON-LD (strony z FAQ)', () => {
  const faqPages = allPages.filter(p => p.hasFaq)

  it.each(faqPages)('$name ma FAQPage schema', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const faqs = parsed.filter((s) => s['@type'] === 'FAQPage')
      expect(faqs.length).toBeGreaterThanOrEqual(1)
    })
  })

  it.each(faqPages)('$name FAQPage ma co najmniej 1 Question', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const faq = parsed.find((s) => s['@type'] === 'FAQPage')
      expect(faq).toBeDefined()
      const questions = (faq!.mainEntity as Array<{ '@type'?: string }> | undefined)?.filter((e) => e['@type'] === 'Question') || []
      expect(questions.length).toBeGreaterThanOrEqual(1)
    })
  })
})

// ###############################################################
// TESTY — Article (dla stron treściowych)
// ###############################################################

describe('Article JSON-LD (strony treściowe)', () => {
  const contentPages = allPages.filter(p => p.isContentPage)

  it.each(contentPages)('$name ma Article schema', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const articles = parsed.filter((s) => s['@type'] === 'Article')
      expect(articles.length).toBeGreaterThanOrEqual(1)
    })
  })

  it.each(contentPages)('$name Article ma headline', async ({ component }) => {
    renderPage(component)
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const article = parsed.find((s) => s['@type'] === 'Article')
      expect(article).toBeDefined()
      expect(article!.headline).toBeTruthy()
      expect(typeof article!.headline).toBe('string')
      expect((article!.headline as string).length).toBeGreaterThan(0)
    })
  })
})

// ###############################################################
// TESTY GLOBALNE
// ###############################################################

describe('Globalne - walidacja JSON', () => {
  it.each(allPages)('$name: każdy ld+json jest poprawnym JSON', async ({ component }) => {
    renderPage(component)
    
    await waitFor(() => {
      const scripts = extractJsonLd()
      expect(scripts.length).toBeGreaterThan(0) // co najmniej jeden JSON-LD istnieje

      for (const script of scripts) {
        expect(() => JSON.parse(script)).not.toThrow()
      }
    })
  })
})

describe('Globalne - Breadcrumb spójność', () => {
  it.each(allPages)('$name: breadcrumb URL-e zaczynają się od https://kredytkalkulator.netlify.app', async ({ component }) => {
    renderPage(component)
    
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const breadcrumb = parsed.find((s) => s['@type'] === 'BreadcrumbList')

      if (!breadcrumb) return // skip if no breadcrumb (RED phase)

      for (const item of (breadcrumb.itemListElement as Array<{ item?: string }> | undefined) || []) {
        expect(item.item ?? '').toMatch(/^https:\/\/kredytkalkulator\.netlify\.app/)
      }
    })
  })

  it.each(allPages)('$name: breadcrumb pozycje są unikalne (1, 2, ...)', async ({ component }) => {
    renderPage(component)
    
    await waitFor(() => {
      const scripts = extractJsonLd()
      const parsed = parseJsonLd(scripts)
      const breadcrumb = parsed.find((s) => s['@type'] === 'BreadcrumbList')

      if (!breadcrumb) return // skip if no breadcrumb (RED phase)

      const positions = ((breadcrumb.itemListElement as Array<{ position?: number }> | undefined) || []).map((e) => e.position)
      const uniquePositions = new Set(positions)
      expect(uniquePositions.size).toBe(positions.length)
    })
  })
})
