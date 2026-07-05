/**
 * Kalkulator prowizji bankowej
 * 
 * Porównuje:
 * - Kredyt z prowizją X% i marżą Y%
 * - Kredyt bez prowizji i marżą Z%
 * - Pokazuje próg opłacalności
 */

import { calculateMonthlyPayment } from './loanCalculations'

export interface CommissionScenario {
  label: string
  principal: number
  commissionPercent: number
  commissionAmount: number
  netPrincipal: number
  interestRate: number
  monthlyPayment: number
  totalInterest: number
  totalPaid: number
  effectiveRate: number // RRSO-like effective rate considering commission
}

export interface CommissionComparison {
  withCommission: CommissionScenario
  withoutCommission: CommissionScenario
  difference: {
    monthly: number
    totalInterest: number
    totalPaid: number
  }
  monthlyBreakEvenAtYears: number // after how many months the no-commission option becomes cheaper
  recommendation: string
}

function calculateScenario(
  principal: number,
  rate: number,
  years: number,
  commissionPercent: number,
  label: string
): CommissionScenario {
  const totalMonths = years * 12
  const commissionAmount = principal * (commissionPercent / 100)
  const netPrincipal = principal - commissionAmount
  const monthlyPayment = calculateMonthlyPayment(principal, rate, totalMonths, 'equal')
  const totalPaid = monthlyPayment * totalMonths
  const totalInterest = totalPaid - principal

  // Effective rate: approximate IRR considering commission
  // If no commission, effective rate = nominal rate
  const effectiveRate = commissionAmount > 0
    ? rate + (commissionAmount / principal) * (12 / years)
    : rate

  return {
    label,
    principal,
    commissionPercent,
    commissionAmount,
    netPrincipal,
    interestRate: rate,
    monthlyPayment,
    totalInterest,
    totalPaid,
    effectiveRate,
  }
}

export function compareCommission(
  principal: number,
  baseRate: number,         // oprocentowanie bazowe (WIBOR + marża)
  commissionPercent: number, // prowizja w % (np. 2.0)
  alternativeRate: number,  // alternatywne oprocentowanie bez prowizji
  years: number
): CommissionComparison {
  const withCommission = calculateScenario(principal, baseRate, years, commissionPercent, 'Z prowizją i niższą marżą')
  const withoutCommission = calculateScenario(principal, alternativeRate, years, 0, 'Bez prowizji i wyższą marżą')

  const difference = {
    monthly: withCommission.monthlyPayment - withoutCommission.monthlyPayment,
    totalInterest: withCommission.totalInterest - withoutCommission.totalInterest,
    totalPaid: withCommission.totalPaid - withoutCommission.totalPaid,
  }

  // Monthly break-even: how many months until without-commission becomes cheaper
  // With commission saves monthlyPaymentDiff per month, but paid commission upfront
  const monthlyDiff = Math.abs(difference.monthly)
  const monthlyBreakEvenAtYears = difference.monthly > 0 && monthlyDiff > 0
    ? Math.ceil((withCommission.commissionAmount / monthlyDiff) / 12)
    : 0

  let recommendation = ''
  if (commissionPercent <= 0) {
    recommendation = 'Kredyt bez prowizji — nie płacisz dodatkowych kosztów początkowych.'
  } else if (difference.monthly <= 0) {
    recommendation = `Kredyt z prowizją ${commissionPercent}% i oprocentowaniem ${baseRate}% jest tańszy miesięcznie. Prowizja się opłaca, jeśli masz gotówkę na pokrycie kosztów początkowych.`
  } else if (monthlyBreakEvenAtYears > 0 && monthlyBreakEvenAtYears <= years) {
    recommendation = `Kredyt bez prowizji zwraca się po ${monthlyBreakEvenAtYears} latach. Jeśli planujesz spłacić kredyt wcześniej — wybierz opcję bez prowizji z wyższą marżą.`
  } else {
    recommendation = `Kredyt z prowizją ${commissionPercent}% jest droższy miesięcznie o ${difference.monthly.toFixed(2)} zł. Rozważ negocjację warunków z bankiem.`
  }

  return {
    withCommission,
    withoutCommission,
    difference,
    monthlyBreakEvenAtYears,
    recommendation,
  }
}

export function calculateOptimalCommission(
  principal: number,
  baseRate: number,
  years: number,
  alternativeRateIncrease: number // how much rate increases per 1% commission avoided
): { optimalCommission: number; savings: number } {
  // Find optimal commission percentage by comparing total cost
  let bestSavings = -Infinity
  let bestCommission = 0

  for (let comm = 0; comm <= 5; comm += 0.5) {
    const altRate = baseRate + (comm * alternativeRateIncrease)
    const result = compareCommission(principal, baseRate, comm, altRate, years)
    const savings = result.withoutCommission.totalPaid - result.withCommission.totalPaid

    if (savings > bestSavings) {
      bestSavings = savings
      bestCommission = comm
    }
  }

  return { optimalCommission: bestCommission, savings: bestSavings }
}
