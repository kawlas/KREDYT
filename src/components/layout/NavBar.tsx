import { NavLink } from 'react-router-dom'
import ThemeToggle from '../shared/ThemeToggle'

interface TopBarProps {
  onMenuClick?: () => void
}

export default function NavBar({ onMenuClick }: TopBarProps) {
  const handleMenuClick = onMenuClick || (() => {})

  return (
    <header className="border-b border-border bg-card sticky top-0 z-30 lg:hidden transition-colors">
      <div className="flex items-center justify-between px-4 h-14">
        <NavLink to="/" className="text-base font-bold tracking-tight text-foreground dark:text-white">
          Kalkulator<span className="text-primary">Kredytowy</span>
        </NavLink>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={handleMenuClick}
            className="p-2 -mr-2 text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
            aria-label="Otwórz menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
