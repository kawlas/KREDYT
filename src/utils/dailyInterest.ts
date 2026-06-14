export interface DailyInterestResult {
  dailyRate: number
  dailyInterest: number
  monthlyInterest: number
  convention: 'act/365' | 'act/360'
}

export interface AccumulatedResult {
  daysSinceLastPayment: number
  accruedInterest: number
  lastPaymentDate: Date
  nextPaymentDate: Date
}

/**
 * Daily interest using actual/365 convention (Polish standard).
 * Formula: principal * annualRate * days / 365 days
 */
export function calculateDailyInterest(
  principal: number,
  annualRate: number,
  daysInPeriod: number = 1
): DailyInterestResult {
  const dailyRate = annualRate / 365 / 100
  return {
    dailyRate,
    dailyInterest: principal * dailyRate * daysInPeriod,
    monthlyInterest: principal * dailyRate * 30.41666, // average month
    convention: 'act/365',
  }
}

/**
 * Daily interest using actual/360 convention (used by some banks).
 */
export function calculateDailyInterestAct360(
  principal: number,
  annualRate: number,
  daysInPeriod: number = 1
): DailyInterestResult {
  const dailyRate = annualRate / 360 / 100
  return {
    dailyRate,
    dailyInterest: principal * dailyRate * daysInPeriod,
    monthlyInterest: principal * dailyRate * 30,
    convention: 'act/360',
  }
}

/**
 * Compare act/365 vs act/360 for a given period.
 */
export function compare365vs360(
  principal: number,
  annualRate: number,
  daysInMonth: number
): { act365: DailyInterestResult; act360: DailyInterestResult; difference: number; differencePercent: number } {
  const act365 = calculateDailyInterest(principal, annualRate, daysInMonth)
  const act360 = calculateDailyInterestAct360(principal, annualRate, daysInMonth)
  return {
    act365,
    act360,
    difference: act360.dailyInterest - act365.dailyInterest,
    differencePercent: ((act360.dailyInterest / act365.dailyInterest) - 1) * 100,
  }
}

/**
 * Accumulated interest since last payment date.
 */
export function calculateAccumulatedInterest(
  principal: number,
  annualRate: number,
  lastPaymentDate: Date,
  today: Date = new Date()
): AccumulatedResult {
  const diffMs = today.getTime() - lastPaymentDate.getTime()
  const daysSinceLastPayment = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))

  const dailyRate = annualRate / 365 / 100
  const accruedInterest = principal * dailyRate * daysSinceLastPayment

  const nextPayment = new Date(lastPaymentDate)
  nextPayment.setMonth(nextPayment.getMonth() + 1)

  return {
    daysSinceLastPayment,
    accruedInterest,
    lastPaymentDate,
    nextPaymentDate: nextPayment,
  }
}
