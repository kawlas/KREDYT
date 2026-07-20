import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, acceptAll, rejectAll } from '../../utils/consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          Ta strona korzysta z plików cookie Google AdSense do wyświetlania spersonalizowanych reklam.
          Klikając „Akceptuję&quot;, wyrażasz zgodę na przetwarzanie danych w tym celu.{' '}
          <Link to="/polityka-prywatnosci/" className="text-primary hover:underline whitespace-nowrap">
            Więcej o polityce cookies
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => { rejectAll(); setVisible(false) }}
            className="px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary rounded-lg hover:bg-muted transition-colors"
          >
            Odrzucam
          </button>
          <button
            onClick={() => { acceptAll(); setVisible(false) }}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  )
}
