import { LOAN_CONSTANTS } from '../types/constants'
import type { CostBreakdown } from '../types'

export const calculateCostBreakdown = (
  loanAmount: number,
  propertyValue: number,
  totalInterest: number,
  loanTermYears: number,
  commission: number = 0
): CostBreakdown => {
  const upfrontCosts = {
    commission,
    notary: LOAN_CONSTANTS.NOTARY_FEE_BASE, // Uproszczone
    valuation: LOAN_CONSTANTS.VALUATION_FEE_BASE,
    landRegister: LOAN_CONSTANTS.LAND_REGISTER_FEE,
    total: 0
  }
  upfrontCosts.total = upfrontCosts.commission + upfrontCosts.notary + upfrontCosts.valuation + upfrontCosts.landRegister

  const monthlyBridgeInsurance = (loanAmount * LOAN_CONSTANTS.BRIDGE_INSURANCE_RATE) / 12
  const monthlyPropertyInsurance = (propertyValue * LOAN_CONSTANTS.PROPERTY_INSURANCE_RATE) / 12
  
  const ongoingCosts = {
    monthlyBridgeInsurance,
    monthlyPropertyInsurance,
    totalMonthlyExtra: monthlyBridgeInsurance + monthlyPropertyInsurance
  }

  // Całkowity koszt ubezpieczeń przez cały okres
  // Bridge insurance płacimy tylko przez kilka miesięcy na początku
  const totalBridgeInsurance = monthlyBridgeInsurance * LOAN_CONSTANTS.BRIDGE_INSURANCE_MONTHS
  const totalPropertyInsurance = monthlyPropertyInsurance * loanTermYears * 12
  
  const totalLoanCost = loanAmount + totalInterest + upfrontCosts.total + totalBridgeInsurance + totalPropertyInsurance

  return {
    upfrontCosts,
    ongoingCosts,
    totalInterest,
    totalLoanCost
  }
}
