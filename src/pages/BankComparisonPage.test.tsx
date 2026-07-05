import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import BankComparisonPage from './BankComparisonPage'

describe('BankComparisonPage - H1', () => {
  const renderPage = () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LoanCalculatorProvider>
            <BankComparisonPage />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
  }

  it('zawiera dokładnie jeden <h1>', () => {
    renderPage()
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
  })

  it('h1 nie jest pusty', () => {
    renderPage()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toBeTruthy()
    expect(h1.textContent!.trim().length).toBeGreaterThan(0)
  })

  it('h1 opisuje kalkulator kredytu hipotecznego', () => {
    renderPage()
    const h1 = screen.getByRole('heading', { level: 1 })
    const text = h1.textContent!.toLowerCase()
    const hasExpected = text.includes('kalkulator') || text.includes('kredytu') || text.includes('hipotecznego')
    expect(hasExpected).toBe(true)
  })

  it('strona renderuje się bez crasha', () => {
    expect(() => renderPage()).not.toThrow()
  })
})
