import { Link } from 'react-router-dom'
import WiborSimulator from '../components/calculators/WiborSimulator'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import ShareButton from '../components/shared/ShareButton'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'
import ExportPdfButton from '../components/shared/ExportPdfButton'

interface WiborSimulatorPageProps {
  loanAmount: number
  loanTermYears: number
  margin: number
  baseWibor: number
  installmentType: 'equal' | 'declining'
}

export default function WiborSimulatorPage({
  loanAmount,
  loanTermYears,
  margin,
  baseWibor,
  installmentType
}: WiborSimulatorPageProps) {
  const getValues = () => ({
    principal: loanAmount,
    years: loanTermYears,
    margin: margin,
    wibor: baseWibor,
    installmentType: installmentType,
    propertyValue: loanAmount / 0.8 // Assume 80% LTV for shared link
  })

  return (
    <>
      <SEOHead 
        title="Symulacja WIBOR - Jak Wzrost Stóp Zmieni Twoją Ratę?"
        description="Boisz się wzrostu rat? Przeprowadź symulację zmiany WIBOR 3M/6M. Zobacz o ile wzrośnie rata przy zmianie stóp procentowych. Analiza ryzyka."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Symulacja WIBOR', href: '/symulacja-wibor/' },
        ]}
        schemaType="WebApplication"
        faqItems={FAQ_DATA.filter(i => [6, 7, 8].includes(i.id)).map(i => ({ question: i.question, answer: i.answer }))}
      />
      <div className="max-w-6xl mx-auto px-4 mb-4 flex justify-end gap-2">
        <ExportPdfButton
          variant="outline"
          label="Pobierz PDF"
          data={{
            title: 'Symulacja WIBOR — Analiza ryzyka',
            fields: [
              { label: 'Kwota kredytu', value: `${loanAmount.toLocaleString()} PLN` },
              { label: 'Okres kredytu', value: `${loanTermYears} lat` },
              { label: 'WIBOR bazowy', value: `${baseWibor}%` },
              { label: 'Marża banku', value: `${margin}%` },
              { label: 'Typ rat', value: installmentType === 'equal' ? 'Równe' : 'Malejące' },
            ],
            footer: 'Kalkulator kredytowy — kredytkalkulator.netlify.app | Dane mają charakter informacyjny i nie stanowią oferty w rozumieniu KC.',
          }}
        />
        <ShareButton getValues={getValues} />
      </div>
      <div className="space-y-8">
        <WiborSimulator
          loanAmount={loanAmount}
          loanTermYears={loanTermYears}
          margin={margin}
          baseWibor={baseWibor}
          installmentType={installmentType}
        />
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot />
        </div>
        <section className="max-w-6xl mx-auto px-4 mt-8 border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NBP</a></li>
            <li><time dateTime="2026-07-04">Ostatnia aktualizacja: 4 lipca 2026</time></li>
          </ul>
        </section>
        <div className="max-w-6xl mx-auto px-4 mt-8">
          <section className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Zobacz także:</h3>
            <ul className="space-y-1">
              <li><Link to="/poradniki/jak-obliczyc-rate/" className="text-blue-600 hover:underline text-sm">Jak obliczyć ratę kredytu? — Kompendium wiedzy</Link></li>
              <li><Link to="/poradniki/zdolnosc-kredytowa/" className="text-blue-600 hover:underline text-sm">Zdolność kredytowa — Kompendium wiedzy</Link></li>
            </ul>
          </section>
        </div>
        <div className="max-w-6xl mx-auto px-4">
           <FaqBlock items={FAQ_DATA.filter(i => [6, 7, 8].includes(i.id))} />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}
