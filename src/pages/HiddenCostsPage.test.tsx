import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HiddenCostsPage from './HiddenCostsPage'

describe('HiddenCostsPage', () => {
  it('renders page with SEO metadata', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <HiddenCostsPage />
        </MemoryRouter>
      </HelmetProvider>
    )
    expect(screen.getByRole('heading', { name: /ukryte koszty kredytu hipotecznego/i })).toBeTruthy()
  })

  it('integrates HiddenCostChecklist component', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <HiddenCostsPage />
        </MemoryRouter>
      </HelmetProvider>
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })
})
