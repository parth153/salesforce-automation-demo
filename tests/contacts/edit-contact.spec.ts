import { test, expect } from '../fixtures';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Contacts', () => {
  let contactId: string;
  const lastName = `PWEdit${Date.now()}`;

  test.beforeEach(async () => {
    contactId = await createRecord('Contact', { LastName: lastName });
  });

  test.afterEach(async () => {
    await deleteRecord('Contact', contactId);
  });

  test('should edit an existing Contact', async ({ page }) => {
    await page.goto(`/lightning/r/Contact/${contactId}/view`);
    const record = new RecordPage(page);
    await record.expectLoaded(lastName);

    await record.edit();
    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    const email = `pw${Date.now()}@example.com`;
    const title = 'QA Engineer';
    await modal.fillText('Email', email);
    await modal.fillText('Title', title);
    await modal.save();

    await expect(page.getByText(email)).toBeVisible();
    await expect(page.getByText(title)).toBeVisible();
  });
});
