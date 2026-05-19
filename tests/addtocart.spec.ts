import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const URL = process.env.URL || 'https://www.saucedemo.com/';

test.describe('Cart Features - Parameterized', () => {
  const itemsToTest = [
    { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
    { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto(URL + 'inventory.html');
  });

  for (const item of itemsToTest) {
    test(`Verify adding ${item.name} to cart`, async ({ page }) => {
      const inventoryPage = new InventoryPage(page);
      const cartPage = new CartPage(page);

      await inventoryPage.addToCart(item.id);
      await expect(cartPage.cartBadge).toHaveText('1');

      await cartPage.openCart();
      await expect(cartPage.cartItems).toHaveText(item.name);

      await cartPage.removeItemById(item.id);
      await expect(cartPage.cartBadge).not.toBeVisible();
    });
  }

  test('Verify adding multiple items to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(cartPage.cartBadge).toHaveText('2');

    await cartPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(2);
  });
});
