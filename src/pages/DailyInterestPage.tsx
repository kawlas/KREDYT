import { Link } from 'react-router-dom'
import DailyInterestCalc from '../components/calculators/DailyInterestCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function DailyInterestPage() {
  return (
    <>
      <SEOHead
        title="Kalkulator Odsetek Dziennych Kredytu — act/365 vs act/360"
        description="Sprawdź jak banki naliczają odsetki od kredytu hipotecznego. Porównaj konwencje act/365 i act/360. Kalkulator dziennych odsetek."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Odsetki dzienne', href: '/odsetki-dzienne/' },
        ]}
        schemaType="WebApplication"
      />
      <DailyInterestCalc />
      <section className="max-w-6xl mx-auto px-4 mt-8 prose max-w-none mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Czym różni się act/365 od act/360?</h2>
        <p className="text-lg text-gray-600 mb-4">
          Konwencja act/365 oznacza, że odsetki liczone są przez 365 dni w roku, a act/360 przez 360 dni. Przy kredycie na setki tysięcy złotych różnica może wynosić tysiące złotych rocznie.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sprawdź konwencję banku — zapytaj doradcę, czy bank stosuje act/365 czy act/360</li>
          <li>Porównuj oferty w tej samej konwencji — inaczej porównanie będzie niemiarodajne</li>
          <li>Oblicz różnicę roczną — przy kredycie 500 tys. zł różnica może wynosić 2-3 tys. zł rocznie</li>
        </ul>
        <p className="text-sm text-gray-400 mt-8">
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8 border-t border-gray-100 pt-8">
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

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [8, 9, 7].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
