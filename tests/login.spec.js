import { expect, test } from '@playwright/test';
import { loginScenarios } from '../data/users.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { LoginPage } from '../pages/LoginPage.js';

for (const scenario of loginScenarios) {
  test(`Login with ${scenario.name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Submit credentials', async () => {
      await loginPage.login(scenario.username, scenario.password);
    });

    await test.step('Validate login result', async () => {
      if (scenario.shouldLogin) {
        await inventoryPage.expectLoaded();
      } else {
        await loginPage.expectError(scenario.errorMessage);
        await expect(page).toHaveURL('/');
      }
    });
  });
}
