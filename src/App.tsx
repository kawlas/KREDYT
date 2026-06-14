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
import TopicPage from './pages/TopicPage'
import NotFoundPage from './pages/NotFoundPage'
import DailyInterestPage from './pages/DailyInterestPage'
import OverpaymentPage from './pages/OverpaymentPage'
import RefinancingPage from './pages/RefinancingPage'
import BankComparisonPage from './pages/BankComparisonPage'
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import ScrollToTop from './components/shared/ScrollToTop'
import ErrorBoundary from './components/shared/ErrorBoundary'
import ToastContainer from './components/shared/Toast'

function App() {
  const {
    register,
    handleSubmit,
    trigger,
    onSubmit,
    results,
    savedOffers,
    isLoading,
    error,
    saveOffer,
    deleteOffer,
    errors,
    getValues,
    reset,
    setResults,
    setValue,
    control,
  } = useLoanCalculator()

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <NavBar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/kalkulator-kredytu-hipotecznego/" element={<Navigate to="/" replace />} />

              <Route path="/" element={<HubPage />} />

              <Route
                path="/kalkulator-raty-kredytu/"
                element={
                  <CalculatorPage
                    register={register}
                    handleSubmit={handleSubmit}
                    trigger={trigger}
                    onSubmit={onSubmit}
                    results={results}
                    savedOffers={savedOffers}
                    isLoading={isLoading}
                    error={error}
                    saveOffer={saveOffer}
                    deleteOffer={deleteOffer}
                    errors={errors}
                    getValues={getValues}
                    reset={reset}
                    setResults={setResults}
                    setValue={setValue}
                    control={control}
                  />
                }
              />

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
              <Route path="/symulator-nadplat/" element={<OverpaymentPage />} />
              <Route path="/refinansowanie-kredytu/" element={<RefinancingPage />} />
              <Route path="/porownanie-ofert-bankow/" element={<BankComparisonPage />} />
              <Route path="/faq-kredyt-hipoteczny/" element={<FAQPage />} />
              <Route path="/o-projekcie/" element={<AboutPage />} />
              <Route path="/metodologia/" element={<MethodologyPage />} />
              <Route path="/kontakt/" element={<ContactPage />} />
              <Route path="/polityka-prywatnosci/" element={<PrivacyPolicyPage />} />

              <Route path="/:topicSlug/" element={<TopicPage />} />
              <Route path="/404/" element={<NotFoundPage />} />

              <Route path="*" element={<Navigate to="/404/" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
