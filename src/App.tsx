import { useState } from 'react'
import { animate } from 'motion'
import { useLoanCalculator } from './hooks/useLoanCalculator'
import LoanForm from './components/LoanForm'
import ResultsCard from './components/ResultsCard'
import ComparisonTable from './components/ComparisonTable'
import { Tabs } from './components/layout/Tabs'
import { AffordabilityCalc } from './components/calculators/AffordabilityCalc'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')
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
    { id: 'calculator', label: 'Kalkulator raty', icon: '🧮' },
    { id: 'affordability', label: 'Zdolność kredytowa', icon: '💰' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Kalkulator Kredytu Hipotecznego
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Sprawdź ratę kredytu, oblicz zdolność i porównaj oferty banków w jednym miejscu.
          </p>
        </header>

        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <main className="space-y-8">
          {activeTab === 'calculator' ? (
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
                    <ComparisonTable 
                      offers={savedOffers}
                      onDelete={deleteOffer}
                    />
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
          ) : (
            <AffordabilityCalc />
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
