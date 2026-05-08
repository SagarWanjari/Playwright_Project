import { test, expect } from '@playwright/test';

import { AdvancedInventoryPage } from '../pages/AdvancedInventoryPage';

import '../hooks/advancedFailureCollector';

test.describe('Advanced Framework Tests', () => {

    test('Advanced Login Test @advanced', async ({ page }) => {

        await page.goto('https://www.saucedemo.com');

        await page.locator('#user-name')
            .fill('standard_user');

        await page.locator('#password')
            .fill('secret_sauce');

        await page.locator('#login-button')
            .click();

        await expect(page)
            .toHaveURL(
                'https://www.saucedemo.com/inventory.html'
            );

        const inventoryPage =
            new AdvancedInventoryPage(page);

        const products =
            await inventoryPage.getProductList();

        console.log(products);

        await inventoryPage.openCart();
    });
});