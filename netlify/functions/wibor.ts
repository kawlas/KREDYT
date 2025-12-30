export const handler = async () => {
  try {
    const url = 'https://stooq.pl/q/d/l/?s=wibor3m&i=d'
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: 'stooq_failed' }) }
    }

    const csv = await res.text()
    const lines = csv.trim().split('\n')
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
