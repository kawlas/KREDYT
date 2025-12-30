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
    obligations?: number // preserved from older structure if needed, or matched to current
    age?: number
    employmentType?: string
    commission?: number
  }
  results: {
    monthlyPayment: number
    totalCost: number
    totalInterest: number
    rrso: number
  }
}

const STORAGE_KEY = 'mortgage_calculator_saved_calculations'

/**
 * Get all saved calculations from localStorage
 */
export function getSavedCalculations(): SavedCalculation[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading saved calculations:', error)
    return []
  }
}

/**
 * Save a new calculation
 */
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
  saved.unshift(calculation) // Add to beginning

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch (error) {
    console.error('Error saving calculation:', error)
    throw new Error('Nie udało się zapisać obliczeń. Sprawdź czy przeglądarka ma włączony localStorage.')
  }

  return calculation
}

/**
 * Delete a saved calculation by ID
 */
export function deleteCalculation(id: string): void {
  const saved = getSavedCalculations()
  const filtered = saved.filter(calc => calc.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

/**
 * Get single calculation by ID
 */
export function getCalculationById(id: string): SavedCalculation | null {
  const saved = getSavedCalculations()
  return saved.find(calc => calc.id === id) || null
}

/**
 * Update calculation name
 */
export function updateCalculationName(id: string, newName: string): void {
  const saved = getSavedCalculations()
  const calc = saved.find(c => c.id === id)
  if (calc) {
    calc.name = newName
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  }
}

/**
 * Clear all saved calculations (for settings/debug)
 */
export function clearAllCalculations(): void {
  localStorage.removeItem(STORAGE_KEY)
}
