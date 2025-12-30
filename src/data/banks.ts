export interface BankOffer {
  id: string
  name: string
  fullName: string
  logo?: string // Optional: URL to logo
  margin: number // % (e.g., 2.0 = 2%)
  commission: number // % of loan amount (e.g., 1.0 = 1%)
  insurance: {
    required: boolean
    monthlyCost?: number // Fixed PLN per month
    description?: string
  }
  features: string[]
  color: string // For UI highlighting
  website?: string
}

export const POLISH_BANKS: BankOffer[] = [
  {
    id: 'pko',
    name: 'PKO BP',
    fullName: 'PKO Bank Polski',
    margin: 2.0,
    commission: 0,
    insurance: {
      required: false,
      description: 'Ubezpieczenie opcjonalne'
    },
    features: [
      'Brak prowizji',
      'Możliwość negocjacji marży',
      'Największy bank w Polsce'
    ],
    color: '#0066CC',
    website: 'https://www.pkobp.pl'
  },
  {
    id: 'santander',
    name: 'Santander',
    fullName: 'Santander Bank Polska',
    margin: 1.85,
    commission: 1.0,
    insurance: {
      required: true,
      description: 'Wymagane ubezpieczenie nieruchomości'
    },
    features: [
      'Niska marża',
      'Prowizja 1%',
      'Szybka ścieżka online'
    ],
    color: '#EC0000',
    website: 'https://www.santander.pl'
  },
  {
    id: 'mbank',
    name: 'mBank',
    fullName: 'mBank S.A.',
    margin: 1.95,
    commission: 0,
    insurance: {
      required: false,
      monthlyCost: 25,
      description: 'Ubezpieczenie opcjonalne, ~25 zł/mies'
    },
    features: [
      'Brak prowizji',
      'W pełni online',
      'Szybki proces'
    ],
    color: '#D4145A',
    website: 'https://www.mbank.pl'
  },
  {
    id: 'ing',
    name: 'ING',
    fullName: 'ING Bank Śląski',
    margin: 1.90,
    commission: 0.5,
    insurance: {
      required: false,
      description: 'Ubezpieczenie opcjonalne'
    },
    features: [
      'Konkurencyjna marża',
      'Niska prowizja 0.5%',
      'Doradztwo online'
    ],
    color: '#FF6200',
    website: 'https://www.ing.pl'
  },
  {
    id: 'millennium',
    name: 'Millennium',
    fullName: 'Bank Millennium',
    margin: 2.1,
    commission: 0,
    insurance: {
      required: false,
      description: 'Ubezpieczenie opcjonalne'
    },
    features: [
      'Brak prowizji',
      'Długa tradycja',
      'Elastyczne warunki'
    ],
    color: '#FFD700',
    website: 'https://www.bankmillennium.pl'
  },
  {
    id: 'pekao',
    name: 'Pekao',
    fullName: 'Bank Pekao S.A.',
    margin: 2.05,
    commission: 0,
    insurance: {
      required: false,
      description: 'Ubezpieczenie opcjonalne'
    },
    features: [
      'Brak prowizji',
      'Duża sieć placówek',
      'Stabilny bank'
    ],
    color: '#005EB8',
    website: 'https://www.pekao.com.pl'
  },
  {
    id: 'bnpparibas',
    name: 'BNP Paribas',
    fullName: 'BNP Paribas Bank Polska',
    margin: 2.15,
    commission: 0,
    insurance: {
      required: false,
      description: 'Ubezpieczenie opcjonalne'
    },
    features: [
      'Brak prowizji',
      'Międzynarodowy bank',
      'Prestiżowa marka'
    ],
    color: '#00915A',
    website: 'https://www.bnpparibas.pl'
  },
  {
    id: 'alior',
    name: 'Alior',
    fullName: 'Alior Bank',
    margin: 2.25,
    commission: 0,
    insurance: {
      required: false,
      monthlyCost: 30,
      description: 'Ubezpieczenie opcjonalne, ~30 zł/mies'
    },
    features: [
      'Brak prowizji',
      'Nowoczesna bankowość',
      'Konkurencyjne warunki dla młodych'
    ],
    color: '#FF8200',
    website: 'https://www.aliorbank.pl'
  }
]

/**
 * Get bank by ID
 */
export function getBankById(id: string): BankOffer | undefined {
  return POLISH_BANKS.find(bank => bank.id === id)
}

/**
 * Get banks sorted by margin (ascending)
 */
export function getBanksByMargin(): BankOffer[] {
  return [...POLISH_BANKS].sort((a, b) => a.margin - b.margin)
}

/**
 * Get banks with no commission
 */
export function getBanksWithoutCommission(): BankOffer[] {
  return POLISH_BANKS.filter(bank => bank.commission === 0)
}
