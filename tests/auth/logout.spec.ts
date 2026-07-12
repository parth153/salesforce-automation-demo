import { test, expect } from '../fixtures';

// This scenario needs an authenticated starting point, unlike the rest of this
// directory's 'auth' project, so it opts back into the saved storage state.
test.use({ storageState: 'tests/.auth/storageState.json' });

test.describe('Authentication', () => {
  test('should log out successfully', async ({ page, loginPage, homePage }) => {
    await homePage.goto();
    await homePage.header.logOut();

    // Logout redirects through logout.jsp before the login form renders.
    await expect(loginPage.heading).toBeVisible({ timeout: 30_000 });
    await expect(loginPage.usernameInput).toBeVisible();

    // Session is dead: hitting an authenticated URL redirects back to login.
    await page.goto('/lightning/page/home');
    await expect(loginPage.heading).toBeVisible({ timeout: 30_000 });
  });
});
