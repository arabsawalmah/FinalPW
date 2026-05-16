import { test, expect } from '@playwright/test';
import { DATA } from '../data';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove from Cart Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(DATA.URL + 'inventory.html');
  });

  test('Remove single item and verify zero', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await cartPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeFirstItem();
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.cartBadge).not.toBeVisible();
  });

  test('Remove multiple items one by one', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await cartPage.openCart();

    await cartPage.removeFirstItem();
    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeFirstItem();
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});