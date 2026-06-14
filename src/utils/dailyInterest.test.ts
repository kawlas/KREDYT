import { describe, it, expect } from 'vitest'
import {
  calculateDailyInterest,
  calculateDailyInterestAct360,
  compare365vs360,
  calculateAccumulatedInterest,
} from './dailyInterest'

describe('dailyInterest', () => {
  describe('calculateDailyInterest', () => {
    it('calculates daily interest correctly', () => {
      // 400k at 7% = 28,000/year = ~76.71/day
      const result = calculateDailyInterest(400000, 7, 1)
      expect(result.dailyInterest).toBeCloseTo(76.71, 1)
      expect(result.convention).toBe('act/365')
    })

    it('scales with daysInPeriod', () => {
      const day1 = calculateDailyInterest(400000, 7, 1)
      const day30 = calculateDailyInterest(400000, 7, 30)
      expect(day30.dailyInterest).toBeCloseTo(day1.dailyInterest * 30, 0)
    })

    it('returns 0 for 0 principal', () => {
      const result = calculateDailyInterest(0, 7, 30)
      expect(result.dailyInterest).toBe(0)
    })

    it('returns 0 for 0 rate', () => {
      const result = calculateDailyInterest(400000, 0, 30)
      expect(result.dailyInterest).toBe(0)
    })
  })

  describe('calculateDailyInterestAct360', () => {
    it('act/360 > act/365 (denominator is smaller)', () => {
      const act365 = calculateDailyInterest(400000, 7, 30)
      const act360 = calculateDailyInterestAct360(400000, 7, 30)
      expect(act360.dailyInterest).toBeGreaterThan(act365.dailyInterest)
    })
  })

  describe('compare365vs360', () => {
    it('shows ~1.39% difference', () => {
      const result = compare365vs360(400000, 7, 30)
      // 365/360 - 1 ≈ 1.39%
      expect(result.differencePercent).toBeCloseTo(1.389, 1)
      expect(result.difference).toBeGreaterThan(0)
    })
  })

  describe('calculateAccumulatedInterest', () => {
    it('calculates accrued interest since last payment', () => {
      const lastPayment = new Date()
      lastPayment.setDate(lastPayment.getDate() - 15) // 15 days ago

      const result = calculateAccumulatedInterest(400000, 7, lastPayment)
      expect(result.daysSinceLastPayment).toBe(15)
      expect(result.accruedInterest).toBeGreaterThan(0)

      // Daily: 400000 * 0.07 / 365 ≈ 76.71
      // 15 days: ≈ 1150.68
      expect(result.accruedInterest).toBeCloseTo(1150.68, 0)
    })

    it('returns 0 for today as last payment', () => {
      const result = calculateAccumulatedInterest(400000, 7, new Date())
      expect(result.daysSinceLastPayment).toBe(0)
      expect(result.accruedInterest).toBe(0)
    })
  })
})
