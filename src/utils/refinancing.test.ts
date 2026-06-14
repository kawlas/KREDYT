import { describe, it, expect } from 'vitest'
import { calculateRemainingBalance, calculateRefinancingAnalysis } from './refinancing'

describe('refinancing', () => {
  describe('calculateRemainingBalance', () => {
    it('returns full principal at month 0', () => {
      const balance = calculateRemainingBalance(400000, 7, 300, 0, 'equal')
      expect(balance).toBeCloseTo(400000, 0)
    })

    it('returns less than principal after some payments', () => {
      const balance5y = calculateRemainingBalance(400000, 7, 300, 60, 'equal')
      expect(balance5y).toBeLessThan(400000)
      expect(balance5y).toBeGreaterThan(300000) // still significant after only 5y
    })

    it('returns 0 after full term', () => {
      const balance = calculateRemainingBalance(400000, 7, 300, 300, 'equal')
      expect(balance).toBeCloseTo(0, 0)
    })
  })

  describe('calculateRefinancingAnalysis', () => {
    const baseRefi = {
      originalPrincipal: 400000,
      oldAnnualRate: 7.85, // WIBOR 5.85 + margin 2.0
      newAnnualRate: 6.85, // better offer
      totalMonths: 300,
      monthsPaid: 36,
      installmentType: 'equal' as const,
      newLoanProvision: 0.0,
      transferFees: 3000,
      earlyRepaymentFeePercent: 0, // after 36 months
    }

    it('shows positive monthly savings with better rate', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.monthlySavings).toBeGreaterThan(0)
      expect(result.interestSaved).toBeGreaterThan(0)
    })

    it('computes remaining balance correctly', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.remainingBalance).toBeGreaterThan(300000)
      expect(result.remainingBalance).toBeLessThan(400000)
    })

    it('correctly includes transfer fees in total costs', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.totalCosts).toBeGreaterThanOrEqual(3000) // at least transfer fees
    })

    it('breakeven is within remaining months for good refi', () => {
      const result = calculateRefinancingAnalysis({ ...baseRefi, oldAnnualRate: 9, newAnnualRate: 6 })
      expect(result.breakevenMonths).toBeLessThan(264) // remaining months
      expect(result.isWorthIt).toBe(true)
    })
  })
})
