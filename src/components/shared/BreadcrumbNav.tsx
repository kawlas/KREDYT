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
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.path + i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-muted-foreground">›</span>
            )}
            {i === items.length - 1 || (item.path === '/' && i > 0) ? (
              <span className={i === items.length - 1 ? 'text-muted-foreground' : 'text-muted-foreground'} aria-current={i === items.length - 1 ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className="text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
