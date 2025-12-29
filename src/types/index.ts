// /src/types/index.ts

export interface LoanFormData {
  principal: number           // Kwota kredytu w PLN
  years: number              // Okres w latach
  wibor: number              // WIBOR w %
  margin: number             // Marża banku w %
  installmentType: 'equal' | 'declining'  // Rodzaj rat
  commission?: number        // Prowizja (opcjonalna)
}

export interface LoanResults {
  monthlyPayment: number     // Miesięczna rata
  totalCost: number          // Całkowity koszt
  totalInterest: number      // Suma odsetek
  rrso: number               // RRSO w %
}

export interface LoanOffer {
  id: string
  name: string               // Nazwa oferty (np. "Bank PKO")
  formData: LoanFormData
  results: LoanResults
  savedAt: string // ISO date
}
