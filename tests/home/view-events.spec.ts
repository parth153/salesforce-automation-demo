import { test, expect } from '../fixtures';

test.describe('Home Page Widgets', () => {
  test("should view Today's Events and open Calendar", async ({ page, homePage }) => {
    await homePage.goto();

    // Today's Events widget with its View Calendar action.
    await expect(page.getByRole('heading', { name: "Today's Events" })).toBeVisible();
    await expect(homePage.viewCalendarButton).toBeVisible();

    await homePage.viewCalendarButton.click();

    // The Calendar view opens.
    await expect(page).toHaveURL(/\/lightning\/o\/Event\/home/);
    await expect(page.getByRole('button', { name: 'New Event' }).first()).toBeVisible();
  });
});
