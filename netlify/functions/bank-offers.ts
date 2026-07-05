// Netlify function: bank-offers
// Returns current bank offer data with live WIBOR.
// Falls back to static bank-offers.json if live data unavailable.
// Cache: 1 hour (Netlify CDN)

import bankOffersJson from '../../public/bank-offers.json'

interface BankOffer {
  id: string
  name: string
  margin: number
  totalRate: number
  sourceUrl: string
}

interface BankOffersResponse {
  updated: string
  wiborRef: number | null
  source: string
  sourceUrl: string
  banks: BankOffer[]
  disclaimer: string
  liveWibor: number | null
  wiborSource: string
}

export const handler = async () => {
  try {
    // 1. Fetch live WIBOR from stooq.pl
    let liveWibor: number | null = null
    let wiborSource = 'fallback'
    try {
      const wiborUrl = 'https://stooq.pl/q/l/?s=wibor3m&f=sd2ohlc&e=csv'
      const res = await fetch(wiborUrl, {
        headers: {
          'Accept': 'text/csv,text/plain,*/*',
          'Accept-Language': 'pl-PL,pl;q=0.9',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://stooq.pl/q/?s=wibor3m'
        }
      })
      if (res.ok) {
        const csv = (await res.text()).trim()
        if (!csv.includes('Brak danych')) {
          const lines = csv.split('\n')
          const last = lines[lines.length - 1]
          const cols = last.split(',')
          if (cols.length >= 5) {
            const value = Number(cols[4])
            if (!isNaN(value)) {
              liveWibor = value
              wiborSource = 'stooq'
            }
          }
        }
      }
    } catch {
      // Fallback to static WIBOR from bank-offers.json
    }

    // 2. Recalculate total rates with live WIBOR
    const wiborRef = liveWibor ?? bankOffersJson.wiborRef
    const banks = bankOffersJson.banks.map(b => ({
      ...b,
      totalRate: liveWibor !== null
        ? parseFloat((liveWibor + (b.margin - (bankOffersJson.wiborRef - 3.85))).toFixed(2))
        : b.totalRate,
    }))

    const response: BankOffersResponse = {
      updated: new Date().toISOString(),
      wiborRef,
      source: 'Bankier.pl – ranking kredytów hipotecznych (bankier.pl/smart/kredyty-hipoteczne) + NBP',
      sourceUrl: 'https://www.bankier.pl/smart/kredyty-hipoteczne',
      banks,
      disclaimer: bankOffersJson.disclaimer,
      liveWibor,
      wiborSource,
    }

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
      body: JSON.stringify(response),
    }
  } catch (e: unknown) {
    // Fallback to static data
    const msg = e instanceof Error ? e.message : String(e)
    console.error('bank-offers function error:', msg)
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
      body: JSON.stringify({
        ...bankOffersJson,
        updated: new Date().toISOString(),
        liveWibor: null,
        wiborSource: 'fallback',
      }),
    }
  }
}
