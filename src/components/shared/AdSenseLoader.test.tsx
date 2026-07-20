import { describe, it, expect, beforeEach } from 'vitest'
import { render, waitFor, act } from '@testing-library/react'
import AdSenseLoader from './AdSenseLoader'

const SCRIPT_SELECTOR = 'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle"]'

function removeAdScripts() {
  document.querySelectorAll(SCRIPT_SELECTOR).forEach((n) => n.remove())
}

describe('AdSenseLoader', () => {
  beforeEach(() => {
    removeAdScripts()
    // Clear consent cookie
    document.cookie = 'cookie_consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })

  it('does NOT inject the AdSense script when consent is not granted', async () => {
    render(<AdSenseLoader />)
    // allow effects to run
    await new Promise((r) => setTimeout(r, 50))
    expect(document.querySelector(SCRIPT_SELECTOR)).toBeNull()
  })

  it('injects the AdSense script when consent cookie is granted', async () => {
    document.cookie = 'cookie_consent=granted; path=/'
    render(<AdSenseLoader />)
    await waitFor(() => {
      expect(document.querySelector(SCRIPT_SELECTOR)).not.toBeNull()
    })
    const script = document.querySelector(SCRIPT_SELECTOR) as HTMLScriptElement
    expect(script.src).toContain('adsbygoogle.js')
    expect(script.async).toBe(true)
  })

  it('injects the script when consent is granted after mount (event)', async () => {
    render(<AdSenseLoader />)
    await new Promise((r) => setTimeout(r, 50))
    expect(document.querySelector(SCRIPT_SELECTOR)).toBeNull()

    // User grants consent later
    document.cookie = 'cookie_consent=granted; path=/'
    act(() => {
      window.dispatchEvent(new Event('cookie-consent-change'))
    })
    await waitFor(() => {
      expect(document.querySelector(SCRIPT_SELECTOR)).not.toBeNull()
    })
  })

  it('does not inject the script twice', async () => {
    document.cookie = 'cookie_consent=granted; path=/'
    const { unmount } = render(<AdSenseLoader />)
    await waitFor(() => expect(document.querySelector(SCRIPT_SELECTOR)).not.toBeNull())
    unmount()
    render(<AdSenseLoader />)
    await new Promise((r) => setTimeout(r, 50))
    expect(document.querySelectorAll(SCRIPT_SELECTOR).length).toBe(1)
  })
})
