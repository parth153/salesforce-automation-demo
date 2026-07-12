import { test, expect } from '../fixtures';
import { NavBar } from '../pages/NavBar';
import type { Page } from '@playwright/test';

// Each Service-app tab and the URL prefix it should navigate to. Object tabs
// resolve to their list view (e.g. /lightning/o/Account/list?...), so match the
// stable object prefix rather than the tab's /home href.
const TABS: { name: string; urlFragment: string }[] = [
  { name: 'Home', urlFragment: '/lightning/page/home' },
  { name: 'Chatter', urlFragment: '/lightning/page/chatter' },
  { name: 'Accounts', urlFragment: '/lightning/o/Account/' },
  { name: 'Contacts', urlFragment: '/lightning/o/Contact/' },
  { name: 'Cases', urlFragment: '/lightning/o/Case/' },
  { name: 'Reports', urlFragment: '/lightning/o/Report/' },
  { name: 'Dashboards', urlFragment: '/lightning/o/Dashboard/' },
];

test.describe('Navigation and App Switching', () => {
  test('should navigate primary tabs within the Service app', async ({ page, homePage }) => {
    await homePage.goto();
    const navBar = new NavBar(page);

    for (const { name, urlFragment } of TABS) {
      await openTab(page, navBar, name, urlFragment);
      // Tab renders as selected once its page loads.
      await expect(navBar.tab(name)).toBeVisible();
    }
  });
});

/**
 * Clicks a nav tab and waits for its page to load. Lightning is a SPA that can
 * drop a click (or leave a tab briefly un-actionable) while the previous view is
 * still settling, so retry the whole click+navigation until the URL changes.
 */
async function openTab(page: Page, navBar: NavBar, name: string, urlFragment: string) {
  const urlPattern = new RegExp(urlFragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  await expect(async () => {
    await navBar.tab(name).click({ timeout: 10_000 });
    await page.waitForURL(urlPattern, { timeout: 10_000 });
  }).toPass({ timeout: 60_000 });
}
