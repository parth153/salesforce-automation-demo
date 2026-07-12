import { test, expect } from '../fixtures';

test.describe('Reports and Dashboards', () => {
  test('should navigate Dashboards tab and open a dashboard', async ({ page }) => {
    await page.goto('/lightning/o/Dashboard/home');

    // "Recent" is often empty, so open from All Dashboards.
    await page.getByRole('tab', { name: 'All Dashboards' }).click();
    const firstDashboard = page.getByRole('grid').getByRole('row').nth(1).getByRole('link').first();
    await expect(firstDashboard).toBeVisible();
    const dashboardName = (await firstDashboard.innerText()).trim();
    await firstDashboard.click();

    await expect(page).toHaveURL(/\/lightning\/r\/Dashboard\//);

    // The dashboard components render inside the dashboard iframe.
    const dashboardFrame = page.frameLocator('iframe[title="dashboard"]');
    await expect(dashboardFrame.getByText(dashboardName).first()).toBeVisible();

    // The Refresh action re-renders the dashboard without error.
    await dashboardFrame.getByRole('button', { name: /Refresh/ }).first().click();
    await expect(dashboardFrame.getByText(dashboardName).first()).toBeVisible();
  });
});
