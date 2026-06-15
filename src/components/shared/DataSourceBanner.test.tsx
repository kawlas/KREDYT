import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import DataSourceBanner from './DataSourceBanner'

const mockData = {
  source: 'calculator' as const,
  values: { loanAmount: 400000, annualRate: 7.85, loanTermYears: 25 },
  onApply: () => {},
}

describe('DataSourceBanner', () => {
  it('renders source info when coming from calculator', () => {
    render(
      <BrowserRouter>
        <DataSourceBanner {...mockData} />
      </BrowserRouter>
    )
    expect(screen.getByText(/pobrane z kalkulatora/i)).toBeTruthy()
  })

  it('renders prompt when no source', () => {
    render(
      <BrowserRouter>
        <DataSourceBanner {...mockData} source="none" />
      </BrowserRouter>
    )
    expect(screen.getByText(/wprowadź dane/i)).toBeTruthy()
  })

  it('shows edit form when edit button clicked', () => {
    render(
      <BrowserRouter>
        <DataSourceBanner {...mockData} />
      </BrowserRouter>
    )
    fireEvent.click(screen.getByText(/edytuj/i))
    expect(screen.getByDisplayValue('400000')).toBeTruthy()
  })

  it('shows link to main calculator', () => {
    render(
      <BrowserRouter>
        <DataSourceBanner {...mockData} />
      </BrowserRouter>
    )
    expect(screen.getByText(/kalkulator główny/i)).toBeTruthy()
  })
})
