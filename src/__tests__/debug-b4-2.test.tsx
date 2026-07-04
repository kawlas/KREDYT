import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import PaymentComparisonPage from '../pages/PaymentComparisonPage'

vi.mock('../hooks/useWIBOR', () => ({
  useWIBOR: () => ({ wibor: 5.75, loading: false, error: null, lastUpdate: '2026-07-03', source: 'test', refresh: vi.fn() }),
}))

describe('debug2', () => {
  it('debug B4 exact', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <LoanCalculatorProvider>
            <PaymentComparisonPage loanAmount={400000} annualRate={7} loanTermYears={25} />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )
    const html = container.innerHTML.toLowerCase()
    const idx = html.indexOf('jak zmieniają się raty')
    expect(idx).toBeGreaterThanOrEqual(0)
    // Context: -100 to +100
    const ctx = html.substring(Math.max(0, idx - 100), idx + 100)
    console.log('IDX:', idx)
    console.log('LEN:', html.length)
    console.log('CTX_START:', Math.max(0, idx - 100))
    console.log('CTX_LEN:', ctx.length)
    console.log('HAS bg-blue-50:', ctx.includes('bg-blue-50'))
    // Try smaller window  
    const ctx2 = html.substring(Math.max(0, idx - 80), idx + 100)
    console.log('HAS bg-blue-50 (-80):', ctx2.includes('bg-blue-50'))
    // Check around
    const around = html.substring(idx - 90, idx)
    console.log('AROUND (-90 to 0):', JSON.stringify(around))
  })
})
