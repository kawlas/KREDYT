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
      <section className="max-w-6xl mx-auto px-4 mt-8 prose max-w-none mb-8">
        <h2 className="text-2xl font-bold mt-8 mb-4">Czym różni się act/365 od act/360?</h2>
        <p className="text-lg text-gray-600 mb-4">
          Konwencja act/365 oznacza, że odsetki liczone są przez 365 dni w roku, a act/360 przez 360 dni. Przy kredycie na setki tysięcy złotych różnica może wynosić tysiące złotych rocznie.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sprawdź konwencję banku — zapytaj doradcę, czy bank stosuje act/365 czy act/360</li>
          <li>Porównuj oferty w tej samej konwencji — inaczej porównanie będzie niemiarodajne</li>
          <li>Oblicz różnicę roczną — przy kredycie 500 tys. zł różnica może wynosić 2-3 tys. zł rocznie</li>
        </ul>
        <p className="text-sm text-gray-400 mt-8">
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </section>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [8, 9, 7].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}
