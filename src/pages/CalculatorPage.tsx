import { useState, useEffect, useMemo, useRef } from 'react'
import { useWatch } from 'react-hook-form'
import Card from '../components/shared/Card'
import { animate } from 'motion'
import LoanForm from '../components/LoanForm'
import ResultsCard from '../components/ResultsCard'
import ComparisonTable from '../components/ComparisonTable'
import TabContainer from '../components/layout/TabContainer'
import SaveCalculationModal from '../components/calculators/SaveCalculationModal'
import SavedCalculationsList from '../components/calculators/SavedCalculationsList'
import type { SavedCalculation } from '../utils/calculationStorage'
import { calculateLoanResults } from '../utils/loanCalculations'
import { useWIBOR } from '../hooks/useWIBOR'
import { useLoanCalculator } from '../context/LoanCalculatorContext'
import WIBORDisplay from '../components/shared/WIBORDisplay'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import ShareButton from '../components/shared/ShareButton'
import { toast } from '../components/shared/toast'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

import type { LoanFormData } from '../types'

const DEBOUNCE_MS = 400

interface DisplayResultsInputs {
  loanAmount: number
  propertyValue: number
  wibor: number
  margin: number
  loanTermYears: number
}

export const getDisplayResultsInputs = (
  sourceValues: Partial<LoanFormData> | undefined,
  fallbackValues: LoanFormData
): DisplayResultsInputs => {
  const principal = sourceValues?.principal || fallbackValues.principal

  return {
    loanAmount: principal,
    propertyValue: sourceValues?.propertyValue || fallbackValues.propertyValue || principal / 0.8,
    wibor: sourceValues?.wibor || fallbackValues.wibor,
    margin: sourceValues?.margin || fallbackValues.margin,
    loanTermYears: sourceValues?.years || fallbackValues.years,
  }
}

export default function CalculatorPage() {
  const { wibor, loading: wiborLoading, error: wiborError, lastUpdate, source, refresh } = useWIBOR(true)
  const {
    register, handleSubmit, trigger, onSubmit, results, savedOffers,
    isLoading, error, saveOffer, deleteOffer, errors, getValues,
    reset, setResults, setValue, control,
  } = useLoanCalculator()

  useEffect(() => {
    if (wibor && !getValues().wibor) {
      setValue('wibor', wibor)
    }
  }, [wibor, setValue, getValues])

  // Auto-calculation: watch form values with debounce
  const watchedValues = useWatch({ control })
  const [debouncedValues, setDebouncedValues] = useState(watchedValues)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDebouncedValues(watchedValues)
    }, DEBOUNCE_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [watchedValues])

  const autoResults = useMemo(() => {
    if (!debouncedValues?.principal || debouncedValues.principal <= 0) return null
    try {
      return calculateLoanResults(debouncedValues as LoanFormData)
    } catch {
      return null
    }
  }, [debouncedValues])

  const displayResults = autoResults || results
  const displayResultsInputs = useMemo(
    () => getDisplayResultsInputs(debouncedValues, getValues()),
    [debouncedValues, getValues]
  )

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showLoadModal, setShowLoadModal] = useState(false)
  const savedScenariosCount = savedOffers.length

  const handleLoadScenario = (scenario: SavedCalculation) => {
    reset(scenario.formData)
    // Recompute to get full results including breakdown
    const recomputed = calculateLoanResults({
      principal: scenario.formData.principal,
      years: scenario.formData.years,
      wibor: scenario.formData.wibor,
      margin: scenario.formData.margin,
      installmentType: scenario.formData.installmentType,
      commission: scenario.formData.commission,
      propertyValue: scenario.formData.propertyValue,
    })
    setResults(recomputed)
    toast(`Wczytano scenariusz: ${scenario.name}`, 'success')
  }

  const handleSaved = () => {
    // Count is derived from savedOffers.length — no action needed
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
        title="Darmowy Kalkulator Raty Kredytu Hipotecznego"
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

        <section className="sticky top-20">
          {error && (
            <div 
              ref={(el) => el && shakeElement(el)}
              className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6"
            >
              {error}
            </div>
          )}

          {displayResults ? (
            <>
              <ResultsCard
                {...displayResults}
                loanAmount={displayResultsInputs.loanAmount}
                propertyValue={displayResultsInputs.propertyValue}
                wibor={displayResultsInputs.wibor}
                margin={displayResultsInputs.margin}
                loanTermYears={displayResultsInputs.loanTermYears}
                onSave={saveOffer}
              />
              <div className="mt-8">
                <AdSlot slot="5567225861" />
              </div>
            </>
          ) : (
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-dashed border-gray-300 text-center">
              <div className="text-4xl mb-4"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-gray-300"><rect x="3" y="12" width="3" height="9" rx="1"/><rect x="10" y="7" width="3" height="14" rx="1"/><rect x="17" y="3" width="3" height="18" rx="1"/></svg></div>
              <p className="text-gray-500 font-medium">Wprowadź dane kredytu, aby zobaczyć szczegółowe wyliczenia</p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setShowLoadModal(true)}
              className="flex items-center justify-center gap-3 px-4 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 font-bold transition-all shadow-lg shadow-blue-500/5 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg></span>
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
                <span className="text-2xl group-hover:scale-110 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg></span>
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
        <FaqBlock items={FAQ_DATA.filter(i => [1, 2, 3, 4, 5, 16, 17].includes(i.id))} />
      </div>
      <RelatedTools />
    </TabContainer>
  )
}
