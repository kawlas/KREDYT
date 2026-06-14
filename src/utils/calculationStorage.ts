import { safeGetItem, safeSetItem, safeRemoveItem } from './safeStorage'

export interface SavedCalculation {
  id: string
  name: string
  savedAt: string // ISO date string
  formData: {
    principal: number
    propertyValue: number
    years: number
    wibor: number
    margin: number
    installmentType: 'equal' | 'declining'
    obligations?: number
    age?: number
    employmentType?: string
    commission?: number
  }
  results: {
    monthlyPayment: number
    totalCost: number
    totalInterest: number
    rrso: number
    allInCost?: number
  }
}

const STORAGE_KEY = 'mortgage_calculator_saved_calculations'

export function getSavedCalculations(): SavedCalculation[] {
  try {
    const data = safeGetItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function saveCalculation(
  name: string,
  formData: SavedCalculation['formData'],
  results: SavedCalculation['results']
): SavedCalculation {
  const calculation: SavedCalculation = {
    id: `calc_${Date.now()}`,
    name,
    savedAt: new Date().toISOString(),
    formData,
    results
  }

  const saved = getSavedCalculations()
  saved.unshift(calculation)

  try {
    safeSetItem(STORAGE_KEY, JSON.stringify(saved))
  } catch {
    throw new Error('Nie udało się zapisać obliczeń.')
  }

  return calculation
}

export function deleteCalculation(id: string): void {
  const saved = getSavedCalculations()
  const filtered = saved.filter(calc => calc.id !== id)
  safeSetItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function getCalculationById(id: string): SavedCalculation | null {
  const saved = getSavedCalculations()
  return saved.find(calc => calc.id === id) || null
}

export function updateCalculationName(id: string, newName: string): void {
  const saved = getSavedCalculations()
  const calc = saved.find(c => c.id === id)
  if (calc) {
    calc.name = newName
    safeSetItem(STORAGE_KEY, JSON.stringify(saved))
  }
}

export function clearAllCalculations(): void {
  safeRemoveItem(STORAGE_KEY)
}
