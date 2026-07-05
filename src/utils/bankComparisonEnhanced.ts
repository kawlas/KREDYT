/**
 * Rozszerzona porównywarka banków
 * Dodaje: sortowanie, filtrowanie, wizualizację
 */

import type { BankOfferResult } from './bankComparison'

export type SortKey = 'monthlyPayment' | 'rrso' | 'totalCost' | 'margin'
export type SortDirection = 'asc' | 'desc'

export function sortOffers(
  offers: BankOfferResult[],
  key: SortKey,
  direction: SortDirection
): BankOfferResult[] {
  return [...offers].sort((a, b) => {
    let aVal: number
    let bVal: number
    switch (key) {
      case 'monthlyPayment':
        aVal = a.results.monthlyPayment
        bVal = b.results.monthlyPayment
        break
      case 'rrso':
        aVal = a.results.rrso
        bVal = b.results.rrso
        break
      case 'totalCost':
        aVal = a.results.allInCost ?? Infinity
        bVal = b.results.allInCost ?? Infinity
        break
      case 'margin':
        aVal = a.margin
        bVal = b.margin
        break
      default:
        aVal = 0
        bVal = 0
    }
    return direction === 'asc' ? aVal - bVal : bVal - aVal
  })
}

export function filterOffers(
  offers: BankOfferResult[],
  selectedBanks: Set<string>
): BankOfferResult[] {
  if (selectedBanks.size === 0) return offers
  return offers.filter(o => selectedBanks.has(o.bank.id))
}

export function getTopOffers(
  offers: BankOfferResult[],
  count: number = 5
): BankOfferResult[] {
  return offers.slice(0, count)
}

export interface ChartDataPoint {
  label: string
  monthlyPayment: number
  totalCost: number
  rrso: number
  isBest: boolean
}

export function prepareChartData(offers: BankOfferResult[]): ChartDataPoint[] {
  if (offers.length === 0) return []
  const minTotalCost = Math.min(...offers.map(o => o.results.allInCost ?? Infinity))
  return offers.map(o => ({
    label: o.bank.name,
    monthlyPayment: o.results.monthlyPayment,
    totalCost: o.results.allInCost ?? 0,
    rrso: o.results.rrso,
    isBest: (o.results.allInCost ?? Infinity) === minTotalCost,
  }))
}
