
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

interface SEOHeadProps {
  title: string
  description: string
  type?: 'website' | 'article'
}

export default function SEOHead({ title, description, type = 'website' }: SEOHeadProps) {
  const location = useLocation()
  
  // In a real build, VITE_SITE_URL would be passed in via env or config.
  // For now we fallback to a placeholder or localhost if not set.
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://kredytkalkulator.netlify.app'
  
  // Construct canonical URL (stripping query params)
  // Ensure we append trailing slash if needed or just use pathname
  const canonicalUrl = `${siteUrl}${location.pathname}`.replace(/\/$/, '') + '/'

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Future: Twitter card, etc. */}
    </Helmet>
  )
}
