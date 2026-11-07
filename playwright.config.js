
// @ts-check

require('dotenv').config();
console.log(process.env.BASE_URL);

const { defineConfig, devices } = require('@playwright/test');

const config = defineConfig({

  testDir: './tests',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Assertion timeout
  expect: {
    timeout: 5000
  },

  // HTML reporter
  reporter: 'html',

  // Shared settings
  use: {

    // Application URL from .env
    baseURL: process.env.BASE_URL,

    browserName: 'chromium',

    headless: false,

    screenshot: 'on',

    trace: 'on',

  },

});

module.exports = config;
