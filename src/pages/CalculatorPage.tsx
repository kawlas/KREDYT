import { useState, useEffect } from 'react'
import Card from '../components/shared/Card'
import { animate } from 'motion'
import LoanForm from '../components/LoanForm'
import ResultsCard from '../components/ResultsCard'
import ComparisonTable from '../components/ComparisonTable'
import TabContainer from '../components/layout/TabContainer'
import SaveCalculationModal from '../components/calculators/SaveCalculationModal'
import SavedCalculationsList from '../components/calculators/SavedCalculationsList'
import { getSavedCalculations, type SavedCalculation } from '../utils/calculationStorage'
import { useWIBOR } from '../hooks/useWIBOR'
import WIBORDisplay from '../components/shared/WIBORDisplay'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import ShareButton from '../components/shared/ShareButton'
import FAQSection from '../components/shared/FAQSection'
import { FAQ_DATA } from '../data/faqData'

interface CalculatorPageProps {
  register: any
  handleSubmit: any
  trigger: any
  onSubmit: any
  results: any
  savedOffers: any[]
  isLoading: boolean
  error: string | null
  saveOffer: (name: string) => void
  deleteOffer: (id: string) => void
  errors: any
  getValues: any
  reset: any
  setResults: any
  setValue: any
}

export default function CalculatorPage({
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
}: CalculatorPageProps) {
  const { wibor, loading: wiborLoading, error: wiborError, lastUpdate, source, refresh } = useWIBOR(true)

  // Auto-fill WIBOR when loaded
  useEffect(() => {
    if (wibor && (!getValues().wibor || getValues().wibor === 5.85)) {
      setValue('wibor', wibor)
    }
  }, [wibor, setValue, getValues])

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [savedScenariosCount, setSavedScenariosCount] = useState(0)

  useEffect(() => {
    setSavedScenariosCount(getSavedCalculations().length)
  }, [])

  const handleLoadScenario = (scenario: SavedCalculation) => {
    reset(scenario.formData)
    setResults(scenario.results)
    alert(`✓ Wczytano scenariusz: ${scenario.name}`)
  }

  const handleSaved = () => {
    setSavedScenariosCount(getSavedCalculations().length)
  }
  
  const shakeElement = (element: HTMLElement) => {
    animate(
      element as HTMLElement,
      { x: [0, -10, 10, -10, 10, 0] },
      { duration: 0.4, ease: "easeInOut" }
    )
  }

  return (
    <TabContainer
      title="Oblicz ratę swojego kredytu"
      subtitle="Wypełnij formularz, aby zobaczyć szczegółowy koszt kredytu"
    >
      <SEOHead 
        title="Darmowy Kalkulator Raty Kredytu Hipotecznego 2025"
        description="Oblicz ratę kredytu hipotecznego, sprawdź harmonogram spłat i koszt całkowity. Aktualny WIBOR, raty równe i malejące. Sprawdź teraz!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <section>
            <div className="mb-6">
              <WIBORDisplay 
                wibor={wibor} 
                loading={wiborLoading} 
                error={wiborError} 
                lastUpdate={lastUpdate} 
                source={source} 
                onRefresh={refresh} 
              />
            </div>
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
              <Card title="Twoje porównania">
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
            <>
              <ResultsCard 
                {...results}
                loanAmount={getValues().principal}
                propertyValue={getValues().propertyValue || getValues().principal / 0.8}
                wibor={getValues().wibor}
                margin={getValues().margin}
                loanTermYears={getValues().years}
                onSave={saveOffer}
              />
              <div className="mt-8">
                <AdSlot />
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-500 font-medium">Wprowadź dane kredytu, aby zobaczyć szczegółowe wyliczenia</p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setShowLoadModal(true)}
              className="flex items-center justify-center gap-3 px-4 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 font-bold transition-all shadow-lg shadow-blue-500/5 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">📂</span>
              <div className="text-left">
                <div className="text-sm leading-tight">Wczytaj</div>
                <div className="text-[10px] uppercase tracking-wider opacity-70">Zapisane: {savedScenariosCount}</div>
              </div>
            </button>

            <ShareButton 
              getValues={getValues} 
              className="px-4 py-4 bg-indigo-50 text-indigo-700 border-2 border-indigo-100 hover:bg-indigo-100 rounded-xl shadow-lg shadow-indigo-500/5"
            />

            {results && (
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center justify-center gap-3 px-4 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 font-bold transition-all shadow-lg shadow-green-500/20 group sm:col-span-2 lg:col-span-1"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">💾</span>
                <div className="text-left">
                  <div className="text-sm leading-tight">Zapisz</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-70">Lokalnie</div>
                </div>
              </button>
            )}
          </div>
        </section>
      </div>

      <SaveCalculationModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        formData={{
          ...getValues(),
          propertyValue: getValues().propertyValue || getValues().principal / 0.8
        }}
        results={results!}
        onSaved={handleSaved}
      />

      <SavedCalculationsList
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        onLoad={handleLoadScenario}
      />
      
      <div className="mt-12">
        <FAQSection items={FAQ_DATA.filter(i => [1, 2, 3, 4, 5, 16, 17].includes(i.id))} />
      </div>
    </TabContainer>
  )
}
