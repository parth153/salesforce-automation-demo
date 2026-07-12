import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { deleteRecord } from '../utils/sfApi';

test.describe('Cases', () => {
  let caseId: string | undefined;

  test.afterEach(async () => {
    if (caseId) {
      await deleteRecord('Case', caseId);
      caseId = undefined;
    }
  });

  test('should create a new Case', async ({ page }) => {
    const subject = `PW Case ${Date.now()}`;
    const cases = new ObjectListPage(page, 'Case');
    await cases.goto();
    await cases.clickNew();

    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    await modal.fillText('Subject', subject);
    await modal.selectOption('Case Origin', 'Phone'); // required field
    // Status defaults to "New".
    await modal.save();

    // The new record page opens with the entered Subject (shown in several
    // spots, so scope to a visible occurrence).
    await expect(page.getByText(subject).filter({ visible: true }).first()).toBeVisible();
    caseId = RecordPage.idFromUrl(page.url());
    expect(caseId).toBeTruthy();

    // The Case appears in the list view.
    await cases.goto();
    await cases.search(subject);
    await expect(cases.grid.getByText(subject)).toBeVisible();
  });
});
