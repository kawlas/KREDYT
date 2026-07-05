// Netlify function: bank-offers
// Returns current bank offer data with live WIBOR.
// Margins come from static bank-offers.json (manual monthly update, source: Bankier.pl)
// WIBOR is fetched live from stooq.pl, so total rates are always current.
// Falls back to static JSON if live WIBOR unavailable.
// Cache: 1 hour (Netlify CDN)

import bankOffersJson from '../../public/bank-offers.json'

interface BankOffer {
  id: string
  name: string
  margin: number
  totalRate: number
}

interface BankOffersResponse {
  version: string
  updatedAt: string
  lastVerifiedAt: string
  wiborRef: number | null
  source: string
  sourceUrl: string
  wiborSourceUrl: string
  wiborSource: string | null
  banks: BankOffer[]
  disclaimer: string
  liveWibor: number | null
  dataType: string
}

export const handler = async () => {
  try {
    // 1. Fetch live WIBOR from stooq.pl
    let liveWibor: number | null = null
    let wiborSource: string | null = null
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
              wiborSource = 'stooq.pl'
            }
          }
        }
      }
    } catch {
      // Fallback — live WIBOR stays null, total rates stay as stored
    }

    // 2. Recalculate total rates: totalRate = margin + liveWibor
    //    Fallback to static totalRate if no live WIBOR
    const wiborRef = liveWibor ?? bankOffersJson.wiborRef
    const banks = bankOffersJson.banks.map(b => ({
      id: b.id,
      name: b.name,
      margin: b.margin,
      totalRate: liveWibor !== null
        ? parseFloat((b.margin + liveWibor).toFixed(2))
        : b.totalRate,
    }))

    const response: BankOffersResponse = {
      version: bankOffersJson.version,
      updatedAt: new Date().toISOString(),
      lastVerifiedAt: bankOffersJson.lastVerifiedAt,
      wiborRef,
      source: "Bankier.pl (ranking kredytów hipotecznych) + NBP (stopy referencyjne)",
      sourceUrl: bankOffersJson.sourceUrl,
      wiborSourceUrl: bankOffersJson.wiborSourceUrl,
      wiborSource,
      banks,
      disclaimer: bankOffersJson.disclaimer,
      liveWibor,
      dataType: bankOffersJson.dataType,
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
        updatedAt: new Date().toISOString(),
        liveWibor: null,
        wiborSource: null,
      }),
    }
  }
}
