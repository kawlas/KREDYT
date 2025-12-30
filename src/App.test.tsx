import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from './context/LoanCalculatorContext'
import App from './App'

describe('App', () => {
  it('renders the title', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LoanCalculatorProvider>
            <App />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
    expect(screen.getAllByText(/Kalkulator Kredytu/i).length).toBeGreaterThan(0)
  })
})
