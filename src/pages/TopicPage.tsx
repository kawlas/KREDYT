import { useParams, Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'
import FaqBlock from '../components/seo/FaqBlock'
import { TOPICS } from '../data/topics'
import NotFoundPage from './NotFoundPage'
import Card from '../components/shared/Card'

export default function TopicPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>()
  
  const topic = TOPICS.find(t => t.slug === topicSlug)

  if (!topic) {
    return <NotFoundPage />
  }

  // Map topic FAQs to FAQItem format for FaqBlock
  const faqItems = topic.faqs.map((f, index) => ({
    id: index + 1,
    question: f.q,
    answer: f.a
  }))

  return (
    <TabContainer
      title={topic.h1}
    >
      <SEOHead 
        title={topic.metaTitle}
        description={topic.metaDescription}
        type="article"
      />
      
      <article className="max-w-4xl mx-auto">
        <section className="mb-10">
          <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/30 rounded-r-xl">
            {topic.intro}
          </p>
        </section>

        <div className="space-y-12">
          {topic.sections.map((section, idx) => (
            <section key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {topic.ctas.length > 0 && (
          <section className="my-12 flex flex-wrap justify-center gap-4 bg-blue-600 p-10 rounded-3xl text-white">
            <div className="text-center w-full mb-6">
              <h3 className="text-2xl font-bold">Zacznij działać już teraz</h3>
              <p className="opacity-90">Skorzystaj z naszych darmowych narzędzi, aby podjąć najlepszą decyzję.</p>
            </div>
            {topic.ctas.map((cta, idx) => (
              <Link 
                key={idx}
                to={cta.to} 
                className={`px-8 py-3 rounded-xl font-bold transition-all text-lg shadow-lg
                  ${idx === 0 ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-500 text-white border border-blue-400 hover:bg-blue-400'}`}
              >
                {cta.label}
              </Link>
            ))}
          </section>
        )}

        <FaqBlock items={faqItems} title={`Pytania i odpowiedzi: ${topic.slug.split('-').join(' ')}`} />

        {topic.related.length > 0 && (
          <section className="mt-12 bg-gray-100 p-8 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">🔗 Powiązane poradniki</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topic.related.map((rel, idx) => (
                <Link key={idx} to={rel.to}>
                  <Card className="hover:bg-white transition-colors border-transparent hover:border-blue-200">
                    <span className="text-blue-600 font-semibold">{rel.label}</span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 text-center pb-12">
          <Link 
            to="/kalkulator-raty-kredytu/" 
            className="text-gray-500 hover:text-blue-600 flex items-center justify-center gap-2 transition-colors"
          >
            <span>← Powrót do kalkulatora głównego</span>
          </Link>
        </div>
      </article>
    </TabContainer>
  )
}
