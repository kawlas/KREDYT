export const handler = async () => {
  try {
    const url = 'https://stooq.pl/q/d/l/?s=wibor3m&i=d'
    const res = await fetch(url)
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
  } catch (e) {
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        value: 5.85,
        date: new Date().toISOString().slice(0, 10),
        source: 'fallback'
      })
    }
  }
}
