import React from 'react'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const AboutPage: React.FC = () => {
  return (
    <TabContainer title="O projekcie" subtitle="Dlaczego stworzyliśmy ten kalkulator?">
      <SEOHead 
        title="O Projekcie | Kalkulator Kredytowy"
        description="Dowiedz się więcej o naszej misji budowania przejrzystości w finansach hipotecznych."
      />
      <div className="max-w-3xl mx-auto prose prose-blue">
        <p className="text-gray-600 leading-relaxed">
          Kalkulator Kredytowy powstał z potrzeby stworzenia niezależnego, przejrzystego narzędzia, 
          które pomoże Polakom zrozumieć realne koszty kredytu hipotecznego. 
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          Wierzymy, że decyzja o kredycie na 20 czy 30 lat powinna być oparta na twardych danych, 
          a nie na marketingowych hasłach. Nasze narzędzia są darmowe i dostępne dla każdego.
        </p>
      </div>
    </TabContainer>
  )
}

export default AboutPage
