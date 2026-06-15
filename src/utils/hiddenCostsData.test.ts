import { describe, it, expect } from 'vitest'
import { hiddenCosts, getCostsByCategory, simulateTotalHiddenCosts, type CostCategory, type HiddenCostItem } from './hiddenCostsData'

describe('hiddenCosts', () => {
  it('contains at least 15 unique cost items', () => {
    expect(hiddenCosts.length).toBeGreaterThanOrEqual(15)
  })

  it('each item has required fields', () => {
    for (const item of hiddenCosts) {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
      expect(item.category).toBeDefined()
      expect(item.description).toBeDefined()
      expect(typeof item.typicalRange).toBe('object')
      expect(typeof item.impact).toBe('string')
    }
  })

  it('contains multiple categories', () => {
    const categories = new Set(hiddenCosts.map(c => c.category))
    expect(categories.size).toBeGreaterThanOrEqual(5)
  })

  it('impact values are valid (low/medium/high/very-high)', () => {
    const valid = ['low', 'medium', 'high', 'very-high']
    for (const item of hiddenCosts) {
      expect(valid).toContain(item.impact)
    }
  })
})

describe('getCostsByCategory', () => {
  it('returns items filtered by category', () => {
    const initial = getCostsByCategory('initial')
    expect(initial.length).toBeGreaterThan(0)
    for (const item of initial) {
      expect(item.category).toBe('initial')
    }
  })

  it('returns empty array for unknown category', () => {
    const result = getCostsByCategory('unknown' as CostCategory)
    expect(result).toEqual([])
  })

  it('all items returned when summed across categories equals total', () => {
    const all: HiddenCostItem[] = []
    const categories = ['initial', 'monthly', 'oneTime', 'exit', 'risk', 'insurance'] as CostCategory[]
    for (const cat of categories) {
      all.push(...getCostsByCategory(cat))
    }
    expect(all.length).toBe(hiddenCosts.length)
  })
})

describe('simulateTotalHiddenCosts', () => {
  it('calculates total for a given loan amount', () => {
    const result = simulateTotalHiddenCosts(400000, [1, 2, 3])
    expect(result).toBeGreaterThan(0)
  })

  it('returns 0 for empty selection', () => {
    const result = simulateTotalHiddenCosts(400000, [])
    expect(result).toBe(0)
  })

  it('returns larger for larger loan', () => {
    const small = simulateTotalHiddenCosts(200000, [1, 2, 3])
    const large = simulateTotalHiddenCosts(500000, [1, 2, 3])
    expect(large).toBeGreaterThan(small)
  })
})
