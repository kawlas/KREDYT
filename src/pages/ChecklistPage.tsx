import PreparationChecklist from '../components/calculators/PreparationChecklist'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import RelatedTools from '../components/seo/RelatedTools'

export default function ChecklistPage() {
  return (
    <>
      <SEOHead 
        title="Lista kontrolna: Przygotowanie do kredytu hipotecznego"
        description="Sprawdź, co musisz zrobić przed złożeniem wniosku o kredyt. Harmonogram krok po kroku, od BIK po dokumenty."
      />
      <div className="space-y-8">
        <PreparationChecklist />
        <div className="max-w-6xl mx-auto px-4">
          <AdSlot />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}
