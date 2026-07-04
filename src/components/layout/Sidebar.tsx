import { useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'

interface SidebarItemData {
  type: 'link' | 'category' | 'divider'
  label?: string
  path?: string
  icon?: string
}

const sidebarItems: SidebarItemData[] = [
  { type: 'link', label: 'Strona główna', path: '/', icon: '🏠' },
  { type: 'divider' },
  { type: 'category', label: 'Kalkulatory' },
  { type: 'link', label: 'Kalkulator raty', path: '/kalkulator-raty-kredytu/', icon: '🧮' },
  { type: 'link', label: 'Zdolność kredytowa', path: '/zdolnosc-kredytowa/', icon: '📊' },
  { type: 'link', label: 'Kalkulator LTV', path: '/ltv-kalkulator/', icon: '📐' },
  { type: 'link', label: 'Symulacja WIBOR', path: '/symulacja-wibor/', icon: '📈' },
  { type: 'link', label: 'Odsetki dzienne', path: '/odsetki-dzienne/', icon: '📆' },
  { type: 'link', label: 'Nadpłaty', path: '/symulator-nadplat/', icon: '💰' },
  { type: 'divider' },
  { type: 'category', label: 'Porównaj' },
  { type: 'link', label: 'Raty równe/malejące', path: '/raty-rowne-czy-malejace/', icon: '⚖️' },
  { type: 'link', label: 'Porównanie banków', path: '/porownanie-ofert-bankow/', icon: '🏦' },
  { type: 'link', label: 'Refinansowanie', path: '/refinansowanie-kredytu/', icon: '🔄' },
  { type: 'link', label: 'Stałe/Zmienne', path: '/stale-vs-zmienne-oprocentowanie/', icon: '🔒' },
  { type: 'divider' },
  { type: 'category', label: 'Analiza' },
  { type: 'link', label: 'Ukryte koszty', path: '/ukryte-koszty-kredytu/', icon: '🔍' },
  { type: 'link', label: 'Scoring BIK', path: '/co-wplywa-na-zdolnosc/', icon: '📋' },
  { type: 'divider' },
  { type: 'link', label: 'Poradniki', path: '/poradniki/', icon: '📖' },
  { type: 'link', label: 'FAQ', path: '/faq-kredyt-hipoteczny/', icon: '❓' },
  { type: 'link', label: 'O projekcie', path: '/o-projekcie/', icon: 'ℹ️' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const handleClose = onClose || (() => {})

  // Close on route change
  useEffect(() => {
    handleClose()
  }, [location.pathname])

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen
          w-60 bg-white border-r border-gray-200
          flex flex-col overflow-y-auto
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo + mobile toggle */}
        <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="text-base font-bold tracking-tight text-gray-900">
            Kalkulator<span className="text-blue-600">Kredytowy</span>
          </Link>
          <button
            onClick={handleClose}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Otwórz menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {sidebarItems.map((item, i) => {
            if (item.type === 'divider') {
              return <hr key={`div-${i}`} className="border-gray-100 my-3" />
            }
            if (item.type === 'category') {
              return (
                <p key={item.label} className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  {item.label}
                </p>
              )
            }
            if (item.type === 'link' && item.path) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`
                  }
                >
                  <span className="flex-shrink-0 w-5 text-center">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              )
            }
            return null
          })}
        </nav>

        {/* Close button on mobile */}
        <button
          onClick={handleClose}
          className="lg:hidden p-4 border-t border-gray-100 text-gray-500 hover:text-gray-700 text-sm"
        >
          ✕ Zamknij
        </button>
      </aside>
    </>
  )
}
