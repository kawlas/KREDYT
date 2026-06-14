import { generateAmortizationSchedule } from './loanCalculations'

export interface RefinancingParams {
  originalPrincipal: number
  oldAnnualRate: number
  newAnnualRate: number
  totalMonths: number // original total months
  monthsPaid: number // how many months already paid
  installmentType: 'equal' | 'declining'
  newLoanProvision: number // as decimal (0.02 = 2%)
  transferFees: number // valuation + notary + court + land registry
  earlyRepaymentFeePercent: number // 0-3%, for first 36 months of old loan
}

export interface RefinancingResult {
  remainingBalance: number
  oldMonthlyPayment: number
  newMonthlyPayment: number
  monthlySavings: number
  oldRemainingInterest: number
  newTotalInterest: number
  interestSaved: number
  totalCosts: number // transfer fees + early repayment fee + new provision
  netBenefit: number // interest saved - total costs
  breakevenMonths: number // months until savings > costs
  isWorthIt: boolean
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
  } = params

  const remainingBalance = calculateRemainingBalance(originalPrincipal, oldAnnualRate, totalMonths, monthsPaid, installmentType)
  const remainingMonths = totalMonths - monthsPaid

  const oldSchedule = generateAmortizationSchedule(remainingBalance, oldAnnualRate, remainingMonths, installmentType)
  const oldMonthlyPayment = oldSchedule[0]?.totalPayment || 0
  const oldRemainingInterest = oldSchedule.reduce((sum, row) => sum + row.interestPart, 0)

  const newSchedule = generateAmortizationSchedule(remainingBalance, newAnnualRate, remainingMonths, installmentType)
  const newMonthlyPayment = newSchedule[0]?.totalPayment || 0
  const newTotalInterest = newSchedule.reduce((sum, row) => sum + row.interestPart, 0)

  const monthlySavings = oldMonthlyPayment - newMonthlyPayment
  const interestSaved = oldRemainingInterest - newTotalInterest
  const earlyRepaymentFee = remainingBalance * (earlyRepaymentFeePercent / 100)
  const newProvisionCost = remainingBalance * newLoanProvision
  const totalCosts = transferFees + earlyRepaymentFee + newProvisionCost
  const netBenefit = interestSaved - totalCosts
  const breakevenMonths = monthlySavings > 0 ? Math.ceil(totalCosts / monthlySavings) : 0

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
    isWorthIt: netBenefit > 0 && breakevenMonths < remainingMonths,
  }
}
