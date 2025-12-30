import { calculateMonthlyPayment, calculateTotalCost } from './loanCalculations'

export interface PaymentTypeComparison {
  type: 'equal' | 'decreasing'
  typeName: string
  firstPayment: number
  lastPayment: number
  averagePayment: number
  totalInterest: number
  totalCost: number
  monthlyDifference: number // vs równe (baseline)
  totalSavings: number // vs równe
}

export interface ComparisonResult {
  equal: PaymentTypeComparison
  decreasing: PaymentTypeComparison
  recommendation: string
}

/**
 * Calculate decreasing payment details
 */
export function calculateDecreasingPayments(
  loanAmount: number,
  annualRate: number,
  loanTermMonths: number
): {
  firstPayment: number
  lastPayment: number
  averagePayment: number
  totalInterest: number
  totalCost: number
} {
  const monthlyRate = annualRate / 12 / 100
  const monthlyPrincipal = loanAmount / loanTermMonths

  // First payment: kapitał + odsetki od pełnej kwoty
  const firstInterest = loanAmount * monthlyRate
  const firstPayment = monthlyPrincipal + firstInterest

  // Last payment: kapitał + odsetki od ostatniej raty kapitału
  const lastInterest = monthlyPrincipal * monthlyRate
  const lastPayment = monthlyPrincipal + lastInterest

  // Total interest (sum of arithmetic sequence)
  const totalInterest = (firstInterest + lastInterest) * loanTermMonths / 2

  // Average payment
  const averagePayment = (firstPayment + lastPayment) / 2

  // Total cost
  const totalCost = loanAmount + totalInterest

  return {
    firstPayment,
    lastPayment,
    averagePayment,
    totalInterest,
    totalCost
  }
}

/**
 * Compare equal vs decreasing payments
 */
export function comparePaymentTypes(
  loanAmount: number,
  annualRate: number,
  loanTermYears: number
): ComparisonResult {
  const loanTermMonths = loanTermYears * 12

  // Equal payment (annuity)
  const equalMonthly = calculateMonthlyPayment(
    loanAmount,
    annualRate,
    loanTermMonths,
    'equal'
  )
  const equalTotalCost = calculateTotalCost(
    loanAmount,
    annualRate,
    loanTermMonths,
    'equal'
  )
  const equalTotalInterest = equalTotalCost - loanAmount

  // Decreasing payment
  const decreasing = calculateDecreasingPayments(
    loanAmount,
    annualRate,
    loanTermMonths
  )

  // Comparison
  const equalResult: PaymentTypeComparison = {
    type: 'equal',
    typeName: 'Raty równe (annuitetowe)',
    firstPayment: equalMonthly,
    lastPayment: equalMonthly,
    averagePayment: equalMonthly,
    totalInterest: equalTotalInterest,
    totalCost: equalTotalCost,
    monthlyDifference: 0, // baseline
    totalSavings: 0
  }

  const decreasingResult: PaymentTypeComparison = {
    type: 'decreasing',
    typeName: 'Raty malejące',
    firstPayment: decreasing.firstPayment,
    lastPayment: decreasing.lastPayment,
    averagePayment: decreasing.averagePayment,
    totalInterest: decreasing.totalInterest,
    totalCost: decreasing.totalCost,
    monthlyDifference: decreasing.firstPayment - equalMonthly,
    totalSavings: equalTotalCost - decreasing.totalCost
  }

  // Recommendation logic
  let recommendation = ''
  if (decreasingResult.totalSavings > 10000) {
    recommendation = 'Raty malejące: Oszczędzisz znacznie (>10k zł) dzięki szybszej spłacie kapitału.'
  } else if (decreasingResult.firstPayment > equalMonthly * 1.2) {
    recommendation = 'Raty równe: Pierwsza rata malejących jest o ponad 20% wyższa, co może nadmiernie obciążyć domowy budżet.'
  } else {
    recommendation = 'Raty malejące: Niewielka oszczędność, ale warto rozważyć, jeśli początkowy wyższy wydatek nie jest problemem.'
  }

  return {
    equal: equalResult,
    decreasing: decreasingResult,
    recommendation
  }
}
