import { expect, test } from '@playwright/test';
import { validUser } from '../data/users.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { LoginPage } from '../pages/LoginPage.js';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.login(validUser.username, validUser.password);
  await inventoryPage.expectLoaded();
});

test('Sort inventory by name from A to Z', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.sortBy('az');

  const productNames = await inventoryPage.getProductNames();
  const sortedNames = [...productNames].sort((first, second) => first.localeCompare(second));

  expect(productNames).toEqual(sortedNames);
});

test('Sort inventory by price from high to low', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.sortBy('hilo');

  const productPrices = await inventoryPage.getProductPrices();
  const sortedPrices = [...productPrices].sort((first, second) => second - first);

  expect(productPrices).toEqual(sortedPrices);
});
