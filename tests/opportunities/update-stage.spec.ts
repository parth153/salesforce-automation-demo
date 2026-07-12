import { test, expect } from '../fixtures';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Opportunities', () => {
  let opportunityId: string;
  const name = `PW Stage ${Date.now()}`;

  test.beforeEach(async () => {
    opportunityId = await createRecord('Opportunity', {
      Name: name,
      StageName: 'Qualification',
      CloseDate: '2026-12-31',
    });
  });

  test.afterEach(async () => {
    await deleteRecord('Opportunity', opportunityId);
  });

  test('should progress an Opportunity through stages', async ({ page }) => {
    await page.goto(`/lightning/r/Opportunity/${opportunityId}/view`);
    const record = new RecordPage(page);
    await record.expectLoaded(name);

    // Advance to the next stage.
    await record.edit();
    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    await modal.selectOption('Stage', 'Needs Analysis');
    await modal.save();

    // The stage path indicator reflects the new current stage.
    await expect(
      page.getByRole('main').getByRole('option', { name: 'Needs Analysis', selected: true }),
    ).toBeVisible();
  });
});
