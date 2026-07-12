import { test, expect } from '../fixtures';
import { SF_USERNAME, SF_PASSWORD } from '../utils/env';

test.describe('Authentication', () => {
  test('should log in with valid credentials and land on Home', async ({ page, loginPage, homePage }) => {
    await loginPage.goto();
    await loginPage.login(SF_USERNAME, SF_PASSWORD);

    // Identity verification (emailed code) is expected on a fresh browser context.
    // It can't be completed here, so skip rather than fail when it appears.
    const verifyHeading = page.getByRole('heading', { name: 'Verify Your Identity' });
    if (await verifyHeading.isVisible({ timeout: 10_000 }).catch(() => false)) {
      test.skip(true, 'Login requires an emailed verification code that cannot be automated in this environment.');
    }

    await expect(homePage.heading).toBeVisible();
    await homePage.header.expectVisible();
  });
});
