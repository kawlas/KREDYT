import { useState, useEffect, useCallback } from 'react'
import { fetchCurrentWIBOR, formatWIBORTimestamp, type WIBORData } from '../utils/wiborFetcher'

interface WIBORState {
  wibor: number | null
  rates: { '3M': number; '6M': number } | null
  loading: boolean
  error: string | null
  lastUpdate: string
  source: string | null
}

interface UseWIBORResult extends WIBORState {
  refresh: () => Promise<void>
}

const initialState: WIBORState = {
  wibor: null,
  rates: null,
  loading: true,
  error: null,
  lastUpdate: '',
  source: null,
}

export function useWIBOR(autoFetch = true): UseWIBORResult {
  const [state, setState] = useState<WIBORState>(initialState)

  const fetchWIBOR = useCallback(async (useCache = true) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const data: WIBORData = await fetchCurrentWIBOR(useCache)
      setState({
        wibor: data.value,
        rates: data.rates,
        loading: false,
        error: data.source === 'fallback'
          ? 'Nie udało się pobrać aktualnego WIBOR. Używam wartości zastępczej.'
          : null,
        lastUpdate: formatWIBORTimestamp(data.timestamp),
        source: data.source,
      })
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Błąd pobierania WIBOR',
      }))
      console.error('WIBOR fetch error:', err)
    }
  }, [])

  useEffect(() => {
    if (autoFetch) {
      fetchWIBOR(true)
    }
  }, [autoFetch, fetchWIBOR])

  const refresh = useCallback(async () => {
    await fetchWIBOR(false)
  }, [fetchWIBOR])

  return {
    ...state,
    refresh,
  }
}
