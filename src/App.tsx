import { useState } from 'react'
import Card from './components/shared/Card'
import { animate } from 'motion'
import { useLoanCalculator } from './hooks/useLoanCalculator'
import LoanForm from './components/LoanForm'
import ResultsCard from './components/ResultsCard'
import ComparisonTable from './components/ComparisonTable'
import { AffordabilityCalc } from './components/calculators/AffordabilityCalc'
import PaymentComparison from './components/calculators/PaymentComparison'
import WiborSimulator from './components/calculators/WiborSimulator'
import TabContainer from './components/layout/TabContainer'

function App() {
  const [activeTab, setActiveTab] = useState('affordability')
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
    getValues
  } = useLoanCalculator()
  
  const shakeElement = (element: HTMLElement) => {
    animate(
      element as HTMLElement,
      { x: [0, -10, 10, -10, 10, 0] },
      { duration: 0.4, ease: "easeInOut" }
    )
  }

  const tabs = [
    { id: 'affordability', label: 'Zdolność kredytowa', icon: '💰' },
    { id: 'calculator', label: 'Kalkulator raty', icon: '🧮' },
    { id: 'comparison', label: 'Porównanie rat', icon: '⚖️' },
    { id: 'wibor', label: 'Symulacja WIBOR', icon: '📊' }
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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
                    ${activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="space-y-8">
          {activeTab === 'calculator' && (
            <TabContainer
              title="Oblicz ratę swojego kredytu"
              subtitle="Wypełnij formularz, aby zobaczyć szczegółowy koszt kredytu"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                  <section>
                    <LoanForm 
                      onSubmit={handleSubmit(onSubmit)}
                      isLoading={isLoading}
                      register={register}
                      trigger={trigger}
                      errors={errors}
                    />
                  </section>

                  {savedOffers.length > 0 && (
                    <section data-animate-item>
                      <Card title="Twoje zapisane oferty">
                        <ComparisonTable 
                          offers={savedOffers}
                          onDelete={deleteOffer}
                        />
                      </Card>
                    </section>
                  )}
                </div>

                <section className="sticky top-8">
                  {error && (
                    <div 
                      ref={(el) => el && shakeElement(el)}
                      className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6"
                    >
                      {error}
                    </div>
                  )}

                  {results ? (
                    <ResultsCard 
                      {...results}
                      loanAmount={getValues().principal}
                      propertyValue={getValues().propertyValue || getValues().principal / 0.8}
                      wibor={getValues().wibor}
                      margin={getValues().margin}
                      loanTermYears={getValues().years}
                      onSave={saveOffer}
                    />
                  ) : (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <p className="text-gray-500 font-medium">Wprowadź dane kredytu, aby zobaczyć szczegółowe wyliczenia</p>
                    </div>
                  )}
                </section>
              </div>
            </TabContainer>
          )}

          {activeTab === 'affordability' && <AffordabilityCalc />}

          {activeTab === 'comparison' && (
            <PaymentComparison
              loanAmount={Number(getValues().principal) || 400000}
              annualRate={Number(getValues().wibor || 5.85) + Number(getValues().margin || 2)}
              loanTermYears={Number(getValues().years) || 25}
            />
          )}

          {activeTab === 'wibor' && (
            <WiborSimulator
              loanAmount={Number(getValues().principal) || 400000}
              loanTermYears={Number(getValues().years) || 25}
              margin={Number(getValues().margin || 2)}
              baseWibor={Number(getValues().wibor || 5.85)}
              installmentType={getValues().installmentType || 'equal'}
            />
          )}
        </main>
      </div>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Kalkulator Kredytowy - Przejrzystość w finansach</p>
      </footer>
    </div>
  )
}

export default App
