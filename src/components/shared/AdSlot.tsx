

interface AdSlotProps {
  className?: string
}

export default function AdSlot({ className = '' }: AdSlotProps) {
  return (
    <div className={`w-full bg-gray-100 border border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 p-4 ${className}`} style={{ minHeight: '250px' }}>
      <span className="text-xs uppercase tracking-widest font-semibold mb-2">Reklama</span>
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300">
        <span className="text-sm">Miejsce na Twoją reklamę</span>
      </div>
    </div>
  )
}
