import { describe, it, expect } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import SEOHead from './SEOHead'

function renderSEOHead(props: Parameters<typeof SEOHead>[0]) {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <SEOHead {...props} />
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('SEOHead — E-E-A-T: Autor', () => {
  it('dodaje meta tag author z "Tony Halik"', async () => {
    renderSEOHead({
      title: 'Test',
      description: 'Test description',
    })
    await waitFor(() => {
      const authorMeta = document.querySelector('meta[name="author"]')
      expect(authorMeta).toBeTruthy()
      expect(authorMeta?.getAttribute('content')).toBe('Tony Halik')
    })
  })

  it('renderuje się bez błędów z schemaType WebApplication', async () => {
    expect(() => {
      renderSEOHead({
        title: 'Kalkulator Test',
        description: 'Test',
        schemaType: 'WebApplication',
        appUrl: 'https://test.pl/',
      })
    }).not.toThrow()
  })

  it('renderuje się bez błędów z schemaType Article', async () => {
    expect(() => {
      renderSEOHead({
        title: 'Artykuł Test',
        description: 'Test',
        schemaType: 'Article',
      })
    }).not.toThrow()
  })

  it('zawiera Organization structured data', async () => {
    renderSEOHead({
      title: 'Test',
      description: 'Test',
    })
    await waitFor(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      const hasOrg = Array.from(scripts).some(s => 
        s.textContent?.includes('"Organization"')
      )
      expect(hasOrg).toBe(true)
    })
  })
})