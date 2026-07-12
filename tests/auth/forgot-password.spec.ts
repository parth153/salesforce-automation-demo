import { test, expect } from '../fixtures';

test.describe('Authentication', () => {
  test('should navigate to forgot password flow', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.clickForgotPassword();

    await expect(page).toHaveURL(/forgotpassword/i);
    await expect(page.getByRole('heading', { name: /reset.*password/i })).toBeVisible();
  });
});
