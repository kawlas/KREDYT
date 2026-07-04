import { Link } from 'react-router-dom'
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
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Zdolność kredytowa', href: '/zdolnosc-kredytowa/' },
        ]}
        schemaType="WebApplication"
        faqItems={FAQ_DATA.filter(i => [10, 11, 12].includes(i.id)).map(i => ({ question: i.question, answer: i.answer }))}
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

      <section className="max-w-7xl mx-auto px-4 mt-8 border-t border-gray-100 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Podstawa prawna i źródła danych</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
          <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
          <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
          <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NBP</a></li>
          <li><time dateTime="2026-07-04">Ostatnia aktualizacja: 4 lipca 2026</time></li>
        </ul>
      </section>

      <section className="mt-8 border-t border-gray-100 pt-6">
        <h3 className="text-sm font-bold text-gray-700 mb-3">Zobacz także:</h3>
        <ul className="space-y-1">
          <li><Link to="/poradniki/jak-obliczyc-rate/" className="text-blue-600 hover:underline text-sm">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
          <li><Link to="/poradniki/zdolnosc-kredytowa/" className="text-blue-600 hover:underline text-sm">Zdolność kredytowa — Kompendium wiedzy</Link></li>
        </ul>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [10, 11, 12].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
