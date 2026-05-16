import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DATA } from '../data';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(DATA.URL);
    await loginPage.login(DATA.USER_NAME, DATA.PASSWORD);
    
    // Save authentication state
    await page.context().storageState({ path: authFile });
});
