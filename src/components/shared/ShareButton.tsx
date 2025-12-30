import { useState } from 'react'

interface ShareButtonProps {
  getValues: () => any
  className?: string
}

export default function ShareButton({ getValues, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const values = getValues()
    const params = new URLSearchParams()
    
    // Map internal names to shorter URL params
    if (values.principal) params.set('amount', values.principal.toString())
    if (values.years) params.set('period', values.years.toString())
    if (values.wibor) params.set('wibor', values.wibor.toString())
    if (values.margin) params.set('margin', values.margin.toString())
    if (values.installmentType) params.set('type', values.installmentType)
    if (values.propertyValue) params.set('property', values.propertyValue.toString())
    
    // Current path + params
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleShare}
      className={`flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-semibold transition-colors ${className}`}
      title="Skopiuj link do obecnych ustawień"
    >
      <span>{copied ? 'Copied!' : '🔗 Udostępnij'}</span>
    </button>
  )
}
