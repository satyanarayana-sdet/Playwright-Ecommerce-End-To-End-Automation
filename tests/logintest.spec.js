const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductAssignPage = require('../pages/ProductAssignPage');
const POManager = require('../pages/POManager');

test.describe('login tests', () => {


    test('login with valid credentials', async ({ page }) => {
        // Validate environment variables
        const username = process.env.TEST_USERNAME;
        const password = process.env.TEST_PASSWORD;

        if (!username || !password) {
            throw new Error(
                'TEST_USERNAME or TEST_PASSWORD environment variable is missing'
            );
        }
        const poManager = new POManager(page);
        const loginPage = poManager.loginPage;
        await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
        expect(await loginPage.isLoggedIn()).toBe(true);
        await expect(
            page.getByText('Logged in as rajesh')
        ).toBeVisible();
        const productAssignPage = poManager.productAssignPage;
        await productAssignPage.selectCategory('Men', 'Tshirts');
        await expect(page).toHaveURL(/\/category_products\/3$/);

        const productName = await productAssignPage.addToCart('Men Tshirt');
        await page.getByRole('link', { name: /Cart/ }).click();
        await expect(page).toHaveURL(/\/view_cart$/);
        await expect(page.getByText(productName, { exact: true })).toBeVisible();

    });


})