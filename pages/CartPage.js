import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectLoaded() {
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectProductVisible(productName) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}
