import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useForm, type UseFormRegister, type UseFormHandleSubmit, type UseFormTrigger, type FieldErrors, type UseFormSetValue, type UseFormReturn } from 'react-hook-form'
import type { LoanFormData, LoanResults, LoanOffer, AffordabilityFormData } from '../types'
import { calculateLoanResults } from '../utils/loanCalculations'

const STORAGE_KEY = 'loan-calculator-offers'
const MAX_OFFERS = 5

interface LoanCalculatorContextType {
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
  setValue: UseFormSetValue<LoanFormData>
  affordabilityForm: UseFormReturn<AffordabilityFormData>
}

const LoanCalculatorContext = createContext<LoanCalculatorContextType | undefined>(undefined)

// Helper: Session Storage keys
const SESSION_KEY_LOAN = 'loan-calculator-form-data'
const SESSION_KEY_AFFORDABILITY = 'loan-calculator-affordability-data'

export function LoanCalculatorProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<LoanResults | null>(null)
  const [savedOffers, setSavedOffers] = useState<LoanOffer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // -- MAIN CALCULATOR FORM --
  const loadLoanSession = (): Partial<LoanFormData> | null => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY_LOAN)
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  }

  const defaultLoanValues: LoanFormData = {
    principal: 400000,
    years: 25,
    wibor: 5.85,
    margin: 2.0,
    installmentType: 'equal',
    commission: 0,
    propertyValue: 500000,
    ...loadLoanSession()
  }

  const loanForm = useForm<LoanFormData>({ defaultValues: defaultLoanValues })
  
  useEffect(() => {
    const sub = loanForm.watch((data) => {
      sessionStorage.setItem(SESSION_KEY_LOAN, JSON.stringify(data))
    })
    return () => sub.unsubscribe()
  }, [loanForm.watch])

  // -- AFFORDABILITY FORM --
  const loadAffordabilitySession = (): Partial<AffordabilityFormData> | null => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY_AFFORDABILITY)
      return stored ? JSON.parse(stored) : null
    } catch { return null }
  }

  const defaultAffordabilityValues: AffordabilityFormData = {
    income: 10000,
    employmentType: 'UOP',
    obligations: 0,
    dependents: 0,
    age: 30,
    wibor: 5.85,
    margin: 2.0,
    ...loadAffordabilitySession()
  }

  const affordabilityForm = useForm<AffordabilityFormData>({ defaultValues: defaultAffordabilityValues })

  useEffect(() => {
    const sub = affordabilityForm.watch((data) => {
      sessionStorage.setItem(SESSION_KEY_AFFORDABILITY, JSON.stringify(data))
    })
    return () => sub.unsubscribe()
  }, [affordabilityForm.watch])


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

  // Hydrate from URL params on mount (SEO/Sharing)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // Check if we have shareable params
    if (params.has('amount') || params.has('period')) {
      const updates: Partial<LoanFormData> = {}
      
      const pAmount = params.get('amount')
      if (pAmount) updates.principal = Number(pAmount)
      
      const pPeriod = params.get('period')
      if (pPeriod) updates.years = Number(pPeriod)
      
      const pWibor = params.get('wibor')
      if (pWibor) {
        updates.wibor = Number(pWibor)
        affordabilityForm.setValue('wibor', Number(pWibor)) // Sync both?
      }
      
      const pMargin = params.get('margin')
      if (pMargin) {
        updates.margin = Number(pMargin)
        affordabilityForm.setValue('margin', Number(pMargin)) // Sync both?
      }
      
      const pType = params.get('type')
      if (pType && (pType === 'equal' || pType === 'declining')) updates.installmentType = pType as 'equal' | 'declining'

      const pValue = params.get('property')
      if (pValue) updates.propertyValue = Number(pValue)
      
      if (Object.keys(updates).length > 0) {
        // Merge with defaults/session, favouring URL
        loanForm.reset({ ...loanForm.getValues(), ...updates })
        // Trigger calculation automatically if we have data
        setTimeout(() => loanForm.trigger(), 100)
      }
    }
  }, []) // run once on mount

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
      alert('Możesz zapisać maksymalnie 5 ofert. Usuń jedną, aby dodać nową.')
      return
    }

    const newOffer: LoanOffer = {
      id: crypto.randomUUID(),
      name,
      formData: loanForm.getValues(),
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

  const value: LoanCalculatorContextType = {
    register: loanForm.register,
    handleSubmit: loanForm.handleSubmit,
    trigger: loanForm.trigger,
    errors: loanForm.formState.errors,
    results,
    savedOffers,
    isLoading,
    error,
    onSubmit: (data: LoanFormData) => onSubmit(data),
    saveOffer,
    deleteOffer,
    clearAllOffers,
    getValues: loanForm.getValues,
    reset: loanForm.reset,
    setResults,
    setValue: loanForm.setValue,
    // @ts-ignore - extending context type on the fly or I should update interface
    affordabilityForm
  }

  return (
    <LoanCalculatorContext.Provider value={value}>
      {children}
    </LoanCalculatorContext.Provider>
  )
}

export function useLoanCalculator() {
  const context = useContext(LoanCalculatorContext)
  if (context === undefined) {
    throw new Error('useLoanCalculator must be used within a LoanCalculatorProvider')
  }
  return context
}
