import { test, expect } from '@playwright/test';
import { DATA } from '../data';
import { LoginPage } from '../pages/LoginPage';

// Do not use the saved auth state for login tests
test.use({ storageState: { cookies: [], origins: [] } });

test('Successful Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(DATA.URL);
  await loginPage.login(DATA.USER_NAME, DATA.PASSWORD);
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('Failed Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(DATA.URL);
  await loginPage.login(DATA.USER_NAME, '');
  await expect(page).toHaveURL(DATA.URL);
});