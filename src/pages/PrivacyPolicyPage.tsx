import React from 'react'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <TabContainer title="Polityka Prywatności" subtitle="Twoje dane są u nas bezpieczne">
      <SEOHead 
        title="Polityka Prywatności | Kalkulator Kredytowy"
        description="Zasady przetwarzania danych i polityka cookies."
      />
      <div className="max-w-3xl mx-auto prose prose-blue text-gray-600">
        <p className="mb-4">
          Cenimy Twoją prywatność. Większość obliczeń w naszym serwisie odbywa się lokalnie w Twojej przeglądarce. 
          Nie przechowujemy Twoich danych finansowych na naszych serwerach.
        </p>
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">LocalStorage</h3>
        <p>
          Funkcja "Zapisz" korzysta z technologii LocalStorage w Twojej przeglądarce. 
          Dane te nigdy nie opuszczają Twojego urządzenia.
        </p>
      </div>
    </TabContainer>
  )
}

export default PrivacyPolicyPage
