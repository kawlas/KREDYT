import { Link } from 'react-router-dom'
import BankComparisonCalc from '../components/calculators/BankComparisonCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function BankComparisonPage() {
  return (
    <>
      <SEOHead
        title="Porównanie Ofert Kredytów Hipotecznych — Ranking Banków 2026"
        description="Porównaj oferty kredytów hipotecznych PKO BP, ING, Santander, mBank, Millennium, Pekao i Alior. Sprawdź raty, RRSO i całkowity koszt."
        type="article"
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Porównanie ofert banków', href: '/porownanie-ofert-bankow/' },
        ]}
        schemaType="WebApplication"
      />
      <BankComparisonCalc />
      <section className="max-w-6xl mx-auto px-4 mt-8 prose max-w-none mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Jak porównywać oferty banków?</h2>
        <p className="text-lg text-gray-600 mb-4">
          Porównanie ofert kredytów hipotecznych wymaga uwzględnienia wszystkich kosztów — marży, prowizji, ubezpieczeń oraz warunków nadpłat. RRSO jest najlepszym wskaźnikiem porównawczym.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Porównuj oferty o tych samych parametrach — kwota, okres, rodzaj rat muszą być identyczne</li>
          <li>Sprawdź marżę nominalną — nie zawsze najniższa marża oznacza najtańszy kredyt</li>
          <li>Uwzględnij ubezpieczenia — niektóre banki wymagają dodatkowych ubezpieczeń</li>
          <li>Sprawdź warunki nadpłaty — niektóre banki pobierają opłaty za wcześniejszą spłatę</li>
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
        <AdSlot slot="5567225861" />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [9, 14, 15].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
