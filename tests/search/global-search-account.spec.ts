import { test, expect } from '../fixtures';
import { GlobalSearch } from '../pages/GlobalSearch';

test.describe('Global Search', () => {
  test('should return results for a known Account name', async ({ page }) => {
    // Pick a real Account name from the Accounts list so the search is
    // data-driven rather than relying on a hard-coded record.
    await page.goto('/lightning/o/Account/list?filterName=__Recent');
    const firstAccount = page.getByRole('grid').getByRole('rowheader').getByRole('link').first();
    await expect(firstAccount).toBeVisible();
    const accountName = (await firstAccount.innerText()).trim();

    const search = new GlobalSearch(page);
    await search.search(accountName);

    await expect(search.recordSuggestion(accountName, 'Account')).toBeVisible();
  });
});
