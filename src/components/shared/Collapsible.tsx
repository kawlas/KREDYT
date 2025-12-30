import React from 'react'

interface CollapsibleProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  icon?: string
}

export default function Collapsible({
  title,
  defaultOpen = false,
  children,
  icon
}: CollapsibleProps) {
  return (
    <details 
      open={defaultOpen} 
      className="bg-white rounded-xl shadow-lg transition-all group/collapsible"
    >
      <summary className="cursor-pointer list-none p-4 rounded-t-xl bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-100 transition-colors flex items-center justify-between font-semibold text-gray-900 border-b border-gray-200 select-none">
        <span className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <span>{title}</span>
        </span>
        <svg 
          className="w-5 h-5 text-gray-500 transition-transform group-open/collapsible:rotate-180" 
          fill="none" 
          strokeWidth="2" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="p-6">
        {children}
      </div>
    </details>
  )
}
