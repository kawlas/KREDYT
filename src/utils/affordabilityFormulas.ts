import { LOAN_CONSTANTS } from '../types/constants'

export type EmploymentType = 'UOP' | 'B2B' | 'CONTRACT'

export interface AffordabilityParams {
  income: number
  employmentType: EmploymentType
  obligations: number
  dependents: number
  age: number
  wibor: number
  margin: number
}

export interface AffordabilityResult {
  maxLoanAmount: number
  maxMonthlyPayment: number
  maxTermMonths: number
  effectiveIncome: number
  disposableIncome: number
  ltv80PropertyValue: number
  alerts: {
    type: 'info' | 'warning'
    message: string
  }[]
}

export function calculateAffordability(params: AffordabilityParams): AffordabilityResult {
  const { income, employmentType, obligations, dependents, age, wibor, margin } = params
  const constants = LOAN_CONSTANTS.AFFORDABILITY

  // 1. Effective Income based on employment type
  const multiplier = constants.EMPLOYMENT_MULTIPLIERS[employmentType]
  const effectiveIncome = income * multiplier

  // 2. Minimum living costs
  const minLivingCosts = constants.MIN_LIVING_COST_PER_PERSON * (dependents + 1)

  // 3. Disposable income for loan installment
  // Formula: (Effective Income - obligations - min living) * MAX_DSTI
  const incomeRemaining = effectiveIncome - obligations - minLivingCosts
  const disposableIncome = Math.max(0, incomeRemaining * constants.MAX_DSTI)

  // 4. Max term based on age
  const maxYears = Math.min(35, constants.MAX_AGE - age)
  const maxTermMonths = Math.max(0, maxYears * 12)

  // 5. Calculate max loan amount
  // We need to reverse the monthly payment formula:
  // Payment = P * (i * (1+i)^n) / ((1+i)^n - 1)
  // P = Payment * ((1+i)^n - 1) / (i * (1+i)^n)
  
  const annualRate = wibor + margin
  const monthlyRate = annualRate / 12 / 100
  const n = maxTermMonths

  let maxLoanAmount = 0
  if (n > 0 && disposableIncome > 0) {
    if (monthlyRate === 0) {
      maxLoanAmount = disposableIncome * n
    } else {
      const pow = Math.pow(1 + monthlyRate, n)
      maxLoanAmount = (disposableIncome * (pow - 1)) / (monthlyRate * pow)
    }
  }

  // 6. Max property value with 20% down payment
  const ltv80PropertyValue = maxLoanAmount / 0.8

  // 7. Contextual Alerts
  const alerts: AffordabilityResult['alerts'] = []

  if (employmentType === 'B2B') {
    alerts.push({
      type: 'info',
      message: 'Dla B2B banki zazwyczaj przyjmują do 60% przychodu jako dochód netto.'
    })
  } else if (employmentType === 'CONTRACT') {
    alerts.push({
      type: 'info',
      message: 'Dla umów zlecenie/o dzieło banki zazwyczaj przyjmują ok. 70% przychodu.'
    })
  }

  if (age > 45) {
    alerts.push({
      type: 'warning',
      message: `Ze względu na wiek (${age} lat), maksymalny okres kredytowania to ${maxYears} lat.`
    })
  }

  if (disposableIncome <= 0) {
    alerts.push({
      type: 'warning',
      message: 'Twoje koszty życia i zobowiązania przekraczają dochód. Brak zdolności kredytowej.'
    })
  }

  return {
    maxLoanAmount: Math.floor(maxLoanAmount),
    maxMonthlyPayment: Math.floor(disposableIncome),
    maxTermMonths,
    effectiveIncome,
    disposableIncome,
    ltv80PropertyValue: Math.floor(ltv80PropertyValue),
    alerts
  }
}
