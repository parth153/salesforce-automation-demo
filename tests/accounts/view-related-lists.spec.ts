import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { RecordPage } from '../pages/RecordPage';

test.describe('Accounts', () => {
  test('should view Account related lists', async ({ page }) => {
    // Open an existing Account (read-only scenario).
    const accounts = new ObjectListPage(page, 'Account');
    await accounts.goto();
    await accounts.firstRowLink().click();

    const record = new RecordPage(page);
    await expect(record.recordHeading).toBeVisible();

    // Related Contacts, Opportunities, and Cases lists are present.
    await expect(record.relatedList('Contacts')).toBeVisible();
    await expect(record.relatedList('Opportunities')).toBeVisible();
    await expect(record.relatedList('Cases')).toBeVisible();
  });
});
