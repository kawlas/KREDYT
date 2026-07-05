/**
 * Kalkulator: Kredyt hipoteczny vs Wynajem
 *
 * Porównanie kosztów i korzyści obu opcji w perspektywie N lat.
 *
 * Zakup (kredyt):
 *   - Koszty początkowe: wkład własny, prowizja, PCC, notariusz
 *   - Koszty miesięczne: rata kredytu, ubezpieczenie, utrzymanie
 *   - Zysk: wzrost wartości nieruchomości, spłacony kapitał
 *
 * Wynajem:
 *   - Koszty początkowe: kaucja (zwrotna)
 *   - Koszty miesięczne: czynsz najmu
 *   - Zysk: oszczędność (różnica między dochodem a kosztami najmu) zainwestowana
 */

import { generateAmortizationSchedule } from './loanCalculations'

export interface RentVsBuyInput {
  // Property
  propertyPrice: number
  // Loan
  downPaymentPercent: number
  loanRate: number
  loanTermYears: number
  // Buying costs
  commissionPercent: number
  notaryCosts: number
  pccPercent: number // 2% for secondary market, 0% for primary
  renovationCosts: number
  monthlyMaintenance: number // media, fundusz remontowy, etc.
  monthlyInsurance: number
  // Rent
  monthlyRent: number
  rentIncreaseAnnual: number // % annual increase
  // Investment
  investmentReturnRate: number // % return on invested savings
  propertyAppreciation: number // % annual property value increase
  // Time horizon
  yearsToCompare: number
}

export interface YearComparison {
  year: number
  // Buy
  buyCumulativeCosts: number
  buyEquity: number // paid principal
  buyPropertyValue: number
  buyNetWorth: number // propertyValue - remainingDebt
  buyTotalSpent: number
  // Rent
  rentCumulativeCosts: number
  rentInvestedSavings: number
  rentNetWorth: number
  rentTotalSpent: number
  // Difference
  netWorthDiff: number // positive = buying better
  monthlyCostBuy: number
  monthlyCostRent: number
}

export interface RentVsBuyResult {
  input: RentVsBuyInput
  yearlyData: YearComparison[]
  conclusion: {
    buyIsBetter: boolean
    breakEvenYear: number | null
    buyTotalCost: number
    rentTotalCost: number
    buyNetWorthFinal: number
    rentNetWorthFinal: number
    recommendation: string
  }
}

export function compareRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const {
    propertyPrice, downPaymentPercent, loanRate, loanTermYears,
    commissionPercent, notaryCosts, pccPercent, renovationCosts,
    monthlyMaintenance, monthlyInsurance,
    monthlyRent, rentIncreaseAnnual,
    investmentReturnRate, propertyAppreciation,
    yearsToCompare,
  } = input

  const downPayment = propertyPrice * (downPaymentPercent / 100)
  const principal = propertyPrice - downPayment
  const totalMonths = loanTermYears * 12

  // Upfront costs for buying
  const commission = propertyPrice * (commissionPercent / 100)
  const pcc = propertyPrice * (pccPercent / 100)
  const totalUpfrontBuy = downPayment + commission + notaryCosts + pcc + renovationCosts

  // Upfront costs for renting (refundable deposit, not included)
  const totalUpfrontRent = 0 // deposit is returned

  // Generate amortization schedule
  const schedule = principal > 0
    ? generateAmortizationSchedule(principal, loanRate, totalMonths, 'equal')
    : []

  const yearlyData: YearComparison[] = []
  let buyTotalSpent = totalUpfrontBuy
  let rentTotalSpent = totalUpfrontRent
  let rentSavingsInvested = 0
  let currentRent = monthlyRent

  for (let year = 1; year <= yearsToCompare; year++) {
    // --- BUY ---
    const yearStartMonth = (year - 1) * 12
    const yearEndMonth = Math.min(year * 12, totalMonths)

    let yearBuyMonthlyTotal = 0
    let yearEquityIncrease = 0
    let yearInterestPaid = 0

    for (let m = yearStartMonth; m < yearEndMonth; m++) {
      if (m < schedule.length) {
        const row = schedule[m]
        yearBuyMonthlyTotal += row.totalPayment
        yearEquityIncrease += row.principalPart
        yearInterestPaid += row.interestPart
      }
    }

    // Add maintenance and insurance for the year
    const yearMaintenance = monthlyMaintenance * 12
    const yearInsurance = monthlyInsurance * 12
    const yearlyBuyCost = yearBuyMonthlyTotal + yearMaintenance + yearInsurance
    buyTotalSpent += yearlyBuyCost

    // Property value with appreciation
    const currentPropertyValue = propertyPrice * Math.pow(1 + propertyAppreciation / 100, year)

    // Remaining debt
    const monthsPaid = Math.min(year * 12, totalMonths)
    const remainingDebt = monthsPaid < schedule.length
      ? schedule[monthsPaid - 1]?.remainingBalance ?? 0
      : 0

    const buyEquity = principal - remainingDebt
    const buyNetWorth = currentPropertyValue - remainingDebt

    // --- RENT ---
    const yearlyRent = currentRent * 12
    rentTotalSpent += yearlyRent

    // Monthly savings: what renter saves vs buyer (simplified)
    const monthlySaving = (yearlyBuyCost - yearlyRent) / 12
    // Invest the savings
    rentSavingsInvested = (rentSavingsInvested + Math.max(0, monthlySaving) * 12) * (1 + investmentReturnRate / 100)
    if (monthlySaving < 0) {
      // Renter spends more, draw from investment
      const deficit = Math.abs(monthlySaving) * 12
      rentSavingsInvested = Math.max(0, rentSavingsInvested - deficit)
    }

    const rentNetWorth = rentSavingsInvested

    // Increase rent for next year
    currentRent *= (1 + rentIncreaseAnnual / 100)

    // Difference
    const netWorthDiff = buyNetWorth - rentNetWorth

    yearlyData.push({
      year,
      buyCumulativeCosts: Math.round(buyTotalSpent),
      buyEquity: Math.round(buyEquity),
      buyPropertyValue: Math.round(currentPropertyValue),
      buyNetWorth: Math.round(buyNetWorth),
      buyTotalSpent: Math.round(buyTotalSpent),
      rentCumulativeCosts: Math.round(rentTotalSpent),
      rentInvestedSavings: Math.round(rentSavingsInvested),
      rentNetWorth: Math.round(rentNetWorth),
      rentTotalSpent: Math.round(rentTotalSpent),
      netWorthDiff: Math.round(netWorthDiff),
      monthlyCostBuy: Math.round(yearlyBuyCost / 12),
      monthlyCostRent: Math.round(yearlyRent / 12),
    })
  }

  // Determine break-even year
  let breakEvenYear: number | null = null
  for (const d of yearlyData) {
    if (d.netWorthDiff >= 0) {
      breakEvenYear = d.year
      break
    }
  }

  const lastYear = yearlyData[yearlyData.length - 1]
  const buyIsBetter = lastYear ? lastYear.buyNetWorth > lastYear.rentNetWorth : false

  let recommendation = ''
  if (breakEvenYear === null) {
    recommendation = `W perspektywie ${yearsToCompare} lat wynajem jest bardziej opłacalny.`
  } else if (breakEvenYear <= 3) {
    recommendation = `Zakup na kredyt zwraca się już po ${breakEvenYear} latach. Jeśli planujesz zostać w miejscu dłużej — kupuj.`
  } else if (breakEvenYear <= yearsToCompare) {
    recommendation = `Zakup na kredyt zaczyna być opłacalny po ${breakEvenYear} latach.`
  } else {
    recommendation = `W perspektywie ${yearsToCompare} lat wynajem jest bardziej opłacalny.`
  }

  return {
    input,
    yearlyData,
    conclusion: {
      buyIsBetter,
      breakEvenYear,
      buyTotalCost: Math.round(lastYear?.buyTotalSpent ?? 0),
      rentTotalCost: Math.round(lastYear?.rentTotalSpent ?? 0),
      buyNetWorthFinal: Math.round(lastYear?.buyNetWorth ?? 0),
      rentNetWorthFinal: Math.round(lastYear?.rentNetWorth ?? 0),
      recommendation,
    },
  }
}
