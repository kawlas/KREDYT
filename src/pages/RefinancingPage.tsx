import RefinancingCalc from '../components/calculators/RefinancingCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function RefinancingPage() {
  return (
    <>
      <SEOHead
        title="Kalkulator Refinansowania Kredytu Hipotecznego — Czy warto zmienić bank?"
        description="Ile zaoszczędzisz na refinansowaniu kredytu? Porównaj obecną ratę z nową ofertą. Sprawdź całkowite koszty i okres zwrotu refinansowania."
      />
      <RefinancingCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [12, 13].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
