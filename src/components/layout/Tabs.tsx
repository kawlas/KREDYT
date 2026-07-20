import React from 'react'

interface Tab {
  id: string
  label: string
  icon?: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex space-x-1 bg-secondary p-1 rounded-xl mb-8 max-w-md mx-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
              ${isActive ? 'text-primary bg-card shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
