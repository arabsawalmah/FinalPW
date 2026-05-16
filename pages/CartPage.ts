import type { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartBadge: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartItems = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async removeFirstItem() {
    await this.page.locator('button:has-text("Remove")').first().click();
  }

  async removeItemById(itemId: string) {
    await this.page.locator(`[data-test="remove-${itemId}"]`).click();
  }
}
