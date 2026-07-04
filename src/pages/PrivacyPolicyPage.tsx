import React from 'react'
import { Helmet } from 'react-helmet-async'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <TabContainer title="Polityka Prywatności" subtitle="Twoje dane są u nas bezpieczne">
      <SEOHead
        title="Polityka Prywatności | Kalkulator Kredytowy"
        description="Zasady przetwarzania danych i polityka cookies."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Polityka prywatności', href: '/polityka-prywatnosci/' },
        ]}
        schemaType="Article"
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-3xl mx-auto prose prose-blue text-gray-600 space-y-6">
        <p>
          Cenimy Twoją prywatność. Większość obliczeń w naszym serwisie odbywa się lokalnie w Twojej przeglądarce. 
          Nie przechowujemy Twoich danych finansowych na naszych serwerach.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">LocalStorage</h3>
        <p>
          Funkcja "Zapisz" korzysta z technologii LocalStorage w Twojej przeglądarce. 
          Dane te nigdy nie opuszczają Twojego urządzenia. Możesz je w każdej chwili usunąć w ustawieniach przeglądarki.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Google AdSense i pliki cookie</h3>
        <p>
          Nasza strona korzysta z usługi Google AdSense do wyświetlania reklam. Google AdSense wykorzystuje pliki cookie
          (w tym pliki cookie DoubleClick) do personalizacji reklam na podstawie Twojej aktywności w internecie.
        </p>
        <p>
          Klikając „Akceptuję" w banerze cookie wyrażasz zgodę na:
        </p>
        <ul className="list-disc list-inside">
          <li>przechowywanie plików cookie AdSense/DoubleClick na Twoim urządzeniu</li>
          <li>przetwarzanie danych o Twojej aktywności do celów spersonalizowanych reklam</li>
          <li>udostępnianie danych Google oraz zewnętrznym dostawcom reklam</li>
        </ul>
        <p>
          Możesz w każdej chwili wycofać zgodę, klikając „Odrzucam" w banerze. Wtedy reklamy będą nadal wyświetlane,
          ale nie będą spersonalizowane.
        </p>
        <p>
          Więcej informacji znajdziesz w polityce prywatności Google:{' '}
          <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            policies.google.com/privacy
          </a>
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Twoje prawa</h3>
        <p>
          Zgodnie z RODO masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
          wniesienia sprzeciwu oraz przenoszenia danych. W sprawach związanych z danymi skontaktuj się z nami przez
          formularz na stronie <a href="/kontakt/" className="text-blue-600 hover:underline">Kontakt</a>.
        </p>
      </div>
    </TabContainer>
  )
}

export default PrivacyPolicyPage
