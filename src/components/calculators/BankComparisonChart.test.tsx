import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import BankComparisonChart from './BankComparisonChart'
import { prepareChartData } from '../../utils/bankComparisonEnhanced'
import { generateBankOffer } from '../../utils/bankComparison'
import type { LoanParams } from '../../utils/bankComparison'
import { BANK_PROFILES } from '../../data/bankProfiles'

const params: LoanParams = {
  principal: 400000,
  years: 25,
  wibor: 5.85,
  installmentType: 'equal',
  propertyValue: 500000,
}

const offers = BANK_PROFILES.slice(0, 5).map(b => generateBankOffer(b, params))
const chartData = prepareChartData(offers)

describe('BankComparisonChart', () => {
  it('renderuje wykres z danymi', () => {
    const { container } = render(<BankComparisonChart data={chartData} />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renderuje placeholder dla pustych danych', () => {
    const { getByText } = render(<BankComparisonChart data={[]} />)
    expect(getByText(/brak danych/i)).toBeTruthy()
  })

  it('pokazuje nazwy banków', () => {
    const { getByText } = render(<BankComparisonChart data={chartData} />)
    // At least some bank names should appear in the SVG
    const hasBankLabels = chartData.some(d => {
      try {
        getByText(d.label)
        return true
      } catch {
        return false
      }
    })
    expect(hasBankLabels).toBe(true)
  })
})