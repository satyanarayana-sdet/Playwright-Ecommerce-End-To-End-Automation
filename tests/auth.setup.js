const fs = require('fs');
const path = require('path');
const { test: setup, expect } = require('@playwright/test');

const authFile = path.join(__dirname, '..', 'playwright', '.auth', 'user.json');

setup('save the authenticated session', async ({ page }) => {
    const email = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    if (!email || !password) {
        throw new Error('Set TEST_USERNAME and TEST_PASSWORD in .env before running this test');
    }

    await page.goto('/login');
    await page.getByPlaceholder('Email Address').first().fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText(/Logged in as/i)).toBeVisible();

    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });
});
