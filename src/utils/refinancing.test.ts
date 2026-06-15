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

    it('returns correct balance after 1 payment with 0% rate (equal)', () => {
      // 120k, 0% rate, 12 months equal: payment = 10k/mo.
      // After 1 payment: remaining = 110k
      const balance = calculateRemainingBalance(120000, 0, 12, 1, 'equal')
      expect(balance).toBeCloseTo(110000, 0)
    })

    it('returns correct balance after 6 payments with 0% rate (equal)', () => {
      // After 6 payments: remaining = 60k
      const balance = calculateRemainingBalance(120000, 0, 12, 6, 'equal')
      expect(balance).toBeCloseTo(60000, 0)
    })

    it('returns correct balance after 1 payment with 0% rate (declining)', () => {
      // 120k, 0%, 12 months declining: principalPart = 10k/mo
      // After 1 payment: remaining = 110k
      const balance = calculateRemainingBalance(120000, 0, 12, 1, 'declining')
      expect(balance).toBeCloseTo(110000, 0)
    })

    it('returns correct balance after 1 payment with non-zero rate (equal)', () => {
      // 100k, 12% annual, 12 months equal
      // generateAmortizationSchedule row[0]: has principalPart, interestPart, remainingBalance
      // remainingBalance AFTER month 1 + principalPart of month 1 = balance BEFORE month 1
      // That should equal 100k minus the extra principal paid in month 0? No.
      // schedule[0].remainingBalance = balance after month 1's payment
      // schedule[0].principalPart = principal part of month 1
      // Their sum = the balance at the start of month 1 = what we want after 1 payment
      // But if monthsPaid=1 and idx=0, we get schedule[0].remainingBalance + schedule[0].principalPart
      // = original principal (since balance after + principal paid = balance before)
      // That's WRONG if the user wants the balance AFTER 1 payment, not before.
      // The function is documented as 'remaining principal after monthsPaid months' — 
      // so after 1 payment we want remainingBalance (not rem+principal)
      const monthlyPayment = (100000 * (0.01 * Math.pow(1.01, 12))) / (Math.pow(1.01, 12) - 1)
      const interestMonth1 = 100000 * 0.01
      const principalMonth1 = monthlyPayment - interestMonth1
      const expectedAfter1 = 100000 - principalMonth1

      const balance = calculateRemainingBalance(100000, 12, 12, 1, 'equal')
      // Function returns: schedule[0].remainingBalance + schedule[0].principalPart
      // = (100000 - principalMonth1) + principalMonth1 = 100000
      // But we expect: 100000 - principalMonth1 (the actual remaining after 1 payment)
      expect(balance).toBeCloseTo(expectedAfter1, 0)
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
