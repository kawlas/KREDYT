export interface BankProfile {
  id: string
  name: string
  typicalMarginMin: number
  typicalMarginMax: number
  provision: number // as decimal (0.02 = 2%)
  insuranceRequired: boolean // low-equity insurance when LTV > 80%
  minLtv: number
  maxLtv: number
  fixedRateAvailable: boolean
  typicalFixedMargin: number
  earlyRepaymentPolicy: string
  sourceUrl: string // link do oficjalnej tabeli oprocentowania banku
  sourceLabel: string // np. "Tabela oprocentowania PKO BP"
}

export const BANK_PROFILES: BankProfile[] = [
  {
    id: 'pko-bp',
    name: 'PKO BP',
    typicalMarginMin: 1.70,
    typicalMarginMax: 2.30,
    provision: 0.00,
    insuranceRequired: true,
    minLtv: 10,
    maxLtv: 90,
    fixedRateAvailable: true,
    typicalFixedMargin: 1.50,
    earlyRepaymentPolicy: '0% po 1. roku (zmienne), 2% (stałe, pierwsze 3 lata)',
    sourceUrl: 'https://www.pkobp.pl/kredyty-hipoteczne/',
    sourceLabel: 'Oferta PKO BP – kredyty hipoteczne',
  },
  {
    id: 'ing',
    name: 'ING Bank Śląski',
    typicalMarginMin: 1.75,
    typicalMarginMax: 2.20,
    provision: 0.00,
    insuranceRequired: true,
    minLtv: 10,
    maxLtv: 90,
    fixedRateAvailable: true,
    typicalFixedMargin: 1.60,
    earlyRepaymentPolicy: '0% w każdym momencie (nadpłata bezpłatna)',
    sourceUrl: 'https://www.ing.pl/kredyty-hipoteczne',
    sourceLabel: 'Oferta ING – kredyty hipoteczne',
  },
  {
    id: 'santander',
    name: 'Santander Bank Polska',
    typicalMarginMin: 2.20,
    typicalMarginMax: 3.40,
    provision: 0.00,
    insuranceRequired: true,
    minLtv: 10,
    maxLtv: 90,
    fixedRateAvailable: true,
    typicalFixedMargin: 2.90,
    earlyRepaymentPolicy: '0% po 1. roku (zmienne), do 2% (stałe, pierwsze 3 lata)',
    sourceUrl: 'https://www.santander.pl/klient-indywidualny/kredyty/kredyt-hipoteczny',
    sourceLabel: 'Oferta Santander – kredyty hipoteczne',
  },
  {
    id: 'mbank',
    name: 'mBank',
    typicalMarginMin: 1.85,
    typicalMarginMax: 2.40,
    provision: 0.00,
    insuranceRequired: true,
    minLtv: 10,
    maxLtv: 90,
    fixedRateAvailable: true,
    typicalFixedMargin: 2.00,
    earlyRepaymentPolicy: '2% w pierwszych 3 latach (wg umowy)',
    sourceUrl: 'https://www.mbank.pl/indywidualny/kredyty/hipoteczny/',
    sourceLabel: 'Oferta mBank – kredyt hipoteczny',
  },
  {
    id: 'millennium',
    name: 'Bank Millennium',
    typicalMarginMin: 2.10,
    typicalMarginMax: 2.87,
    provision: 0.00,
    insuranceRequired: true,
    minLtv: 10,
    maxLtv: 90,
    fixedRateAvailable: true,
    typicalFixedMargin: 6.23,
    earlyRepaymentPolicy: '0% po 1. roku (zmienne)',
    sourceUrl: 'https://www.bankmillennium.pl/kredyty/kredyt-hipoteczny',
    sourceLabel: 'Oferta Millennium – kredyt hipoteczny',
  },
  {
    id: 'pekao',
    name: 'Bank Pekao SA',
    typicalMarginMin: 2.40,
    typicalMarginMax: 3.80,
    provision: 0.00,
    insuranceRequired: true,
    minLtv: 10,
    maxLtv: 90,
    fixedRateAvailable: true,
    typicalFixedMargin: 2.27,
    earlyRepaymentPolicy: '0% po 1. roku (zmienne), do 2% (stałe)',
    sourceUrl: 'https://www.pekao.com.pl/indywidualny/kredyty/kredyt-hipoteczny.html',
    sourceLabel: 'Oferta Pekao – kredyt hipoteczny',
  },
  {
    id: 'alior',
    name: 'Alior Bank',
    typicalMarginMin: 2.10,
    typicalMarginMax: 3.10,
    provision: 0.00,
    insuranceRequired: true,
    minLtv: 10,
    maxLtv: 90,
    fixedRateAvailable: true,
    typicalFixedMargin: 2.50,
    earlyRepaymentPolicy: '0% po 1. roku (zmienne)',
    sourceUrl: 'https://www.aliorbank.pl/kredyty/kredyt-hipoteczny/',
    sourceLabel: 'Oferta Alior – kredyt hipoteczny',
  },
]

export function getBankById(id: string): BankProfile | undefined {
  return BANK_PROFILES.find(b => b.id === id)
}
