import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from './context/LoanCalculatorContext'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

const app = (
  <HelmetProvider>
    <BrowserRouter>
      <LoanCalculatorProvider>
        <App />
      </LoanCalculatorProvider>
    </BrowserRouter>
  </HelmetProvider>
)

if (container.hasChildNodes()) {
  // SSR prerendered HTML present.
  // Attempt hydration first — React will patch any mismatches from client-only state
  // (sessionStorage, RHF, useWIBOR) via onRecoverableError.
  // If hydration fails catastrophically, clear and do a fresh client render.
  try {
    hydrateRoot(container, app, {
      onRecoverableError: (err) => {
        // Expected: mismatches from sessionStorage, RHF defaults, motion animations
        // These are harmless — React patches the DOM to match client state.
        console.warn('Hydration mismatch (recoverable):', (err as Error).message)
      },
    })
  } catch {
    // Hydration failed — fall back to clean client render
    container.innerHTML = ''
    createRoot(container).render(app)
  }
} else {
  createRoot(container).render(app)
}
