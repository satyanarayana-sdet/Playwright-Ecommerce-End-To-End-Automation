const { Given, Then, When } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the login page', async function () {
    await this.loginPage.open();
});

When('I submit login with email {string} and password {string}', async function (email, password) {
    await this.loginPage.submitLogin(email, password);
});

Then('I should see the invalid login message', async function () {
    await expect(this.loginPage.getLoginErrorMessage()).toBeVisible();
});
