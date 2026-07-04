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
