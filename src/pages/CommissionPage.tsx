import CommissionCalc from '../components/calculators/CommissionCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function CommissionPage() {
  return (
    <>
      <SEOHead 
        title="Prowizja bankowa – kalkulator i porównanie"
        description="Sprawdź, czy bardziej opłaca się kredyt z prowizją i niższą marżą, czy bez prowizji z wyższą marżą. Kalkulator prowizji bankowej online."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kalkulator prowizji', href: '/kalkulator-prowizji/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Kalkulator prowizji bankowej</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Sprawdź, czy bardziej opłaca się kredyt z prowizją i niższą marżą, czy bez prowizji z wyższą marżą.
        </p>
        <CommissionCalc />
        <div>
          <AdSlot />
        </div>
        <div>
          <FaqBlock items={FAQ_DATA.filter(i => [7, 9].includes(i.id))} />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}