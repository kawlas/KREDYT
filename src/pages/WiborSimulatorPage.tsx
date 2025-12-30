import WiborSimulator from '../components/calculators/WiborSimulator'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import ShareButton from '../components/shared/ShareButton'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

interface WiborSimulatorPageProps {
  loanAmount: number
  loanTermYears: number
  margin: number
  baseWibor: number
  installmentType: 'equal' | 'declining'
}

export default function WiborSimulatorPage({
  loanAmount,
  loanTermYears,
  margin,
  baseWibor,
  installmentType
}: WiborSimulatorPageProps) {
  const getValues = () => ({
    principal: loanAmount,
    years: loanTermYears,
    margin: margin,
    wibor: baseWibor,
    installmentType: installmentType,
    propertyValue: 0 // Optional
  })

  return (
    <>
      <SEOHead 
        title="Symulacja WIBOR - Jak Wzrost Stóp Zmieni Twoją Ratę?"
        description="Boisz się wzrostu rat? Przeprowadź symulację zmiany WIBOR 3M/6M. Zobacz o ile wzrośnie rata przy zmianie stóp procentowych. Analiza ryzyka."
      />
      <div className="max-w-6xl mx-auto px-4 mb-4 flex justify-end">
        <ShareButton getValues={getValues} />
      </div>
      <div className="space-y-8">
        <WiborSimulator
          loanAmount={loanAmount}
          loanTermYears={loanTermYears}
          margin={margin}
          baseWibor={baseWibor}
          installmentType={installmentType}
        />
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot />
        </div>
        <div className="max-w-6xl mx-auto px-4">
           <FaqBlock items={FAQ_DATA.filter(i => [6, 7, 8].includes(i.id))} />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}
