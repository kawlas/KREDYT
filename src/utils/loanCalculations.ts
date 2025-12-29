import type { LoanFormData, LoanResults } from '../types'

/**
 * Calculates the monthly payment for a mortgage.
 */
export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number, // wibor + margin
  months: number,
  installmentType: 'equal' | 'declining'
): number => {
  if (principal < 0 || months < 0 || annualRate < 0) {
    throw new Error('Negative values are not allowed')
  }

  if (months === 0) return 0
  if (principal === 0) return 0

  const monthlyRate = annualRate / 12 / 100

  if (installmentType === 'equal') {
    if (monthlyRate === 0) {
      return principal / months
    }
    const payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1)
    return payment
  } else {
    // For declining installments, this returns the FIRST (highest) payment
    const principalPart = principal / months
    const firstInterest = principal * monthlyRate
    return principalPart + firstInterest
  }
}

interface AmortizationRow {
  month: number
  principalPart: number
  interestPart: number
  totalPayment: number
  remainingBalance: number
}

/**
 * Generates a full amortization schedule.
 */
// Internal helper - UI for schedule is post-MVP
const generateAmortizationSchedule = (
  principal: number,
  annualRate: number,
  months: number,
  installmentType: 'equal' | 'declining'
): AmortizationRow[] => {
  if (principal < 0 || months < 0 || annualRate < 0) {
    throw new Error('Negative values are not allowed')
  }

  const schedule: AmortizationRow[] = []
  let currentBalance = principal
  const monthlyRate = annualRate / 12 / 100
  const principalPartFixed = principal / months // For declining

  // For equal installments, we calculate the fixed total payment once
  const equalMonthlyPayment =
    installmentType === 'equal'
      ? calculateMonthlyPayment(principal, annualRate, months, 'equal')
      : 0

  for (let i = 1; i <= months; i++) {
    const interestPart = currentBalance * monthlyRate
    let principalPart = 0
    let totalPayment = 0

    if (installmentType === 'equal') {
      totalPayment = equalMonthlyPayment
      // Last month adjustment to potentially zero out balance perfectly
      if (i === months) {
         totalPayment = currentBalance + interestPart
         principalPart = currentBalance
      } else {
         principalPart = totalPayment - interestPart
      }
    } else {
      principalPart = principalPartFixed
      // Last month adjustment
      if (i === months && Math.abs(currentBalance - principalPart) > 0.01) {
         principalPart = currentBalance
      }
      totalPayment = principalPart + interestPart
    }

    currentBalance -= principalPart
    if (currentBalance < 0) currentBalance = 0

    schedule.push({
      month: i,
      principalPart,
      interestPart,
      totalPayment,
      remainingBalance: currentBalance,
    })
  }

  return schedule
}

/**
 * Calculates total cost of the loan including interest and fees.
 */
export const calculateTotalCost = (
  principal: number,
  annualRate: number,
  months: number,
  installmentType: 'equal' | 'declining',
  fees: number = 0
): number => {
  const schedule = generateAmortizationSchedule(principal, annualRate, months, installmentType)
  const totalPayments = schedule.reduce((sum, row) => sum + row.totalPayment, 0)
  return totalPayments + fees
}

/**
 * Calculates RRSO (Real Annual Percentage Rate) using binary search to find IRR.
 * Assumes the total cost is paid in equal monthly installments for the estimation.
 * Formula: Sum(Payment / (1+r)^i) = Principal
 * RRSO = ((1+r)^12 - 1) * 100
 */
export const calculateRRSO = (
  principal: number,
  totalCost: number,
  months: number
): number => {
  if (principal <= 0 || totalCost <= 0 || months <= 0) return 0
  if (totalCost <= principal) return 0

  const avgMonthlyPayment = totalCost / months
  
  // Binary search for monthly rate 'r'
  let low = 0
  let high = 1 // 100% monthly rate is a safe upper bound
  let guess = 0.05 / 12
  const epsilon = 0.000001 // Precision
  
  for (let i = 0; i < 50; i++) { // Max iterations
    guess = (low + high) / 2
    
    // Calculate Present Value of payments at this rate
    // PV = Payment * (1 - (1+r)^-n) / r
    let pv = 0
    if (guess === 0) {
      pv = avgMonthlyPayment * months
    } else {
      pv = avgMonthlyPayment * ((1 - Math.pow(1 + guess, -months)) / guess)
    }
    
    if (Math.abs(pv - principal) < epsilon) {
      break
    }
    
    if (pv > principal) {
      // Rate is too low (Present Value is too high)
      low = guess
    } else {
      // Rate is too high
      high = guess
    }
  }
  
  const r = guess
  // Annualize: ((1+r)^12 - 1) * 100
  return (Math.pow(1 + r, 12) - 1) * 100
}

export interface RefinancingResult {
    monthlySavings: number
    totalSavings: number
    breakevenMonths: number
}

/**
 * Calculates potential savings from refinancing.
 * Assumes equal installments for basic comparison.
 */
export const calculateRefinancingCost = (
    currentBalance: number,
    oldAnnualRate: number,
    newAnnualRate: number,
    remainingMonths: number,
    transferFees: number = 0
): RefinancingResult => {
    const oldMonthlyPayment = calculateMonthlyPayment(currentBalance, oldAnnualRate, remainingMonths, 'equal')
    const newMonthlyPayment = calculateMonthlyPayment(currentBalance, newAnnualRate, remainingMonths, 'equal')
    
    const monthlySavings = oldMonthlyPayment - newMonthlyPayment
    const totalOldCost = oldMonthlyPayment * remainingMonths
    const totalNewCost = (newMonthlyPayment * remainingMonths) + transferFees
    
    const totalSavings = totalOldCost - totalNewCost
    const breakevenMonths = monthlySavings > 0 ? transferFees / monthlySavings : 0

    return {
        monthlySavings,
        totalSavings,
        breakevenMonths
    }
}

/**
 * Main wrapper function used by the UI components.
 * Maintains backward compatibility with LoanFormData using the new core functions.
 */
export const calculateLoanResults = (data: LoanFormData): LoanResults => {
  const { principal, years, wibor, margin, installmentType, commission = 0 } = data
  const months = years * 12
  const annualRate = wibor + margin

  // 1. Monthly Payment
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months, installmentType)

  // 2. Total Cost & Interest
  // We use the schedule calculator for accuracy especially with declining installments
  const totalCostIncludingCommission = calculateTotalCost(principal, annualRate, months, installmentType, commission)
  const totalInterest = totalCostIncludingCommission - principal - commission

  // 3. RRSO
  const rrso = calculateRRSO(principal, totalCostIncludingCommission, months)

  return {
    monthlyPayment,
    totalCost: totalCostIncludingCommission,
    totalInterest,
    rrso
  }
}

/**
 * Calculates total interest (Total Cost - Principal - Commission)
 */
export const calculateTotalInterest = (
  totalCost: number,
  principal: number,
  commission: number = 0
): number => {
  return totalCost - principal - commission
}
