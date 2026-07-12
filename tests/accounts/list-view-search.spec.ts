import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';

test.describe('Accounts', () => {
  test('should search and filter within Accounts list view', async ({ page }) => {
    const accounts = new ObjectListPage(page, 'Account');
    await accounts.goto();

    // Use a real Account name from the list, then filter by it.
    const name = (await accounts.firstRowLink().innerText()).trim();
    await accounts.search(name);

    await expect(accounts.rowLink(name)).toBeVisible();
    // Filtering narrowed the list: poll until every visible row matches the term
    // (the list filter applies asynchronously).
    await expect(async () => {
      const rows = accounts.grid.getByRole('rowheader');
      const rowCount = await rows.count();
      expect(rowCount).toBeGreaterThan(0);
      for (let i = 0; i < rowCount; i++) {
        expect(await rows.nth(i).innerText()).toContain(name);
      }
    }).toPass({ timeout: 20_000 });
  });
});
