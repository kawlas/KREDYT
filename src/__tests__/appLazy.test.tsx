import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from '../context/LoanCalculatorContext'

// Track whether the heavy jspdf module gets pulled into the initial import graph.
// It should NOT be loaded just by importing <App/> — only on demand (PDF export).
const jspdfState = vi.hoisted(() => ({ loaded: false }))
vi.mock('jspdf', () => {
  jspdfState.loaded = true
  return { default: class {}, __esModule: true }
})

import App from '../App'

function renderAtRoute(route: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <LoanCalculatorProvider>
          <App />
        </LoanCalculatorProvider>
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('App routing (lazy-safe)', () => {
  it('renders the home/hub route', async () => {
    renderAtRoute('/')
    await waitFor(() => {
      expect(screen.getAllByText(/Kalkulator Kredytowy/i).length).toBeGreaterThan(0)
    })
  })

  it('renders the calculator route', async () => {
    renderAtRoute('/kalkulator-raty-kredytu/')
    await waitFor(() => {
      expect(screen.getByText(/Oblicz ratę swojego kredytu/i)).toBeInTheDocument()
    })
  })

  it('renders the affordability route', async () => {
    renderAtRoute('/zdolnosc-kredytowa/')
    await waitFor(() => {
      expect(document.body.textContent).toMatch(
        /Zdolność kredytowa to maksymalna kwota kredytu/i
      )
    })
  })
})

describe('Performance: initial import graph', () => {
  it('does NOT eagerly load jspdf when importing App', () => {
    // Importing <App/> must not transitively evaluate the jspdf module.
    expect(jspdfState.loaded).toBe(false)
  })
})
