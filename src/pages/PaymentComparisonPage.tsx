import PaymentComparison from '../components/calculators/PaymentComparison'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

interface PaymentComparisonPageProps {
  loanAmount: number
  annualRate: number
  loanTermYears: number
}

export default function PaymentComparisonPage({ 
  loanAmount, 
  annualRate, 
  loanTermYears 
}: PaymentComparisonPageProps) {
  return (
    <>
      <SEOHead 
        title="Raty Równe czy Malejące? Porównanie Kalkulator"
        description="Sprawdź ile zaoszczędzisz wybierając raty malejące. Porównaj koszty całkowite, harmonogram spłat i wysokość pierwszej raty. Darmowy symulator."
      />
      <div className="space-y-8">
        <PaymentComparison
          loanAmount={loanAmount}
          annualRate={annualRate}
          loanTermYears={loanTermYears}
        />
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot />
        </div>
        <div className="max-w-6xl mx-auto px-4">
           <FaqBlock items={FAQ_DATA.filter(i => [5, 6].includes(i.id))} />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}
