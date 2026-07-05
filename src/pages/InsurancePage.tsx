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
        title="Kalkulator Ubezpieczenia Kredytu Hipotecznego — UNWW, Życie, Pomostowe"
        description="Sprawdź, ile kosztują ubezpieczenia kredytu hipotecznego: UNWW (niskiego wkładu), na życie z cesją, pomostowe i od utraty pracy. Kalkulator online."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Kalkulator ubezpieczeń', href: '/kalkulator-ubezpieczen/' },
        ]}
        schemaType="WebApplication"
      />
      <InsuranceCalc />
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <AdSlot />
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <FaqBlock items={FAQ_DATA.filter(i => [7, 9].includes(i.id))} />
      </div>
      <RelatedTools />
    </>
  )
}