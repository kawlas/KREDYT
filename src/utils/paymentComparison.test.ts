import { describe, it, expect } from 'vitest'
import { comparePaymentTypes, calculateDecreasingPayments } from './paymentComparison'

describe('paymentComparison', () => {
  describe('calculateDecreasingPayments', () => {
    it('first payment > last payment', () => {
      const result = calculateDecreasingPayments(400000, 7, 300)
      expect(result.firstPayment).toBeGreaterThan(result.lastPayment)
    })

    it('total interest > 0', () => {
      const result = calculateDecreasingPayments(400000, 7, 300)
      expect(result.totalInterest).toBeGreaterThan(0)
    })

    it('total cost = principal + interest', () => {
      const result = calculateDecreasingPayments(400000, 7, 300)
      expect(result.totalCost).toBeCloseTo(400000 + result.totalInterest, 0)
    })
  })

  describe('comparePaymentTypes', () => {
    it('decreasing has lower total interest than equal', () => {
      const result = comparePaymentTypes(400000, 7, 25)
      expect(result.decreasing.totalInterest).toBeLessThan(result.equal.totalInterest)
    })

    it('decreasing first payment > equal monthly', () => {
      const result = comparePaymentTypes(400000, 7, 25)
      expect(result.decreasing.firstPayment).toBeGreaterThan(result.equal.firstPayment)
    })

    it('decreasing saves money total', () => {
      const result = comparePaymentTypes(400000, 7, 25)
      expect(result.decreasing.totalSavings).toBeGreaterThan(0)
    })

    it('provides a recommendation string', () => {
      const result = comparePaymentTypes(400000, 7, 25)
      expect(result.recommendation.length).toBeGreaterThan(10)
    })
  })
})
