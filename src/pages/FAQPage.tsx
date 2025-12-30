import { Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'
import FaqBlock from '../components/seo/FaqBlock'
import { FAQ_DATA } from '../data/faqData'

export default function FAQPage() {
  return (
    <TabContainer
      title="Częste Pytania (FAQ)"
      subtitle="Odpowiedzi na 20 kluczowych pytań o kredyt hipoteczny"
    >
      <SEOHead 
        title="FAQ Kredyt Hipoteczny - 20 Najważniejszych Pytań i Odpowiedzi"
        description="Masz pytania o kredyt hipoteczny? Zobacz 20 najczęściej zadawanych pytań: rata, zdolność, wkład własny, nadpłata. Sprawdź odpowiedzi ekspertów."
      />
      <div className="max-w-3xl mx-auto text-gray-600 mb-8">
        <p className="mb-6">
          Zbraliśmy najważniejsze pytania zadawane przez przyszłych kredytobiorców. 
          Poniżej znajdziesz krótkie i konkretne odpowiedzi, które pomogą Ci zrozumieć mechanizmy kredytowe.
        </p>
        <FaqBlock items={FAQ_DATA} />

        <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>📖</span> Pogłębiona wiedza (Poradniki)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/jak-bank-liczy-zdolnosc/" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <span className="text-2xl">🏦</span>
              <span className="font-medium text-gray-700">Jak bank liczy zdolność?</span>
            </Link>
            <Link to="/ltv-80-procent/" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <span className="text-2xl">📈</span>
              <span className="font-medium text-gray-700">Zalety LTV 80%</span>
            </Link>
            <Link to="/prowizja-ubezpieczenie-notariusz/" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <span className="text-2xl">📄</span>
              <span className="font-medium text-gray-700">Dodatkowe opłaty</span>
            </Link>
            <Link to="/raty-malejace-kiedy-sie-oplacaja/" className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
              <span className="text-2xl">📉</span>
              <span className="font-medium text-gray-700">Kiedy raty malejące?</span>
            </Link>
          </div>
        </div>
      </div>
    </TabContainer>
  )
}
