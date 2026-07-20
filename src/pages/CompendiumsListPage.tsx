import React from 'react'
import { Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const compendiums = [
  {
    title: 'Jak obliczyć ratę kredytu hipotecznego?',
    description: 'Poznaj wzory matematyczne, wpływ WIBOR i oprocentowania na ratę. Kompleksowe kompendium z przykładami liczbowymi.',
    slug: 'jak-obliczyc-rate',
    calculatorLink: '/kalkulator-raty-kredytu/',
  },
  {
    title: 'Zdolność kredytowa — ile możesz pożyczyć?',
    description: 'Jak bank liczy zdolność? Wpływ formy zatrudnienia, zobowiązań i kosztów utrzymania. Porady eksperta.',
    slug: 'zdolnosc-kredytowa',
    calculatorLink: '/zdolnosc-kredytowa/',
  },
  {
    title: 'WIBOR a rata kredytu — jak się zmienia?',
    description: 'Symulacje wzrostu i spadku WIBOR, wpływ na ratę przy różnych kwotach. Przygotuj się na zmiany stóp.',
    slug: 'wibor-a-rata',
    calculatorLink: '/symulacja-wibor/',
  },
]

const CompendiumsListPage: React.FC = () => {
  return (
    <TabContainer title="Poradniki kredytowe" subtitle="Kompendium wiedzy o kredytach hipotecznych">
      <SEOHead 
        title="Poradniki kredytowe – kompendium wiedzy"
        description="Dowiedz się wszystkiego o kredytach hipotecznych: obliczanie rat, zdolność kredytowa, WIBOR, RRSO. Profesjonalne kompendium wiedzy."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Poradniki', href: '/poradniki/' },
        ]}
        schemaType="Article"
      />
      
      <div>
        <p className="text-lg text-muted-foreground mb-8">
          Profesjonalne kompendia wiedzy o kredytach hipotecznych. Przygotowane przez analityków 
          finansowych z wieloletnim doświadczeniem. Każde kompendium zawiera przykłady liczbowe, 
          wzory matematyczne i praktyczne porady.
        </p>

        <div className="space-y-6">
          {compendiums.map((comp) => (
            <Link
              key={comp.slug}
              to={`/poradniki/${comp.slug}/`}
              className="block bg-card rounded-xl border border-border p-6 hover:shadow-md hover:border-primary/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{comp.title}</h2>
                  <p className="text-muted-foreground mb-3">{comp.description}</p>
                  <span className="text-primary font-medium text-sm">
                    Czytaj więcej →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-12 bg-secondary rounded-xl p-6">
          <h2 className="text-2xl font-bold text-foreground mb-3">O autorze</h2>
          <p className="text-muted-foreground text-sm">
            Kompendia przygotowane przez <strong>Piotra Radwańskiego</strong>, analityka finansowego 
            z 14-letnim doświadczeniem w analizie produktów bankowych i rynku kredytów hipotecznych. 
            Były ekspert Związku Banków Polskich, autor publikacji w „Rzeczpospolitej" i „Dzienniku 
            Gazecie Prawnej".
          </p>
        </section>

        <p className="text-sm text-muted-foreground mt-8">
          Ostatnia aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time>
        </p>
      </div>
    </TabContainer>
  )
}

export default CompendiumsListPage
