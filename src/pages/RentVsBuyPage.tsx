import RentVsBuyCalc from '../components/calculators/RentVsBuyCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function RentVsBuyPage() {
  return (
    <>
      <SEOHead 
        title="Kredyt czy wynajem? Kalkulator porównawczy"
        description="Porównaj koszty kredytu hipotecznego i wynajmu. Sprawdź, co bardziej się opłaca w Twojej sytuacji — kupno mieszkania na kredyt czy wynajem."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kredyt vs wynajem', href: '/kredyt-vs-wynajem/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kredyt hipoteczny czy wynajem? — Kalkulator</h1>
        <p className="text-lg text-gray-600 mb-4">
          Porównaj koszty kredytu hipotecznego i wynajmu. Sprawdź, co bardziej się opłaca w Twojej sytuacji.
        </p>
        <RentVsBuyCalc />
        <div>
          <AdSlot />
        </div>
        <div>
          <FaqBlock items={FAQ_DATA.filter(i => [1, 2].includes(i.id))} />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}