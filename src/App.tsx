import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import { useLoanCalculator } from './context/LoanCalculatorContext'
import AffordabilityPage from './pages/AffordabilityPage'
import CalculatorPage from './pages/CalculatorPage'
import PaymentComparisonPage from './pages/PaymentComparisonPage'
import WiborSimulatorPage from './pages/WiborSimulatorPage'

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
    setValue
  } = useLoanCalculator()

  const tabs = [
    { id: 'affordability', label: 'Zdolność kredytowa', icon: '💰', path: '/zdolnosc-kredytowa' },
    { id: 'calculator', label: 'Kalkulator raty', icon: '🧮', path: '/kalkulator-raty' },
    { id: 'comparison', label: 'Porównanie rat', icon: '⚖️', path: '/porownanie-rat' },
    { id: 'wibor', label: 'Symulacja WIBOR', icon: '📊', path: '/symulacja-wibor' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Kalkulator Kredytu Hipotecznego
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Profesjonalne narzędzia do analizy Twojego kredytu w jednym miejscu.
          </p>
        </header>

        <nav className="bg-white shadow-sm border-b border-gray-200 mb-8 rounded-xl overflow-hidden">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-4">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                     ${isActive 
                       ? 'bg-blue-600 text-white shadow-md' 
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                     }`
                  }
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <main className="space-y-8">
          <Routes>
            <Route path="/" element={<Navigate to="/zdolnosc-kredytowa" replace />} />
            <Route path="/zdolnosc-kredytowa" element={<AffordabilityPage />} />
            <Route 
              path="/kalkulator-raty" 
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
                />
              } 
            />
            <Route 
              path="/porownanie-rat" 
              element={
                <PaymentComparisonPage
                  loanAmount={Number(getValues().principal) || 400000}
                  annualRate={Number(getValues().wibor || 5.85) + Number(getValues().margin || 2)}
                  loanTermYears={Number(getValues().years) || 25}
                />
              } 
            />
            <Route 
              path="/symulacja-wibor" 
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
            <Route path="*" element={<Navigate to="/zdolnosc-kredytowa" replace />} />
          </Routes>
        </main>
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Kalkulator Kredytowy - Przejrzystość w finansach</p>
      </footer>
    </div>
  )
}

export default App
