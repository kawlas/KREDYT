
import { useEffect } from 'react'

interface AdSlotProps {
  className?: string
}

export default function AdSlot({ className = '' }: AdSlotProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsbygoogle error:', e);
    }
  }, []);

  return (
    <div className={`w-full bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 ${className}`} style={{ minHeight: '250px' }}>
      <span className="text-xs uppercase tracking-widest font-semibold mb-2">Reklama</span>
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300 overflow-hidden">
        {/* Google AdSense Unit Placeholder */}
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-9858525623868903"
             data-ad-slot="YOUR_AD_SLOT_ID" // User should replace this with a real slot ID
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        
        <span className="text-sm absolute pointer-events-none">Miejsce na Twoją reklamę</span>
      </div>
    </div>
  )
}
