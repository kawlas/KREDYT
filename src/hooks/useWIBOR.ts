import { useState, useEffect, useCallback } from 'react'
import { fetchCurrentWIBOR, formatWIBORTimestamp, type WIBORData } from '../utils/wiborFetcher'

interface UseWIBORResult {
  wibor: number | null
  rates: { '3M': number; '6M': number } | null
  loading: boolean
  error: string | null
  lastUpdate: string
  source: string | null
  refresh: () => Promise<void>
}

export function useWIBOR(autoFetch = true): UseWIBORResult {
  const [wibor, setWibor] = useState<number | null>(null)
  const [rates, setRates] = useState<{ '3M': number; '6M': number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState('')
  const [source, setSource] = useState<string | null>(null)

  const fetchWIBOR = useCallback(async (useCache = true) => {
    setLoading(true)
    setError(null)
    
    try {
      const data: WIBORData = await fetchCurrentWIBOR(useCache)
      setWibor(data.value)
      setRates(data.rates)
      setSource(data.source)
      setLastUpdate(formatWIBORTimestamp(data.timestamp))
      
      if (data.source === 'fallback') {
        setError('Nie udało się pobrać aktualnego WIBOR. Używam wartości zastępczej.')
      }
    } catch (err) {
      setError('Błąd pobierania WIBOR')
      console.error('WIBOR fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchWIBOR(true)
    }
  }, [autoFetch, fetchWIBOR])

  // Refresh handler (without cache)
  const refresh = useCallback(async () => {
    await fetchWIBOR(false)
  }, [fetchWIBOR])

  return {
    wibor,
    rates,
    loading,
    error,
    lastUpdate,
    source,
    refresh
  }
}
