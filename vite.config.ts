/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  server: {
    proxy: {
      '/.netlify/functions/wibor': {
        target: 'https://stooq.pl/q/d/l/?s=wibor3m&i=d',
        changeOrigin: true,
        // Mock the response for local dev since we can't run the actual Netlify function without netlify-cli
        // and hitting stooq directly returns CSV, not JSON.
        bypass: (req, res) => {
          if (req.url === '/.netlify/functions/wibor') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              value: 5.85, 
              date: new Date().toISOString().split('T')[0],
              source: 'stooq (local-mock)'
            }))
            return true // Return true to bypass the proxy and use the response above
          }
        }
      }
    }
  }
})
