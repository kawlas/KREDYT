import { safeGetItem, safeSetItem, safeRemoveItem } from './safeStorage'

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

const FUNCTION_URL = '/.netlify/functions/wibor'
const STATIC_URL = '/wibor.json'
const FALLBACK_WIBOR = 5.85
const CACHE_KEY = 'wibor_cache'
const CACHE_DURATION = 3600000 // 1 hour in ms

interface WiborResponse {
  rates: {
    '3M': number
    '6M': number
  }
  updated: string
  source: string
}

function getCachedWIBOR(): WIBORData | null {
  try {
    const cached = safeGetItem(CACHE_KEY)
    if (!cached) return null

    const data: WIBORData = JSON.parse(cached)
    const now = Date.now()

    if (now - data.timestamp < CACHE_DURATION) {
      return data
    }

    return null
  } catch {
    return null
  }
}

function cacheWIBOR(data: WIBORData): void {
  try {
    safeSetItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // Storage unavailable
  }
}

export async function fetchCurrentWIBOR(useCache = true): Promise<WIBORData> {
  if (useCache) {
    const cached = getCachedWIBOR()
    if (cached) {
      return cached
    }
  }

  // Try live function first, fall back to static JSON
  let json: WiborResponse | null = null

  try {
    const res = await fetch(`${FUNCTION_URL}?t=${Date.now()}`, {
      headers: { 'Accept': 'application/json' },
    })
    if (res.ok) {
      json = await res.json()
    }
  } catch {
    // Function not available (e.g. local dev), fall through to static
  }

  // Fallback to static JSON
  if (!json) {
    try {
      const res = await fetch(`${STATIC_URL}?t=${Date.now()}`, {
        headers: { 'Accept': 'application/json' },
      })
      if (res.ok) {
        json = await res.json()
      }
    } catch {
      // Both failed, use hardcoded fallback
    }
  }

  if (json && json.rates?.['3M']) {
    const data: WIBORData = {
      value: json.rates['3M'],
      rates: json.rates,
      date: json.updated,
      source: json.source,
      timestamp: Date.now(),
    }
    cacheWIBOR(data)
    return data
  }

  // Ultimate fallback
  const fallbackData: WIBORData = {
    value: FALLBACK_WIBOR,
    rates: {
      '3M': FALLBACK_WIBOR,
      '6M': FALLBACK_WIBOR + 0.05,
    },
    date: new Date().toISOString(),
    source: 'fallback',
    timestamp: Date.now(),
  }
  return fallbackData
}

/**
 * Clear WIBOR cache (for testing)
 */
export function clearWIBORCache(): void {
  safeRemoveItem(CACHE_KEY)
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
