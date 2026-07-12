import { test, expect } from '../fixtures';
import { ObjectListPage } from '../pages/ObjectListPage';
import { RecordFormModal } from '../pages/RecordFormModal';
import { RecordPage } from '../pages/RecordPage';
import { deleteRecord } from '../utils/sfApi';

test.describe('Opportunities', () => {
  let opportunityId: string | undefined;

  test.afterEach(async () => {
    if (opportunityId) {
      await deleteRecord('Opportunity', opportunityId);
      opportunityId = undefined;
    }
  });

  test('should create a new Opportunity linked to an Account', async ({ page }) => {
    const name = `PW Opp ${Date.now()}`;

    // Link to an existing Account (avoids lookup search-index lag).
    const accounts = new ObjectListPage(page, 'Account');
    await accounts.goto();
    const accountLink = accounts.firstRowLink();
    const accountName = (await accountLink.innerText()).trim();
    const accountId = RecordPage.idFromUrl((await accountLink.getAttribute('href')) ?? '');

    // Create the Opportunity.
    const opportunities = new ObjectListPage(page, 'Opportunity');
    await opportunities.goto();
    await opportunities.clickNew();

    const modal = new RecordFormModal(page);
    await modal.waitOpen();
    await modal.fillText('Opportunity Name', name);
    await modal.fillText('Close Date', '31/12/2026');
    await modal.selectOption('Stage', 'Prospecting');
    await modal.selectLookup('Account Name', accountName);
    await modal.save();

    // The new record page opens with the entered details.
    const record = new RecordPage(page);
    await record.expectLoaded(name);
    opportunityId = RecordPage.idFromUrl(page.url());
    expect(opportunityId).toBeTruthy();

    // The Opportunity appears in the Account's related Opportunities list.
    await page.goto(`/lightning/r/Account/${accountId}/view`);
    await expect(record.relatedList('Opportunities').getByRole('link', { name })).toBeVisible();
  });
});
