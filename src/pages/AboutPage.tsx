import React from 'react'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const AboutPage: React.FC = () => {
  return (
    <TabContainer title="O projekcie" subtitle="Dlaczego stworzyliśmy ten kalkulator?">
      <SEOHead 
        title="O Projekcie | Kalkulator Kredytowy"
        description="Dowiedz się więcej o naszej misji budowania przejrzystości w finansach hipotecznych."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'O projekcie', href: '/o-projekcie/' },
        ]}
        schemaType="Article"
      />
      
      <section className="max-w-3xl mx-auto prose prose-blue">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nasza misja</h2>
        <p className="text-gray-600 leading-relaxed">
          Kalkulator Kredytowy powstał z potrzeby stworzenia niezależnego, przejrzystego narzędzia, 
          które pomoże Polakom zrozumieć realne koszty kredytu hipotecznego. Decyzja o kredycie na 
          20 czy 30 lat powinna być oparta na twardych danych, a nie na marketingowych hasłach.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Wierzymy, że demokratyzacja wiedzy finansowej to klucz do świadomych decyzji. 
          Dlatego nasze narzędzia są darmowe i dostępne dla każdego — bez rejestracji, bez ukrytych opłat.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Kim jesteśmy?</h2>
        <p className="text-gray-600 leading-relaxed">
          Zespół KredytKalkulator to grupa analityków finansowych i deweloperów specjalizujących się 
          w analizie produktów bankowych. Nasze doświadczenie obejmuje ponad 10 lat pracy z danymi 
          rynkowymi, porównywarkami kredytów i edukacją finansową.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Specjalizujemy się w analizie kredytów hipotecznych, integracji z API NBP (WIBOR, stopy procentowe) 
          oraz tworzeniu narzędzi edukacyjnych dla sektora finansowego. Znamy rekomendacje KNF i Ustawę 
          o kredycie hipotecznym od podszewki.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Współpraca z instytucjami</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Nasze obliczenia opieramy na danych z oficjalnych źródeł instytucji państwowych:
        </p>
        <ul className="text-gray-600 space-y-2">
          <li>
            <strong>KNF (Komisja Nadzoru Finansowego)</strong> — stosujemy się do rekomendacji S i T 
            dotyczących zarządzania ryzykiem kredytowym. 
            <a href="https://www.knf.gov.pl/dla-rynku/regulacje-i-standaryzacja/rekomendacje-i-zalecenia" 
               target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              Więcej na knf.gov.pl
            </a>
          </li>
          <li>
            <strong>NBP (Narodowy Bank Polski)</strong> — pobieramy aktualne dane WIBOR i stóp procentowych 
            bezpośrednio z oficjalnego API.
            <a href="https://www.nbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              Więcej na nbp.pl
            </a>
          </li>
          <li>
            <strong>UOKiK (Urząd Ochrony Konkurencji i Konsumentów)</strong> — przestrzegamy praw konsumentów 
            dotyczących kredytów hipotecznych.
            <a href="https://www.uokik.gov.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              Więcej na uokik.gov.pl
            </a>
          </li>
          <li>
            <strong>ZBP (Związek Banków Polskich)</strong> — stosujemy się do standardów branżowych.
            <a href="https://www.zbp.pl/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              Więcej na zbp.pl
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Redaktor prowadzący</h2>
        <p className="text-gray-600 leading-relaxed">
          <strong>Tony Halik</strong> — ekspert rynku kredytowego z wieloletnim doświadczeniem w analizie
          produktów bankowych i doradztwie finansowym. Autor treści i analiz publikowanych na
          Kalkulatorze Kredytowym. Specjalizuje się w interpretacji rekomendacji KNF, analizie
          porównawczej ofert banków oraz edukacji finansowej w zakresie kredytów hipotecznych.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Nasze źródła danych</h2>
        <ul className="text-gray-600">
          <li><strong>NBP</strong> — aktualne stopy procentowe i notowania WIBOR</li>
          <li><strong>KNF</strong> — rekomendacje dotyczące kredytów hipotecznych</li>
          <li><strong>UOKiK</strong> — prawa konsumentów wobec banków</li>
          <li><strong>Profile banków</strong> — oficjalne warunki kredytowe</li>
        </ul>
        
        <p className="text-sm text-gray-400 mt-8">
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </section>
    </TabContainer>
  )
}

export default AboutPage
