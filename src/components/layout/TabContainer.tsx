import React from 'react'

interface TabContainerProps {
  title: string
  subtitle?: string
  contextInfo?: string // "Dla kredytu 300 000 zł na 20 lat"
  children: React.ReactNode
}

export default function TabContainer({
  title,
  subtitle,
  contextInfo,
  children
}: TabContainerProps) {
  return (
    <div className="tab-container">
      {/* Header Section - Unified */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 text-lg mb-2">
            {subtitle}
          </p>
        )}
        {contextInfo && (
          <div className="inline-block bg-blue-50 text-blue-700 px-6 py-3 rounded-lg text-lg font-bold mt-3">
            {contextInfo}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}
