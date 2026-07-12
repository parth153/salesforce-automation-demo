import { type Locator, type Page, expect } from '@playwright/test';

/** A standard Lightning record detail page (highlights, actions, related lists). */
export class RecordPage {
  readonly page: Page;
  readonly recordHeading: Locator;
  readonly moreActionsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // The record's own heading (e.g. "Account Acme"). Scoped to main to avoid
    // the app-name heading in the nav; first() because the page can render more
    // than one level-1 heading in main.
    this.recordHeading = page.getByRole('main').getByRole('heading', { level: 1 }).first();
    this.moreActionsButton = page.getByRole('button', { name: 'Show more actions' });
  }

  async expectLoaded(name: string) {
    await expect(this.recordHeading).toContainText(name);
  }

  async clickAction(name: string) {
    // Some objects (e.g. Case) expose Edit/Delete as direct highlight buttons;
    // others (e.g. Account) keep them in the "Show more actions" overflow menu.
    const directButton = this.page.getByRole('main').getByRole('button', { name, exact: true }).first();
    if (await directButton.isVisible().catch(() => false)) {
      await directButton.click();
      return;
    }
    await this.moreActionsButton.click();
    await this.page.getByRole('menuitem', { name, exact: true }).click();
  }

  async edit() {
    await this.clickAction('Edit');
  }

  async delete() {
    await this.clickAction('Delete');
  }

  /** Confirms a delete in the "Delete <Object>" confirmation dialog. */
  async confirmDelete() {
    const dialog = this.page.getByRole('dialog');
    const confirmButton = dialog.getByRole('button', { name: 'Delete', exact: true });
    // The modal animates in; wait for the button before clicking or the click
    // can be swallowed and the delete never fires.
    await confirmButton.waitFor();
    await confirmButton.click();
    await expect(dialog).toBeHidden();
  }

  /** A related-list card by name (e.g. "Contacts", "Opportunities", "Cases"). */
  relatedList(name: string): Locator {
    return this.page.getByRole('article', { name });
  }

  /**
   * Extracts the 15/18-char record id from a record URL. Handles both the
   * record-page form (/lightning/r/Account/<id>/view) and the list-link form
   * (/lightning/r/<id>/view), where the object segment is omitted.
   */
  static idFromUrl(url: string): string | undefined {
    return url.match(/\/r\/(?:[^/]+\/)?([a-zA-Z0-9]{15,18})(?:\/|$)/)?.[1];
  }
}
