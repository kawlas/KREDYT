import { Link } from 'react-router-dom'
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
        title="Symulator nadpłat kredytu – ile zaoszczędzisz?"
        description="Ile możesz zaoszczędzić nadpłacając kredyt? Symulacja nadpłat: skrócenie okresu lub zmniejszenie raty. Sprawdź efekt jednorazowej i comiesięcznej nadpłaty."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Symulator nadpłat', href: '/symulator-nadplat/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Symulator nadpłat kredytu hipotecznego</h1>
        <OverpaymentCalc />
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Jak nadpłacać kredyt hipoteczny?</h2>
          <p className="text-lg text-gray-600 mb-4">
            Nadpłata kredytu to jedna z najskuteczniejszych strategii redukcji kosztów kredytowych. Każdy dodatkowy złoty pomniejsza kapitał, od którego naliczane są odsetki.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Porównaj oba scenariusze — sprawdź, czy lepsze jest skrócenie okresu czy zmniejszenie raty</li>
            <li>Sprawdź prowizję za wcześniejszą spłatę — niektóre banki pobierają opłatę w pierwszych latach</li>
            <li>Nadpłacaj regularnie — nawet 100-200 zł miesięcznie daje ogromne oszczędności w skali lat</li>
          </ul>
          <p className="text-sm text-gray-400 mt-8">
            Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
          </p>
        </section>

        <section className="border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NBP</a></li>
            <li><time dateTime="2026-07-04">Ostatnia aktualizacja: 4 lipca 2026</time></li>
          </ul>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Zobacz także:</h3>
          <ul className="space-y-1">
            <li><Link to="/poradniki/jak-obliczyc-rate/" className="text-blue-600 hover:underline text-sm">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
            <li><Link to="/poradniki/zdolnosc-kredytowa/" className="text-blue-600 hover:underline text-sm">Zdolność kredytowa — Kompendium wiedzy</Link></li>
          </ul>
        </section>

        <div>
          <AdSlot />
        </div>
        <div>
          <FaqBlock items={FAQ_DATA.filter(i => [18, 10, 11].includes(i.id))} />
        </div>
      </div>
      <RelatedTools />
    </>
  )
}
