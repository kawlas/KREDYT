
import { Helmet } from 'react-helmet-async'
import type { FAQItem } from '../../data/faqData'

interface FAQSectionProps {
  items: FAQItem[]
  title?: string
  className?: string
}

export default function FAQSection({ items, title = "Częste pytania", className = '' }: FAQSectionProps) {
  if (items.length === 0) return null

  // Generate FAQPage JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section className={`py-8 ${className}`}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        {title && <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{title}</h2>}
        
        <div className="space-y-4">
          {items.map((item) => (
            <details 
              key={item.id} 
              className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none bg-white">
                <span className="font-semibold text-gray-800 pr-4">{item.question}</span>
                <span className="transition-transform duration-200 group-open:rotate-180 text-blue-500 font-bold text-xl">
                  {/* Custom icon or simpler implementation */}
                  ▼
                </span>
              </summary>
              <div className="px-5 pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                <div className="pt-3">
                  {item.answer}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
