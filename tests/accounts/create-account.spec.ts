import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { deleteRecord } from '../utils/sfApi';

test.describe('Accounts', () => {
  let createdId: string | undefined;

  test.afterEach(async () => {
    if (createdId) {
      await deleteRecord('Account', createdId);
      createdId = undefined;
    }
  });

  test('should create a new Account', async ({ page }) => {
    const name = `PW Account ${Date.now()}`;
    const accounts = new ObjectListPage(page, 'Account');
    await accounts.goto();
    await accounts.clickNew();

    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    await modal.fillText('Account Name', name);
    await modal.save();

    // The new record page opens showing the entered name.
    const record = new RecordPage(page);
    await record.expectLoaded(name);
    createdId = RecordPage.idFromUrl(page.url());
    expect(createdId).toBeTruthy();

    // The Account appears in the list view.
    await accounts.goto();
    await accounts.search(name);
    await expect(accounts.rowLink(name)).toBeVisible();
  });
});
