import { AffordabilityCalc } from '../components/calculators/AffordabilityCalc'
import SEOHead from '../components/shared/SEOHead'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function AffordabilityPage() {
  return (
    <>
      <SEOHead 
        title="Kalkulator Zdolności Kredytowej - Ile mogę pożyczyć?"
        description="Sprawdź swoją zdolność kredytową online. Oblicz maksymalną kwotę kredytu hipotecznego przy Twoich zarobkach (UoP, B2B). Darmowy kalkulator."
      />
      <AffordabilityCalc />
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [10, 11, 12].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
