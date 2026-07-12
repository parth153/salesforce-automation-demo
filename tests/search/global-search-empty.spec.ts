import { test, expect } from '../fixtures';
import { GlobalSearch } from '../pages/GlobalSearch';

test.describe('Global Search', () => {
  test('should show no results state for a nonsense query', async ({ homePage, page }) => {
    await homePage.goto();

    const search = new GlobalSearch(page);
    await search.search('zzqwxnonsense12345');
    await search.submit();

    await expect(search.emptyState).toBeVisible();
  });
});
