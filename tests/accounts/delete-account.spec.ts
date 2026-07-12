import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { RecordPage } from '../pages/RecordPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Accounts', () => {
  let accountId: string | undefined;
  const name = `PW Delete ${Date.now()}`;

  test.afterEach(async () => {
    // Cleanup only if the UI delete did not already remove it.
    if (accountId) {
      await deleteRecord('Account', accountId);
      accountId = undefined;
    }
  });

  test('should delete an Account', async ({ page }) => {
    // Create an Account specifically for this test.
    accountId = await createRecord('Account', { Name: name });

    await page.goto(`/lightning/r/Account/${accountId}/view`);
    const record = new RecordPage(page);
    await record.expectLoaded(name);

    await record.delete();
    await record.confirmDelete();

    // Navigating directly to the deleted record shows a not-found/deleted message
    // (authoritative check that the delete succeeded). Reload-poll as the page
    // can lag under load.
    await expect(async () => {
      await page.goto(`/lightning/r/Account/${accountId}/view`);
      await expect(
        page.getByText(/couldn.t find the record|may have been deleted|no longer exists/i),
      ).toBeVisible({ timeout: 8_000 });
    }).toPass({ timeout: 45_000 });

    // No longer in the list view. The list search index lags deletion slightly,
    // so reload and re-search until the record is gone.
    const accounts = new ObjectListPage(page, 'Account');
    await expect(async () => {
      await accounts.goto();
      await accounts.search(name);
      await expect(accounts.rowLink(name)).toHaveCount(0, { timeout: 5_000 });
    }).toPass({ timeout: 60_000 });

    accountId = undefined; // deleted via UI; skip API cleanup
  });
});
