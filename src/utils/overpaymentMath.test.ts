import { describe, it, expect } from 'vitest'
import { calculateOverpaymentSchedule } from './overpaymentMath'

describe('calculateOverpaymentSchedule', () => {
  it('liczy harmonogram poprawnie przy braku nadpłat', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 7.85,
      years: 25,
      lumpSum: 0,
      monthlyExtra: 0,
      strategy: 'term',
      monthsElapsed: 12
    })

    expect(result.originalMonthlyPayment).toBeCloseTo(3047.62, 1)
    expect(result.newMonths).toBe(300)
    expect(result.interestSaved).toBe(0)
  })

  it('uwzględnia jednorazową nadpłatę i skraca okres', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 7.85,
      years: 25,
      lumpSum: 50000,
      monthlyExtra: 0,
      strategy: 'term',
      monthsElapsed: 6
    })

    expect(result.newMonths).toBeLessThan(300)
    expect(result.interestSaved).toBeGreaterThan(0)
  })

  it('nalicza prowizję gdy kredyt ma mniej niż 36 miesięcy', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 7.85,
      years: 25,
      lumpSum: 100000,
      monthlyExtra: 0,
      strategy: 'term',
      monthsElapsed: 12
    })

    expect(result.earlyRepaymentFee).toBe(3000) // 3% ze 100 000
    expect(result.feeReason).toContain('Prowizja 3%')
  })

  it('nie nalicza prowizji gdy kredyt ma ponad 36 miesięcy', () => {
    const result = calculateOverpaymentSchedule({
      principal: 400000,
      annualRate: 7.85,
      years: 25,
      lumpSum: 100000,
      monthlyExtra: 0,
      strategy: 'term',
      monthsElapsed: 40
    })

    expect(result.earlyRepaymentFee).toBe(0)
    expect(result.feeReason).toContain('Brak prowizji')
  })
})
