import { useLocation, Link } from 'react-router-dom'
import { breadcrumbHierarchy } from '../../data/breadcrumbs'

interface BreadcrumbNavProps {
  pathname?: string
}

export default function BreadcrumbNav({ pathname: _pathname }: BreadcrumbNavProps) {
  const locationPathname = useLocation().pathname
  const pathname = _pathname || locationPathname
  const items = breadcrumbHierarchy[pathname]

  if (!items || items.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50/50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          {items.map((item, i) => (
            <li key={item.path + i} className="flex items-center gap-2">
              {i > 0 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" className="text-gray-300">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              )}
              {/* Last item = current page (span). Category items (path='/' but not first) = span */}
              {i === items.length - 1 || (item.path === '/' && i > 0) ? (
                <span className={i === items.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="text-gray-500 hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
