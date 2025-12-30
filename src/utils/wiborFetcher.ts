export interface WIBORData {
  value: number // Standard 3M for backward compatibility
  rates: {
    '3M': number
    '6M': number
  }
  date: string
  source: string
  timestamp: number
}

const WIBOR_URL = '/wibor.json'
const FALLBACK_WIBOR = 5.85
const CACHE_KEY = 'wibor_cache'
const CACHE_DURATION = 3600000 // 1 hour in ms

interface WiborJsonResponse {
  updated: string
  source: string
  rates: {
    '3M': number
    '6M': number
  }
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
 * Fetch current WIBOR 3M via /wibor.json
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

  // Fetch from /wibor.json
  try {
    console.log('Fetching WIBOR from /wibor.json...')
    
    const response = await fetch(`${WIBOR_URL}?t=${Date.now()}`, {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const json: WiborJsonResponse = await response.json()
    console.log('WIBOR source response:', json)
    
    const data: WIBORData = {
      value: json.rates['3M'],
      rates: json.rates,
      date: json.updated,
      source: json.source,
      timestamp: Date.now()
    }

    cacheWIBOR(data)
    console.log('WIBOR fetched successfully:', data.value)

    return data
  } catch (error) {
    console.error('Failed to fetch WIBOR from /wibor.json:', error)
    
    // Return fallback
    const fallbackData: WIBORData = {
      value: FALLBACK_WIBOR,
      rates: {
        '3M': FALLBACK_WIBOR,
        '6M': FALLBACK_WIBOR + 0.05
      },
      date: new Date().toISOString(),
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
