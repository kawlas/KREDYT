import { useEffect } from 'react'
import { getConsent } from '../../utils/consent'

const PUB_ID = import.meta.env.VITE_ADSENSE_PUB_ID || 'ca-pub-9858525623868903'
const SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUB_ID}`

function loadAdSense() {
  if (typeof document === 'undefined') return
  const selector = `script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle"]`
  if (document.querySelector(selector)) return
  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = SCRIPT_SRC
  document.head.appendChild(script)
}

/**
 * Injects the AdSense loader script ONLY after the user has granted consent.
 * This keeps the heavy third-party script off the critical path for every
 * visitor who hasn't accepted ads (better LCP/TBT and GDPR-aligned).
 */
export default function AdSenseLoader() {
  useEffect(() => {
    if (getConsent() === 'granted') {
      loadAdSense()
    }

    const onConsentChange = () => {
      if (getConsent() === 'granted') {
        loadAdSense()
      }
    }
    window.addEventListener('cookie-consent-change', onConsentChange)
    return () => {
      window.removeEventListener('cookie-consent-change', onConsentChange)
    }
  }, [])

  return null
}
