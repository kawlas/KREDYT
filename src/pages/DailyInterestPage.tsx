import DailyInterestCalc from '../components/calculators/DailyInterestCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function DailyInterestPage() {
  return (
    <>
      <SEOHead
        title="Kalkulator Odsetek Dziennych Kredytu — act/365 vs act/360"
        description="Sprawdź jak banki naliczają odsetki od kredytu hipotecznego. Porównaj konwencje act/365 i act/360. Kalkulator dziennych odsetek."
      />
      <DailyInterestCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [8, 9].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
