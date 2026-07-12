import { test, expect } from '../fixtures';

test.describe('Navigation and App Switching', () => {
  test('should search apps and items from App Launcher', async ({ homePage }) => {
    await homePage.goto();

    const appLauncher = await homePage.header.openAppLauncher();
    await appLauncher.searchFor('Content');

    // The matching app remains; a non-matching one is filtered out.
    await expect(appLauncher.appOption('Content')).toBeVisible();
    await expect(appLauncher.appOption('Service')).toBeHidden();
  });
});
