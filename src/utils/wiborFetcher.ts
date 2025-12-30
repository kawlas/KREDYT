export interface WIBORData {
  value: number
  date: string
  source: 'stooq' | 'fallback'
  timestamp: number
}

// Proxy through Netlify Function
const STOOQ_URL = '/.netlify/functions/wibor'
const FALLBACK_WIBOR = 5.85
const CACHE_KEY = 'wibor_cache'
const CACHE_DURATION = 3600000 // 1 hour in ms

interface ProxyResponse {
  value: number
  date: string
  source: 'stooq' | 'fallback'
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
 * Fetch current WIBOR 3M via Netlify Proxy
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

  // Fetch from Proxy
  try {
    console.log('Fetching WIBOR from Proxy...')
    
    const response = await fetch(STOOQ_URL, {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      let errorDetails = ''
      try {
        const errJson = await response.json()
        errorDetails = JSON.stringify(errJson)
        console.error('Proxy returned error:', errJson)
      } catch (e) {
        errorDetails = await response.text()
      }
      throw new Error(`HTTP ${response.status} - ${errorDetails}`)
    }

    const json = (await response.json()) as ProxyResponse
    
    // Validate response
    if (typeof json.value !== 'number' || isNaN(json.value)) {
       throw new Error('Invalid WIBOR value received')
    }

    const data: WIBORData = {
      value: json.value,
      date: json.date,
      source: json.source === 'stooq' ? 'stooq' : 'fallback',
      timestamp: Date.now()
    }

    cacheWIBOR(data)
    console.log('WIBOR fetched successfully:', data.value)

    return data
  } catch (error) {
    console.error('Failed to fetch WIBOR from Proxy:', error)
    
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
