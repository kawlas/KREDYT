import React from 'react'

interface TooltipProps {
  text: string
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

export default function Tooltip({ text, children, align = 'center' }: TooltipProps) {
  const alignClasses = {
    left: 'left-0 translate-x-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0 translate-x-0'
  }

  const arrowClasses = {
    left: 'left-2 translate-x-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-2 translate-x-0'
  }

  return (
    <div className="relative group/tooltip inline-block">
      {children}
      <div className={`invisible group-hover/tooltip:visible absolute z-50 w-64 p-3 text-sm text-white bg-gray-900 rounded-lg bottom-full mb-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none ${alignClasses[align]}`}>
        {text}
        <div className={`absolute top-full -mt-1 ${arrowClasses[align]}`}>
          <div className="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  )
}
