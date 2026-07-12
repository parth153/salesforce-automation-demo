import { type Locator, type Page, expect } from '@playwright/test';

/** A standard Lightning object list view (e.g. Accounts, Contacts). */
export class ObjectListPage {
  readonly page: Page;
  readonly objectApiName: string;
  readonly grid: Locator;
  readonly newButton: Locator;
  readonly listSearch: Locator;

  constructor(page: Page, objectApiName: string) {
    this.page = page;
    this.objectApiName = objectApiName;
    this.grid = page.getByRole('grid');
    this.newButton = page.getByRole('button', { name: 'New', exact: true });
    this.listSearch = page.getByRole('searchbox', { name: 'Search this list...' });
  }

  async goto(filterName = '__Recent') {
    await this.page.goto(`/lightning/o/${this.objectApiName}/list?filterName=${filterName}`);
    // Wait for the toolbar (always present) rather than the grid, which is
    // absent when the list view has no records.
    await expect(this.newButton).toBeVisible();
  }

  /** The name link for a specific row. */
  rowLink(name: string): Locator {
    return this.grid.getByRole('rowheader').getByRole('link', { name, exact: true });
  }

  firstRowLink(): Locator {
    return this.grid.getByRole('rowheader').getByRole('link').first();
  }

  async search(term: string) {
    await this.listSearch.click();
    await this.listSearch.fill(term);
    await this.listSearch.press('Enter');
  }

  async clickNew() {
    await this.newButton.click();
  }

  /** Switches the current list view (e.g. "All Closed Cases"). */
  async selectListView(name: string) {
    await this.page.getByRole('button', { name: /Select a List View/ }).click();
    await this.page.getByRole('option', { name, exact: true }).click();
    await expect(this.page.getByRole('heading', { name, level: 1 })).toBeVisible();
  }

  async open(name: string) {
    await this.rowLink(name).click();
  }
}
