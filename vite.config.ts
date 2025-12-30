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
        bypass: (req, res) => {
          if (req.url === '/.netlify/functions/wibor') {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              value: 5.85, 
              date: new Date().toISOString().split('T')[0],
              source: 'stooq (local-mock)'
            }))
            return false 
          }
        }
      }
    }
  },
  ssr: {
    noExternal: ['react-helmet-async']
  },
  build: {
    manifest: true
  }
})
