import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { LoanCalculatorProvider } from './context/LoanCalculatorContext'
import App from './App'
import './index.css'

// Streaming SSR so that React.lazy route chunks (resolved in the browser on
// demand) are fully awaited and inlined into the prerendered HTML. Using
// onAllReady guarantees the resolved markup (no Suspense fallback) is flushed.
export function render(
  url: string,
  helmetContext: { helmet?: HelmetServerState }
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const stream = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <LoanCalculatorProvider>
              <App />
            </LoanCalculatorProvider>
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        onAllReady() {
          const chunks: Buffer[] = []
          const writable = new Writable({
            write(chunk, _encoding, callback) {
              chunks.push(Buffer.from(chunk))
              callback()
            },
            final(callback) {
              resolve(Buffer.concat(chunks).toString('utf-8'))
              callback()
            },
          })
          stream.pipe(writable)
        },
        onShellError(err) {
          reject(err)
        },
        onError(err) {
          // Non-shell errors are recoverable in the browser (hydration
          // mismatches from client-only state). Surface but still resolve.
          console.warn('SSR render warning for', url, '-', (err as Error)?.message)
        },
      }
    )
  })
}
