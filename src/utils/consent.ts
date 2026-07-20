const CONSENT_COOKIE = 'cookie_consent'
const CONSENT_EXPIRY_DAYS = 365

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && 'dataLayer' in window) {
    window.dataLayer.push(args)
  }
}

export function getConsent(): 'granted' | 'denied' | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp(`${CONSENT_COOKIE}=([^;]+)`))
  if (!m) return null
  return m[1] as 'granted' | 'denied'
}

export function acceptAll() {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + CONSENT_EXPIRY_DAYS)
  document.cookie = `${CONSENT_COOKIE}=granted; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  })
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cookie-consent-change'))
  }
}

export function rejectAll() {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + CONSENT_EXPIRY_DAYS)
  document.cookie = `${CONSENT_COOKIE}=denied; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`
}
