import { test, expect } from '../fixtures';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Accounts', () => {
  let accountId: string;
  const name = `PW Edit ${Date.now()}`;

  test.beforeEach(async () => {
    accountId = await createRecord('Account', { Name: name });
  });

  test.afterEach(async () => {
    await deleteRecord('Account', accountId);
  });

  test('should edit an existing Account', async ({ page }) => {
    await page.goto(`/lightning/r/Account/${accountId}/view`);
    const record = new RecordPage(page);
    await record.expectLoaded(name);

    await record.edit();
    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    const phone = `415-555-${Math.floor(1000 + Math.random() * 9000)}`;
    await modal.fillText('Phone', phone);
    await modal.selectOption('Industry', 'Technology');
    await modal.save();

    // The updated values are reflected on the detail page.
    await expect(page.getByText(phone)).toBeVisible();
    await expect(page.getByText('Technology')).toBeVisible();
  });
});
