import { test, expect } from '../fixtures';

test.describe('Authentication', () => {
  test('should show an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid-user@example.com', 'not-the-real-password');

    await expect(loginPage.errorMessage).toBeVisible();
    // On a failed login Salesforce re-renders the login form (posting to the
    // my.salesforce.com host) rather than authenticating, so assert the form persists.
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
