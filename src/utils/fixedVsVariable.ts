import { calculateMonthlyPayment, generateAmortizationSchedule } from './loanCalculations'

export interface FixedScenario {
  type: 'fixed'
  label: string
  rate: number
  fixedPeriodYears: number
  fixedPeriodMonths: number
  monthlyPayment: number
  totalInterest: number
  totalPaid: number
}

export interface VariableScenario {
  type: 'variable'
  label: string
  rate: number
  monthlyPayment: number
  totalInterest: number
  totalPaid: number
}

export interface FixedVsVariableComparison {
  fixed: FixedScenario
  variable: VariableScenario
  difference: {
    monthly: number
    totalInterest: number
    totalPaid: number
  }
  recommendation: string
  breakevenRate: number
}

export function calculateFixedScenario(
  principal: number,
  fixedRate: number,
  totalYears: number,
  fixedPeriodYears: number
): FixedScenario {
  if (principal <= 0) return {
    type: 'fixed', label: 'Stałe oprocentowanie', rate: fixedRate,
    fixedPeriodYears, fixedPeriodMonths: 0, monthlyPayment: 0, totalInterest: 0, totalPaid: 0
  }

  const totalMonths = totalYears * 12
  const fixedPeriodMonths = Math.min(fixedPeriodYears * 12, totalMonths)

  const monthlyPayment = calculateMonthlyPayment(principal, fixedRate, totalMonths, 'equal')
  const schedule = generateAmortizationSchedule(principal, fixedRate, totalMonths, 'equal')

  const totalPaid = schedule.reduce((sum, row) => sum + row.totalPayment, 0)
  const totalInterest = totalPaid - principal

  return {
    type: 'fixed', label: 'Stałe oprocentowanie', rate: fixedRate,
    fixedPeriodYears, fixedPeriodMonths, monthlyPayment, totalInterest, totalPaid
  }
}

export function calculateVariableScenario(
  principal: number,
  variableRate: number,
  totalYears: number
): VariableScenario {
  if (principal <= 0) return {
    type: 'variable', label: 'Zmienne oprocentowanie', rate: variableRate,
    monthlyPayment: 0, totalInterest: 0, totalPaid: 0
  }

  const totalMonths = totalYears * 12
  const monthlyPayment = calculateMonthlyPayment(principal, variableRate, totalMonths, 'equal')
  const schedule = generateAmortizationSchedule(principal, variableRate, totalMonths, 'equal')

  const totalPaid = schedule.reduce((sum, row) => sum + row.totalPayment, 0)
  const totalInterest = totalPaid - principal

  return {
    type: 'variable', label: 'Zmienne oprocentowanie', rate: variableRate,
    monthlyPayment, totalInterest, totalPaid
  }
}

export function compareFixedVsVariable(
  principal: number,
  variableRate: number,
  fixedRate: number,
  totalYears: number,
  fixedPeriodYears: number = 5
): FixedVsVariableComparison {
  const totalMonths = totalYears * 12
  const fixed = calculateFixedScenario(principal, fixedRate, totalYears, fixedPeriodYears)
  const variable = calculateVariableScenario(principal, variableRate, totalYears)

  const difference = {
    monthly: fixed.monthlyPayment - variable.monthlyPayment,
    totalInterest: fixed.totalInterest - variable.totalInterest,
    totalPaid: fixed.totalPaid - variable.totalPaid,
  }

  // Binary search for the actual break-even rate (where monthly payments equal)
  const targetPayment = fixed.monthlyPayment
  let breakevenRate = variableRate
  if (Math.abs(targetPayment - variable.monthlyPayment) > 0.01 && principal > 0 && totalYears > 0) {
    let lo = 0, hi = 50 // search 0% to 50% annual
    for (let i = 0; i < 50; i++) {
      const mid = (lo + hi) / 2
      const pmt = calculateMonthlyPayment(principal, mid, totalMonths, 'equal')
      if (pmt > targetPayment) hi = mid
      else lo = mid
    }
    breakevenRate = (lo + hi) / 2
  }
  const breakevenRateClamped = Math.max(0, breakevenRate)

  let recommendation = ''
  if (fixedRate <= variableRate) {
    recommendation = `Oprocentowanie stałe jest NIŻSZE niż zmienne. To świetna okazja, aby zamrozić niską ratę na ${fixedPeriodYears} lat.`
  } else if (fixedRate - variableRate < 1) {
    recommendation = `Różnica między stałym a zmiennym jest niewielka (${(fixedRate - variableRate).toFixed(2)} p.p.). Stałe daje pewność raty przez ${fixedPeriodYears} lat — warto rozważyć dla spokoju ducha.`
  } else {
    recommendation = `Oprocentowanie stałe jest wyższe o ${(fixedRate - variableRate).toFixed(2)} p.p. Wybierz zmienne, jeśli możesz zaakceptować ryzyko wzrostu stóp. Symuluj wzrost WIBOR, aby sprawdzić swoją odporność.`
  }

  return { fixed, variable, difference, recommendation, breakevenRate: breakevenRateClamped }
}
