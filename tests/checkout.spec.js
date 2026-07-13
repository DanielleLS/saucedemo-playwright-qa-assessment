import { test } from '@playwright/test';
import { checkoutCustomer } from '../data/customer.js';
import { validUser } from '../data/users.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { LoginPage } from '../pages/LoginPage.js';

test('Complete checkout for a single product', async ({ page }) => {
  const productName = 'Sauce Labs Backpack';
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await test.step('Login as standard user', async () => {
    await loginPage.open();
    await loginPage.login(validUser.username, validUser.password);
    await inventoryPage.expectLoaded();
  });

  await test.step('Add product to cart', async () => {
    await inventoryPage.addProductToCart(productName);
    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectProductVisible(productName);
  });

  await test.step('Complete checkout', async () => {
    await cartPage.startCheckout();
    await checkoutPage.fillCustomerInformation(checkoutCustomer);
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderCompleted();
  });
});
