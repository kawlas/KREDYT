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
        title="Symulator Nadpłat Kredytu Hipotecznego — Sprawdź ile zaoszczędzisz"
        description="Ile możesz zaoszczędzić nadpłacając kredyt? Symulacja nadpłat: skrócenie okresu lub zmniejszenie raty. Sprawdź efekt jednorazowej i comiesięcznej nadpłaty."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Symulator nadpłat', href: '/symulator-nadplat/' },
        ]}
        schemaType="WebApplication"
      />
      <OverpaymentCalc />
      <section className="max-w-6xl mx-auto px-4 mt-8 prose max-w-none mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Jak nadpłacać kredyt hipoteczny?</h2>
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
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [18, 10, 11].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
