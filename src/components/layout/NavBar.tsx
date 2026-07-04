import { NavLink } from 'react-router-dom'

interface TopBarProps {
  onMenuClick?: () => void
}

export default function NavBar({ onMenuClick }: TopBarProps) {
  const handleMenuClick = onMenuClick || (() => {})

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-30 lg:hidden">
      <div className="flex items-center justify-between px-4 h-14">
        <NavLink to="/" className="text-base font-bold tracking-tight text-gray-900">
          Kalkulator<span className="text-blue-600">Kredytowy</span>
        </NavLink>
        <button
          onClick={handleMenuClick}
          className="p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Otwórz menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  )
}
