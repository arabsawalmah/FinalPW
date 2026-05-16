import type { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly sortSelect: Locator;
  readonly productNames: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect.selectOption(value);
  }

  get firstProductName() {
    return this.productNames.first();
  }

  get lastProductName() {
    return this.productNames.last();
  }

  inventoryItemNameByIndex(index: number) {
    return this.productNames.nth(index);
  }

  async addToCart(itemId: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
  }

  async removeFromCart(itemId: string) {
    await this.page.locator(`[data-test="remove-${itemId}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
