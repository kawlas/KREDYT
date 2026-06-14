import OverpaymentCalc from '../components/calculators/OverpaymentCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function OverpaymentPage() {
  return (
    <>
      <SEOHead
        title="Symulator Nadpłat Kredytu Hipotecznego — Sprawdź ile zaoszczędzisz"
        description="Ile możesz zaoszczędzić nadpłacając kredyt? Symulacja nadpłat: skrócenie okresu lub zmniejszenie raty. Sprawdź efekt jednorazowej i comiesięcznej nadpłaty."
      />
      <OverpaymentCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [10, 11].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
