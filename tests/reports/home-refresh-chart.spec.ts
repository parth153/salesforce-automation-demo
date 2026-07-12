import { test, expect } from '../fixtures';

test.describe('Reports and Dashboards', () => {
  test('should refresh the Quarterly Performance chart on Home', async ({ homePage }) => {
    await homePage.goto();

    await homePage.refreshChartButton.click();

    // The chart reloads and Closed/Open/Goal figures are displayed.
    await expect(homePage.quarterlyFigure('Closed')).toBeVisible();
    await expect(homePage.quarterlyFigure('Open (>70%)')).toBeVisible();
    await expect(homePage.quarterlyFigure('Goal')).toBeVisible();
  });
});
