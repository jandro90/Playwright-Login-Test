// e2e/configs/prod.config.ts
import { defineConfig } from '@playwright/test';
import baseConfig from '../playwright.config';

// set your prod url here
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
/*   YOU CAN COMPLETE HERE YOUR CUSTOM PROD CONFIGS :) */
});
