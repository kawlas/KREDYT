import { describe, it, expect } from 'vitest'
import {
  prepareChartData,
  getAmortizationInsights,
} from './amortizationChart'

describe('prepareChartData', () => {
  it('generates yearly chart data for full loan term', () => {
    const result = prepareChartData(400000, 7.0, 25, 'equal')
    expect(result).toHaveLength(25)
  })

  it('shows more interest than principal in early years', () => {
    const result = prepareChartData(400000, 7.0, 25, 'equal')
    expect(result[0].interest).toBeGreaterThan(result[0].principal)
  })

  it('shows more principal than interest in later years', () => {
    const result = prepareChartData(400000, 7.0, 25, 'equal')
    const last = result[result.length - 1]
    expect(last.principal).toBeGreaterThan(last.interest)
  })

  it('total principal equals loan amount', () => {
    const result = prepareChartData(400000, 7.0, 25, 'equal')
    const totalPrincipal = result.reduce((sum, y) => sum + y.principal, 0)
    expect(totalPrincipal).toBeCloseTo(400000, -2)
  })

  it('handles zero principal gracefully', () => {
    const result = prepareChartData(0, 7.0, 25, 'equal')
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
  })

  it('handles zero interest rate', () => {
    const result = prepareChartData(400000, 0, 25, 'equal')
    expect(result[0].interest).toBe(0)
    expect(result[0].principal).toBeGreaterThan(0)
  })

  it('handles declining installment type', () => {
    const result = prepareChartData(400000, 7.0, 25, 'declining')
    expect(result).toHaveLength(25)
    expect(result[0].principal).toBeGreaterThan(0)
    expect(result[0].interest).toBeGreaterThan(0)
  })

  it('returns empty array for zero years', () => {
    const result = prepareChartData(400000, 7.0, 0, 'equal')
    expect(result).toEqual([])
  })
})

describe('getAmortizationInsights', () => {
  it('generates key insights from amortization data', () => {
    const result = getAmortizationInsights(400000, 7.0, 25)
    expect(result.totalInterest).toBeGreaterThan(0)
    expect(result.interestToPrincipalRatio).toBeGreaterThan(0)
    expect(result.halfwayPointYear).toBeGreaterThan(0)
    expect(result.firstYearInterestPercent).toBeGreaterThan(50)
  })

  it('identifies when interest drops below 50% of payment', () => {
    const result = getAmortizationInsights(400000, 7.0, 25)
    expect(result.halfwayPointYear).toBeGreaterThan(10)
  })

  it('handles zero principal gracefully', () => {
    const result = getAmortizationInsights(0, 7.0, 25)
    expect(result.totalInterest).toBe(0)
    expect(result.totalPaid).toBe(0)
    expect(result.interestToPrincipalRatio).toBe(0)
  })

  it('computes total paid correctly', () => {
    const result = getAmortizationInsights(400000, 7.0, 25)
    expect(result.totalPaid).toBeGreaterThan(400000)
    expect(result.totalPaid).toBeCloseTo(400000 + result.totalInterest, 0)
  })
})
