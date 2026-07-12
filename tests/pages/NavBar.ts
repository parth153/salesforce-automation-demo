import { type Locator, type Page } from '@playwright/test';

/** The Lightning app navigation bar: current app name + primary tabs. */
export class NavBar {
  readonly page: Page;
  readonly globalNavigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.globalNavigation = page.getByRole('navigation', { name: 'Global' });
  }

  /**
   * The current app's name, shown as a level-1 heading. Not scoped to the App
   * navigation because its placement varies between apps (e.g. Developer Edition
   * renders it outside that landmark).
   */
  appName(name: string): Locator {
    return this.page.getByRole('heading', { name, level: 1 });
  }

  /** A primary nav tab link (e.g. 'Accounts'). */
  tab(name: string): Locator {
    return this.globalNavigation.getByRole('link', { name, exact: true });
  }

  async goToTab(name: string) {
    await this.tab(name).click();
  }
}
