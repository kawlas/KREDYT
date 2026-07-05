import { describe, it, expect } from 'vitest'
import { sortOffers, filterOffers, prepareChartData, getTopOffers } from './bankComparisonEnhanced'
import type { BankOfferResult } from './bankComparison'

function makeMockOffer(id: string, monthly: number, total: number, rrso: number, margin: number): BankOfferResult {
  return {
    bank: { id, name: `Bank ${id}`, typicalMarginMin: margin, typicalMarginMax: margin + 0.1, provision: 1.5, maxLtv: 90 } as any,
    margin,
    results: { monthlyPayment: monthly, rrso, allInCost: total } as any,
    knfBufferOk: true,
    knfBufferMonthlyPayment: monthly + 100,
  }
}

const mockOffers: BankOfferResult[] = [
  makeMockOffer('a', 2500, 450000, 7.5, 1.2),
  makeMockOffer('b', 2400, 430000, 7.2, 0.9),
  makeMockOffer('c', 2600, 470000, 7.8, 1.5),
]

describe('bankComparisonEnhanced', () => {
  it('sortOffers sortuje po monthlyPayment rosnąco', () => {
    const sorted = sortOffers(mockOffers, 'monthlyPayment', 'asc')
    expect(sorted[0].results.monthlyPayment).toBe(2400)
    expect(sorted[2].results.monthlyPayment).toBe(2600)
  })

  it('sortOffers sortuje po totalCost malejąco', () => {
    const sorted = sortOffers(mockOffers, 'totalCost', 'desc')
    expect(sorted[0].results.allInCost).toBe(470000)
    expect(sorted[2].results.allInCost).toBe(430000)
  })

  it('sortOffers sortuje po rrso', () => {
    const sorted = sortOffers(mockOffers, 'rrso', 'asc')
    expect(sorted[0].results.rrso).toBe(7.2)
    expect(sorted[2].results.rrso).toBe(7.8)
  })

  it('filterOffers zwraca tylko wybrane banki', () => {
    const selected = new Set(['a', 'c'])
    const filtered = filterOffers(mockOffers, selected)
    expect(filtered.length).toBe(2)
    expect(filtered.every(o => selected.has(o.bank.id))).toBe(true)
  })

  it('filterOffers z pustym setem zwraca wszystkie', () => {
    const filtered = filterOffers(mockOffers, new Set())
    expect(filtered.length).toBe(3)
  })

  it('prepareChartData tworzy dane do wykresu', () => {
    const data = prepareChartData(mockOffers)
    expect(data.length).toBe(3)
    expect(data[0].label).toBe('Bank a')
    expect(data[0].monthlyPayment).toBe(2500)
  })

  it('prepareChartData oznacza najlepszą ofertę', () => {
    const data = prepareChartData(mockOffers)
    const best = data.find(d => d.isBest)
    expect(best).toBeTruthy()
    expect(best!.totalCost).toBe(430000)
  })

  it('getTopOffers zwraca N najlepszych', () => {
    const top2 = getTopOffers(mockOffers, 2)
    expect(top2.length).toBe(2)
  })

  it('prepareChartData z pustą tablicą', () => {
    expect(prepareChartData([])).toEqual([])
  })
})