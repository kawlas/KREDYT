import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import BIKSimulatorPage from './BIKSimulatorPage'

describe('BIKSimulatorPage', () => {
  it('renders page with SEO metadata and heading', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <BIKSimulatorPage />
        </MemoryRouter>
      </HelmetProvider>
    )
    expect(screen.getByRole('heading', { name: /co wpływa na scoring bik/i })).toBeTruthy()
  })

  it('integrates BIKSimulator component with switches', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <BIKSimulatorPage />
        </MemoryRouter>
      </HelmetProvider>
    )
    const switches = screen.getAllByRole('switch')
    expect(switches.length).toBeGreaterThanOrEqual(10)
  })

  it('renders FAQ section with 5 questions about scoring BIK', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <BIKSimulatorPage />
        </MemoryRouter>
      </HelmetProvider>
    )
    expect(screen.getByText(/Najczęstsze pytania o scoring BIK/i)).toBeTruthy()
    expect(screen.getByText(/czym jest scoring bik/i)).toBeTruthy()
    expect(screen.getByText(/jaki scoring bik jest wymagany/i)).toBeTruthy()
    expect(screen.getByText(/jak szybko mogę poprawić/i)).toBeTruthy()
    expect(screen.getByText(/czy sprawdzenie swojego scoringu/i)).toBeTruthy()
    expect(screen.getByText(/jak długo negatywne informacje/i)).toBeTruthy()
  })
})
