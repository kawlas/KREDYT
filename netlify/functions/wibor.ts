export const handler = async () => {
  try {
    // Using wibor3m symbol with explicit CSV format
    const url = 'https://stooq.pl/q/l/?s=wibor3m&f=sd2ohlc&e=csv'
    const res = await fetch(url, {
      headers: {
        'Accept': 'text/csv,text/plain,*/*',
        'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Referer': 'https://stooq.pl/q/?s=wibor3m'
      }
    })
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: `stooq_failed_http_${res.status}` }) }
    }

    const csv = (await res.text()).trim()
    if (csv.includes('Brak danych')) {
        throw new Error('Stooq returned "Brak danych" - possibly rate limited or market closed.')
    }
    const lines = csv.split('\n')
    const last = lines[lines.length - 1]
    const cols = last.split(',')

    const date = cols[0]
    if (cols.length < 5) {
        throw new Error(`CSV parse error: too few columns. Line: "${last}"`)
    }

    const value = Number(cols[4])
    
    if (isNaN(value)) {
        throw new Error(`WIBOR value is NaN. Line: "${last}"`)
    }

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store, must-revalidate'
      },
      body: JSON.stringify({ 
        value, 
        date: cols[0], 
        source: 'stooq',
        debug_line: last 
      })
    }
  } catch (e: any) {
    console.error('Function execution error:', e)
    // Return 200 with fallback to prevent app crash, but include debug info
    return {
      statusCode: 200,
      headers: { 
        'content-type': 'application/json',
        'cache-control': 'no-store, must-revalidate'
      },
      body: JSON.stringify({
        value: 5.85,
        date: new Date().toISOString().slice(0, 10),
        source: 'fallback',
        error: e.message || String(e),
        stack: e.stack
      })
    }
  }
}
