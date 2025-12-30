export const LOAN_CONSTANTS = {
  MIN_PRINCIPAL: 50000,
  MAX_PRINCIPAL: 2000000,
  MIN_YEARS: 1,
  MAX_YEARS: 35,
  DEFAULT_WIBOR: 5.85,
  DEFAULT_MARGIN: 2.0,
  LTV_THRESHOLD: 80, // Powyżej tego progu wymagane ubezpieczenie niskiego wkładu
  NOTARY_FEE_BASE: 1000,
  VALUATION_FEE_BASE: 1000,
  LAND_REGISTER_FEE: 200,
  BRIDGE_INSURANCE_RATE: 0.01, // 1% rocznie (uproszczone)
  BRIDGE_INSURANCE_MONTHS: 3,
  PROPERTY_INSURANCE_RATE: 0.0008, // 0.08% rocznie (uproszczone)
} as const
