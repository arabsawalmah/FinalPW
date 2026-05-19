import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = '.auth/user.json';
const URL = process.env.URL || 'https://www.saucedemo.com/';
const USER_NAME = process.env.USER_NAME || 'standard_user';
const PASSWORD = process.env.PASSWORD || 'secret_sauce';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(URL);
    await loginPage.login(USER_NAME, PASSWORD);
    
    // Save authentication state
    await page.context().storageState({ path: authFile });
});
