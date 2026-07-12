import { type Locator, type Page, expect } from '@playwright/test';

/** The 'App Launcher' modal dialog, opened from the GlobalHeader. */
export class AppLauncher {
  readonly page: Page;
  readonly dialog: Locator;
  readonly searchInput: Locator;
  readonly appsListbox: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog', { name: 'App Launcher' });
    this.searchInput = this.dialog.getByRole('combobox', { name: 'Search apps and items...' });
    this.appsListbox = this.dialog.getByRole('listbox', { name: 'Apps' });
    this.closeButton = this.dialog.getByRole('button', { name: 'Close' });
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
  }

  appOption(name: string): Locator {
    return this.appsListbox.getByRole('option', { name, exact: true });
  }

  async openApp(name: string) {
    // Filter first — the unfiltered Apps list is virtualized, so a target app
    // can be absent from the DOM until searched. Retry the search because a
    // fill() can be debounced away under load before results appear.
    const option = this.appOption(name);
    await expect(async () => {
      await this.searchInput.fill('');
      await this.searchInput.fill(name);
      await expect(option).toBeVisible({ timeout: 5_000 });
    }).toPass({ timeout: 30_000 });
    await option.click();
  }
}
