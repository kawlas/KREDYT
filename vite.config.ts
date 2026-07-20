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
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  ssr: {
    noExternal: ['react-helmet-async']
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor libraries
          if (id.includes('node_modules')) {
            // Split heavy libraries into their own chunks
            if (id.includes('html2canvas')) return 'html2canvas'
            if (id.includes('jspdf')) return 'jspdf'
            if (id.includes('recharts')) return 'recharts'
            if (id.includes('dompurify')) return 'dompurify'
            
            // Group other node_modules into vendor chunk
            return 'vendor'
          }
          
          // Split pages into separate chunks
          if (id.includes('/pages/')) {
            const match = id.match(/\/pages\/([^/]+)\./)
            if (match) {
              return `page-${match[1]}`
            }
          }
        }
      }
    }
  }
})
