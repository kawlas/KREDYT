import { describe, it, expect } from 'vitest'
import { calculateAffordability } from './affordabilityFormulas'

describe('calculateAffordability', () => {
  it('oblicza zdolność dla standardowego przypadku (UoP, 10k dochód)', () => {
    const result = calculateAffordability({
      income: 10000,
      employmentType: 'UOP',
      obligations: 0,
      dependents: 0,
      age: 30,
      wibor: 5.85,
      margin: 2.0
    })

    expect(result.effectiveIncome).toBe(10000)
    expect(result.disposableIncome).toBe(4400) // (10000 - 0 - 1200) * 0.5
    expect(result.maxTermMonths).toBe(420) // Math.min(35*12, (70-30)*12) = 420
    expect(result.maxLoanAmount).toBeGreaterThan(500000)
    expect(result.alerts).toHaveLength(0)
  })

  it('uwzględnia korygowanie dochodu dla B2B', () => {
    const result = calculateAffordability({
      income: 10000,
      employmentType: 'B2B',
      obligations: 0,
      dependents: 0,
      age: 30,
      wibor: 5.85,
      margin: 2.0
    })

    expect(result.effectiveIncome).toBe(6000) // 10000 * 0.6
    expect(result.alerts).toContainEqual(expect.objectContaining({ type: 'info' }))
  })

  it('ogranicza okres kredytowania ze względu na wiek', () => {
    const result = calculateAffordability({
      income: 10000,
      employmentType: 'UOP',
      obligations: 0,
      dependents: 0,
      age: 60,
      wibor: 5.85,
      margin: 2.0
    })

    expect(result.maxTermMonths).toBe(120) // (70 - 60) * 12
    expect(result.alerts).toContainEqual(expect.objectContaining({ 
        message: expect.stringContaining('maksymalny okres')
    }))
  })

  it('obsługuje brak zdolności', () => {
    const result = calculateAffordability({
      income: 2000,
      employmentType: 'UOP',
      obligations: 500,
      dependents: 2,
      age: 30,
      wibor: 5.85,
      margin: 2.0
    })

    expect(result.maxLoanAmount).toBe(0)
    expect(result.alerts).toContainEqual(expect.objectContaining({ type: 'warning' }))
  })
})
