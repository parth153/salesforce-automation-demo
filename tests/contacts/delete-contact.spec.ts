import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { RecordPage } from '../pages/RecordPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Contacts', () => {
  let contactId: string | undefined;
  const lastName = `PWDelete${Date.now()}`;

  test.afterEach(async () => {
    if (contactId) {
      await deleteRecord('Contact', contactId);
      contactId = undefined;
    }
  });

  test('should delete a Contact', async ({ page }) => {
    // Create a Contact specifically for this test.
    contactId = await createRecord('Contact', { LastName: lastName });

    await page.goto(`/lightning/r/Contact/${contactId}/view`);
    const record = new RecordPage(page);
    await record.expectLoaded(lastName);

    await record.delete();
    await record.confirmDelete();

    // Navigating directly to the deleted record shows a not-found/deleted message.
    // Reload-poll as the page can lag under load.
    await expect(async () => {
      await page.goto(`/lightning/r/Contact/${contactId}/view`);
      await expect(
        page.getByText(/couldn.t find the record|may have been deleted|no longer exists/i),
      ).toBeVisible({ timeout: 8_000 });
    }).toPass({ timeout: 45_000 });

    // No longer in the Recently Viewed list. The deleted contact was just viewed,
    // so it would appear if still present; poll with reload as the list lags.
    const contacts = new ObjectListPage(page, 'Contact');
    await expect(async () => {
      await contacts.goto();
      await expect(contacts.rowLink(lastName)).toHaveCount(0, { timeout: 5_000 });
    }).toPass({ timeout: 60_000 });

    contactId = undefined; // deleted via UI; skip API cleanup
  });
});
