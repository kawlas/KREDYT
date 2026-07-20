import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

interface BreadcrumbItem {
  name: string
  href: string
}

interface FaqItem {
  question: string
  answer: string
}

const AUTHOR_NAME = 'Tony Halik'
const AUTHOR_JOB_TITLE = 'Ekspert rynku kredytowego'
const AUTHOR_URL = 'https://kredytkalkulator.netlify.app/o-projekcie/'

interface SEOHeadProps {
  title: string
  description: string
  type?: 'website' | 'article'
  image?: string
  publishedTime?: string
  breadcrumbs?: BreadcrumbItem[]
  schemaType?: 'WebApplication' | 'Article' | 'WebPage'
  faqItems?: FaqItem[]
  appUrl?: string
  noIndex?: boolean
}

const siteUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL)
  || 'https://kredytkalkulator.netlify.app'

function organizationJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KredytKalkulator',
    url: siteUrl,
    description: 'Darmowe kalkulatory kredytu hipotecznego i narzędzia finansowe',
    sameAs: [
      'https://github.com/kawlas/KREDYT',
    ],
    founder: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      jobTitle: AUTHOR_JOB_TITLE,
      url: AUTHOR_URL,
    },
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

function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${siteUrl}${item.href}`,
    })),
  })
}

function webApplicationJsonLd(title: string, description: string, appUrl: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description,
    url: appUrl,
    dateModified: '2026-07-04',
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      jobTitle: AUTHOR_JOB_TITLE,
      url: AUTHOR_URL,
    },
  })
}

function articleJsonLd(title: string, description: string) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: '2026-01-15',
    dateModified: '2026-07-04',
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      jobTitle: AUTHOR_JOB_TITLE,
      url: AUTHOR_URL,
    },
  })
}

function faqPageJsonLd(items: FaqItem[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })
}

export default function SEOHead({
  title,
  description,
  type = 'website',
  image,
  publishedTime,
  breadcrumbs,
  schemaType,
  faqItems,
  appUrl,
  noIndex,
}: SEOHeadProps) {
  const location = useLocation()

  const canonicalUrl = `${siteUrl}${location.pathname}`.replace(/\/$/, '') + '/'
  const ogImage = image || `${siteUrl}/og-image.png`
  const fullAppUrl = appUrl || canonicalUrl

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Author (E-E-A-T) */}
      <meta name="author" content={AUTHOR_NAME} />

      {/* Open Graph */}
      <meta property="og:locale" content="pl_PL" />
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

      {/* Structured Data - Organization */}
      <script type="application/ld+json">{organizationJsonLd()}</script>

      {/* Structured Data - WebSite */}
      <script type="application/ld+json">{websiteJsonLd()}</script>

      {/* Structured Data - BreadcrumbList */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">{breadcrumbJsonLd(breadcrumbs)}</script>
      )}

      {/* Structured Data - WebApplication */}
      {schemaType === 'WebApplication' && (
        <script type="application/ld+json">{webApplicationJsonLd(title, description, fullAppUrl)}</script>
      )}

      {/* Structured Data - Article */}
      {schemaType === 'Article' && (
        <script type="application/ld+json">{articleJsonLd(title, description)}</script>
      )}

      {/* Structured Data - FAQPage */}
      {faqItems && faqItems.length > 0 && (
        <script type="application/ld+json">{faqPageJsonLd(faqItems)}</script>
      )}
    </Helmet>
  )
}
