require('dotenv').config();

const { After, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const POManager = require('../../pages/POManager');

setDefaultTimeout(30 * 1000);

Before(async function () {
    if (!process.env.BASE_URL) {
        throw new Error('BASE_URL environment variable is missing');
    }

    this.browser = await chromium.launch();
    const context = await this.browser.newContext({ baseURL: process.env.BASE_URL });
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
    this.loginPage = this.poManager.getLoginPage();
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});
