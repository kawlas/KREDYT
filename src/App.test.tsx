import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from './context/LoanCalculatorContext'
import App from './App'

describe('App', () => {
  it('renders the title', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LoanCalculatorProvider>
            <App />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
    await waitFor(() => {
      expect(screen.getAllByText(/Kalkulator Kredytu/i).length).toBeGreaterThan(0)
    })
  })
})
