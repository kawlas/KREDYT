import { useParams, Link } from 'react-router-dom'
import TabContainer from '../components/layout/TabContainer'
import SEOHead from '../components/shared/SEOHead'
import AdSlot from '../components/shared/AdSlot'
import FaqBlock from '../components/seo/FaqBlock'
import { TOPICS } from '../data/topics'
import NotFoundPage from './NotFoundPage'
import Card from '../components/shared/Card'

interface TopicPageProps {
  topicSlug?: string
}

export default function TopicPage({ topicSlug: propSlug }: TopicPageProps = {}) {
  const { topicSlug: paramSlug } = useParams<{ topicSlug: string }>()
  const topicSlug = propSlug || paramSlug
  
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
        publishedTime={new Date().toISOString()}
        breadcrumbs={[
          { name: 'Strona główna', href: '/' },
          { name: topic.h1, href: `/${topic.slug}/` },
        ]}
        schemaType="Article"
        faqItems={topic.faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      
      <article>
        <section className="mb-10">
          <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-primary/10 rounded-r-xl">
            {topic.intro}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-muted-foreground">
            <span>Aktualizacja: <time dateTime="2026-07-04">4 lipca 2026</time></span>
          </div>
        </section>

        <div className="space-y-12">
          {topic.sections.map((section, idx) => (
            <section key={idx} className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
              <p className="text-foreground leading-relaxed text-lg whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        {topic.ctas.length > 0 && (
          <section className="my-12 flex flex-wrap justify-center gap-4 bg-primary p-10 rounded-3xl text-white">
            <div className="w-full mb-6">
              <h3 className="text-2xl font-bold">Zacznij działać już teraz</h3>
              <p className="opacity-90">Skorzystaj z naszych darmowych narzędzi, aby podjąć najlepszą decyzję.</p>
            </div>
            {topic.ctas.map((cta, idx) => (
              <Link 
                key={idx}
                to={cta.to} 
                className={`px-8 py-3 rounded-xl font-bold transition-all text-lg shadow-lg
                  ${idx === 0 ? 'bg-card text-primary hover:bg-muted' : 'bg-primary text-white border border-primary hover:bg-primary/90'}`}
              >
                {cta.label}
              </Link>
            ))}
          </section>
        )}

        <div className="my-8">
          <AdSlot slot="5567225861" />
        </div>

        <FaqBlock items={faqItems} title={`Pytania i odpowiedzi: ${topic.slug.split('-').join(' ')}`} />

        {topic.related.length > 0 && (
          <section className="mt-12 bg-secondary p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Powiązane poradniki</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topic.related.map((rel, idx) => (
                <Link key={idx} to={rel.to}>
                  <Card className="hover:bg-card transition-colors border-transparent hover:border-primary/40">
                    <span className="text-primary font-semibold">{rel.label}</span>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 pb-12">
          <Link 
            to="/kalkulator-raty-kredytu/" 
            className="text-muted-foreground hover:text-primary flex items-center justify-center gap-2 transition-colors"
          >
            <span>← Powrót do kalkulatora głównego</span>
          </Link>
        </div>
      </article>
    </TabContainer>
  )
}
