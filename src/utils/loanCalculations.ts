import type { LoanFormData, LoanResults } from '../types'
import { calculateCostBreakdown } from './costBreakdown'


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
  if (annualRate > 100) {
    throw new Error('Annual rate exceeds 100% — please check WIBOR and margin values')
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

export interface AmortizationRow {
  month: number
  principalPart: number
  interestPart: number
  totalPayment: number
  remainingBalance: number
}

/**
 * Generates a full amortization schedule.
 */
export const generateAmortizationSchedule = (
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
 * Calculates RRSO (Rzeczywista Roczna Stopa Oprocentowania) using binary search
 * on the actual amortization schedule cash flows.
 *
 * Cash flows:
 *   t=0: -(principal - commission)  [net amount received]
 *   t=1..months: +monthlyPayment_t  [installment payments]
 *   t=12,24,...: +yearlyCosts       [yearly insurance etc.]
 *
 * Finds the monthly rate r such that NPV = 0, then annualizes: ((1+r)^12 - 1) * 100
 */
export const calculateRRSO = (
  principal: number,
  annualRate: number,
  months: number,
  installmentType: 'equal' | 'declining',
  commission: number = 0,
  upfrontCostsExclCommission: number = 0,
  yearlyCosts: number = 0
): number => {
  if (principal <= 0 || months <= 0) return 0

  const schedule = generateAmortizationSchedule(principal, annualRate, months, installmentType)
  const netReceived = principal - commission - upfrontCostsExclCommission
  if (netReceived <= 0) return 0

  let low = -0.01
  let high = 0.15
  const epsilon = 1e-8

  for (let i = 0; i < 80; i++) {
    const r = (low + high) / 2
    let npv = -netReceived

    for (let j = 0; j < schedule.length; j++) {
      const month = j + 1
      let payment = schedule[j].totalPayment
      if (yearlyCosts > 0 && month % 12 === 0) {
        payment += yearlyCosts
      }
      npv += payment / Math.pow(1 + r, month)
    }

    if (Math.abs(npv) < epsilon) break
    if (npv > 0) low = r
    else high = r
  }

  const monthlyRate = (low + high) / 2
  return (Math.pow(1 + monthlyRate, 12) - 1) * 100
}

// Replaced by src/utils/refinancing.ts

// Removed — use calculateRefinancingAnalysis from refinancing.ts

/**
 * Calculates the new monthly payment after a change in WIBOR.
 * @param currentMonthlyPayment - Current monthly payment (PLN).
 * @param currentRate - Current annual interest rate (WIBOR + margin).
 * @param wiborChange - Change in WIBOR (e.g., 0.02 for +2%).
 * @returns New monthly payment (PLN).
 */
export const calculateNewMonthlyPayment = (
  currentMonthlyPayment: number,
  currentRate: number, // Oprocentowanie w skali roku (np. 5 dla 5%)
  wiborChange: number, // Zmiana WIBOR w skali roku (np. 2 dla +2%)
  principal: number = 500000, // Domyślna kwota kredytu (PLN)
  months: number = 360 // Domyślny okres kredytu (30 lat)
): number => {
  // Pełne przeliczenie raty na podstawie nowego oprocentowania
  const newRate = currentRate + wiborChange;
  return calculateMonthlyPayment(principal, newRate, months, 'equal');
};

/**
 * Determines the risk zone based on the increase in monthly payment.
 * @param originalPayment - Original monthly payment (PLN).
 * @param newPayment - New monthly payment (PLN).
 * @returns Risk zone: 'safe', 'warning', or 'danger'.
 */
export const getRiskZone = (
  originalPayment: number,
  newPayment: number
): 'safe' | 'warning' | 'danger' => {
  const increasePercentage = ((newPayment - originalPayment) / originalPayment) * 100;
  
  if (increasePercentage <= 10) {
    return 'safe';
  } else if (increasePercentage <= 20) {
    return 'warning';
  } else {
    return 'danger';
  }
};

/**
 * Main wrapper function used by the UI components.
 * Maintains backward compatibility with LoanFormData using the new core functions.
 */
export const calculateLoanResults = (data: LoanFormData): LoanResults => {
  const { principal, years, wibor, margin, installmentType, propertyValue: rawPropertyValue } = data;
  const commission = Number(data.commission || 0);
  const propertyValue = Number.isFinite(rawPropertyValue) ? rawPropertyValue : principal / 0.8;
  const months = years * 12;
  const annualRate = wibor + margin;

  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months, installmentType);
  const totalInterestBase = calculateTotalCost(principal, annualRate, months, installmentType, 0) - principal;

  const breakdown = calculateCostBreakdown(
    principal,
    propertyValue || principal / 0.8,
    totalInterestBase,
    years
  );

  const upfrontExclCommission = breakdown.upfrontCosts.total - breakdown.upfrontCosts.provision;

  const rrso = calculateRRSO(
    principal, annualRate, months, installmentType,
    commission + breakdown.upfrontCosts.provision,
    upfrontExclCommission,
    breakdown.yearlyCosts.total
  );

  return {
    monthlyPayment,
    totalCost: breakdown.totalCost.allPayments,
    totalInterest: totalInterestBase,
    rrso,
    allInCost: breakdown.totalCost.grandTotal,
    breakdown
  };
};

// calculateTotalInterest removed — computed directly in calculateLoanResults
