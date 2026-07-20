import { useLoanCalculator } from '../context/LoanCalculatorContext'
import TrueCostCalc from '../components/calculators/TrueCostCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import RelatedTools from '../components/seo/RelatedTools'

export default function TrueCostPage() {
  const { results } = useLoanCalculator()
  const monthlyInstallment = results?.monthlyPayment || 4000

  return (
    <>
      <SEOHead 
        title="Koszt utrzymania nieruchomości – ile zapłacisz?"
        description="Oblicz całkowity koszt posiadania nieruchomości. Uwzględnij ratę kredytu, media, podatki i fundusz remontowy."
      />
      <div className="space-y-8">
        <TrueCostCalc monthlyInstallment={monthlyInstallment} />
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}
