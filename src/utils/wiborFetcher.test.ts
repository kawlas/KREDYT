import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchCurrentWIBOR, clearWIBORCache } from './wiborFetcher'

const mockWiborJson = {
  updated: '2026-06-14',
  source: 'bankier.pl',
  rates: { '3M': 5.82, '6M': 5.76 },
}

describe('wiborFetcher', () => {
  beforeEach(() => {
    clearWIBORCache()
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches and returns WIBOR data', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWiborJson),
    } as Response)

    const data = await fetchCurrentWIBOR(false)
    expect(data.value).toBe(5.82)
    expect(data.rates['3M']).toBe(5.82)
    expect(data.rates['6M']).toBe(5.76)
    expect(data.source).toBe('bankier.pl')
  })

  it('returns fallback on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const data = await fetchCurrentWIBOR(false)
    expect(data.source).toBe('fallback')
    expect(data.value).toBe(5.85)
    expect(data.rates['3M']).toBe(5.85)
    expect(data.rates['6M']).toBeCloseTo(5.9, 5) // fallback + 0.05
  })

  it('returns fallback on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    const data = await fetchCurrentWIBOR(false)
    expect(data.source).toBe('fallback')
  })

  it('caches successful response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWiborJson),
    } as Response)

    // First call - fetches
    const data1 = await fetchCurrentWIBOR(false)
    expect(data1.source).toBe('bankier.pl')

    // Second call with cache enabled - should use cache, no fetch
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const data2 = await fetchCurrentWIBOR(true)
    expect(data2.value).toBe(5.82)
    // fetch should NOT have been called again
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
