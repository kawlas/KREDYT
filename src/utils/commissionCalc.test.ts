import { describe, it, expect } from 'vitest'
import { compareCommission, calculateOptimalCommission } from './commissionCalc'

describe('commissionCalc', () => {
  const principal = 400000
  const baseRate = 7.0
  const years = 25

  it('oblicza scenariusz z prowizją', () => {
    const result = compareCommission(principal, baseRate, 2, 7.5, years)
    expect(result.withCommission.commissionPercent).toBe(2)
    expect(result.withCommission.commissionAmount).toBe(8000) // 400k * 2%
    expect(result.withCommission.netPrincipal).toBe(392000)
  })

  it('oblicza scenariusz bez prowizji', () => {
    const result = compareCommission(principal, baseRate, 2, 7.5, years)
    expect(result.withoutCommission.commissionPercent).toBe(0)
    expect(result.withoutCommission.commissionAmount).toBe(0)
    expect(result.withoutCommission.netPrincipal).toBe(principal)
  })

  it('zwraca różnicę miesięczną', () => {
    const result = compareCommission(principal, baseRate, 2, 7.5, years)
    expect(typeof result.difference.monthly).toBe('number')
    expect(typeof result.difference.totalInterest).toBe('number')
    expect(typeof result.difference.totalPaid).toBe('number')
  })

  it('zwraca rekomendację', () => {
    const result = compareCommission(principal, baseRate, 2, 7.5, years)
    expect(result.recommendation.length).toBeGreaterThan(0)
  })

  it('zerowa prowizja — brak kosztów początkowych', () => {
    const result = compareCommission(principal, baseRate, 0, 7.0, years)
    expect(result.withCommission.commissionAmount).toBe(0)
  })

  it('określa próg opłacalności', () => {
    // When commission option has lower rate but upfront cost
    // With rate difference significant enough
    const result = compareCommission(principal, 7.0, 2.0, 7.8, years)
    // with-commission has lower monthly payment (lower rate)
    // break-even should exist
    expect(typeof result.monthlyBreakEvenAtYears).toBe('number')
  })

  it('calculateOptimalCommission znajduje optymalną prowizję', () => {
    const result = calculateOptimalCommission(principal, 7.0, years, 0.3)
    expect(result.optimalCommission).toBeGreaterThanOrEqual(0)
    expect(result.optimalCommission).toBeLessThanOrEqual(5)
    expect(typeof result.savings).toBe('number')
  })

  it('działa z różnymi kwotami', () => {
    const result = compareCommission(250000, 7.5, 1.5, 8.0, 30)
    expect(result.withCommission.commissionAmount).toBe(3750) // 250k * 1.5%
    expect(result.withoutCommission.commissionAmount).toBe(0)
  })

  it('prowizja 0% i ta sama marża — identyczne wyniki', () => {
    const result = compareCommission(principal, 7.0, 0, 7.0, years)
    expect(result.difference.monthly).toBe(0)
    expect(result.difference.totalInterest).toBe(0)
  })
})