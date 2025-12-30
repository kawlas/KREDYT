import { animate } from 'motion'
import { useLoanCalculator } from './hooks/useLoanCalculator'
import LoanForm from './components/LoanForm'
import ResultsCard from './components/ResultsCard'
import ComparisonTable from './components/ComparisonTable'

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
    errors
  } = useLoanCalculator()
  
  const shakeElement = (element: HTMLElement) => {
    animate(
      element as HTMLElement,
      { x: [0, -10, 10, -10, 10, 0] },
      { duration: 0.4, ease: "easeInOut" }
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Kalkulator Kredytu Hipotecznego
        </h1>

        <div className="space-y-8">
          <LoanForm 
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
            register={register}
            trigger={trigger}
            errors={errors}
          />

          {error && (
            <div 
              ref={(el) => el && shakeElement(el)}
              className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg"
            >
              {error}
            </div>
          )}

          {results && (
            <ResultsCard 
              {...results}
              onSave={saveOffer}
            />
          )}


          {savedOffers.length > 0 && (
            <ComparisonTable 
              offers={savedOffers}
              onDelete={deleteOffer}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
