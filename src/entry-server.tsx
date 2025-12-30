import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoanCalculatorProvider } from './context/LoanCalculatorContext'
import App from './App'
import './index.css'

export function render(url: string, helmetContext: any) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <LoanCalculatorProvider>
            <App />
          </LoanCalculatorProvider>
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  )
}
