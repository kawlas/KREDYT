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
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Lista przygotowań', href: '/lista-przygotowan/' },
        ]}
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lista przygotowań do kredytu hipotecznego</h1>
        <p className="text-lg text-gray-600 mb-4">
          Sprawdź, co musisz zrobić przed złożeniem wniosku o kredyt. Harmonogram krok po kroku, od BIK po dokumenty.
        </p>
        <PreparationChecklist />
        <div>
          <AdSlot />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}
