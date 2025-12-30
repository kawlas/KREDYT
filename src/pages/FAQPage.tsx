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
      </div>
    </TabContainer>
  )
}
