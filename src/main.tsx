import { } from 'react'
import { createRoot } from 'react-dom/client'
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
  console.log('DOM populated. Switching to Client Rendering to prevent hydration mismatch...')
  // Clear SSR content to prevent React warning about existing children
  container.innerHTML = '' 
}

createRoot(container).render(app)
