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
        title="Kredyt Hipoteczny czy Wynajem? Kalkulator | Kalkulator Kredytowy"
        description="Porównaj koszty kredytu hipotecznego i wynajmu. Sprawdź, co bardziej się opłaca w Twojej sytuacji — kupno mieszkania na kredyt czy wynajem."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kredyt vs wynajem', href: '/kredyt-vs-wynajem/' },
        ]}
        schemaType="WebApplication"
      />
      <RentVsBuyCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [1, 2].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}