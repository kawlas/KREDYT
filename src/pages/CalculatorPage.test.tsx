import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CalculatorPage, { getDisplayResultsInputs } from './CalculatorPage'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'
import type { LoanFormData } from '../types'

vi.mock('../hooks/useWIBOR', () => ({
  useWIBOR: () => ({
    wibor: 5,
    loading: false,
    error: null,
    lastUpdate: '',
    source: 'test',
    refresh: vi.fn(),
  }),
}))

const baseData: LoanFormData = {
  principal: 400000,
  years: 25,
  wibor: 5,
  margin: 2,
  installmentType: 'equal',
  propertyValue: 500000,
}

describe('CalculatorPage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('uses debounced form values for ResultsCard inputs when auto results exist', () => {
    const input = getDisplayResultsInputs(
      {
        principal: 500000,
        years: 30,
        wibor: 5.5,
        margin: 2.25,
        propertyValue: 625000,
      },
      baseData
    )

    expect(input).toEqual({
      loanAmount: 500000,
      propertyValue: 625000,
      wibor: 5.5,
      margin: 2.25,
      loanTermYears: 30,
    })
  })

  it('renders the form', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <LoanCalculatorProvider>
            <CalculatorPage />
          </LoanCalculatorProvider>
        </MemoryRouter>
      </HelmetProvider>
    )

    expect(screen.getByText('Oblicz ratę swojego kredytu')).toBeInTheDocument()
    expect(screen.getByLabelText('Kwota kredytu (PLN)')).toBeInTheDocument()
    expect(screen.getByLabelText('Okres kredytowania (lata)')).toBeInTheDocument()
    expect(screen.getByLabelText('WIBOR 3M (%)')).toBeInTheDocument()
  })
})
