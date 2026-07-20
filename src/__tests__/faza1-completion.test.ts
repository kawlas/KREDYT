import { describe, it, expect } from 'vitest'

describe('Faza 1 completion — brakujące route', () => {
  it('App.tsx importuje ChecklistPage (lazy)', async () => {
    const fs = await import('fs')
    const app = fs.readFileSync('src/App.tsx', 'utf-8')
    expect(app).toContain("lazy(() => import('./pages/ChecklistPage'))")
  })

  it('App.tsx importuje TrueCostPage (lazy)', async () => {
    const fs = await import('fs')
    const app = fs.readFileSync('src/App.tsx', 'utf-8')
    expect(app).toContain("lazy(() => import('./pages/TrueCostPage'))")
  })

  it('App.tsx ma Route /przygotowanie-do-kredytu/', async () => {
    const fs = await import('fs')
    const app = fs.readFileSync('src/App.tsx', 'utf-8')
    expect(app).toContain("path=\"/przygotowanie-do-kredytu/\"")
  })

  it('App.tsx ma Route /koszt-utrzymania-nieruchomosci/', async () => {
    const fs = await import('fs')
    const app = fs.readFileSync('src/App.tsx', 'utf-8')
    expect(app).toContain("path=\"/koszt-utrzymania-nieruchomosci/\"")
  })

  it('prerender.js dodaje /przygotowanie-do-kredytu/', async () => {
    const fs = await import('fs')
    const pr = fs.readFileSync('prerender.js', 'utf-8')
    expect(pr).toContain("'/przygotowanie-do-kredytu/'")
  })

  it('prerender.js dodaje /koszt-utrzymania-nieruchomosci/', async () => {
    const fs = await import('fs')
    const pr = fs.readFileSync('prerender.js', 'utf-8')
    expect(pr).toContain("'/koszt-utrzymania-nieruchomosci/'")
  })

  it('_redirects obsługuje przygotowanie-do-kredytu', async () => {
    const fs = await import('fs')
    const r = fs.readFileSync('public/_redirects', 'utf-8')
    expect(r).toContain('/przygotowanie-do-kredytu/')
  })

  it('_redirects obsługuje koszt-utrzymania-nieruchomosci', async () => {
    const fs = await import('fs')
    const r = fs.readFileSync('public/_redirects', 'utf-8')
    expect(r).toContain('/koszt-utrzymania-nieruchomosci/')
  })

  it('Sidebar ma link do /przygotowanie-do-kredytu/', async () => {
    const fs = await import('fs')
    const s = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf-8')
    expect(s).toContain("'/przygotowanie-do-kredytu/'")
  })

  it('Sidebar ma link do /koszt-utrzymania-nieruchomosci/', async () => {
    const fs = await import('fs')
    const s = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf-8')
    expect(s).toContain("'/koszt-utrzymania-nieruchomosci/'")
  })

  it('breadcrumbs.ts ma mapę dla /przygotowanie-do-kredytu/', async () => {
    const fs = await import('fs')
    const b = fs.readFileSync('src/data/breadcrumbs.ts', 'utf-8')
    expect(b).toContain("'/przygotowanie-do-kredytu/'")
  })

  it('breadcrumbs.ts ma mapę dla /koszt-utrzymania-nieruchomosci/', async () => {
    const fs = await import('fs')
    const b = fs.readFileSync('src/data/breadcrumbs.ts', 'utf-8')
    expect(b).toContain("'/koszt-utrzymania-nieruchomosci/'")
  })
})
