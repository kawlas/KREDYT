import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLoanCalculator } from './context/LoanCalculatorContext'
import AffordabilityPage from './pages/AffordabilityPage'
import CalculatorPage from './pages/CalculatorPage'
import PaymentComparisonPage from './pages/PaymentComparisonPage'
import WiborSimulatorPage from './pages/WiborSimulatorPage'
import HubPage from './pages/HubPage'
import FAQPage from './pages/FAQPage'
import AboutPage from './pages/AboutPage'
import MethodologyPage from './pages/MethodologyPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import EditorialPolicyPage from './pages/EditorialPolicyPage'
import CompendiumsListPage from './pages/CompendiumsListPage'
import JakObliczycRatePage from './pages/JakObliczycRatePage'
import CreditCapacityCompendiumPage from './pages/CreditCapacityCompendiumPage'
import WiborARataPage from './pages/WiborARataPage'
import TopicPage from './pages/TopicPage'
import NotFoundPage from './pages/NotFoundPage'
import DailyInterestPage from './pages/DailyInterestPage'
import FixedVsVariablePage from './pages/FixedVsVariablePage'
import OverpaymentPage from './pages/OverpaymentPage'
import RefinancingPage from './pages/RefinancingPage'
import BankComparisonPage from './pages/BankComparisonPage'
import LTVPage from './pages/LTVPage'
import HiddenCostsPage from './pages/HiddenCostsPage'
import BIKSimulatorPage from './pages/BIKSimulatorPage'
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import Sidebar from './components/layout/Sidebar'
import ScrollToTop from './components/shared/ScrollToTop'
import BreadcrumbNav from './components/shared/BreadcrumbNav'
import ErrorBoundary from './components/shared/ErrorBoundary'
import ToastContainer from './components/shared/ToastContainer'
import CookieConsent from './components/shared/CookieConsent'

function App() {
  const { getValues } = useLoanCalculator()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none">
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
                <Routes>
                  <Route path="/kalkulator-kredytu-hipotecznego/" element={<Navigate to="/" replace />} />

                  <Route path="/" element={<HubPage />} />

                  <Route path="/kalkulator-raty-kredytu/" element={<CalculatorPage />} />

                  <Route path="/zdolnosc-kredytowa/" element={<AffordabilityPage />} />

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
                        baseWibor={Number(getValues().wibor || 5.85)}
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
                  <Route path="/co-wplywa-na-zdolnosc/" element={<BIKSimulatorPage />} />
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

                  <Route path="/:topicSlug/" element={<TopicPage />} />
                  <Route path="/404/" element={<NotFoundPage />} />

                  <Route path="*" element={<Navigate to="/404/" replace />} />
                </Routes>
              </ErrorBoundary>
            </main>
          </div>
          <Footer />
        </div>
      </div>

      <ToastContainer />
      <CookieConsent />
    </div>
  )
}

export default App
