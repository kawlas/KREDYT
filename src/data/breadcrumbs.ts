export interface BreadcrumbItem {
  path: string
  label: string
}

export const breadcrumbHierarchy: Record<string, BreadcrumbItem[]> = {
  '/': [{ path: '/', label: 'Start' }],
  '/kalkulator-raty-kredytu/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/kalkulator-raty-kredytu/', label: 'Kalkulator raty' },
  ],
  '/zdolnosc-kredytowa/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/zdolnosc-kredytowa/', label: 'Zdolność kredytowa' },
  ],
  '/ltv-kalkulator/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/ltv-kalkulator/', label: 'Kalkulator LTV' },
  ],
  '/odsetki-dzienne/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/odsetki-dzienne/', label: 'Odsetki dzienne' },
  ],
  '/symulacja-wibor/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/symulacja-wibor/', label: 'Symulacja WIBOR' },
  ],
  '/kalkulator-prowizji/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/kalkulator-prowizji/', label: 'Prowizja bankowa' },
  ],
  '/kalkulator-ubezpieczen/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/kalkulator-ubezpieczen/', label: 'Ubezpieczenia' },
  ],
  '/kredyt-vs-wynajem/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Kalkulatory' },
    { path: '/kredyt-vs-wynajem/', label: 'Kredyt vs wynajem' },
  ],
  '/raty-rowne-czy-malejace/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Porównaj' },
    { path: '/raty-rowne-czy-malejace/', label: 'Raty równe/malejące' },
  ],
  '/porownanie-ofert-bankow/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Porównaj' },
    { path: '/porownanie-ofert-bankow/', label: 'Porównanie banków' },
  ],
  '/refinansowanie-kredytu/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Porównaj' },
    { path: '/refinansowanie-kredytu/', label: 'Refinansowanie' },
  ],
  '/stale-vs-zmienne-oprocentowanie/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Porównaj' },
    { path: '/stale-vs-zmienne-oprocentowanie/', label: 'Stałe/Zmienne' },
  ],
  '/ukryte-koszty-kredytu/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Analiza' },
    { path: '/ukryte-koszty-kredytu/', label: 'Ukryte koszty' },
  ],
  '/co-wplywa-na-zdolnosc/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Analiza' },
    { path: '/co-wplywa-na-zdolnosc/', label: 'Scoring BIK' },
  ],
  '/symulator-nadplat/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Analiza' },
    { path: '/symulator-nadplat/', label: 'Nadpłaty' },
  ],
  '/poradniki/': [
    { path: '/', label: 'Start' },
    { path: '/poradniki/', label: 'Poradniki' },
  ],
  '/poradniki/jak-obliczyc-rate/': [
    { path: '/', label: 'Start' },
    { path: '/poradniki/', label: 'Poradniki' },
    { path: '/poradniki/jak-obliczyc-rate/', label: 'Jak obliczyć ratę?' },
  ],
  '/poradniki/zdolnosc-kredytowa/': [
    { path: '/', label: 'Start' },
    { path: '/poradniki/', label: 'Poradniki' },
    { path: '/poradniki/zdolnosc-kredytowa/', label: 'Zdolność kredytowa' },
  ],
  '/poradniki/wibor-a-rata/': [
    { path: '/', label: 'Start' },
    { path: '/poradniki/', label: 'Poradniki' },
    { path: '/poradniki/wibor-a-rata/', label: 'WIBOR a rata' },
  ],
  '/faq-kredyt-hipoteczny/': [
    { path: '/', label: 'Start' },
    { path: '/faq-kredyt-hipoteczny/', label: 'FAQ' },
  ],
  '/przygotowanie-do-kredytu/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Analiza' },
    { path: '/przygotowanie-do-kredytu/', label: 'Przygotowanie' },
  ],
  '/koszt-utrzymania-nieruchomosci/': [
    { path: '/', label: 'Start' },
    { path: '/', label: 'Narzędzia' },
    { path: '/', label: 'Analiza' },
    { path: '/koszt-utrzymania-nieruchomosci/', label: 'Koszt utrzymania' },
  ],
  '/mity-kredytowe/': [
    { path: '/', label: 'Start' },
    { path: '/mity-kredytowe/', label: 'Mity kredytowe' },
  ],
  '/poradniki/strategia-maksymalizacji-zysku/': [
    { path: '/', label: 'Start' },
    { path: '/poradniki/', label: 'Poradniki' },
    { path: '/poradniki/strategia-maksymalizacji-zysku/', label: 'Strategia Maksymalizacji Zysku' },
  ],
  '/o-projekcie/': [
    { path: '/', label: 'Start' },
    { path: '/o-projekcie/', label: 'O projekcie' },
  ],
  '/metodologia/': [
    { path: '/', label: 'Start' },
    { path: '/metodologia/', label: 'Metodologia' },
  ],
  '/kontakt/': [
    { path: '/', label: 'Start' },
    { path: '/kontakt/', label: 'Kontakt' },
  ],
  '/polityka-prywatnosci/': [
    { path: '/', label: 'Start' },
    { path: '/polityka-prywatnosci/', label: 'Polityka prywatności' },
  ],
  '/polityka-redakcyjna/': [
    { path: '/', label: 'Start' },
    { path: '/polityka-redakcyjna/', label: 'Polityka redakcyjna' },
  ],
}

export const breadcrumbMap = breadcrumbHierarchy
