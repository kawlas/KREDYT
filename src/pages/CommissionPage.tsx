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
        title="Kalkulator Prowizji Bankowej — Porównaj koszty | Kalkulator Kredytowy"
        description="Sprawdź, czy bardziej opłaca się kredyt z prowizją i niższą marżą, czy bez prowizji z wyższą marżą. Kalkulator prowizji bankowej online."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kalkulator prowizji', href: '/kalkulator-prowizji/' },
        ]}
        schemaType="WebApplication"
      />
      <CommissionCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [7, 9].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}