import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { deleteRecord } from '../utils/sfApi';

test.describe('Contacts', () => {
  let contactId: string | undefined;

  test.afterEach(async () => {
    if (contactId) {
      await deleteRecord('Contact', contactId);
      contactId = undefined;
    }
  });

  test('should create a new Contact linked to an Account', async ({ page }) => {
    const lastName = `PWContact${Date.now()}`;

    // Link to an existing Account (avoids lookup search-index lag on new records).
    const accounts = new ObjectListPage(page, 'Account');
    await accounts.goto();
    const accountLink = accounts.firstRowLink();
    const accountName = (await accountLink.innerText()).trim();
    const accountId = RecordPage.idFromUrl((await accountLink.getAttribute('href')) ?? '');

    // Create the Contact.
    const contacts = new ObjectListPage(page, 'Contact');
    await contacts.goto();
    await contacts.clickNew();

    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    await modal.fillText('Last Name', lastName);
    await modal.selectLookup('Account Name', accountName);
    await modal.save();

    const record = new RecordPage(page);
    await record.expectLoaded(lastName);
    contactId = RecordPage.idFromUrl(page.url());
    expect(contactId).toBeTruthy();

    // The Contact appears under the linked Account's related Contacts list.
    await page.goto(`/lightning/r/Account/${accountId}/view`);
    const contactsRelatedList = record.relatedList('Contacts');
    await expect(contactsRelatedList.getByRole('link', { name: lastName })).toBeVisible();
  });
});
