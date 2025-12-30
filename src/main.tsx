import { } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from './context/LoanCalculatorContext'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

console.log('App starting...', { hasChildNodes: container.hasChildNodes() })

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
  console.log('Hydrating...')
  try {
    hydrateRoot(container, app)
  } catch (e) {
    console.error('Hydration failed:', e)
    // Fallback to render if hydration fails (though React usually does this warningly)
    createRoot(container).render(app)
  }
} else {
  console.log('Rendering (Client-side)...')
  createRoot(container).render(app)
}
