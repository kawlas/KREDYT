import { describe, it, expect, beforeEach } from 'vitest'
import {
  getSavedCalculations,
  saveCalculation,
  deleteCalculation,
  getCalculationById,
  updateCalculationName,
  clearAllCalculations,
} from './calculationStorage'

const mockFormData = {
  principal: 400000,
  propertyValue: 500000,
  years: 25,
  wibor: 5.85,
  margin: 2.0,
  installmentType: 'equal' as const,
  commission: 0,
}

const mockResults = {
  monthlyPayment: 2120.34,
  totalCost: 636102,
  totalInterest: 236102,
  rrso: 7.85,
}

describe('calculationStorage', () => {
  beforeEach(() => {
    clearAllCalculations()
  })

  it('starts with empty array', () => {
    expect(getSavedCalculations()).toEqual([])
  })

  it('saves and retrieves a calculation', () => {
    const saved = saveCalculation('Test', mockFormData, mockResults)
    expect(saved.id).toBeDefined()
    expect(saved.name).toBe('Test')

    const all = getSavedCalculations()
    expect(all).toHaveLength(1)
    expect(all[0].name).toBe('Test')
  })

  it('newest calculation appears first', () => {
    saveCalculation('First', mockFormData, mockResults)
    saveCalculation('Second', mockFormData, mockResults)

    const all = getSavedCalculations()
    expect(all).toHaveLength(2)
    expect(all[0].name).toBe('Second') // most recent first
    expect(all[1].name).toBe('First')
  })

  it('deletes a calculation by ID', () => {
    const saved = saveCalculation('Test', mockFormData, mockResults)
    deleteCalculation(saved.id)
    expect(getSavedCalculations()).toHaveLength(0)
  })

  it('returns null for non-existent ID', () => {
    expect(getCalculationById('nonexistent')).toBeNull()
  })

  it('getCalculationById finds the right one', () => {
    const saved = saveCalculation('Find Me', mockFormData, mockResults)
    const found = getCalculationById(saved.id)
    expect(found?.name).toBe('Find Me')
  })

  it('updates calculation name', () => {
    const saved = saveCalculation('Old Name', mockFormData, mockResults)
    updateCalculationName(saved.id, 'New Name')
    const updated = getCalculationById(saved.id)
    expect(updated?.name).toBe('New Name')
  })

  it('clearAllCalculations removes everything', () => {
    saveCalculation('A', mockFormData, mockResults)
    saveCalculation('B', mockFormData, mockResults)
    clearAllCalculations()
    expect(getSavedCalculations()).toEqual([])
  })
})
