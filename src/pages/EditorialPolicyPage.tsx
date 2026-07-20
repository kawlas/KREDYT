import React from 'react'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const EditorialPolicyPage: React.FC = () => {
  return (
    <TabContainer title="Polityka redakcyjna" subtitle="Zasady tworzenia treści i źródła danych">
      <SEOHead 
        title="Polityka Redakcyjna | Kalkulator Kredytowy"
        description="Zasady redakcyjne, źródła danych, metodyka obliczeń i standardy tworzenia treści o kredytach hipotecznych w serwisie KredytKalkulator."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Polityka redakcyjna', href: '/polityka-redakcyjna/' },
        ]}
        schemaType="Article"
      />
      
      <div className="text-gray-600 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Misja edukacyjna</h2>
          <p>
            Kalkulator Kredytowy to niezależne, darmowe narzędzie edukacyjne, którego celem jest 
            zwiększenie przejrzystości w procesie ubiegania się o kredyt hipoteczny w Polsce. 
            Naszym celem jest demokratyzacja wiedzy finansowej i pomoc w podejmowaniu świadomych decyzji.
          </p>
          <p className="mt-4">
            Redaktorem prowadzącym i autorem głównym treści jest <strong>Tony Halik</strong> — 
            ekspert rynku kredytowego z doświadczeniem w analizie produktów bankowych.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Zasady tworzenia treści</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Rzetelność:</strong> Wszystkie informacje są oparte na danych z oficjalnych źródeł (NBP, KNF, UOKiK)</li>
            <li><strong>Aktualność:</strong> Dane rynkowe (WIBOR, stopy procentowe) pobierane są automatycznie z API NBP</li>
            <li><strong>Przejrzystość:</strong> Jasno informujemy o źródłach danych i metodach obliczeń</li>
            <li><strong>Bezstronność:</strong> Nie jesteśmy powiązani z żadnym bankiem — nasze porównania są obiektywne</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Źródła danych</h2>
          <p>Nasz kalkulator wykorzystuje następujące źródła danych:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>NBP (Narodowy Bank Polski)</strong> — aktualne stopy procentowe i notowania WIBOR
              <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                nbp.pl
              </a>
            </li>
            <li>
              <strong>KNF (Komisja Nadzoru Finansowego)</strong> — rekomendacje dotyczące kredytów hipotecznych
              <a href="https://www.knf.gov.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                knf.gov.pl
              </a>
            </li>
            <li>
              <strong>UOKiK</strong> — prawa konsumentów wobec banków
              <a href="https://www.uokik.gov.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                uokik.gov.pl
              </a>
            </li>
            <li>
              <strong>ISAP</strong> — akty prawne (Ustawa o kredycie hipotecznym)
              <a href="https://isap.sejm.gov.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                isap.sejm.gov.pl
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Podstawy prawne</h2>
          <p>Obliczenia w naszym kalkulatorze opierają się na:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ustawa z dnia 23 marca 2017 r. o kredycie hipotecznym (Dz.U. 2017 poz. 819)</li>
            <li>Rekomendacja S KNF — zarządzanie ryzykiem kredytowym</li>
            <li>Rekomendacja T KNF — zarządzanie ryzykiem operacyjnym</li>
          </ul>
          <p className="mt-4">
            Pełna treść ustawy dostępna jest w 
            <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20170000819" 
               target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              Internetowym Systemie Aktów Prawnych (ISAP)
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Charakter narzędzia</h2>
          <p>
            Niniejszy kalkulator jest narzędziem edukacyjnym i nie stanowi oferty kredytowej ani 
            doradztwa finansowego. Wyniki obliczeń mają charakter orientacyjny i mogą różnić się 
            od warunków oferowanych przez banki.
          </p>
          <p>
            Przed podjęciem decyzji o kredycie hipotecznym zalecamy konsultację z doradcą 
            kredytowym lub direct bankowym.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontakt</h2>
          <p>
            W razie pytań lub uwag dotyczących treści na naszym portalu, prosimy o kontakt 
            przez formularz na stronie <a href="/kontakt/" className="text-blue-600 hover:underline">Kontakt</a>.
          </p>
        </section>

        <p className="text-sm text-gray-400 mt-8">
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </div>
    </TabContainer>
  )
}

export default EditorialPolicyPage
