import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Cases', () => {
  let caseId: string;
  const subject = `PW Filter ${Date.now()}`;

  test.beforeEach(async () => {
    // Seed a Closed case so status-based filtering is deterministic.
    caseId = await createRecord('Case', { Subject: subject, Status: 'Closed', Origin: 'Phone' });
  });

  test.afterEach(async () => {
    await deleteRecord('Case', caseId);
  });

  test('should filter Cases list by status', async ({ page }) => {
    const cases = new ObjectListPage(page, 'Case');
    await cases.goto();

    // The Closed case shows in the "All Closed Cases" view.
    await cases.selectListView('All Closed Cases');
    await cases.search(subject);
    await expect(cases.grid.getByText(subject)).toBeVisible();

    // ...and is absent from the "All Open Cases" view.
    await cases.selectListView('All Open Cases');
    await cases.search(subject);
    await expect(cases.grid.getByText(subject)).toHaveCount(0);
  });
});
