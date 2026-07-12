import { test, expect } from '../fixtures';

test.describe('Reports and Dashboards', () => {
  test('should navigate Reports tab and open a report', async ({ page }) => {
    await page.goto('/lightning/o/Report/home');

    // Open the first report from the Recent list.
    const firstReport = page.getByRole('grid').getByRole('row').nth(1).getByRole('link').first();
    await expect(firstReport).toBeVisible();
    const reportName = (await firstReport.innerText()).trim();
    await firstReport.click();

    await expect(page).toHaveURL(/\/lightning\/r\/Report\//);

    // The report runs and displays data inside the Report Viewer iframe.
    const reportFrame = page.frameLocator('iframe[title="Report Viewer"]');
    await expect(reportFrame.getByText(reportName).first()).toBeVisible();
    await expect(reportFrame.getByText(/Total Records/i).first()).toBeVisible();
  });
});
