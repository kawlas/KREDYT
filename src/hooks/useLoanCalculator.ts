import { useState, useEffect } from 'react'
import { useForm, type UseFormRegister, type UseFormHandleSubmit, type UseFormTrigger, type FieldErrors } from 'react-hook-form'
import type { LoanFormData, LoanResults, LoanOffer } from '../types'
import { calculateLoanResults } from '../utils/loanCalculations'

const STORAGE_KEY = 'loan-calculator-offers'
const MAX_OFFERS = 5

interface UseLoanCalculatorReturn {
  register: UseFormRegister<LoanFormData>
  handleSubmit: UseFormHandleSubmit<LoanFormData>
  trigger: UseFormTrigger<LoanFormData>
  errors: FieldErrors<LoanFormData>
  results: LoanResults | null
  savedOffers: LoanOffer[]
  isLoading: boolean
  error: string | null
  onSubmit: (data: LoanFormData) => void
  saveOffer: (name: string) => void
  deleteOffer: (id: string) => void
  clearAllOffers: () => void
  getValues: () => LoanFormData
  reset: (values: LoanFormData) => void
  setResults: (results: LoanResults | null) => void
}

export const useLoanCalculator = (): UseLoanCalculatorReturn => {
  const [results, setResults] = useState<LoanResults | null>(null)
  const [savedOffers, setSavedOffers] = useState<LoanOffer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit: rhfHandleSubmit, getValues, trigger, reset, formState: { errors } } = useForm<LoanFormData>({
    defaultValues: {
      principal: 400000,
      years: 25,
      wibor: 5.85,
      margin: 2.0,
      installmentType: 'equal',
      commission: 0,
      propertyValue: 500000
    }
  })

  // Load offers from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed && Array.isArray(parsed.offers)) {
           setSavedOffers(parsed.offers)
        }
      } catch (e) {
        console.error('Failed to load offers from localStorage:', e)
      }
    }
  }, [])

  // Persist offers to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        offers: savedOffers,
        version: '1.0',
        lastUpdated: new Date().toISOString()
      }))
    } catch (e) {
       console.error('Failed to save offers to localStorage:', e)
    }
  }, [savedOffers])


  const onSubmit = async (data: LoanFormData) => {
    setIsLoading(true)
    setError(null)
    setResults(null)

    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
      const calculatedResults = calculateLoanResults(data)
      setResults(calculatedResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas obliczeń')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const saveOffer = (name: string) => {
    if (!results) return
    if (savedOffers.length >= MAX_OFFERS) {
      alert('Możesz zapisać maksymalnie 3 oferty. Usuń jedną, aby dodać nową.')
      return
    }

    const newOffer: LoanOffer = {
      id: crypto.randomUUID(),
      name,
      formData: getValues(),
      results: results,
      savedAt: new Date().toISOString()
    }

    setSavedOffers(prev => [...prev, newOffer])
  }

  const deleteOffer = (id: string) => {
    setSavedOffers(prev => prev.filter(offer => offer.id !== id))
  }

  const clearAllOffers = () => {
    setSavedOffers([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    register,
    handleSubmit: rhfHandleSubmit,
    trigger,
    errors,
    results,
    savedOffers,
    isLoading,
    error,
    onSubmit: (data: LoanFormData) => onSubmit(data),
    saveOffer,
    deleteOffer,
    clearAllOffers,
    getValues,
    reset,
    setResults
  }
}
