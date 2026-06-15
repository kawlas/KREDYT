import { generateAmortizationSchedule } from './loanCalculations'
import { LOAN_CONSTANTS } from '../types/constants'

export interface RefinancingParams {
  originalPrincipal: number
  oldAnnualRate: number
  newAnnualRate: number
  totalMonths: number
  monthsPaid: number
  installmentType: 'equal' | 'declining'
  newLoanProvision: number
  transferFees: number
  earlyRepaymentFeePercent: number
  settlementDay?: number
  lastPaymentDay?: number
  capitalizeCosts?: boolean
  bridgingInsuranceMonths?: number
  newTermMonths?: number
}

export interface DetailedCosts {
  transferFees: number
  earlyRepaymentFee: number
  newProvision: number
  bridgingInsurance: number
  accruedInterest: number
  totalPaidUpfront: number
  totalCapitalized: number
}

export interface RefinancingResult {
  remainingBalance: number
  oldMonthlyPayment: number
  newMonthlyPayment: number
  monthlySavings: number
  oldRemainingInterest: number
  newTotalInterest: number
  interestSaved: number
  totalCosts: number
  netBenefit: number
  breakevenMonths: number
  isWorthIt: boolean
  newPrincipal: number
  capitalizedCosts: number
  accruedInterest: number
  bridgingInsurance: number
  newProvisionCost: number
  detailedCosts: DetailedCosts
}

export function calculateRemainingBalance(
  principal: number,
  annualRate: number,
  totalMonths: number,
  monthsPaid: number,
  installmentType: 'equal' | 'declining'
): number {
  if (monthsPaid <= 0) return principal
  if (monthsPaid >= totalMonths) return 0

  const schedule = generateAmortizationSchedule(principal, annualRate, totalMonths, installmentType)
  const idx = Math.min(monthsPaid, schedule.length - 1)
  return schedule[idx].remainingBalance + schedule[idx].principalPart
}

export function calculateRefinancingAnalysis(params: RefinancingParams): RefinancingResult {
  const {
    originalPrincipal,
    oldAnnualRate,
    newAnnualRate,
    totalMonths,
    monthsPaid,
    installmentType,
    newLoanProvision,
    transferFees,
    earlyRepaymentFeePercent,
    settlementDay = 15,
    lastPaymentDay = 1,
    capitalizeCosts = false,
    bridgingInsuranceMonths = 0,
    newTermMonths = 0,
  } = params

  const remainingBalance = calculateRemainingBalance(originalPrincipal, oldAnnualRate, totalMonths, monthsPaid, installmentType)
  const remainingMonths = totalMonths - monthsPaid
  const effectiveTerm = newTermMonths > 0 ? newTermMonths : remainingMonths

  const oldSchedule = generateAmortizationSchedule(remainingBalance, oldAnnualRate, remainingMonths, installmentType)
  const oldMonthlyPayment = oldSchedule[0]?.totalPayment || 0
  const oldRemainingInterest = oldSchedule.reduce((sum, row) => sum + row.interestPart, 0)

  const daysSinceLastPayment = settlementDay >= lastPaymentDay
    ? settlementDay - lastPaymentDay
    : 30 + settlementDay - lastPaymentDay

  const accruedInterest = remainingBalance * (oldAnnualRate / 100 / 365) * daysSinceLastPayment

  const bridgingInsurance = LOAN_CONSTANTS.COSTS.BRIDGING_INSURANCE_MONTHLY * Math.max(0, bridgingInsuranceMonths)

  const earlyRepaymentFee = remainingBalance * (earlyRepaymentFeePercent / 100)

  let newProvisionCost: number
  let newPrincipal: number
  let capitalizedCosts: number
  let totalCosts: number
  let upfrontCostsValue: number
  let capitalizedValue: number

  if (capitalizeCosts) {
    const costsBeforeProvision = transferFees + earlyRepaymentFee + bridgingInsurance + accruedInterest
    const baseAmount = remainingBalance + costsBeforeProvision
    newPrincipal = newLoanProvision > 0
      ? baseAmount / (1 - newLoanProvision)
      : baseAmount
    newProvisionCost = newPrincipal - remainingBalance - costsBeforeProvision
    capitalizedCosts = newPrincipal - remainingBalance
    totalCosts = capitalizedCosts
    upfrontCostsValue = 0
    capitalizedValue = capitalizedCosts
  } else {
    newPrincipal = remainingBalance
    newProvisionCost = remainingBalance * newLoanProvision
    capitalizedCosts = 0
    totalCosts = transferFees + earlyRepaymentFee + newProvisionCost + bridgingInsurance + accruedInterest
    upfrontCostsValue = totalCosts
    capitalizedValue = 0
  }

  const newSchedule = generateAmortizationSchedule(newPrincipal, newAnnualRate, effectiveTerm, installmentType)
  const newMonthlyPayment = newSchedule[0]?.totalPayment || 0
  const newTotalInterest = newSchedule.reduce((sum, row) => sum + row.interestPart, 0)

  const monthlySavings = oldMonthlyPayment - newMonthlyPayment
  const interestSaved = oldRemainingInterest - newTotalInterest
  const netBenefit = interestSaved - totalCosts
  const breakevenMonths = monthlySavings > 0 ? Math.ceil(totalCosts / monthlySavings) : Infinity

  return {
    remainingBalance,
    oldMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    oldRemainingInterest,
    newTotalInterest,
    interestSaved,
    totalCosts,
    netBenefit,
    breakevenMonths,
    isWorthIt: netBenefit > 0 && breakevenMonths !== Infinity && breakevenMonths < effectiveTerm,
    newPrincipal,
    capitalizedCosts,
    accruedInterest,
    bridgingInsurance,
    newProvisionCost,
    detailedCosts: {
      transferFees,
      earlyRepaymentFee,
      newProvision: newProvisionCost,
      bridgingInsurance,
      accruedInterest,
      totalPaidUpfront: upfrontCostsValue,
      totalCapitalized: capitalizedValue,
    },
  }
}
