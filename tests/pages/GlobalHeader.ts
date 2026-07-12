import { type Locator, type Page, expect } from '@playwright/test';
import { AppLauncher } from './AppLauncher';

/** The Lightning global header: search, app launcher, setup, notifications, profile. */
export class GlobalHeader {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly setupButton: Locator;
  readonly notificationsButton: Locator;
  readonly appLauncherButton: Locator;
  readonly profileButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.setupButton = page.getByRole('button', { name: 'Setup' });
    this.notificationsButton = page.getByRole('button', { name: 'Notifications' });
    this.appLauncherButton = page.getByRole('button', { name: 'App Launcher' });
    this.profileButton = page.getByRole('button', { name: 'View profile' });
  }

  async expectVisible() {
    await expect(this.searchButton).toBeVisible();
    await expect(this.setupButton).toBeVisible();
    await expect(this.notificationsButton).toBeVisible();
    await expect(this.appLauncherButton).toBeVisible();
  }

  async openAppLauncher(): Promise<AppLauncher> {
    const appLauncher = new AppLauncher(this.page);
    // A still-loading app can swallow the button click, so retry opening until
    // the dialog and its (editable) search box are actually ready.
    await expect(async () => {
      await this.appLauncherButton.click();
      await expect(appLauncher.dialog).toBeVisible({ timeout: 5_000 });
      await expect(appLauncher.searchInput).toBeEditable({ timeout: 5_000 });
    }).toPass({ timeout: 60_000 });
    return appLauncher;
  }

  async logOut() {
    await this.profileButton.click();
    await this.page.getByRole('link', { name: 'Log Out' }).click();
  }
}
