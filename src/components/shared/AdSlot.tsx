import { useEffect } from 'react'

interface AdSlotProps {
  className?: string
  slot?: string
}

const DEFAULT_PUB_ID = "ca-pub-9858525623868903"

export default function AdSlot({ className = '', slot }: AdSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // Quietly fail if ads are blocked or not loaded yet
    }
  }, []);

  // If no slot is provided and you are NOT using Auto Ads, 
  // you should provide one to see manual ad units.
  const adSlotId = slot || "YOUR_AD_SLOT_ID"

  return (
    <div className={`w-full bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 relative ${className}`} style={{ minHeight: '250px' }}>
      <span className="text-xs uppercase tracking-widest font-semibold mb-2">Reklama</span>
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300 overflow-hidden">
        {/* Google AdSense Unit */}
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client={DEFAULT_PUB_ID}
             data-ad-slot={adSlotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        
        <span className="text-sm absolute pointer-events-none">Miejsce na Twoją reklamę</span>
      </div>
    </div>
  )
}
