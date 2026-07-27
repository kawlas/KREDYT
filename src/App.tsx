import { lazy, Suspense, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLoanCalculator } from './context/LoanCalculatorContext'
import { ThemeProvider } from './hooks/useTheme'
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import Sidebar from './components/layout/Sidebar'
import ScrollToTop from './components/shared/ScrollToTop'
import BreadcrumbNav from './components/shared/BreadcrumbNav'
import ErrorBoundary from './components/shared/ErrorBoundary'
import ToastContainer from './components/shared/ToastContainer'
import CookieConsent from './components/shared/CookieConsent'
import AdSenseLoader from './components/shared/AdSenseLoader'
import HubPage from './pages/HubPage'

// Route-level code splitting: each page is loaded on demand instead of being
// bundled into the initial chunk graph. This keeps the initial JS payload small
// (the homepage no longer downloads every calculator's code).
const AffordabilityPage = lazy(() => import('./pages/AffordabilityPage'))
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'))
const PaymentComparisonPage = lazy(() => import('./pages/PaymentComparisonPage'))
const WiborSimulatorPage = lazy(() => import('./pages/WiborSimulatorPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const EditorialPolicyPage = lazy(() => import('./pages/EditorialPolicyPage'))
const CompendiumsListPage = lazy(() => import('./pages/CompendiumsListPage'))
const JakObliczycRatePage = lazy(() => import('./pages/JakObliczycRatePage'))
const CreditCapacityCompendiumPage = lazy(() => import('./pages/CreditCapacityCompendiumPage'))
const WiborARataPage = lazy(() => import('./pages/WiborARataPage'))
const TopicPage = lazy(() => import('./pages/TopicPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const DailyInterestPage = lazy(() => import('./pages/DailyInterestPage'))
const FixedVsVariablePage = lazy(() => import('./pages/FixedVsVariablePage'))
const OverpaymentPage = lazy(() => import('./pages/OverpaymentPage'))
const RefinancingPage = lazy(() => import('./pages/RefinancingPage'))
const BankComparisonPage = lazy(() => import('./pages/BankComparisonPage'))
const LTVPage = lazy(() => import('./pages/LTVPage'))
const HiddenCostsPage = lazy(() => import('./pages/HiddenCostsPage'))
const BIKSimulatorPage = lazy(() => import('./pages/BIKSimulatorPage'))
const ChecklistPage = lazy(() => import('./pages/ChecklistPage'))
const TrueCostPage = lazy(() => import('./pages/TrueCostPage'))
const CommissionPage = lazy(() => import('./pages/CommissionPage'))
const InsurancePage = lazy(() => import('./pages/InsurancePage'))
const RentVsBuyPage = lazy(() => import('./pages/RentVsBuyPage'))
const MityPage = lazy(() => import('./pages/MityPage'))
const TipsAndTricksPage = lazy(() => import('./pages/TipsAndTricksPage'))

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-20" aria-busy="true" aria-live="polite">
      <span className="text-muted-foreground text-sm">Ładowanie…</span>
    </div>
  )
}

function App() {
  const { getValues } = useLoanCalculator()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <ScrollToTop />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none">
        Przejdź do treści
      </a>

      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0">
          <NavBar onMenuClick={() => setSidebarOpen(true)} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <BreadcrumbNav />
            <main id="main-content">
              <ErrorBoundary>
                <Suspense fallback={<PageFallback />}>
                  <Routes>
                    <Route path="/kalkulator-kredytu-hipotecznego/" element={<Navigate to="/" replace />} />

                    <Route path="/" element={<HubPage />} />

                    <Route path="/kalkulator-raty-kredytu/" element={<CalculatorPage />} />

                    <Route
                      path="/raty-rowne-czy-malejace/"
                      element={
                        <PaymentComparisonPage
                          loanAmount={Number(getValues().principal) || 400000}
                          annualRate={Number(getValues().wibor || 5.85) + Number(getValues().margin || 2)}
                          loanTermYears={Number(getValues().years) || 25}
                        />
                      }
                    />

                    <Route
                      path="/symulacja-wibor/"
                      element={
                        <WiborSimulatorPage
                          loanAmount={Number(getValues().principal) || 400000}
                          loanTermYears={Number(getValues().years) || 25}
                          margin={Number(getValues().margin || 2)}
                          installmentType={getValues().installmentType || 'equal'}
                        />
                      }
                    />

                    <Route path="/odsetki-dzienne/" element={<DailyInterestPage />} />
                    <Route path="/stale-vs-zmienne-oprocentowanie/" element={<FixedVsVariablePage />} />
                    <Route path="/symulator-nadplat/" element={<OverpaymentPage />} />
                    <Route path="/refinansowanie-kredytu/" element={<RefinancingPage />} />
                    <Route path="/porownanie-ofert-bankow/" element={<BankComparisonPage />} />
                    <Route path="/ltv-kalkulator/" element={<LTVPage />} />
                    <Route path="/ukryte-koszty-kredytu/" element={<HiddenCostsPage />} />
                    <Route path="/zdolnosc-kredytowa/" element={<AffordabilityPage />} />
                    <Route path="/co-wplywa-na-zdolnosc/" element={<BIKSimulatorPage />} />
                    <Route path="/przygotowanie-do-kredytu/" element={<ChecklistPage />} />
                    <Route path="/koszt-utrzymania-nieruchomosci/" element={<TrueCostPage />} />
                    <Route path="/faq-kredyt-hipoteczny/" element={<FAQPage />} />
                    <Route path="/o-projekcie/" element={<AboutPage />} />
                    <Route path="/metodologia/" element={<MethodologyPage />} />
                    <Route path="/kontakt/" element={<ContactPage />} />
                    <Route path="/polityka-prywatnosci/" element={<PrivacyPolicyPage />} />
                    <Route path="/polityka-redakcyjna/" element={<EditorialPolicyPage />} />
                    <Route path="/poradniki/" element={<CompendiumsListPage />} />
                    <Route path="/poradniki/jak-obliczyc-rate/" element={<JakObliczycRatePage />} />
                    <Route path="/poradniki/zdolnosc-kredytowa/" element={<CreditCapacityCompendiumPage />} />
                    <Route path="/poradniki/wibor-a-rata/" element={<WiborARataPage />} />

                    <Route path="/kalkulator-prowizji/" element={<CommissionPage />} />
                    <Route path="/kalkulator-ubezpieczen/" element={<InsurancePage />} />
                    <Route path="/kredyt-vs-wynajem/" element={<RentVsBuyPage />} />
                    <Route path="/mity-kredytowe/" element={<MityPage />} />
                     <Route path="/poradniki/strategia-maksymalizacji-zysku/" element={<TipsAndTricksPage />} />
                    <Route path="/:topicSlug/" element={<TopicPage />} />
                    <Route path="/404/" element={<NotFoundPage />} />

                    <Route path="*" element={<Navigate to="/404/" replace />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
          </div>
          <Footer />
        </div>
      </div>

      <ToastContainer />
      <CookieConsent />
      <AdSenseLoader />
    </div>
    </ThemeProvider>
  )
}

export default App
