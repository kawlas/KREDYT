import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npx vite --port 4173',
    port: 4173,
    timeout: 30000,
    reuseExistingServer: true,
  },
})
