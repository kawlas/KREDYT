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
        noIndex
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'Błąd 404', href: '/404/' },
        ]}
      />
      <div className="text-center py-12">
        <div className="text-6xl mb-6 text-muted-foreground"><svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Prawdopodobnie adres został wpisany z błędem lub strona została przeniesiona. 
          Możesz wrócić do strony głównej lub skorzystać z najpopularniejszych narzędzi.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/" 
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            Strona Główna
          </Link>
          <Link 
            to="/kalkulator-raty-kredytu/" 
            className="bg-card text-primary border border-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition"
          >
            Kalkulator Rat
          </Link>
        </div>
      </div>
    </TabContainer>
  )
}
