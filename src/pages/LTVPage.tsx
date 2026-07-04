import LTVCalc from '../components/calculators/LTVCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function LTVPage() {
  return (
    <>
      <SEOHead 
        title="Kalkulator LTV i wkładu własnego — Sprawdź wskaźnik kredytu"
        description="Oblicz wskaźnik LTV i wymagany wkład własny dla kredytu hipotecznego. Sprawdź, czy potrzebujesz ubezpieczenia niskiego wkładu."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kalkulator LTV', href: '/ltv-kalkulator/' },
        ]}
        schemaType="WebApplication"
      />
      <LTVCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [9, 16].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
