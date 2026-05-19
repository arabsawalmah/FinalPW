import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

const URL = process.env.URL || 'https://www.saucedemo.com/';

test.describe('Sort Feature (A-Z and Price High to Low)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL + 'inventory.html');
  });

  test('Sort by Name (A-Z)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('az');

    await expect(inventoryPage.firstProductName).toHaveText('Sauce Labs Backpack');
    await expect(inventoryPage.lastProductName).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

  test('Sort by Price (High to Low)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('hilo');

    await expect(inventoryPage.firstProductName).toHaveText('Sauce Labs Fleece Jacket');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$49.99');

    await expect(inventoryPage.lastProductName).toHaveText('Sauce Labs Onesie');
    await expect(page.locator('.inventory_item_price').last()).toHaveText('$7.99');
  });
});
