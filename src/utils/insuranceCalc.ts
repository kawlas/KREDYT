/**
 * Kalkulator kosztów ubezpieczenia kredytu hipotecznego
 *
 * Oblicza:
 * - UNWW (ubezpieczenie niskiego wkładu własnego) — gdy LTV > 80%
 * - Ubezpieczenie na życie z cesją na bank
 * - Ubezpieczenie pomostowe
 * - Ubezpieczenie od utraty pracy
 * - Całkowity koszt ubezpieczeń w okresie kredytu
 */

export interface InsuranceInput {
  principal: number
  propertyValue: number
  loanTermYears: number
  insuranceLifeMonthly: number // koszt ubezpieczenia na życie miesięcznie (cesja)
  insuranceBridgeOnce: number  // koszt ubezpieczenia pomostowego jednorazowo
  insuranceUnemploymentMonthly: number // koszt ubezpieczenia od utraty pracy
  hasLifeInsurance: boolean
  hasBridgeInsurance: boolean
  hasUnemploymentInsurance: boolean
  ownLifeInsuranceCheaperByPercent: number // % taniej własna polisa
}

export interface InsuranceCosts {
  // UNWW
  unwwRequired: boolean
  unwwPercent: number
  unwwAmount: number
  unwwMonthly: number
  unwwMonths: number
  unwwTotal: number

  // Życie
  lifeMonthly: number
  lifeTotal: number
  lifeSavingsOwn: number // oszczędność przy własnej polisie

  // Pomostowe
  bridgeOnce: number

  // Utrata pracy
  unemploymentMonthly: number
  unemploymentTotal: number

  // Podsumowanie
  totalUpfront: number
  totalMonthly: number
  totalOverall: number
  monthlyImpact: number // wpływ na miesięczną ratę
}

export function calculateInsuranceCosts(input: InsuranceInput): InsuranceCosts {
  const { principal, propertyValue, loanTermYears } = input
  const totalMonths = loanTermYears * 12

  // UNWW — required when LTV > 80%
  const ltv = propertyValue > 0 ? (principal / propertyValue) * 100 : 0
  const unwwRequired = ltv > 80
  let unwwPercent = 0
  let unwwAmount = 0
  let unwwMonthly = 0
  let unwwMonths = 0
  let unwwTotal = 0

  if (unwwRequired && propertyValue > 0) {
    const ltvExcess = Math.min(ltv - 80, 20) // max 20% excess
    unwwPercent = ltvExcess
    // UNWW cost is ~2-4% of the excess amount, typically paid upfront as a single premium
    const unwwRate = 0.035 // ~3.5% of the excess
    const excessAmount = principal * (ltvExcess / 100)
    unwwAmount = excessAmount * unwwRate
    unwwMonths = Math.min(totalMonths, 120) // typically 10 years
    unwwMonthly = unwwAmount / unwwMonths
    unwwTotal = unwwAmount
  }

  // Życie
  const lifeMonthly = input.hasLifeInsurance ? input.insuranceLifeMonthly : 0
  const lifeTotal = lifeMonthly * totalMonths
  const lifeSavingsOwn = input.hasLifeInsurance
    ? lifeTotal * (input.ownLifeInsuranceCheaperByPercent / 100)
    : 0

  // Pomostowe
  const bridgeOnce = input.hasBridgeInsurance ? input.insuranceBridgeOnce : 0

  // Utrata pracy
  const unemploymentMonthly = input.hasUnemploymentInsurance ? input.insuranceUnemploymentMonthly : 0
  const unemploymentTotal = unemploymentMonthly * totalMonths

  // Podsumowanie
  const totalUpfront = unwwAmount + bridgeOnce
  const totalMonthly = lifeMonthly + unemploymentMonthly + unwwMonthly
  const totalOverall = totalUpfront + lifeTotal + unemploymentTotal

  const monthlyImpact = totalMonthly

  return {
    unwwRequired,
    unwwPercent,
    unwwAmount,
    unwwMonthly,
    unwwMonths,
    unwwTotal,
    lifeMonthly,
    lifeTotal,
    lifeSavingsOwn,
    bridgeOnce,
    unemploymentMonthly,
    unemploymentTotal,
    totalUpfront,
    totalMonthly,
    totalOverall,
    monthlyImpact,
  }
}

export function formatInsuranceSummary(costs: InsuranceCosts): string {
  const parts: string[] = []
  if (costs.unwwRequired) {
    parts.push(`UNWW: ${costs.unwwTotal.toFixed(0)} zł`)
  }
  if (costs.lifeMonthly > 0) {
    parts.push(`Życie: ${costs.lifeTotal.toFixed(0)} zł`)
  }
  if (costs.bridgeOnce > 0) {
    parts.push(`Pomostowe: ${costs.bridgeOnce.toFixed(0)} zł`)
  }
  if (costs.unemploymentMonthly > 0) {
    parts.push(`Utrata pracy: ${costs.unemploymentTotal.toFixed(0)} zł`)
  }
  parts.push(`Razem: ${costs.totalOverall.toFixed(0)} zł`)
  return parts.join(' | ')
}
