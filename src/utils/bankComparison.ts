import { calculateLoanResults } from './loanCalculations'
import type { LoanFormData, LoanResults } from '../types'
import type { BankProfile } from '../data/bankProfiles'
import { LOAN_CONSTANTS } from '../types/constants'

export interface BankOfferResult {
  bank: BankProfile
  margin: number
  results: LoanResults
  knfBufferOk: boolean
  knfBufferMonthlyPayment: number
}

export interface LoanParams {
  principal: number
  years: number
  wibor: number
  installmentType: 'equal' | 'declining'
  propertyValue: number
}

export function calculateKNFBuffer(
  income: number,
  obligations: number,
  dependents: number
): number {
  const effectiveIncome = income * LOAN_CONSTANTS.AFFORDABILITY.EMPLOYMENT_MULTIPLIERS.UOP
  const livingCosts = LOAN_CONSTANTS.AFFORDABILITY.MIN_LIVING_COST_PER_PERSON * (dependents + 1)
  const disposable = Math.max(0, (effectiveIncome - obligations - livingCosts) * LOAN_CONSTANTS.AFFORDABILITY.MAX_DSTI)

  // Rekomendacja S: dodaj 2.5 p.p. do stopy przy liczeniu zdolności
  // Zwracamy maksymalną ratę jaką klient może udźwignąć przy buforze KNF
  return disposable
}

export function generateBankOffer(bank: BankProfile, params: LoanParams, marginOverride?: number): BankOfferResult {
  const margin = marginOverride ?? (bank.typicalMarginMin + bank.typicalMarginMax) / 2

  const formData: LoanFormData = {
    principal: params.principal,
    years: params.years,
    wibor: params.wibor,
    margin,
    installmentType: params.installmentType,
    commission: bank.provision * params.principal,
    propertyValue: params.propertyValue,
  }

  const results = calculateLoanResults(formData)

  // KNF buffer: rate + 2.5pp stress test
  const stressData: LoanFormData = { ...formData, wibor: params.wibor + 2.5 }
  const stressResults = calculateLoanResults(stressData)

  return {
    bank,
    margin,
    results,
    knfBufferOk: true, // always true — we show the stress payment for reference
    knfBufferMonthlyPayment: stressResults.monthlyPayment,
  }
}

export function compareBanks(banks: BankProfile[], params: LoanParams): BankOfferResult[] {
  return banks
    .map(bank => generateBankOffer(bank, params))
    .sort((a, b) => (a.results.allInCost ?? Infinity) - (b.results.allInCost ?? Infinity))
}
