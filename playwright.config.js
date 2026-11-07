
// @ts-check

require('dotenv').config();

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,

    browserName: 'chromium',

    headless: true,
    launchOptions: {
      headless: true,
    },

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',
  },

});
