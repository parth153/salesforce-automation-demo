import { test, expect } from '../fixtures';

test.describe('Home Page Widgets', () => {
  test('should display and dismiss an Assistant recommendation', async ({ homePage }) => {
    await homePage.goto();

    // Locate the Assistant cards and note the first card's identifier.
    await expect(homePage.assistantCards.first()).toBeVisible();
    const initialCount = await homePage.assistantCards.count();
    expect(initialCount).toBeGreaterThan(0);

    const firstCard = homePage.assistantCards.first();
    const cardIdentifier = await firstCard.getByRole('link').first().innerText();

    // Dismiss that recommendation.
    await firstCard.getByRole('button', { name: 'Dismiss recommendation' }).click();

    // The card is removed from the Assistant list.
    await expect(homePage.assistantCards).toHaveCount(initialCount - 1);
    await expect(homePage.assistantCards.filter({ hasText: cardIdentifier })).toHaveCount(0);
  });
});
