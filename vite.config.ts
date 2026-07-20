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
    // Modern browsers support <link rel="modulepreload"> natively. Disabling
    // the JS polyfill avoids injecting dead imports into the entry chunk.
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Heavy PDF/export libs are ONLY used on demand (dynamic import in
            // ExportPdfButton). Leave them to Rollup's automatic code-splitting
            // so they land in the on-demand chunk — NOT in the entry chunk
            // (manually chunking them forced the entry to statically preload
            // ~540KB of jsPDF + html2canvas on every page).
            if (id.includes('jspdf') || id.includes('html2canvas')) return

            // Everything else from node_modules is grouped into one vendor chunk.
            return 'vendor'
          }

          // NOTE: Do NOT manually split src/pages. React.lazy dynamic imports
          // are code-split automatically by Rollup; manual page chunking forced
          // shared modules into page chunks, making the entry depend on them.
        }
      }
    }
  }
})
