import { describe, it, expect } from 'vitest'
import { calculateCostBreakdown } from './costBreakdown'

describe('costBreakdown', () => {
  it('calculates breakdown for standard mortgage (LTV 80%)', () => {
    const result = calculateCostBreakdown(400000, 500000, 250000, 25)

    expect(result.upfrontCosts.provision).toBeCloseTo(8000, 0)
    expect(result.upfrontCosts.notary).toBeGreaterThan(1000)
    expect(result.upfrontCosts.total).toBeGreaterThan(0)
    expect(result.actualAmountReceived).toBe(400000 - result.upfrontCosts.provision)

    // LTV = 80%, no credit insurance (<= 80%)
    expect(result.yearlyCosts.creditInsurance).toBe(0)
    expect(result.totalCost.grandTotal).toBeGreaterThan(result.totalCost.allPayments)
    expect(result.totalCost.principal).toBe(400000)
  })

  it('triggers credit insurance when LTV > 80%', () => {
    const result = calculateCostBreakdown(450000, 500000, 280000, 25)

    expect(result.yearlyCosts.creditInsurance).toBe(600)
    expect(result.yearlyCosts.total).toBeGreaterThan(800) // home + credit insurance
  })

  it('calculates notary based on property value', () => {
    const cheapHome = calculateCostBreakdown(160000, 200000, 100000, 900)
    const expensiveHome = calculateCostBreakdown(800000, 1000000, 500000, 4300)

    expect(cheapHome.upfrontCosts.notary).toBe(1000) // minimum
    expect(expensiveHome.upfrontCosts.notary).toBeCloseTo(3000, -2) // 0.3% of 1M
  })

  it('total cost grandTotal includes all components', () => {
    const result = calculateCostBreakdown(400000, 500000, 250000, 25)

    expect(result.totalCost.grandTotal).toBe(
      result.totalCost.allPayments +
      result.totalCost.upfrontCosts +
      result.totalCost.yearlyCostsOverTerm
    )
  })
})
