export const LOAN_CONSTANTS = {
  // Prowizje
  PROVISION_RATE: 0.02, // 2% standardowo
  EARLY_REPAYMENT_FEE: 0.03, // max 3% w pierwszych 36 mc
  EARLY_REPAYMENT_MONTHS: 36,

  // LTV progi
  LTV_THRESHOLDS: {
    EXCELLENT: 0.5, // <50%
    GOOD: 0.8, // <80%
    HIGH: 0.9 // <90%
  },

  // Marże (typowe korekty)
  MARGIN_ADJUSTMENTS: {
    LTV_BELOW_50: -0.003, // -0.3pp
    LTV_80_TO_90: 0.003, // +0.3pp
    LTV_ABOVE_90: 0.008 // +0.8pp
  },

  // Koszty dodatkowe
  COSTS: {
    NOTARY_MIN: 1000,
    NOTARY_RATE: 0.003, // 0.3% wartości
    LAND_REGISTRY: 200,
    VALUATION_MIN: 1000,
    VALUATION_MAX: 3000,
    INSURANCE_HOME_YEARLY: 800,
    INSURANCE_CREDIT_YEARLY: 600, // jeśli LTV>80%
    BRIDGING_INSURANCE_MONTHLY: 300
  },

  // Affordability (Zdolność)
  AFFORDABILITY: {
    MIN_LIVING_COST_PER_PERSON: 1200,
    MAX_DSTI: 0.5, // 50% of income after living costs
    MAX_AGE: 70,
    EMPLOYMENT_MULTIPLIERS: {
      UOP: 1.0,
      B2B: 0.6,
      CONTRACT: 0.7
    }
  }
} as const

export type LoanConstants = typeof LOAN_CONSTANTS
