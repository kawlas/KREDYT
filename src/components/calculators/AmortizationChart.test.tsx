import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AmortizationChart from './AmortizationChart'
import type { ChartYearData, AmortizationInsights } from '../../utils/amortizationChart'

const mockData: ChartYearData[] = [
  { year: 1, principal: 8000, interest: 28000, total: 36000, remainingBalance: 392000 },
  { year: 2, principal: 8600, interest: 27400, total: 36000, remainingBalance: 383400 },
  { year: 3, principal: 9200, interest: 26800, total: 36000, remainingBalance: 374200 },
]

const mockInsights: AmortizationInsights = {
  totalInterest: 440000,
  totalPaid: 840000,
  interestToPrincipalRatio: 1.1,
  halfwayPointYear: 16,
  firstYearInterestPercent: 78.5,
}

describe('AmortizationChart', () => {
  it('renders chart with yearly data', () => {
    render(<AmortizationChart data={mockData} insights={mockInsights} loanAmount={400000} />)
    expect(screen.getByText(/jak zmienia się rata/i)).toBeTruthy()
  })

  it('shows interest vs principal breakdown', () => {
    render(<AmortizationChart data={mockData} insights={mockInsights} loanAmount={400000} />)
    const odsetkiElements = screen.getAllByText(/odsetki/i)
    expect(odsetkiElements.length).toBeGreaterThanOrEqual(1)
    const kapitalElements = screen.getAllByText(/kapitał/i)
    expect(kapitalElements.length).toBeGreaterThanOrEqual(1)
  })

  it('displays total interest insight', () => {
    render(<AmortizationChart data={mockData} insights={mockInsights} loanAmount={400000} />)
    expect(screen.getByText(/przepłacasz/i)).toBeTruthy()
  })

  it('is accessible with proper labels', () => {
    render(<AmortizationChart data={mockData} insights={mockInsights} loanAmount={400000} />)
    expect(screen.getByRole('figure')).toBeTruthy()
  })

  it('handles empty data gracefully', () => {
    render(<AmortizationChart data={[]} insights={mockInsights} loanAmount={400000} />)
    expect(screen.getByText(/brak danych/i)).toBeTruthy()
  })

  it('displays halfway point insight', () => {
    render(<AmortizationChart data={mockData} insights={mockInsights} loanAmount={400000} />)
    expect(screen.getByText(/16/)).toBeTruthy()
  })

  it('displays first year interest percent insight', () => {
    render(<AmortizationChart data={mockData} insights={mockInsights} loanAmount={400000} />)
    expect(screen.getByText(/79/)).toBeTruthy()
  })
})
