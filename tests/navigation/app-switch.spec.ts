import { test, expect } from '../fixtures';
import { NavBar } from '../pages/NavBar';

test.describe('Navigation and App Switching', () => {
  test('should switch between apps via App Launcher', async ({ page, homePage }) => {
    await homePage.goto();
    const navBar = new NavBar(page);

    // Switch to Developer Edition.
    let appLauncher = await homePage.header.openAppLauncher();
    await appLauncher.openApp('Developer Edition');
    await expect(navBar.appName('Developer Edition')).toBeVisible();

    // Switch back to Service and confirm its tabs are present.
    appLauncher = await homePage.header.openAppLauncher();
    await appLauncher.openApp('Service');
    await expect(navBar.appName('Service')).toBeVisible();

    for (const tab of ['Home', 'Chatter', 'Accounts', 'Contacts', 'Cases', 'Reports', 'Dashboards']) {
      await expect(navBar.tab(tab)).toBeVisible();
    }
  });
});
