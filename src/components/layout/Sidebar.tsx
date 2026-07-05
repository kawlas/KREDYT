import { useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import ThemeToggle from '../shared/ThemeToggle'

interface SidebarItemData {
  type: 'link' | 'category' | 'divider'
  label?: string
  path?: string
}

const sidebarItems: SidebarItemData[] = [
  { type: 'link', label: 'Strona główna', path: '/' },
  { type: 'divider' },
  { type: 'category', label: 'Kalkulatory' },
  { type: 'link', label: 'Kalkulator raty', path: '/kalkulator-raty-kredytu/' },
  { type: 'link', label: 'Zdolność kredytowa', path: '/zdolnosc-kredytowa/' },
  { type: 'link', label: 'Kalkulator LTV', path: '/ltv-kalkulator/' },
  { type: 'link', label: 'Symulacja WIBOR', path: '/symulacja-wibor/' },
  { type: 'link', label: 'Odsetki dzienne', path: '/odsetki-dzienne/' },
  { type: 'divider' },
  { type: 'category', label: 'Porównaj' },
  { type: 'link', label: 'Raty równe/malejące', path: '/raty-rowne-czy-malejace/' },
  { type: 'link', label: 'Porównanie banków', path: '/porownanie-ofert-bankow/' },
  { type: 'link', label: 'Refinansowanie', path: '/refinansowanie-kredytu/' },
  { type: 'link', label: 'Stałe/Zmienne', path: '/stale-vs-zmienne-oprocentowanie/' },
  { type: 'divider' },
  { type: 'category', label: 'Analiza' },
  { type: 'link', label: 'Ukryte koszty', path: '/ukryte-koszty-kredytu/' },
  { type: 'link', label: 'Prowizja banku', path: '/kalkulator-prowizji/' },
  { type: 'link', label: 'Ubezpieczenia', path: '/kalkulator-ubezpieczen/' },
  { type: 'link', label: 'Scoring BIK', path: '/co-wplywa-na-zdolnosc/' },
  { type: 'link', label: 'Nadpłaty', path: '/symulator-nadplat/' },
  { type: 'link', label: 'Koszt utrzymania', path: '/koszt-utrzymania-nieruchomosci/' },
  { type: 'link', label: 'Przygotowanie', path: '/przygotowanie-do-kredytu/' },
  { type: 'divider' },
  { type: 'link', label: 'Poradniki', path: '/poradniki/' },
  { type: 'link', label: 'FAQ', path: '/faq-kredyt-hipoteczny/' },
  { type: 'link', label: 'Mity kredytowe', path: '/mity-kredytowe/' },
  { type: 'link', label: 'O projekcie', path: '/o-projekcie/' },
]

const categoryColors: Record<string, string> = {
  '/kalkulator-raty-kredytu/': 'blue',
  '/zdolnosc-kredytowa/': 'blue',
  '/ltv-kalkulator/': 'blue',
  '/symulacja-wibor/': 'blue',
  '/odsetki-dzienne/': 'blue',
  '/symulator-nadplat/': 'blue',
  '/raty-rowne-czy-malejace/': 'violet',
  '/porownanie-ofert-bankow/': 'violet',
  '/refinansowanie-kredytu/': 'violet',
  '/stale-vs-zmienne-oprocentowanie/': 'violet',
  '/ukryte-koszty-kredytu/': 'emerald',
  '/co-wplywa-na-zdolnosc/': 'emerald',
}

function getActiveClass(path: string | undefined, isActive: boolean): string {
  const base = 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors'
  if (!isActive) return `${base} text-gray-600 hover:text-gray-900 hover:bg-gray-50`
  const color = path ? categoryColors[path] : undefined
  if (color === 'violet') return `${base} text-violet-600 bg-violet-50`
  if (color === 'emerald') return `${base} text-emerald-600 bg-emerald-50`
  return `${base} text-blue-600 bg-blue-50`
}

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
          w-60 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          flex flex-col overflow-y-auto
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo + mobile toggle */}
        <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <Link to="/" className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
            Kalkulator<span className="text-blue-600 dark:text-blue-400">Kredytowy</span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={handleClose}
              className="lg:hidden p-1 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors"
              aria-label="Zamknij menu"
            >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          </div>
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
                  className={({ isActive }) => getActiveClass(item.path, isActive)}
                >
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
