import { describe, it, expect } from 'vitest'
import { compareBanks, generateBankOffer } from './bankComparison'
import { BANK_PROFILES } from '../data/bankProfiles'

const baseParams = {
  principal: 400000,
  years: 25,
  wibor: 5.85,
  installmentType: 'equal' as const,
  propertyValue: 500000,
}

describe('bankComparison', () => {
  it('compareBanks sorts by allInCost ascending', () => {
    const results = compareBanks(BANK_PROFILES, baseParams)
    expect(results).toHaveLength(BANK_PROFILES.length)

    // Verify ascending order of allInCost
    for (let i = 1; i < results.length; i++) {
      expect(results[i].results.allInCost)
        .toBeGreaterThanOrEqual(results[i - 1].results.allInCost!)
    }
  })

  it('compareBanks works without propertyValue (uses default LTV 80%)', () => {
    // If propertyValue is 0, calculateLoanResults uses principal / 0.8 internally
    const paramsWithoutProp = {
      principal: 400000,
      years: 25,
      wibor: 5.85,
      installmentType: 'equal' as const,
      propertyValue: 0, // This should trigger fallback in calculateLoanResults
    }

    const results = compareBanks(BANK_PROFILES, paramsWithoutProp)
    expect(results).toHaveLength(BANK_PROFILES.length)
    // allInCost should still be defined because breakdown is computed
    results.forEach(r => {
      expect(r.results.allInCost).toBeDefined()
    })
  })

  it('generateBankOffer always sets allInCost', () => {
    const bank = BANK_PROFILES[0]
    const result = generateBankOffer(bank, baseParams)
    expect(result.results.allInCost).toBeGreaterThan(0)
    expect(result.results.monthlyPayment).toBeGreaterThan(0)
    expect(result.results.totalCost).toBeGreaterThan(0)
    expect(result.results.rrso).toBeGreaterThan(0)
  })
})