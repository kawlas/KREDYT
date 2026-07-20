import React from 'react'

interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'flat'
}

const variantClasses = {
  default: 'bg-card rounded-xl shadow-lg p-6',
  hover: 'bg-card rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer',
  flat: 'bg-card rounded-xl shadow-sm p-6',
}

export default function Card({ title, children, className = '', variant = 'default' }: CardProps) {
  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
