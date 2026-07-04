import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'

interface ToolCategory {
  name: string
  items: { path: string; label: string }[]
}

const toolCategories: ToolCategory[] = [
  {
    name: 'Kalkulatory',
    items: [
      { path: '/kalkulator-raty-kredytu/', label: 'Kalkulator raty' },
      { path: '/zdolnosc-kredytowa/', label: 'Zdolność kredytowa' },
      { path: '/ltv-kalkulator/', label: 'Kalkulator LTV' },
      { path: '/odsetki-dzienne/', label: 'Odsetki dzienne' },
      { path: '/symulacja-wibor/', label: 'Symulacja WIBOR' },
    ],
  },
  {
    name: 'Porównaj',
    items: [
      { path: '/raty-rowne-czy-malejace/', label: 'Raty równe/malejące' },
      { path: '/porownanie-ofert-bankow/', label: 'Porównanie banków' },
      { path: '/refinansowanie-kredytu/', label: 'Refinansowanie' },
      { path: '/stale-vs-zmienne-oprocentowanie/', label: 'Stałe/Zmienne' },
    ],
  },
  {
    name: 'Analiza',
    items: [
      { path: '/ukryte-koszty-kredytu/', label: 'Ukryte koszty' },
      { path: '/co-wplywa-na-zdolnosc/', label: 'Scoring BIK' },
      { path: '/symulator-nadplat/', label: 'Nadpłaty' },
    ],
  },
]

const desktopNavItems = [
  { path: '/', label: 'Start' },
  { path: '/poradniki/', label: 'Poradniki' },
  { path: '/faq-kredyt-hipoteczny/', label: 'FAQ' },
  { path: '/o-projekcie/', label: 'O projekcie' },
]

// Mobile nav items — all links including tools expanded
const mobileNavItems = [
  { path: '/', label: 'Start' },
  // Tools expanded
  { path: '/kalkulator-raty-kredytu/', label: '🧮 Kalkulator raty' },
  { path: '/zdolnosc-kredytowa/', label: '📊 Zdolność kredytowa' },
  { path: '/ltv-kalkulator/', label: '📐 LTV' },
  { path: '/odsetki-dzienne/', label: '📆 Odsetki dzienne' },
  { path: '/symulacja-wibor/', label: '📈 Symulacja WIBOR' },
  { path: '/raty-rowne-czy-malejace/', label: '⚖️ Raty równe/malejące' },
  { path: '/porownanie-ofert-bankow/', label: '🏦 Porównanie banków' },
  { path: '/refinansowanie-kredytu/', label: '🔄 Refinansowanie' },
  { path: '/stale-vs-zmienne-oprocentowanie/', label: '🔒 Stałe/Zmienne' },
  { path: '/ukryte-koszty-kredytu/', label: '🔍 Ukryte koszty' },
  { path: '/co-wplywa-na-zdolnosc/', label: '📋 Scoring BIK' },
  { path: '/symulator-nadplat/', label: '💰 Nadpłaty' },
  // Main links
  { path: '/poradniki/', label: '📖 Poradniki' },
  { path: '/faq-kredyt-hipoteczny/', label: '❓ FAQ' },
  { path: '/o-projekcie/', label: 'ℹ️ O projekcie' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close tools dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on route change
  const close = () => {
    setOpen(false)
    setToolsOpen(false)
  }

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="text-lg font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors" onClick={close}>
          Kalkulator<span className="text-blue-600">Kredytowy</span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'text-blue-600 bg-blue-50/70'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >
            Start
          </NavLink>

          {/* Tools dropdown */}
          <div className="relative" ref={toolsRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                toolsOpen
                  ? 'text-blue-600 bg-blue-50/70'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Narzędzia
              <svg
                className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {toolsOpen && (
              <div className="absolute left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-3 px-2 min-w-[260px] z-50">
                {toolCategories.map((cat) => (
                  <div key={cat.name}>
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {cat.name}
                    </div>
                    {cat.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={close}
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    {cat !== toolCategories[toolCategories.length - 1] && (
                      <div className="border-t border-gray-50 my-1 mx-3" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main nav items */}
          {desktopNavItems.slice(1).map(item => (
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
          {mobileNavItems.map((item, i) => (
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
