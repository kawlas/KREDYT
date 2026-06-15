import { describe, it, expect } from 'vitest'
import { calculateLTV, calculateEquity, getLTVRiskBand } from './ltvCalculations'

describe('calculateLTV', () => {
  it('calculates LTV correctly', () => {
    expect(calculateLTV(400000, 500000)).toBe(80)
  })
  it('returns 0 for zero property value', () => {
    expect(calculateLTV(400000, 0)).toBe(0)
  })
  it('handles 100% LTV', () => {
    expect(calculateLTV(500000, 500000)).toBe(100)
  })
})

describe('calculateEquity', () => {
  it('calculates equity correctly', () => {
    expect(calculateEquity(400000, 500000)).toBe(100000)
  })
  it('returns 0 when loan equals property value', () => {
    expect(calculateEquity(500000, 500000)).toBe(0)
  })
})

describe('getLTVRiskBand', () => {
  it('returns GREEN for LTV <= 60', () => {
    expect(getLTVRiskBand(50).band).toBe('GREEN')
  })
  it('returns YELLOW for LTV 60-80', () => {
    expect(getLTVRiskBand(70).band).toBe('YELLOW')
  })
  it('returns ORANGE for LTV 80-90', () => {
    expect(getLTVRiskBand(85).band).toBe('ORANGE')
  })
  it('returns RED for LTV > 90', () => {
    expect(getLTVRiskBand(95).band).toBe('RED')
  })
  it('returns GREEN description for low LTV', () => {
    const result = getLTVRiskBand(50)
    expect(result.description).toContain('niskie')
  })
  it('returns ORANGE description mentioning insurance for LTV > 80', () => {
    const result = getLTVRiskBand(85)
    expect(result.description).toContain('ubezpieczenia')
  })
})
