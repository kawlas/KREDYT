import InsuranceCalc from '../components/calculators/InsuranceCalc'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'
import RelatedTools from '../components/seo/RelatedTools'

export default function InsurancePage() {
  return (
    <>
      <SEOHead 
        title="Ubezpieczenie kredytu hipotecznego – kalkulator"
        description="Sprawdź, ile kosztują ubezpieczenia kredytu hipotecznego: UNWW (niskiego wkładu), na życie z cesją, pomostowe i od utraty pracy. Kalkulator online."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kalkulator ubezpieczeń', href: '/kalkulator-ubezpieczen/' },
        ]}
        schemaType="WebApplication"
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kalkulator ubezpieczeń kredytu hipotecznego</h1>
        <p className="text-lg text-gray-600 mb-4">
          Sprawdź, ile kosztują ubezpieczenia kredytu hipotecznego: UNWW (niskiego wkładu), na życie z cesją, pomostowe i od utraty pracy.
        </p>
        <InsuranceCalc />
        <div>
          <AdSlot />
        </div>
        <div>
          <FaqBlock items={FAQ_DATA.filter(i => [7, 9].includes(i.id))} />
        </div>
        <RelatedTools />
      </div>
    </>
  )
}