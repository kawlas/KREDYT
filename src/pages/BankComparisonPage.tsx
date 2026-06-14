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
      />
      <BankComparisonCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [14, 15].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
