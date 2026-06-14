import { generateAmortizationSchedule } from './loanCalculations'

export interface OverpaymentParams {
  principal: number
  annualRate: number
  months: number
  installmentType: 'equal' | 'declining'
  overpaymentAmount: number
  overpaymentType: 'one-time' | 'recurring'
  overpaymentFrequencyMonths: number // for recurring
  overpaymentStartMonth: number // 1-indexed, when overpayments begin
  mode: 'reduce-installment' | 'shorten-term'
}

export interface OverpaymentResult {
  originalTotalInterest: number
  newTotalInterest: number
  interestSaved: number
  originalPayoffMonths: number
  newPayoffMonths: number
  monthsSaved: number
  originalMonthlyPayment: number
  newMonthlyPayment: number
  totalOverpaid: number
  scheduleSummary: Array<{
    month: number
    remainingBalance: number
    overpayment: number
  }>
}

/**
 * Simulate overpayments on a mortgage.
 *
 * Algorithm:
 * 1. Generate the base amortization schedule (without overpayments).
 * 2. Walk through month by month, applying overpayments to principal at specified months.
 * 3. For "reduce-installment" mode: recalculate monthly payment after each overpayment
 *    based on remaining balance and remaining term.
 * 4. For "shorten-term" mode: keep the same monthly payment, recalculate term by finding
 *    when the balance reaches zero.
 */
export function simulateOverpayment(params: OverpaymentParams): OverpaymentResult {
  const {
    principal,
    annualRate,
    months,
    installmentType,
    overpaymentAmount,
    overpaymentType,
    overpaymentFrequencyMonths,
    overpaymentStartMonth,
    mode,
  } = params

  const monthlyRate = annualRate / 12 / 100
  const baseSchedule = generateAmortizationSchedule(principal, annualRate, months, installmentType)

  const originalTotalInterest = baseSchedule.reduce((sum, row) => sum + row.interestPart, 0)
  const originalMonthlyPayment = baseSchedule[0].totalPayment
  const originalPayoffMonths = months

  // Simulate with overpayments
  let balance = principal
  let totalInterestPaid = 0
  let totalOverpaid = 0
  let month = 0
  const scheduleSummary: OverpaymentResult['scheduleSummary'] = []

  // For reduce-installment mode, recalculate payment after each overpayment
  let effectiveMonths = months
  let currentMonthlyPayment = originalMonthlyPayment

  while (balance > 0 && month < months * 2) {
    month++
    const interestPaid = balance * monthlyRate
    let principalPaid = currentMonthlyPayment - interestPaid
    let paid = currentMonthlyPayment

    // Apply overpayment this month?
    let overpaymentApplied = 0
    if (month >= overpaymentStartMonth && overpaymentAmount > 0) {
      const isOverpaymentMonth =
        overpaymentType === 'one-time'
          ? month === overpaymentStartMonth
          : (month - overpaymentStartMonth) % overpaymentFrequencyMonths === 0

      if (isOverpaymentMonth) {
        overpaymentApplied = overpaymentAmount
        principalPaid += overpaymentApplied
        paid += overpaymentApplied
        totalOverpaid += overpaymentApplied
      }
    }

    balance -= principalPaid
    if (balance < 0) {
      // Overpaid — excess reduces the negative balance
      paid += balance // balance is negative, so this reduces paid
      balance = 0
    }
    totalInterestPaid += interestPaid

    scheduleSummary.push({
      month,
      remainingBalance: Math.max(0, balance),
      overpayment: overpaymentApplied,
    })

    if (balance <= 0) break

    // After overpayment, recalculate based on mode
    if (overpaymentApplied > 0 && balance > 0) {
      if (mode === 'reduce-installment') {
        // Recalculate monthly payment for remaining balance and remaining term
        const remaining = effectiveMonths - (month - (effectiveMonths - months > 0 ? effectiveMonths - months : 0))
        const remainingAfterThis = months - month
        if (remainingAfterThis > 0 && monthlyRate > 0) {
          const pow = Math.pow(1 + monthlyRate, remainingAfterThis)
          currentMonthlyPayment = (balance * monthlyRate * pow) / (pow - 1)
        } else if (remainingAfterThis > 0) {
          currentMonthlyPayment = balance / remainingAfterThis
        }
      }
      // For shorten-term mode, keep same payment - it'll pay off faster
    }
  }

  const newPayoffMonths = month
  const monthsSaved = originalPayoffMonths - newPayoffMonths
  const interestSaved = originalTotalInterest - totalInterestPaid

  // For reduce-installment mode, new monthly is the recalculated payment
  // For shorten-term mode, payment stays the same
  const newMonthlyPayment = mode === 'reduce-installment' ? currentMonthlyPayment : originalMonthlyPayment

  return {
    originalTotalInterest,
    newTotalInterest: totalInterestPaid,
    interestSaved,
    originalPayoffMonths,
    newPayoffMonths,
    monthsSaved,
    originalMonthlyPayment,
    newMonthlyPayment,
    totalOverpaid,
    scheduleSummary: scheduleSummary.filter((_, i) =>
      i % Math.max(1, Math.floor(scheduleSummary.length / 20)) === 0 || i === scheduleSummary.length - 1
    ),
  }
}
