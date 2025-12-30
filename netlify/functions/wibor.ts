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
    const value = Number(cols[4])

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600'
      },
      body: JSON.stringify({ value, date, source: 'stooq' })
    }
  } catch (e: any) {
    console.error('Function execution error:', e)
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        error: e.message || String(e),
        stack: e.stack
      })
    }
  }
}
