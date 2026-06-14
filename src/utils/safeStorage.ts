export const safeGetItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage?.getItem(key) ?? null
  } catch {
    return null
  }
}

export const safeSetItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage?.setItem(key, value)
  } catch {
    // Storage full or unavailable
  }
}

export const safeRemoveItem = (key: string): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage?.removeItem(key)
  } catch {
    // Storage unavailable
  }
}
