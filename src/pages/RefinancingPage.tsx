import { Link } from 'react-router-dom'
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
        title="Refinansowanie kredytu – kalkulator i porównanie"
        description="Ile zaoszczędzisz na refinansowaniu kredytu? Porównaj obecną ratę z nową ofertą. Sprawdź całkowite koszty i okres zwrotu refinansowania."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Refinansowanie kredytu', href: '/refinansowanie-kredytu/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <RefinancingCalc />
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Kiedy refinansowanie się opłaca?</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Refinansowanie opłaca się, gdy nowy bank oferuje niższą marżę lub gdy wartość nieruchomości wzrosła. Kalkulator porównuje Twoje aktualne warunki z ofertą innego banku.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Porównuj RRSO, nie tylko marżę — RRSO uwzględnia wszystkie koszty</li>
            <li>Sprawdź okres zwrotu — refinansowanie ma sens, jeśli zwróci się w ciągu 2-3 lat</li>
            <li>Uwzględnij koszty przeniesienia — prowizja, wycena, notariusz, PCC</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-8">
            Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
          </p>
        </section>

        <section className="border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NBP</a></li>
            <li><time dateTime="2026-07-04">Ostatnia aktualizacja: 4 lipca 2026</time></li>
          </ul>
        </section>

        <section className="border-t border-border pt-6">
          <h3 className="text-sm font-bold text-foreground mb-3">Zobacz także:</h3>
          <ul className="space-y-1">
            <li><Link to="/poradniki/jak-obliczyc-rate/" className="text-primary hover:underline text-sm">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
            <li><Link to="/poradniki/zdolnosc-kredytowa/" className="text-primary hover:underline text-sm">Zdolność kredytowa — Kompendium wiedzy</Link></li>
          </ul>
        </section>

        <div>
          <AdSlot />
        </div>
        <div>
          <FaqBlock items={FAQ_DATA.filter(i => [12, 13].includes(i.id))} />
        </div>
      </div>
      <RelatedTools />
    </>
  )
}
