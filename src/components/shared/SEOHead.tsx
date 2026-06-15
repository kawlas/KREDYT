
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

interface BreadcrumbItem {
  name: string
  href: string
}

interface SEOHeadProps {
  title: string
  description: string
  type?: 'website' | 'article'
  image?: string
  publishedTime?: string
  breadcrumbs?: BreadcrumbItem[]
}

const siteUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL)
  || 'https://kredytkalkulator.netlify.app'

function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href,
    })),
  })
}

function websiteJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kalkulator Kredytowy',
    url: siteUrl,
    description: 'Darmowy kalkulator kredytu hipotecznego. Oblicz ratę, RRSO, zdolność kredytową, porównaj oferty banków.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  })
}

export default function SEOHead({ title, description, type = 'website', image, publishedTime, breadcrumbs }: SEOHeadProps) {
  const location = useLocation()

  const canonicalUrl = `${siteUrl}${location.pathname}`.replace(/\/$/, '') + '/'
  const ogImage = image || `${siteUrl}/og-image.svg`

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Kalkulator Kredytowy" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {publishedTime && type === 'article' && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Structured Data */}
      <script type="application/ld+json">{websiteJsonLd()}</script>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">{breadcrumbJsonLd(breadcrumbs)}</script>
      )}
    </Helmet>
  )
}
