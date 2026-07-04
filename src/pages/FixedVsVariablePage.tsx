import FixedVsVariableCalc from '../components/calculators/FixedVsVariableCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function FixedVsVariablePage() {
  return (
    <>
      <SEOHead 
        title="Stałe czy zmienne oprocentowanie? Porównanie | Kalkulator Kredytowy"
        description="Porównaj oprocentowanie stałe i zmienne kredytu hipotecznego. Sprawdź, która opcja jest tańsza i bezpieczniejsza dla Ciebie."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Stałe vs zmienne oprocentowanie', href: '/stale-vs-zmienne-oprocentowanie/' },
        ]}
        schemaType="WebApplication"
      />
      <FixedVsVariableCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [6, 8].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
