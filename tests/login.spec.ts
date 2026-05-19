import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const URL = process.env.URL || 'https://www.saucedemo.com/';
const USER_NAME = process.env.USER_NAME || 'standard_user';
const PASSWORD = process.env.PASSWORD || 'secret_sauce';

// Do not use the saved auth state for login tests
test.use({ storageState: { cookies: [], origins: [] } });

test('Successful Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(URL);
  await loginPage.login(USER_NAME, PASSWORD);
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('Failed Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto(URL);
  await loginPage.login(USER_NAME, '');
  await expect(page).toHaveURL(URL);
});
