import { type Locator, type Page, expect } from '@playwright/test';

/**
 * A record create/edit modal. The New modal is titled "New <Object>" and the
 * Edit modal "Edit <Name>", so the dialog is matched generically (only one is
 * open at a time).
 */
export class RecordFormModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog');
    this.saveButton = this.dialog.getByRole('button', { name: 'Save', exact: true });
  }

  async waitOpen() {
    await expect(this.dialog).toBeVisible();
  }

  textbox(label: string): Locator {
    return this.dialog.getByRole('textbox', { name: label, exact: true });
  }

  async fillText(label: string, value: string) {
    await this.textbox(label).fill(value);
  }

  /** Selects a value from a Lightning picklist combobox. */
  async selectOption(label: string, value: string) {
    await this.dialog.getByRole('combobox', { name: label, exact: true }).click();
    await this.page.getByRole('listbox', { name: label }).getByRole('option', { name: value, exact: true }).click();
  }

  /** Selects a related record in a Lightning lookup field (e.g. "Account Name"). */
  async selectLookup(label: string, value: string) {
    const lookup = this.dialog.getByRole('combobox', { name: label, exact: true });
    const listbox = this.page.getByRole('listbox', { name: label });
    const option = listbox.getByRole('option', { name: value, exact: true });
    // Type character-by-character so the lookup's async search reliably fires
    // (fill() can be debounced away), retrying if the result doesn't appear.
    await expect(async () => {
      await lookup.click();
      await lookup.fill('');
      await lookup.pressSequentially(value);
      await expect(option).toBeVisible({ timeout: 8_000 });
    }).toPass({ timeout: 40_000 });
    await option.click();
  }

  async save() {
    await this.saveButton.click();
    await expect(this.dialog).toBeHidden();
  }
}
