import React from 'react'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const MethodologyPage: React.FC = () => {
  return (
    <TabContainer title="Metodologia obliczeń" subtitle="Jak liczymy Twój kredyt?">
      <SEOHead 
        title="Metodologia Obliczeń | Kalkulator Kredytowy"
        description="Dokładne wzory i założenia stosowane w naszych kalkulatorach kredytowych."
      />
      <div className="max-w-3xl mx-auto prose prose-blue text-gray-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Raty równe (Annuity)</h3>
        <p className="mb-6">
          Stosujemy standardowy wzór na ratę równą: M = P * (i * (1 + i)^n) / ((1 + i)^n - 1), 
          gdzie M to rata, P to kwota kredytu, i to oprocentowanie miesięczne, a n to liczba miesięcy.
        </p>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4">WIBOR i Oprocentowanie</h3>
        <p className="mb-6">
          Oprocentowanie nominalne to suma wskaźnika WIBOR (3M lub 6M) oraz marży banku. 
          W symulacjach przyjmujemy stałe oprocentowanie w skali roku, chyba że używasz symulatora WIBOR.
        </p>
      </div>
    </TabContainer>
  )
}

export default MethodologyPage
