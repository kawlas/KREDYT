import { Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'

export default function NotFoundPage() {
  return (
    <TabContainer
      title="404 - Nie znaleziono strony"
      subtitle="Przepraszamy, ale strona której szukasz nie istnieje."
    >
      <SEOHead 
        title="404 - Strona nie znaleziona | Kalkulator Kredytowy"
        description="Niestety nie znaleźliśmy strony o podanym adresie. Zapraszamy do skorzystania z naszych kalkulatorów kredytowych."
      />
      <div className="text-center py-12">
        <div className="text-6xl mb-6">🔍</div>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Prawdopodobnie adres został wpisany z błędem lub strona została przeniesiona. 
          Możesz wrócić do strony głównej lub skorzystać z najpopularniejszych narzędzi.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Strona Główna
          </Link>
          <Link 
            to="/kalkulator-raty-kredytu/" 
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Kalkulator Rat
          </Link>
        </div>
      </div>
    </TabContainer>
  )
}
