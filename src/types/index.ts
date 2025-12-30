// /src/types/index.ts

export interface LoanFormData {
  principal: number           // Kwota kredytu w PLN
  years: number              // Okres w latach
  wibor: number              // WIBOR w %
  margin: number             // Marża banku w %
  installmentType: 'equal' | 'declining'  // Rodzaj rat
  commission?: number        // Prowizja (opcjonalna)
  propertyValue?: number     // Wartość nieruchomości (dla LTV)
}

export interface CostBreakdown {
  // Koszty początkowe
  upfrontCosts: {
    provision: number
    notary: number
    landRegistry: number
    valuation: number
    bridgingInsurance: number
    total: number
  }

  // Koszty roczne
  yearlyCosts: {
    homeInsurance: number
    creditInsurance: number // jeśli LTV>80%
    accountFee: number
    total: number
  }

  // Kwota faktycznie otrzymana
  actualAmountReceived: number

  // Total koszt kredytu
  totalCost: {
    allPayments: number
    principal: number
    interest: number
    upfrontCosts: number
    yearlyCosts25Years: number
    grandTotal: number
  }
}

export interface LoanResults {
  monthlyPayment: number     // Miesięczna rata (bazowa)
  totalCost: number          // Całkowity koszt (stare pole, zachowane dla kompatybilności)
  totalInterest: number      // Suma odsetek
  rrso: number               // RRSO w %
  breakdown?: CostBreakdown   // Szczegółowy podział kosztów
}


export interface LoanOffer {
  id: string
  name: string               // Nazwa oferty (np. "Bank PKO")
  formData: LoanFormData
  results: LoanResults
  savedAt: string // ISO date
}

export interface AffordabilityFormData {
  income: number
  employmentType: 'UOP' | 'B2B' | 'CONTRACT'
  obligations: number
  dependents: number
  age: number
  wibor: number
  margin: number
}
