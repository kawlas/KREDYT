export interface WIBORData {
  value: number
  date: string
  source: 'stooq' | 'fallback'
  timestamp: number
}

const STOOQ_URL = 'https://stooq.pl/q/d/l/?s=wibor3m&i=d'
const FALLBACK_WIBOR = 5.85
const CACHE_KEY = 'wibor_cache'
const CACHE_DURATION = 3600000 // 1 hour in ms

/**
 * Parse CSV from Stooq.pl
 */
function parseStooqCSV(csv: string): number {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) {
    throw new Error('Invalid CSV format')
  }

  // Get last line (most recent data)
  const lastLine = lines[lines.length - 1]
  const columns = lastLine.split(',')

  if (columns.length < 5) {
    throw new Error('Invalid CSV columns')
  }

  // Column 4 (index 4) is "Zamkniecie" (closing value)
  const value = parseFloat(columns[4])
  
  if (isNaN(value)) {
    throw new Error('Invalid WIBOR value')
  }

  return value
}

/**
 * Get cached WIBOR if still valid
 */
function getCachedWIBOR(): WIBORData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const data: WIBORData = JSON.parse(cached)
    const now = Date.now()

    // Check if cache is still valid
    if (now - data.timestamp < CACHE_DURATION) {
      return data
    }

    return null
  } catch (error) {
    console.error('Error reading WIBOR cache:', error)
    return null
  }
}

/**
 * Save WIBOR to cache
 */
function cacheWIBOR(data: WIBORData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error caching WIBOR:', error)
  }
}

/**
 * Fetch current WIBOR 3M from Stooq.pl
 */
export async function fetchCurrentWIBOR(useCache = true): Promise<WIBORData> {
  // Check cache first
  if (useCache) {
    const cached = getCachedWIBOR()
    if (cached) {
      console.log('Using cached WIBOR:', cached.value)
      return cached
    }
  }

  // Fetch from Stooq
  try {
    console.log('Fetching WIBOR from Stooq.pl...')
    
    const response = await fetch(STOOQ_URL, {
      headers: {
        'Accept': 'text/csv'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const csv = await response.text()
    const value = parseStooqCSV(csv)

    const data: WIBORData = {
      value,
      date: new Date().toISOString().split('T')[0],
      source: 'stooq',
      timestamp: Date.now()
    }

    cacheWIBOR(data)
    console.log('WIBOR fetched successfully:', value)

    return data
  } catch (error) {
    console.error('Failed to fetch WIBOR from Stooq:', error)
    
    // Return fallback
    const fallbackData: WIBORData = {
      value: FALLBACK_WIBOR,
      date: new Date().toISOString().split('T')[0],
      source: 'fallback',
      timestamp: Date.now()
    }

    return fallbackData
  }
}

/**
 * Clear WIBOR cache (for testing)
 */
export function clearWIBORCache(): void {
  localStorage.removeItem(CACHE_KEY)
}

/**
 * Format timestamp for display
 */
export function formatWIBORTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const now = Date.now()
  const diff = now - timestamp

  if (diff < 60000) {
    return 'Przed chwilą'
  } else if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes} min temu`
  } else {
    return date.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}
