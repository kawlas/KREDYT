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
  upfrontCosts: {
    commission: number
    notary: number
    valuation: number
    landRegister: number
    total: number
  }
  ongoingCosts: {
    monthlyBridgeInsurance: number
    monthlyPropertyInsurance: number
    totalMonthlyExtra: number
  }
  totalInterest: number
  totalLoanCost: number // Suma rat + koszty upfront + koszty ongoing przez cały okres
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
