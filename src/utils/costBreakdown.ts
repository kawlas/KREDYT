import { LOAN_CONSTANTS } from '../types/constants'
import type { CostBreakdown } from '../types'

export function calculateCostBreakdown(
  loanAmount: number,
  propertyValue: number,
  totalInterest: number,
  monthlyPayment: number,
  loanTermYears: number
): CostBreakdown {
  const ltv = loanAmount / propertyValue

  // Koszty początkowe
  const provision = loanAmount * LOAN_CONSTANTS.PROVISION_RATE
  const notary = Math.max(
    LOAN_CONSTANTS.COSTS.NOTARY_MIN,
    propertyValue * LOAN_CONSTANTS.COSTS.NOTARY_RATE
  )
  const landRegistry = LOAN_CONSTANTS.COSTS.LAND_REGISTRY
  const valuation = (LOAN_CONSTANTS.COSTS.VALUATION_MIN + LOAN_CONSTANTS.COSTS.VALUATION_MAX) / 2
  const bridgingInsurance = LOAN_CONSTANTS.COSTS.BRIDGING_INSURANCE_MONTHLY * 3

  const upfrontTotal = provision + notary + landRegistry + valuation + bridgingInsurance

  // Koszty roczne
  const homeInsurance = LOAN_CONSTANTS.COSTS.INSURANCE_HOME_YEARLY
  const creditInsurance = ltv > LOAN_CONSTANTS.LTV_THRESHOLDS.GOOD
    ? LOAN_CONSTANTS.COSTS.INSURANCE_CREDIT_YEARLY
    : 0
  const accountFee = 0

  const yearlyTotal = homeInsurance + creditInsurance + accountFee

  // Faktycznie otrzymana kwota
  const actualReceived = loanAmount - provision

  // Total koszt
  const allPayments = monthlyPayment * loanTermYears * 12
  const yearlyCosts25Years = yearlyTotal * loanTermYears
  const grandTotal = allPayments + upfrontTotal + yearlyCosts25Years

  return {
    upfrontCosts: {
      provision,
      notary,
      landRegistry,
      valuation,
      bridgingInsurance,
      total: upfrontTotal
    },
    yearlyCosts: {
      homeInsurance,
      creditInsurance,
      accountFee,
      total: yearlyTotal
    },
    actualAmountReceived: actualReceived,
    totalCost: {
      allPayments,
      principal: loanAmount,
      interest: totalInterest,
      upfrontCosts: upfrontTotal,
      yearlyCosts25Years,
      grandTotal
    }
  }
}
