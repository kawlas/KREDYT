import { describe, it, expect } from 'vitest'
import {
  calculateFixedScenario,
  calculateVariableScenario,
  compareFixedVsVariable,
} from './fixedVsVariable'

describe('calculateFixedScenario', () => {
  it('calculates fixed period correctly for 5 years', () => {
    const result = calculateFixedScenario(400000, 7.5, 25, 5)
    expect(result.fixedPeriodMonths).toBe(60)
    expect(result.monthlyPayment).toBeGreaterThan(0)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('returns longer term for fixed period > total loan term', () => {
    const result = calculateFixedScenario(400000, 7.5, 25, 30)
    expect(result.fixedPeriodMonths).toBe(300)
  })

  it('returns zero payment for zero principal', () => {
    const result = calculateFixedScenario(0, 7.5, 25, 5)
    expect(result.monthlyPayment).toBe(0)
  })
})

describe('calculateVariableScenario', () => {
  it('calculates variable scenario correctly', () => {
    const result = calculateVariableScenario(400000, 7.0, 25)
    expect(result.monthlyPayment).toBeGreaterThan(0)
    expect(result.totalInterest).toBeGreaterThan(0)
  })

  it('returns the same as standard annuity calculation', () => {
    const result = calculateVariableScenario(400000, 7.0, 25)
    const monthlyRate = 7.0 / 100 / 12
    const months = 25 * 12
    const expectedPayment = 400000 * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    expect(result.monthlyPayment).toBeCloseTo(expectedPayment, 0)
  })
})

describe('compareFixedVsVariable', () => {
  it('compares both scenarios', () => {
    const result = compareFixedVsVariable(400000, 7.0, 7.5, 25, 5)
    expect(result.fixed.monthlyPayment).toBeGreaterThan(0)
    expect(result.variable.monthlyPayment).toBeGreaterThan(0)
    expect(result.difference.monthly).not.toBeNaN()
  })

  it('shows higher payment for higher rate', () => {
    const result = compareFixedVsVariable(400000, 6.5, 7.5, 25, 5)
    expect(result.fixed.monthlyPayment).toBeGreaterThan(result.variable.monthlyPayment)
  })

  it('provides recommendation text', () => {
    const result = compareFixedVsVariable(400000, 6.5, 7.5, 25, 5)
    expect(result.recommendation).toBeTruthy()
    expect(typeof result.recommendation).toBe('string')
  })

  it('calculates breakeven rate', () => {
    const result = compareFixedVsVariable(400000, 7.0, 7.5, 25, 5)
    expect(result.breakevenRate).toBeGreaterThan(0)
  })
})
