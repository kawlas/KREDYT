import PaymentComparison from '../components/calculators/PaymentComparison'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

interface PaymentComparisonPageProps {
  loanAmount?: number
  annualRate?: number
  loanTermYears?: number
  source?: 'calculator' | 'none'
  onSourceApply?: (values: { loanAmount: number; annualRate: number; loanTermYears: number }) => void
  wibor?: number
  margin?: number
}

export default function PaymentComparisonPage({ 
  loanAmount, 
  annualRate, 
  loanTermYears,
  source,
  onSourceApply,
  wibor,
  margin
}: PaymentComparisonPageProps) {
  return (
    <>
      <SEOHead 
        title="Raty Równe czy Malejące? Porównanie Kalkulator"
        description="Sprawdź ile zaoszczędzisz wybierając raty malejące. Porównaj koszty całkowite, harmonogram spłat i wysokość pierwszej raty. Darmowy symulator."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Raty równe vs malejące', href: '/raty-rowne-czy-malejace/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <PaymentComparison
          loanAmount={loanAmount}
          annualRate={annualRate}
          loanTermYears={loanTermYears}
          source={source}
          onSourceApply={onSourceApply}
          wibor={wibor}
          margin={margin}
        />
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot />
        </div>
        <section className="max-w-6xl mx-auto px-4 mt-8 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Podstawa prawna i źródła danych</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
            <li>Obliczenia oparte na wzorach z <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ustawy o kredycie hipotecznym</a> (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacje <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KNF</a> dot. wyznaczania zdolności kredytowej</li>
            <li>Dane WIBOR z <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NBP</a></li>
            <li><time dateTime="2026-07-04">Ostatnia aktualizacja: 4 lipca 2026</time></li>
          </ul>
        </section>
        <div className="max-w-6xl mx-auto px-4">
           <FaqBlock items={FAQ_DATA.filter(i => [5, 6, 4].includes(i.id))} />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}
