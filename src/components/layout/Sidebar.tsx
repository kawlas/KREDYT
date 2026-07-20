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
  { type: 'link', label: 'Kredyt vs Wynajem', path: '/kredyt-vs-wynajem/' },
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
  const base = 'flex items-center gap-3 px-3 py-2.5 rounded-r-full text-sm font-medium transition-colors'
  if (!isActive) return `${base} text-muted-foreground hover:text-foreground hover:bg-muted`
  const color = path ? categoryColors[path] : undefined
  if (color === 'violet') return `${base} text-violet-600 bg-violet-50`
  if (color === 'emerald') return `${base} text-emerald-600 bg-emerald-50`
  return `${base} text-primary bg-primary-container`
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
          w-[280px] bg-surface-container border-r border-outline-variant
          flex flex-col overflow-y-auto
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo + mobile toggle */}
        <div className="px-4 py-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="text-base font-bold tracking-tight text-foreground dark:text-white">
            Kalkulator<span className="text-primary">Kredytowy</span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={handleClose}
              className="lg:hidden p-1 text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors"
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
        <nav aria-label="Nawigacja główna" className="flex-1 py-3 px-2 space-y-0.5">
          {sidebarItems.map((item, i) => {
            if (item.type === 'divider') {
              return <hr key={`div-${i}`} className="border-outline-variant my-3" />
            }
            if (item.type === 'category') {
              return (
                <p key={item.label} className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
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
          className="lg:hidden p-4 border-t border-border text-muted-foreground hover:text-foreground text-sm"
        >
          ✕ Zamknij
        </button>
      </aside>
    </>
  )
}
