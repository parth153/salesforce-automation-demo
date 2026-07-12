import { test, expect } from '../fixtures';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Cases', () => {
  let caseId: string;
  const subject = `PW Status ${Date.now()}`;

  test.beforeEach(async () => {
    caseId = await createRecord('Case', { Subject: subject, Status: 'New', Origin: 'Phone' });
  });

  test.afterEach(async () => {
    await deleteRecord('Case', caseId);
  });

  test('should update Case status', async ({ page }) => {
    await page.goto(`/lightning/r/Case/${caseId}/view`);
    const record = new RecordPage(page);
    await expect(record.recordHeading).toBeVisible();

    // The edit picklist offers New/Working/Escalated (Closed is set via a
    // separate close flow), so progress the case to Working.
    await record.edit();
    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    await modal.selectOption('Status', 'Working');
    await modal.save();

    // The detail page reflects the new status.
    await expect(page.getByRole('main').getByText('Working').first()).toBeVisible();
  });
});
