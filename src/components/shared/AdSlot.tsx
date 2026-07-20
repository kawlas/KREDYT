import { useEffect, useRef } from 'react'

interface AdSlotProps {
  className?: string
  slot?: string
  compact?: boolean
}

const PUB_ID = import.meta.env.VITE_ADSENSE_PUB_ID || 'ca-pub-9858525623868903'

export default function AdSlot({ className = '', slot, compact = false }: AdSlotProps) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!slot || !PUB_ID) return
    if (initialized.current) return
    initialized.current = true

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdBlock or offline — silently ignore
    }
  }, [slot])

  if (!slot) {
    if (import.meta.env.DEV) {
      return (
        <div className={`w-full bg-secondary border border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground ${className}`} style={{ minHeight: compact ? '90px' : '250px' }}>
          <span className="text-xs">AdSlot: brak slot ID</span>
        </div>
      )
    }
    return null
  }

  if (typeof document === 'undefined') return null

  return (
    <div className={`w-full bg-secondary border border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground p-4 relative ${className}`} style={{ minHeight: compact ? '90px' : '250px' }}>
      <span className="text-xs uppercase tracking-widest font-semibold mb-2">Reklama</span>
      <div className="w-full h-full flex items-center justify-center bg-secondary rounded border border-dashed border-border overflow-hidden">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client={PUB_ID}
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <span className="text-sm absolute pointer-events-none">Miejsce na Twoją reklamę</span>
      </div>
    </div>
  )
}
