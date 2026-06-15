import { generateAmortizationSchedule } from './loanCalculations'

export interface ChartYearData {
  year: number
  principal: number
  interest: number
  total: number
  remainingBalance: number
}

export interface AmortizationInsights {
  totalInterest: number
  totalPaid: number
  interestToPrincipalRatio: number
  halfwayPointYear: number
  firstYearInterestPercent: number
}

export function prepareChartData(
  principal: number,
  annualRate: number,
  loanTermYears: number,
  installmentType: 'equal' | 'declining'
): ChartYearData[] {
  if (principal <= 0 || loanTermYears <= 0) return []

  const months = loanTermYears * 12
  const schedule = generateAmortizationSchedule(principal, annualRate, months, installmentType)
  const yearlyData: ChartYearData[] = []

  for (let year = 0; year < loanTermYears; year++) {
    const start = year * 12
    const end = Math.min(start + 12, months)
    const yearRows = schedule.slice(start, end)

    const principalSum = yearRows.reduce((sum, r) => sum + r.principalPart, 0)
    const interestSum = yearRows.reduce((sum, r) => sum + r.interestPart, 0)
    const totalSum = yearRows.reduce((sum, r) => sum + r.totalPayment, 0)
    const remainingBalance = yearRows[yearRows.length - 1]?.remainingBalance ?? 0

    yearlyData.push({
      year: year + 1,
      principal: principalSum,
      interest: interestSum,
      total: totalSum,
      remainingBalance,
    })
  }

  return yearlyData
}

export function getAmortizationInsights(
  principal: number,
  annualRate: number,
  loanTermYears: number
): AmortizationInsights {
  const chartData = prepareChartData(principal, annualRate, loanTermYears, 'equal')
  if (chartData.length === 0) {
    return { totalInterest: 0, totalPaid: 0, interestToPrincipalRatio: 0, halfwayPointYear: 0, firstYearInterestPercent: 0 }
  }

  const totalPaid = chartData.reduce((sum, y) => sum + y.total, 0)
  const totalInterest = totalPaid - principal
  const interestToPrincipalRatio = principal > 0 ? totalInterest / principal : 0

  const halfwayIdx = chartData.findIndex(y => y.interest < y.principal)
  const halfwayPointYear = halfwayIdx >= 0 ? chartData[halfwayIdx].year : loanTermYears

  const firstYearInterestPercent = chartData[0].total > 0
    ? (chartData[0].interest / chartData[0].total) * 100
    : 0

  return { totalInterest, totalPaid, interestToPrincipalRatio, halfwayPointYear, firstYearInterestPercent }
}
