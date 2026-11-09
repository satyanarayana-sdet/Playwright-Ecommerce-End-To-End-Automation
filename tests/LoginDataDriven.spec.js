const { test, expect } = require('@playwright/test');
const POManager = require('../pages/POManager');
const { loginTestData } = require('../Utils/testDataUtils');

test.describe('data-driven login tests', () => {
    loginTestData.forEach((testData) => {
        test(`shows an error for ${testData.description}`, async ({ page }) => {
            const poManager = new POManager(page);
            const loginPage = poManager.loginPage;

            await loginPage.open();
            await loginPage.submitLogin(testData.username, testData.password);
            await expect(loginPage.getLoginErrorMessage()).toBeVisible();
        });
    });
});
