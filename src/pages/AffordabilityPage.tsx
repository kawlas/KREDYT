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
      <section className="max-w-7xl mx-auto px-4 mt-8 prose max-w-none mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Jak obliczyć zdolność kredytową?</h2>
        <p className="text-lg text-gray-600 mb-4">
          Zdolność kredytowa to maksymalna kwota kredytu, jaką bank jest gotów Ci przyznać na podstawie Twoich dochodów i zobowiązań. Kalkulator symuluje analizę bankową, uwzględniając wymogi rekomendacji KNF.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Zmień formę zatrudnienia — sprawdź różnicę dla UoP vs B2B vs kontraktu</li>
          <li>Spłać zobowiązania — nawet niewielka spłata karty kredytowej może zwiększyć zdolność</li>
          <li>Dodaj współkredytobiorcę — wspólny kredyt z partnerem zwiększa zdolność nawet o 50%</li>
        </ul>
        <p className="text-sm text-gray-400 mt-8">
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </section>
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [10, 11, 12].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
