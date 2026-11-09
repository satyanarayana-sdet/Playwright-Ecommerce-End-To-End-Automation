const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductAssignPage = require('../pages/ProductAssignPage');
const POManager = require('../pages/POManager');
const { customtest } = require('../Utils/testDataUtils');

test.describe('login tests', () => {


    customtest('login with valid credentials', async ({ page, testDataForOrder }) => {
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
        await productAssignPage.selectCategory(testDataForOrder.category, testDataForOrder.subCategory);
        await expect(page).toHaveURL(/\/category_products\/3$/);

        const productName = await productAssignPage.addToCart(testDataForOrder.productName);
        await page.getByRole('link', { name: /Cart/ }).click();
        await expect(page).toHaveURL(/\/view_cart$/);
        await expect(page.getByText(productName, { exact: true })).toBeVisible();
        await productAssignPage.proceedToCheckout();
        await expect(page).toHaveURL(/\/checkout$/);
        await productAssignPage.placeOrder();
        await expect(page).toHaveURL(/\/payment$/);
        await productAssignPage.fillpaymentDetails(
            testDataForOrder.cardDetails.name_on_card,
            testDataForOrder.cardDetails.card_number,
            testDataForOrder.cardDetails.cvc,
            testDataForOrder.cardDetails.expiry_month,
            testDataForOrder.cardDetails.expiry_year
        );
       await expect(page).toHaveURL(/\/payment_done\/\d+$/);
        await expect(page.getByText('Congratulations! Your order has been confirmed!', { exact: true })).toBeVisible();



    });


})