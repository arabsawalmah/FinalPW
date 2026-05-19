import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const URL = process.env.URL || 'https://www.saucedemo.com/';
const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    // Already logged in via setup, go straight to inventory
    await page.goto(URL + 'inventory.html');
  });

  test('Checkout with one item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await cartPage.checkoutButton.click();

    await checkoutPage.fillCustomerInfo('Arab', 'Tester', '12345');
    await checkoutPage.continue();

    await expect(page.locator('.inventory_item_name')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toHaveText(BACKPACK);

    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('Checkout with Multiple items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.openCart();
    await cartPage.checkoutButton.click();

    await checkoutPage.fillCustomerInfo('Arab', 'Tester', '12345');
    await checkoutPage.continue();

    const items = page.locator('.inventory_item_name');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText(BACKPACK);
    await expect(items.nth(1)).toHaveText(BIKE_LIGHT);

    await expect(checkoutPage.subtotalLabel).toContainText('39.98');

    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
