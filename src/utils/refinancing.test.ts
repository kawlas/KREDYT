import { describe, it, expect } from 'vitest'
import { calculateRemainingBalance, calculateRefinancingAnalysis } from './refinancing'

describe('refinancing', () => {
  describe('calculateRemainingBalance', () => {
    it('returns full principal at month 0', () => {
      const balance = calculateRemainingBalance(400000, 7, 300, 0, 'equal')
      expect(balance).toBeCloseTo(400000, 0)
    })

    it('returns less than principal after some payments', () => {
      const balance5y = calculateRemainingBalance(400000, 7, 300, 60, 'equal')
      expect(balance5y).toBeLessThan(400000)
      expect(balance5y).toBeGreaterThan(300000)
    })

    it('returns 0 after full term', () => {
      const balance = calculateRemainingBalance(400000, 7, 300, 300, 'equal')
      expect(balance).toBeCloseTo(0, 0)
    })

    it('returns correct balance after 1 payment with 0% rate (equal)', () => {
      const balance = calculateRemainingBalance(120000, 0, 12, 1, 'equal')
      expect(balance).toBeCloseTo(110000, 0)
    })

    it('returns correct balance after 6 payments with 0% rate (equal)', () => {
      const balance = calculateRemainingBalance(120000, 0, 12, 6, 'equal')
      expect(balance).toBeCloseTo(60000, 0)
    })

    it('returns correct balance after 1 payment with 0% rate (declining)', () => {
      const balance = calculateRemainingBalance(120000, 0, 12, 1, 'declining')
      expect(balance).toBeCloseTo(110000, 0)
    })

    it('returns correct balance after 1 payment with non-zero rate (equal)', () => {
      const monthlyPayment = (100000 * (0.01 * Math.pow(1.01, 12))) / (Math.pow(1.01, 12) - 1)
      const interestMonth1 = 100000 * 0.01
      const principalMonth1 = monthlyPayment - interestMonth1
      const expectedAfter1 = 100000 - principalMonth1
      const balance = calculateRemainingBalance(100000, 12, 12, 1, 'equal')
      expect(balance).toBeCloseTo(expectedAfter1, 0)
    })
  })

  describe('calculateRefinancingAnalysis', () => {
    const baseRefi = {
      originalPrincipal: 400000,
      oldAnnualRate: 7.85,
      newAnnualRate: 6.85,
      totalMonths: 300,
      monthsPaid: 36,
      installmentType: 'equal' as const,
      newLoanProvision: 0.0,
      transferFees: 3000,
      earlyRepaymentFeePercent: 0,
    }

    it('shows positive monthly savings with better rate', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.monthlySavings).toBeGreaterThan(0)
      expect(result.interestSaved).toBeGreaterThan(0)
    })

    it('computes remaining balance correctly', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.remainingBalance).toBeGreaterThan(300000)
      expect(result.remainingBalance).toBeLessThan(400000)
    })

    it('correctly includes transfer fees in total costs', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.totalCosts).toBeGreaterThanOrEqual(3000)
    })

    it('breakeven is within remaining months for good refi', () => {
      const result = calculateRefinancingAnalysis({ ...baseRefi, oldAnnualRate: 9, newAnnualRate: 6 })
      expect(result.breakevenMonths).toBeLessThan(264)
      expect(result.isWorthIt).toBe(true)
    })

    it('includes accrued interest in total costs with default settlement days', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.accruedInterest).toBeGreaterThan(0)
      expect(result.detailedCosts.accruedInterest).toBeGreaterThan(0)
    })

    it('accrued interest increases with more days between payments', () => {
      const resultLow = calculateRefinancingAnalysis({ ...baseRefi, settlementDay: 5, lastPaymentDay: 1 })
      const resultHigh = calculateRefinancingAnalysis({ ...baseRefi, settlementDay: 28, lastPaymentDay: 1 })
      expect(resultHigh.accruedInterest).toBeGreaterThan(resultLow.accruedInterest)
    })

    it('accrued interest is zero when settlement and last payment on same day', () => {
      const result = calculateRefinancingAnalysis({ ...baseRefi, settlementDay: 1, lastPaymentDay: 1 })
      expect(result.accruedInterest).toBeCloseTo(0, 0)
    })

    it('capitalized costs increase new principal when capitalizeCosts is true', () => {
      const result = calculateRefinancingAnalysis({ ...baseRefi, capitalizeCosts: true })
      expect(result.newPrincipal).toBeGreaterThan(result.remainingBalance)
      expect(result.capitalizedCosts).toBeGreaterThan(0)
      expect(result.detailedCosts.totalCapitalized).toBeGreaterThan(0)
      expect(result.detailedCosts.totalPaidUpfront).toBe(0)
    })

    it('no capitalize keeps principal unchanged and pays upfront', () => {
      const result = calculateRefinancingAnalysis({ ...baseRefi, capitalizeCosts: false })
      expect(result.newPrincipal).toBe(result.remainingBalance)
      expect(result.capitalizedCosts).toBe(0)
      expect(result.detailedCosts.totalPaidUpfront).toBe(result.totalCosts)
    })

    it('capitalized provision is correctly computed on total new amount', () => {
      const resultWithProvision = calculateRefinancingAnalysis({
        ...baseRefi,
        newLoanProvision: 0.02,
        capitalizeCosts: true,
      })
      const resultWithoutProvision = calculateRefinancingAnalysis({
        ...baseRefi,
        newLoanProvision: 0,
        capitalizeCosts: true,
      })
      expect(resultWithProvision.newProvisionCost).toBeGreaterThan(0)
      expect(resultWithProvision.newPrincipal).toBeGreaterThan(resultWithoutProvision.newPrincipal)
    })

    it('provision is correctly calculated on remaining balance when not capitalizing', () => {
      const result = calculateRefinancingAnalysis({
        ...baseRefi,
        newLoanProvision: 0.02,
        capitalizeCosts: false,
      })
      expect(result.newProvisionCost).toBeCloseTo(result.remainingBalance * 0.02, 0)
    })

    it('bridging insurance is included when bridgingInsuranceMonths > 0', () => {
      const result = calculateRefinancingAnalysis({ ...baseRefi, bridgingInsuranceMonths: 3 })
      expect(result.bridgingInsurance).toBeGreaterThan(0)
      expect(result.detailedCosts.bridgingInsurance).toBeGreaterThan(0)
    })

    it('new term changes monthly payment with same rate', () => {
      const remainingMonths = baseRefi.totalMonths - baseRefi.monthsPaid
      const resultSameTerm = calculateRefinancingAnalysis(baseRefi)
      const resultExtended = calculateRefinancingAnalysis({
        ...baseRefi,
        newTermMonths: remainingMonths + 60,
      })
      expect(resultExtended.newMonthlyPayment).toBeLessThan(resultSameTerm.newMonthlyPayment)
      expect(resultExtended.newTotalInterest).toBeGreaterThan(resultSameTerm.newTotalInterest)
    })

    it('new term does not affect calculation when set to 0', () => {
      const resultDefault = calculateRefinancingAnalysis(baseRefi)
      const resultWithZeroTerm = calculateRefinancingAnalysis({ ...baseRefi, newTermMonths: 0 })
      expect(resultWithZeroTerm.newMonthlyPayment).toBe(resultDefault.newMonthlyPayment)
      expect(resultWithZeroTerm.newTotalInterest).toBe(resultDefault.newTotalInterest)
    })

    it('refinancing is not worth it when costs exceed savings', () => {
      const result = calculateRefinancingAnalysis({
        ...baseRefi,
        transferFees: 100000,
        oldAnnualRate: 7.0,
        newAnnualRate: 6.9,
      })
      expect(result.isWorthIt).toBe(false)
      expect(result.netBenefit).toBeLessThan(0)
    })

    it('returns correct newPrincipal and detailedCosts shape', () => {
      const result = calculateRefinancingAnalysis(baseRefi)
      expect(result.newPrincipal).toBeDefined()
      expect(result.capitalizedCosts).toBeDefined()
      expect(result.accruedInterest).toBeDefined()
      expect(result.bridgingInsurance).toBeDefined()
      expect(result.newProvisionCost).toBeDefined()
      expect(result.detailedCosts).toBeDefined()
      expect(result.detailedCosts.transferFees).toBe(baseRefi.transferFees)
      expect(result.detailedCosts.earlyRepaymentFee).toBe(0)
      expect(result.detailedCosts.totalPaidUpfront + result.detailedCosts.totalCapitalized).toBeCloseTo(result.totalCosts, 0)
    })
  })
})
