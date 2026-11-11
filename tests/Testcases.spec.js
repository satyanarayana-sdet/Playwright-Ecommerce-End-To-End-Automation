const { test, expect } = require('@playwright/test');
const path = require('path');

const authFile = path.join(__dirname, '..', 'playwright', '.auth', 'user.json');

test.describe('Automation Exercise storefront', () => {
    test.use({
        baseURL: 'https://automationexercise.com',
        storageState: authFile,
    });

    test('opens the home page', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        await expect(page).toHaveTitle('Automation Exercise');
        await expect(
            page.getByRole('heading', { name: /Full-Fledged practice website/i })
        ).toBeVisible();
    });

    test('opens the Test Cases page', async ({ page }) => {
        await page.goto('/test_cases', { waitUntil: 'domcontentloaded' });

        await expect(page).toHaveURL(/\/test_cases$/);
        await expect(page).toHaveTitle(/Test Cases/);
    });

    test('shows products on the products page', async ({ page }) => {
        await page.goto('/products', { waitUntil: 'domcontentloaded' });

        await expect(page).toHaveTitle(/All Products/);
        await expect(page.locator('.productinfo.text-center').first()).toBeVisible();
    });

    test('finds a product by name', async ({ page }) => {
        await page.goto('/products', { waitUntil: 'domcontentloaded' });
        await page.getByPlaceholder('Search Product').fill('Blue Top');
        await page.locator('#submit_search').click();

        await expect(page).toHaveURL(/search=Blue/);
        await expect(page.getByText('Blue Top', { exact: true }).first()).toBeVisible();
    });

    test('opens a product detail page', async ({ page }) => {
        await page.goto('/product_details/1', { waitUntil: 'domcontentloaded' });

        await expect(page).toHaveURL(/\/product_details\/1$/);
        await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
        await expect(page.getByText('Availability: In Stock')).toBeVisible();
    });

    test('filters products by the Women dress category', async ({ page }) => {
        await page.goto('/category_products/1', { waitUntil: 'domcontentloaded' });

        await expect(page).toHaveURL(/\/category_products\/1$/);
        await expect(page).toHaveTitle(/Dress Products/);
    });

    test('filters products by the Polo brand', async ({ page }) => {
        await page.goto('/brand_products/Polo', { waitUntil: 'domcontentloaded' });

        await expect(page).toHaveURL(/\/brand_products\/Polo$/);
        await expect(page).toHaveTitle(/Polo Products/);
    });

    test('adds two items to the cart', async ({ page }) => {
        await page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
        const removeButtons = page.locator('.cart_quantity_delete');
        let remainingItems = await removeButtons.count();

        while (remainingItems > 0) {
            await removeButtons.first().click();
            remainingItems -= 1;
            await expect(removeButtons).toHaveCount(remainingItems);
        }

        await page.goto('/product_details/1', { waitUntil: 'domcontentloaded' });
        await page.locator('input[name="quantity"]').fill('2');
        await page.getByRole('button', { name: /Add to cart/i }).click();
        await expect(page.getByText('Added!', { exact: true })).toBeVisible();

        await page.goto('/view_cart', { waitUntil: 'domcontentloaded' });

        await expect(page).toHaveURL(/\/view_cart$/);
        await expect(page.locator('.cart_quantity')).toHaveText('2');
    });

    test('subscribes from the home page footer', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.locator('#susbscribe_email').fill('playwright.interview@example.com');
        await page.locator('#subscribe').click();

        await expect(
            page.getByText('You have been successfully subscribed!', { exact: true })
        ).toBeVisible();
    });

    test('reuses the saved login session and logs out', async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });

        await expect(page.getByText(/Logged in as/i)).toBeVisible();
        await page.getByRole('link', { name: /Logout/ }).click();
        await expect(page.getByRole('link', { name: /Signup \/ Login/ })).toBeVisible();
    });
});
