import { describe, it, expect } from 'vitest'
import { calculateInsuranceCosts, formatInsuranceSummary } from './insuranceCalc'
import type { InsuranceInput } from './insuranceCalc'

const baseInput: InsuranceInput = {
  principal: 400000,
  propertyValue: 500000,
  loanTermYears: 25,
  insuranceLifeMonthly: 50,
  insuranceBridgeOnce: 500,
  insuranceUnemploymentMonthly: 40,
  hasLifeInsurance: true,
  hasBridgeInsurance: true,
  hasUnemploymentInsurance: true,
  ownLifeInsuranceCheaperByPercent: 30,
}

describe('insuranceCalc', () => {
  it('oblicza UNWW gdy LTV > 80%', () => {
    const input = { ...baseInput, propertyValue: 450000 } // LTV = 88.9%
    const result = calculateInsuranceCosts(input)
    expect(result.unwwRequired).toBe(true)
    expect(result.unwwPercent).toBeGreaterThan(0)
    expect(result.unwwAmount).toBeGreaterThan(0)
  })

  it('nie wymaga UNWW gdy LTV <= 80%', () => {
    const input = { ...baseInput, propertyValue: 550000 } // LTV = 72.7%
    const result = calculateInsuranceCosts(input)
    expect(result.unwwRequired).toBe(false)
    expect(result.unwwAmount).toBe(0)
  })

  it('oblicza koszt ubezpieczenia na życie', () => {
    const result = calculateInsuranceCosts(baseInput)
    expect(result.lifeMonthly).toBe(50)
    expect(result.lifeTotal).toBe(50 * 12 * 25) // 50 zł × 300 miesięcy
  })

  it('gdy brak ubezpieczenia życia, koszt = 0', () => {
    const input = { ...baseInput, hasLifeInsurance: false, insuranceLifeMonthly: 0 }
    const result = calculateInsuranceCosts(input)
    expect(result.lifeMonthly).toBe(0)
    expect(result.lifeTotal).toBe(0)
  })

  it('oblicza oszczędność przy własnej polisie', () => {
    const result = calculateInsuranceCosts(baseInput)
    // lifeTotal = 50 * 300 = 15,000, savings = 30% of that = 4,500
    expect(result.lifeSavingsOwn).toBe(4500)
  })

  it('oblicza koszt pomostowy', () => {
    const result = calculateInsuranceCosts(baseInput)
    expect(result.bridgeOnce).toBe(500)
  })

  it('oblicza koszt utraty pracy', () => {
    const result = calculateInsuranceCosts(baseInput)
    expect(result.unemploymentMonthly).toBe(40)
    expect(result.unemploymentTotal).toBe(40 * 12 * 25)
  })

  it('liczy całkowity koszt upfront i monthly', () => {
    const result = calculateInsuranceCosts(baseInput)
    // totalUpfront = unww (0 since LTV=80%) + bridge (500)
    expect(result.totalUpfront).toBe(500)
    expect(result.totalMonthly).toBe(50 + 40) // życie + utrata pracy
  })

  it('formatuje podsumowanie', () => {
    const result = calculateInsuranceCosts(baseInput)
    const summary = formatInsuranceSummary(result)
    expect(summary).toContain('Razem')
    expect(summary).toContain('zł')
  })

  it('UNWW z LTV 90% liczy poprawnie', () => {
    const input = { ...baseInput, propertyValue: 444444 } // LTV ~90%
    const result = calculateInsuranceCosts(input)
    expect(result.unwwRequired).toBe(true)
    expect(result.unwwPercent).toBeCloseTo(10, 0)
    // excessAmount = 400k * 10% = 40k, unwwAmount = 40k * 3.5% = 1,400
    expect(result.unwwAmount).toBeCloseTo(1400, -2)
  })

  it('bez żadnych ubezpieczeń — wszystkie koszty = 0', () => {
    const input: InsuranceInput = {
      principal: 400000,
      propertyValue: 300000, // LTV > 80%, so UNWW is required
      loanTermYears: 25,
      insuranceLifeMonthly: 0,
      insuranceBridgeOnce: 0,
      insuranceUnemploymentMonthly: 0,
      hasLifeInsurance: false,
      hasBridgeInsurance: false,
      hasUnemploymentInsurance: false,
      ownLifeInsuranceCheaperByPercent: 0,
    }
    const result = calculateInsuranceCosts(input)
    expect(result.lifeMonthly).toBe(0)
    expect(result.bridgeOnce).toBe(0)
    expect(result.unemploymentMonthly).toBe(0)
    expect(result.totalUpfront).toBeGreaterThan(0) // UNWW still applies
  })
})