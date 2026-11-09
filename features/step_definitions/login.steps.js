const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { loginTestData } = require('../../Utils/testDataUtils');

Given('I am on the login page', async function () {
    await this.loginPage.open();
});

When('I submit the {string} login data', async function (description) {
    const testData = loginTestData.find((sample) => sample.description === description);

    if (!testData) {
        throw new Error(`No login test data found for "${description}"`);
    }

    await this.loginPage.submitLogin(testData.username, testData.password);
});

Then('I should see the invalid login message', async function () {
    await expect(this.loginPage.getLoginErrorMessage()).toBeVisible();
});
