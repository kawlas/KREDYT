import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { useForm, type UseFormRegister, type UseFormHandleSubmit, type UseFormTrigger, type FieldErrors, type UseFormSetValue, type UseFormReturn, type Control } from 'react-hook-form'
import type { LoanFormData, LoanResults, LoanOffer, AffordabilityFormData } from '../types'
import { calculateLoanResults } from '../utils/loanCalculations'
import { saveCalculation, deleteCalculation } from '../utils/calculationStorage'
import { toast } from '../components/shared/Toast'
import { MAX_OFFERS } from '../types/constants'

const STORAGE_KEY = 'loan-calculator-offers'

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
  control: Control<LoanFormData>
  affordabilityForm: UseFormReturn<AffordabilityFormData>
}

const LoanCalculatorContext = createContext<LoanCalculatorContextType | undefined>(undefined)

// Helper: Session Storage keys
const SESSION_KEY_LOAN = 'loan-calculator-form-data'
const SESSION_KEY_AFFORDABILITY = 'loan-calculator-affordability-data'

// Secure random ID generator with fallback for older browsers
const generateId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

export function LoanCalculatorProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<LoanResults | null>(null)
  const [savedOffers, setSavedOffers] = useState<LoanOffer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // -- MAIN CALCULATOR FORM --
  // Initialize with defaults to match Server/SSG
  const defaultLoanValues: LoanFormData = {
    principal: 400000,
    years: 25,
    wibor: 5.85,
    margin: 2.0,
    installmentType: 'equal',
    commission: 0,
    propertyValue: 500000
  }

  const loanForm = useForm<LoanFormData>({ defaultValues: defaultLoanValues })
  
  // Hydrate from SessionStorage (Client Only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY_LOAN)
        if (stored) {
          const parsed = JSON.parse(stored)
          loanForm.reset({ ...defaultLoanValues, ...parsed })
        }
      } catch (e) { console.error(e) }
    }
  }, []) // Run once on mount

  useEffect(() => {
    const sub = loanForm.watch((data) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY_LOAN, JSON.stringify(data))
      }
    })
    return () => sub.unsubscribe()
  }, []) // loanForm.watch is stable in RHF 7.52+

  // -- AFFORDABILITY FORM --
  const defaultAffordabilityValues: AffordabilityFormData = {
    income: 10000,
    employmentType: 'UOP',
    obligations: 0,
    dependents: 0,
    age: 30,
    wibor: 5.85,
    margin: 2.0
  }

  const affordabilityForm = useForm<AffordabilityFormData>({ defaultValues: defaultAffordabilityValues })

  // Hydrate Affordability from Session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY_AFFORDABILITY)
        if (stored) {
          const parsed = JSON.parse(stored)
          affordabilityForm.reset({ ...defaultAffordabilityValues, ...parsed })
        }
      } catch (e) { console.error(e) }
    }
  }, [])

  useEffect(() => {
    const sub = affordabilityForm.watch((data) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY_AFFORDABILITY, JSON.stringify(data))
      }
    })
    return () => sub.unsubscribe()
  }, []) // affordabilityForm.watch is stable in RHF 7.52+


  // Load offers from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
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
    if (typeof window === 'undefined') return
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
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.has('amount') || params.has('period')) {
      const updates: Partial<LoanFormData> = {}

      const pAmount = params.get('amount')
      if (pAmount) {
        const n = Number(pAmount)
        if (Number.isFinite(n) && n > 0) updates.principal = n
      }

      const pPeriod = params.get('period')
      if (pPeriod) {
        const n = Number(pPeriod)
        if (Number.isFinite(n) && n > 0) updates.years = n
      }

      const pWibor = params.get('wibor')
      if (pWibor) {
        const n = Number(pWibor)
        if (Number.isFinite(n) && n > 0) {
          updates.wibor = n
          affordabilityForm.setValue('wibor', n)
        }
      }

      const pMargin = params.get('margin')
      if (pMargin) {
        const n = Number(pMargin)
        if (Number.isFinite(n) && n > 0) {
          updates.margin = n
          affordabilityForm.setValue('margin', n)
        }
      }

      const pType = params.get('type')
      if (pType && (pType === 'equal' || pType === 'declining')) updates.installmentType = pType as 'equal' | 'declining'

      const pValue = params.get('property')
      if (pValue) {
        const n = Number(pValue)
        if (Number.isFinite(n) && n > 0) updates.propertyValue = n
      }

      if (Object.keys(updates).length > 0) {
        loanForm.reset({ ...loanForm.getValues(), ...updates })
        loanForm.trigger()
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
      toast('Możesz zapisać maksymalnie 5 ofert. Usuń jedną, aby dodać nową.', 'error')
      return
    }
    if (savedOffers.some(o => o.name === name)) {
      toast('Oferta o tej nazwie już istnieje.', 'error')
      return
    }

    const formData = loanForm.getValues()
    const newOffer: LoanOffer = {
      id: generateId(),
      name,
      formData,
      results: results,
      savedAt: new Date().toISOString()
    }

    setSavedOffers(prev => [...prev, newOffer])

    // Sync to calculationStorage
    try {
      saveCalculation(name, {
        principal: formData.principal,
        propertyValue: formData.propertyValue || formData.principal / 0.8,
        years: formData.years,
        wibor: formData.wibor,
        margin: formData.margin,
        installmentType: formData.installmentType,
        commission: formData.commission,
      }, {
        monthlyPayment: results.monthlyPayment,
        totalCost: results.totalCost,
        totalInterest: results.totalInterest,
        rrso: results.rrso,
        allInCost: results.allInCost,
      })
    } catch {
      // Non-critical — context storage is primary
    }
  }

  const deleteOffer = (id: string) => {
    setSavedOffers(prev => prev.filter(offer => offer.id !== id))
    try {
      deleteCalculation(id)
    } catch {
      // Non-critical if calculationStorage key doesn't match
    }
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
    control: loanForm.control,
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
