// e2e/configs/dev.config.ts
import { defineConfig, devices } from '@playwright/test';
import baseConfig from '../playwright.config';

const baseURL = 'https://m.apuestas.codere.es/';

export default defineConfig({
  ...baseConfig,
  testDir: '../tests',
  outputDir: '../test-results',
  use: {
    baseURL,
    // in case the test fail is attached automatically video, screenshot and trace for evidence in the report
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
/*     DESKTOP PROJECTS */
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Webkit',
      use: { ...devices['Desktop Safari'] },
    },
   /*  MOBILE PROJECTS */
    {
      name: 'IOS',
      use: { ...devices['iPhone 12 Pro'] },
    },
    {
      name: 'ANDROID',
      use: { ...devices['Galaxy S24'] },
    },
  ],
});
