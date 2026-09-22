import { defineConfig } from '@playwright/test'
import viteConfig from './vite.config.js'

const baseURL = new URL(viteConfig.base, 'http://127.0.0.1:4173').href

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: { baseURL, browserName: 'chromium' },
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
})
