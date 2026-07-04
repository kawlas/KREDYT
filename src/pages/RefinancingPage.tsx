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
        title="Kalkulator Refinansowania Kredytu Hipotecznego — Czy warto zmienić bank?"
        description="Ile zaoszczędzisz na refinansowaniu kredytu? Porównaj obecną ratę z nową ofertą. Sprawdź całkowite koszty i okres zwrotu refinansowania."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Refinansowanie kredytu', href: '/refinansowanie-kredytu/' },
        ]}
        schemaType="WebApplication"
      />
      <RefinancingCalc />
      <section className="max-w-6xl mx-auto px-4 mt-8 prose max-w-none mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Kiedy refinansowanie się opłaca?</h2>
        <p className="text-lg text-gray-600 mb-4">
          Refinansowanie opłaca się, gdy nowy bank oferuje niższą marżę lub gdy wartość nieruchomości wzrosła. Kalkulator porównuje Twoje aktualne warunki z ofertą innego banku.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Porównuj RRSO, nie tylko marżę — RRSO uwzględnia wszystkie koszty</li>
          <li>Sprawdź okres zwrotu — refinansowanie ma sens, jeśli zwróci się w ciągu 2-3 lat</li>
          <li>Uwzględnij koszty przeniesienia — prowizja, wycena, notariusz, PCC</li>
        </ul>
        <p className="text-sm text-gray-400 mt-8">
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </section>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [12, 13].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
