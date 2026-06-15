import { useState, useEffect, useCallback } from 'react'
import { listeners, toasts, bg } from './toast'

export default function ToastContainer() {
  const [, setTick] = useState(0)
  const rerender = useCallback(() => setTick(t => t + 1), [])

  useEffect(() => {
    listeners.add(rerender)
    return () => { listeners.delete(rerender) }
  }, [rerender])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2" aria-live="polite">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`${bg[t.type]} text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-right-2 fade-in duration-200 max-w-sm`}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}
