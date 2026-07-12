import { test, expect } from '../fixtures';

const EXPECTED_APPS = [
  'Developer Edition',
  'Digital Experiences',
  'Service',
  'Marketing CRM Classic',
  'Community',
  'Salesforce Chatter',
  'Content',
];

test.describe('Navigation and App Switching', () => {
  test('should open App Launcher and list available apps', async ({ homePage }) => {
    await homePage.goto();

    const appLauncher = await homePage.header.openAppLauncher();

    await expect(appLauncher.searchInput).toBeVisible();
    await expect(appLauncher.dialog.getByRole('heading', { name: 'Apps' })).toBeVisible();

    for (const app of EXPECTED_APPS) {
      await expect(appLauncher.appOption(app)).toBeVisible();
    }
  });
});
