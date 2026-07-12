import { type Locator, type Page, expect } from '@playwright/test';

/** The Lightning global search: header button, input, instant suggestions, and results page. */
export class GlobalSearch {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly searchBox: Locator;
  readonly suggestions: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.searchBox = page.getByRole('searchbox', { name: 'Search...' });
    this.suggestions = page.getByRole('listbox', { name: 'Suggestions' });
    this.emptyState = page.getByText(/didn't find any matches/i);
  }

  async open() {
    await this.searchButton.click();
    await this.searchBox.waitFor();
  }

  /** Opens search and types a term, revealing the instant-suggestions listbox. */
  async search(term: string) {
    await this.open();
    await this.searchBox.click();
    await this.searchBox.pressSequentially(term);
    await expect(this.suggestions).toBeVisible();
  }

  /** An instant-suggestion option whose text contains the given record name. */
  suggestion(name: string): Locator {
    return this.suggestions.getByRole('option', { name });
  }

  /**
   * The instant-suggestion for a specific record, matched exactly as
   * "<name> <objectLabel>" (e.g. "Acme Account") to distinguish the record from
   * the "search within <object>" query suggestions.
   */
  recordSuggestion(name: string, objectLabel: string): Locator {
    return this.suggestions.getByRole('option', { name: `${name} ${objectLabel}`, exact: true });
  }

  /** Submits the current term and navigates to the full search results page. */
  async submit() {
    await this.searchBox.press('Enter');
  }
}
