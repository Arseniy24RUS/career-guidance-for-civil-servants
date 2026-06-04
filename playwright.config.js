const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: { timeout: 10000 },
  use: {
    baseURL: 'http://127.0.0.1:4178',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'npx http-server . -a 127.0.0.1 -p 4178 -c-1',
    url: 'http://127.0.0.1:4178',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], locale: 'en-US', viewport: { width: 1440, height: 1000 } }
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'], locale: 'ru-RU' }
    }
  ]
});
