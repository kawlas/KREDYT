import { describe, it, expect } from 'vitest'
import {
  calculateMonthlyPayment,
  calculateTotalCost,
  calculateRRSO,
  calculateRefinancingCost,
} from './loanCalculations'

describe('loanCalculations', () => {
  describe('calculateMonthlyPayment', () => {
    it('calculates equal installments correctly', () => {
      // 300k, 25 years (300 months), 5% (wibor) + 2% (margin) = 7% total
      const payment = calculateMonthlyPayment(300000, 7, 300, 'equal')
      // Expected: ~2120.34
      expect(payment).toBeCloseTo(2120.34, 2)
    })

    it('calculates first declining installment correctly', () => {
      // 300k, 25 years (300 months), 7% total
      // Principal part: 1000
      // Interest part: 300k * 7% / 12 = 1750
      // Total: 2750
      const payment = calculateMonthlyPayment(300000, 7, 300, 'declining')
      expect(payment).toBeCloseTo(2750, 2)
    })

    it('throws error for negative values', () => {
      expect(() => calculateMonthlyPayment(-100, 5, 300, 'equal')).toThrow()
    })
  })



  describe('calculateTotalCost', () => {
    it('calculates total cost for equal installments', () => {
      // 10k, 1 year, 12%
      // Monthly: ~888.49
      // Total: ~10661.85
      const total = calculateTotalCost(10000, 12, 12, 'equal')
      expect(total).toBeGreaterThan(10000)
      expect(total).toBeCloseTo(10661.85, 1)
    })

    it('includes fees in total cost', () => {
      const fees = 1000
      const total = calculateTotalCost(10000, 12, 12, 'equal', fees)
      expect(total).toBeCloseTo(10661.85 + fees, 1)
    })

    it('calculates total cost for declining installments correctly', () => {
      // 120k, 1 year (12 months), 12% rate (1% monthly)
      // declining installments.
      // Month 1: 10k principal + 1.2k interest = 11.2k
      // ...
      // Month 12: 10k principal + 0.1k interest = 10.1k
      // Total Principal: 120k
      // Total Interest: Sum of (120k, 110k, ... 10k) * 1%
      // 120 + 110 + ... + 10 = 10 * (120+10)/2 = 650k sum of balances? No.
      // Sum of arithmetic series: n/2 * (a1 + an)
      // Balances: 120, 110, ..., 10. (Interest is paid on balance at START of month)
      // Sum: 12 * (120 + 10) / 2 = 6 * 130 = 780 ('000 unit) -> 780000
      // Interest = 780000 * 0.01 = 7800.
      // Total Cost = 120000 + 7800 = 127800.
      
      const total = calculateTotalCost(120000, 12, 12, 'declining')
      expect(total).toBeCloseTo(127800, 2)
    })
  })

  describe('calculateRRSO', () => {
    it('calculates RRSO correctly for simple case', () => {
      // 1000 PLN, 1 year, 10% interest, 0 fees, equal installments
      // Total cost approx 1055.
      // RRSO should be close to nominal 10% if no fees? Actually APR vs APY.
      // 1000 loan, 12 payments of 87.92.
      // 10% nominal.
      const rrso = calculateRRSO(1000, 1054.99, 12)
      expect(rrso).toBeCloseTo(10.47, 1) // Approximate check
    })
    
    it('calculates RRSO with fees', () => {
      // High fees should increase RRSO significantly
      const rrso = calculateRRSO(1000, 1500, 12)
      expect(rrso).toBeGreaterThan(10)
    })
  })

  describe('calculateRefinancingCost', () => {
    it('calculates savings correctly', () => {
      // 300k debt
      // Old: 9%, New: 6%
      // Remaining: 20 years (240 months)
      // Fees: 2000
      
      const result = calculateRefinancingCost(300000, 9, 6, 240, 2000)
      expect(result.monthlySavings).toBeGreaterThan(0)
      expect(result.totalSavings).toBeGreaterThan(0)
      expect(result.breakevenMonths).toBeGreaterThan(0)
    })

    it('returns 0 savings if new rate is higher', () => {
      const result = calculateRefinancingCost(300000, 5, 8, 240, 0)
      expect(result.monthlySavings).toBeLessThan(0)
    })
  })
})
