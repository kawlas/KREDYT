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
  
  // Wait, useLoanCalculator returns { register, handleSubmit, ... } but NOT errors from useForm!
  // It returns its OWN 'error' string state for calculation errors.
  // BUT LoanForm needs 'errors' object from react-hook-form validation!
  // I must update useLoanCalculator to return 'formState: { errors }' or just 'errors'.
  
  // Checking useLoanCalculator implementation...
  // It returns register, handleSubmit, trigger, results, savedOffers, isLoading, error (string).
  // It consumes useForm internally.
  // I missed exposing 'formState' or 'errors' in the previous step!
  // I need to fix useLoanCalculator to expose 'formState' or 'errors'.
  
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
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}

          {results && (
            <ResultsCard 
              monthlyPayment={results.monthlyPayment}
              totalCost={results.totalCost}
              totalInterest={results.totalInterest}
              rrso={results.rrso}
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
