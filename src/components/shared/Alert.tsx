import React from 'react'

interface AlertProps {
  type: 'info' | 'warning' | 'success' | 'error'
  children: React.ReactNode
  icon?: string
}

export default function Alert({ type, children, icon }: AlertProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  }

  return (
    <div className={`border rounded-lg p-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
