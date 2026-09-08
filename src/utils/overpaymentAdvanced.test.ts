import { describe, it, expect } from 'vitest'
import { calculateOverpaymentSchedule } from './overpaymentMath'

describe('calculateOverpaymentSchedule - Zaawansowane realia polskie', () => {
  it('brak prowizji dla zmiennego po 12 miesiącach', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 7.85,
      years: 25,
      lumpSum: 50000,
      monthlyExtra: 500,
      strategy: 'term',
      monthsElapsed: 14,
      rateType: 'variable',
      installmentType: 'equal'
    })

    expect(result.earlyRepaymentFee).toBe(0)
    expect(result.feeReason).toContain('Brak prowizji')
  })

  it('nalicza prowizję 3% dla zmiennego przed 12 miesiącami', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 7.85,
      years: 25,
      lumpSum: 50000,
      monthlyExtra: 0,
      strategy: 'term',
      monthsElapsed: 6,
      rateType: 'variable',
      installmentType: 'equal'
    })

    expect(result.earlyRepaymentFee).toBe(1500)
    expect(result.feeReason).toContain('3%')
  })

  it('nalicza maksymalnie 2% dla stałego w pierwszych 36 miesiącach', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 6.5,
      years: 25,
      lumpSum: 40000,
      monthlyExtra: 0,
      strategy: 'term',
      monthsElapsed: 24,
      rateType: 'fixed',
      installmentType: 'equal'
    })

    expect(result.earlyRepaymentFee).toBe(800) // 2% z 40k
  })

  it('obsługuje raty malejące prawidłowo', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 7.85,
      years: 25,
      lumpSum: 20000,
      monthlyExtra: 0,
      strategy: 'term',
      monthsElapsed: 0,
      rateType: 'variable',
      installmentType: 'declining'
    })

    expect(result.schedule.length).toBeLessThan(300)
    expect(result.interestSaved).toBeGreaterThan(0)
  })
})
