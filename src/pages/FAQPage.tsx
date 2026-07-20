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
        title="FAQ – kredyt hipoteczny, 20 pytań i odpowiedzi"
        description="Masz pytania o kredyt hipoteczny? Zobacz 20 najczęściej zadawanych pytań: rata, zdolność, wkład własny, nadpłata. Sprawdź odpowiedzi ekspertów."
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: 'FAQ', href: '/faq-kredyt-hipoteczny/' },
        ]}
        faqItems={FAQ_DATA.slice(0, 5).map(i => ({ question: i.question, answer: i.answer }))}
      />
      <div className="text-muted-foreground space-y-8">
        <p>
          Zbraliśmy najważniejsze pytania zadawane przez przyszłych kredytobiorców. 
          Poniżej znajdziesz krótkie i konkretne odpowiedzi, które pomogą Ci zrozumieć mechanizmy kredytowe.
        </p>
        <FaqBlock items={FAQ_DATA} />

        <div className="p-8 bg-primary/10 rounded-2xl border border-primary/30">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            Pogłębiona wiedza (Poradniki)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/jak-bank-liczy-zdolnosc/" className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-all">
              
              <span className="font-medium text-foreground">Jak bank liczy zdolność?</span>
            </Link>
            <Link to="/ltv-80-procent/" className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-all">
              
              <span className="font-medium text-foreground">Zalety LTV 80%</span>
            </Link>
            <Link to="/prowizja-ubezpieczenie-notariusz/" className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-all">
              <span className="text-2xl">📄</span>
              <span className="font-medium text-foreground">Dodatkowe opłaty</span>
            </Link>
            <Link to="/raty-malejace-kiedy-sie-oplacaja/" className="flex items-center gap-3 p-3 bg-card rounded-xl shadow-sm hover:shadow-md transition-all">
              <span className="text-2xl">📉</span>
              <span className="font-medium text-foreground">Kiedy raty malejące?</span>
            </Link>
          </div>
        </div>
      </div>
    </TabContainer>
  )
}
