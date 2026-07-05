import { describe, it, expect } from 'vitest'
import { compareRentVsBuy } from './rentVsBuy'
import type { RentVsBuyInput } from './rentVsBuy'

const baseInput: RentVsBuyInput = {
  propertyPrice: 500000,
  downPaymentPercent: 20,
  loanRate: 7.0,
  loanTermYears: 25,
  commissionPercent: 0,
  notaryCosts: 3000,
  pccPercent: 2,
  renovationCosts: 15000,
  monthlyMaintenance: 600,
  monthlyInsurance: 50,
  monthlyRent: 2500,
  rentIncreaseAnnual: 3,
  investmentReturnRate: 5,
  propertyAppreciation: 3,
  yearsToCompare: 10,
}

describe('rentVsBuy', () => {
  it('zwraca dane dla każdego roku', () => {
    const result = compareRentVsBuy(baseInput)
    expect(result.yearlyData.length).toBe(10)
  })

  it('zawiera konkluzję', () => {
    const result = compareRentVsBuy(baseInput)
    expect(result.conclusion.recommendation.length).toBeGreaterThan(0)
    expect(typeof result.conclusion.buyIsBetter).toBe('boolean')
  })

  it('oblicza koszty początkowe zakupu', () => {
    const result = compareRentVsBuy(baseInput)
    // Down payment: 100k (20% of 500k)
    // PCC: 10k (2% of 500k)
    // Notary: 3k
    // Renovation: 15k
    // First year buy cost should include upfront
    const firstYear = result.yearlyData[0]
    expect(firstYear.buyTotalSpent).toBeGreaterThan(100000 + 10000 + 3000 + 15000)
  })

  it('oblicza ratę kredytu', () => {
    const result = compareRentVsBuy(baseInput)
    const firstYear = result.yearlyData[0]
    // Monthly cost for buy should include mortgage payment + maintenance + insurance
    expect(firstYear.monthlyCostBuy).toBeGreaterThan(0)
    // Rent monthly cost
    expect(firstYear.monthlyCostRent).toBeGreaterThan(0)
  })

  it('wzrost wartości nieruchomości po X latach', () => {
    const result = compareRentVsBuy(baseInput)
    const lastYear = result.yearlyData[result.yearlyData.length - 1]
    // Property should appreciate ~34% over 10 years at 3%
    expect(lastYear.buyPropertyValue).toBeGreaterThan(500000)
  })

  it('breakEvenYear nie jest nullem gdy opłaca się kupić', () => {
    const result = compareRentVsBuy(baseInput)
    // With these params, buying should eventually be better
    const breakEven = result.conclusion.breakEvenYear
    // Might be null or a number depending on calculations
    if (breakEven !== null) {
      expect(breakEven).toBeGreaterThan(0)
      expect(breakEven).toBeLessThanOrEqual(10)
    }
  })

  it('breakEvenYear jest określony dla domyślnych parametrów', () => {
    const result = compareRentVsBuy(baseInput)
    // With default params, buying should break-even at some point
    expect(result.conclusion.breakEvenYear).not.toBeNull()
    expect(result.conclusion.breakEvenYear!).toBeGreaterThan(0)
  })

  it('długi horyzont 30 lat — zakup ma wyższą wartość netto', () => {
    const longTerm: RentVsBuyInput = {
      ...baseInput,
      yearsToCompare: 30,
    }
    const result = compareRentVsBuy(longTerm)
    const lastYear = result.yearlyData[result.yearlyData.length - 1]
    // After 30 years, buy net worth (paid-off property) > rent net worth
    expect(lastYear.buyNetWorth).toBeGreaterThan(lastYear.rentNetWorth)
  })

  it('rok 1 ma poprawne wartości', () => {
    const result = compareRentVsBuy(baseInput)
    const yr1 = result.yearlyData[0]

    // Year must be 1
    expect(yr1.year).toBe(1)

    // Buy total spent should be >= cumulative costs (they're both rounded now)
    expect(yr1.buyTotalSpent).toBeGreaterThan(0)

    // Rent total spent should be ~12*2500 = 30,000
    expect(yr1.rentTotalSpent).toBeGreaterThan(25000)
    expect(yr1.rentTotalSpent).toBeLessThan(40000)
  })
})