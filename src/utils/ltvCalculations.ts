export function calculateLTV(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0
  return Math.round((loanAmount / propertyValue) * 100 * 100) / 100
}

export function calculateEquity(loanAmount: number, propertyValue: number): number {
  return Math.max(0, propertyValue - loanAmount)
}

export interface LTVRiskBand {
  band: 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED'
  label: string
  description: string
  color: string
  bgColor: string
}

export function getLTVRiskBand(ltv: number): LTVRiskBand {
  if (ltv <= 60) return { band: 'GREEN', label: 'Niskie ryzyko', description: 'Bardzo niskie LTV — bank zaoferuje najlepsze warunki. Masz wysoki wkład własny.', color: 'text-green-700', bgColor: 'bg-green-50' }
  if (ltv <= 80) return { band: 'YELLOW', label: 'Umiarkowane ryzyko', description: 'Standardowe LTV. Dobre warunki, brak dodatkowych ubezpieczeń.', color: 'text-yellow-700', bgColor: 'bg-yellow-50' }
  if (ltv <= 90) return { band: 'ORANGE', label: 'Podwyższone ryzyko', description: 'LTV powyżej 80% — bank może wymagać ubezpieczenia niskiego wkładu (UNWW).', color: 'text-orange-700', bgColor: 'bg-orange-50' }
  return { band: 'RED', label: 'Wysokie ryzyko', description: 'Bardzo wysokie LTV — ograniczona liczba banków udzieli kredytu. Konieczne ubezpieczenie niskiego wkładu.', color: 'text-red-700', bgColor: 'bg-red-50' }
}

export interface LTVScenario {
  propertyValue: number
  equityPercent: number
  equityAmount: number
  loanAmount: number
  ltv: number
}

export function calculateLTVScenarios(propertyValue: number, equityPercent: number): LTVScenario {
  const equityAmount = propertyValue * (equityPercent / 100)
  const loanAmount = propertyValue - equityAmount
  const ltv = calculateLTV(loanAmount, propertyValue)
  return { propertyValue, equityPercent, equityAmount, loanAmount, ltv }
}
