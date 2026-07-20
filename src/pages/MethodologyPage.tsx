import React from 'react'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const MethodologyPage: React.FC = () => {
  return (
    <TabContainer title="Metodologia obliczeń" subtitle="Jak liczymy Twój kredyt?">
      <SEOHead 
        title="Metodologia Obliczeń | Kalkulator Kredytowy"
        description="Poznaj wzory matematyczne i założenia naszych kalkulatorów: raty annuity, WIBOR 3M/6M, RRSO, zdolność kredytowa i rekomendacje KNF."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Metodologia', href: '/metodologia/' },
        ]}
        schemaType="Article"
      />
      <div className="text-gray-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Raty równe (Annuity)</h2>
        <p className="mb-6">
          Stosujemy standardowy wzór na ratę równą: M = P * (i * (1 + i)^n) / ((1 + i)^n - 1), 
          gdzie M to rata, P to kwota kredytu, i to oprocentowanie miesięczne, a n to liczba miesięcy.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">WIBOR i Oprocentowanie</h2>
        <p className="mb-6">
          Oprocentowanie nominalne to suma wskaźnika WIBOR (3M lub 6M) oraz marży banku. 
          W symulacjach przyjmujemy stałe oprocentowanie w skali roku, chyba że używasz symulatora WIBOR.
        </p>
      </div>
    </TabContainer>
  )
}

export default MethodologyPage
