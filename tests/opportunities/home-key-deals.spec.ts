import { test, expect } from '../fixtures';
import { RecordPage } from '../pages/RecordPage';
import { createRecord, deleteRecord } from '../utils/sfApi';

test.describe('Opportunities', () => {
  let opportunityId: string;

  test.beforeEach(async () => {
    // Seed a recent Opportunity so the Key Deals widget has content.
    opportunityId = await createRecord('Opportunity', {
      Name: `PW KeyDeal ${Date.now()}`,
      StageName: 'Prospecting',
      CloseDate: '2026-12-31',
      Amount: 250000,
    });
  });

  test.afterEach(async () => {
    await deleteRecord('Opportunity', opportunityId);
  });

  test('should view Key Deals on Home page', async ({ page, homePage }) => {
    await homePage.goto();
    await expect(homePage.keyDeals).toBeVisible();

    // The widget lists opportunities with name, close date, and amount.
    const firstDeal = homePage.keyDeals.getByRole('listitem').first();
    const oppLink = firstDeal.getByRole('link').first();
    await expect(oppLink).toBeVisible();
    await expect(homePage.keyDeals.getByText(/\$[\d,]+/).first()).toBeVisible();
    await expect(homePage.keyDeals.getByText(/\d{1,2}\/\d{1,2}\/\d{4}/).first()).toBeVisible();

    // Clicking an Opportunity link navigates to its detail page.
    const oppName = (await oppLink.innerText()).trim();
    await oppLink.click();
    await expect(page).toHaveURL(/\/lightning\/r\//);
    const record = new RecordPage(page);
    await expect(record.recordHeading).toContainText(oppName);
  });
});
