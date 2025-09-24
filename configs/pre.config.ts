// e2e/configs/pre.config.ts
import { defineConfig } from '@playwright/test';
import baseConfig from '../playwright.config';

// set your pre url here
const baseURL = 'https://your_pre_url_here/';

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
 /*  YOU CAN COMPLETE HERE YOUR CUSTOM CONFIGS FOR 'PRE' :) */
});
