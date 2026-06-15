import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

interface NavItem {
  path: string
  label: string
}

const items: NavItem[] = [
  { path: '/', label: 'Start' },
  { path: '/zdolnosc-kredytowa/', label: 'Zdolność' },
  { path: '/kalkulator-raty-kredytu/', label: 'Kalkulator' },
  { path: '/ltv-kalkulator/', label: 'LTV' },
  { path: '/raty-rowne-czy-malejace/', label: 'Raty' },
  { path: '/symulacja-wibor/', label: 'WIBOR' },
  { path: '/odsetki-dzienne/', label: 'Odsetki' },
  { path: '/symulator-nadplat/', label: 'Nadpłaty' },
  { path: '/refinansowanie-kredytu/', label: 'Refinansowanie' },
  { path: '/porownanie-ofert-bankow/', label: 'Banki' },
  { path: '/stale-vs-zmienne-oprocentowanie/', label: 'Stałe/Zmienne' },
  { path: '/faq-kredyt-hipoteczny/', label: 'FAQ' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on route change
  const close = () => setOpen(false)

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="text-lg font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors" onClick={close}>
          Kalkulator<span className="text-blue-600">Kredytowy</span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {items.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/70'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-4 gap-1 overflow-y-auto h-full pb-24">
          {items.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={close}
              className={({ isActive }) =>
                `px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/70'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
