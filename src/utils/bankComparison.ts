import type { BankOffer } from '../data/banks'
import { calculateMonthlyPayment, calculateTotalCost } from './loanCalculations'

export interface BankComparisonResult {
  bank: BankOffer
  monthlyPayment: number
  totalInterest: number
  totalCost: number
  commissionAmount: number
  effectiveRate: number // Annual rate including margin
  isBestOffer: boolean
}

export interface ComparisonParams {
  loanAmount: number
  loanTermYears: number
  wibor: number
  paymentType: 'equal' | 'declining'
}

/**
 * Calculate offer details for a single bank
 */
export function calculateBankOffer(
  bank: BankOffer,
  params: ComparisonParams
): BankComparisonResult {
  const effectiveRate = params.wibor + bank.margin
  const months = params.loanTermYears * 12
  const commissionAmount = (params.loanAmount * bank.commission) / 100

  const monthlyPayment = calculateMonthlyPayment(
    params.loanAmount,
    effectiveRate,
    months,
    params.paymentType
  )

  const totalCostExcludingCommission = calculateTotalCost(
    params.loanAmount,
    effectiveRate,
    months,
    params.paymentType
  )

  const totalInterest = totalCostExcludingCommission - params.loanAmount

  // Total cost including commission
  const totalCostWithCommission = totalCostExcludingCommission + commissionAmount

  return {
    bank,
    monthlyPayment,
    totalInterest,
    totalCost: totalCostWithCommission,
    commissionAmount,
    effectiveRate,
    isBestOffer: false // Will be set later
  }
}

/**
 * Compare all banks and mark the best offer
 */
export function compareAllBanks(
  banks: BankOffer[],
  params: ComparisonParams
): BankComparisonResult[] {
  const results = banks.map(bank => calculateBankOffer(bank, params))

  if (results.length === 0) return []

  // Find lowest total cost
  const lowestCost = Math.min(...results.map(r => r.totalCost))

  // Mark best offer(s)
  results.forEach(result => {
    result.isBestOffer = result.totalCost === lowestCost
  })

  return results
}

/**
 * Sort comparison results
 */
export function sortComparisonResults(
  results: BankComparisonResult[],
  sortBy: 'monthlyPayment' | 'totalCost' | 'margin' | 'name'
): BankComparisonResult[] {
  return [...results].sort((a, b) => {
    switch (sortBy) {
      case 'monthlyPayment':
        return a.monthlyPayment - b.monthlyPayment
      case 'totalCost':
        return a.totalCost - b.totalCost
      case 'margin':
        return a.bank.margin - b.bank.margin
      case 'name':
        return a.bank.name.localeCompare(b.bank.name)
      default:
        return 0
    }
  })
}

/**
 * Filter banks by criteria
 */
export function filterBanks(
  banks: BankOffer[],
  filters: {
    noCommission?: boolean
    noRequiredInsurance?: boolean
    maxMargin?: number
  }
): BankOffer[] {
  let filtered = banks

  if (filters.noCommission) {
    filtered = filtered.filter(bank => bank.commission === 0)
  }

  if (filters.noRequiredInsurance) {
    filtered = filtered.filter(bank => !bank.insurance.required)
  }

  if (filters.maxMargin !== undefined) {
    const margin = filters.maxMargin
    filtered = filtered.filter(bank => bank.margin <= margin)
  }

  return filtered
}
