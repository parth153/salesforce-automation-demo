import { type Locator, type Page, expect } from '@playwright/test';
import { GlobalHeader } from './GlobalHeader';

export class HomePage {
  readonly page: Page;
  readonly header: GlobalHeader;
  readonly heading: Locator;
  readonly keyDeals: Locator;
  readonly refreshChartButton: Locator;
  readonly assistantCards: Locator;
  readonly viewCalendarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new GlobalHeader(page);
    this.heading = page.getByRole('heading', { name: 'Home', level: 1 });
    // The "Key Deals - Recent Opportunities" widget card.
    this.keyDeals = page
      .getByRole('article')
      .filter({ has: page.getByRole('heading', { name: /Key Deals/ }) });
    // The Quarterly Performance widget's refresh control.
    this.refreshChartButton = page.getByRole('button', { name: 'Refresh Chart' });
    // Assistant recommendation cards (each has an "Expand Card" button).
    this.assistantCards = page
      .getByRole('listitem')
      .filter({ has: page.getByRole('button', { name: 'Expand Card' }) });
    this.viewCalendarButton = page.getByRole('button', { name: 'View Calendar' });
  }

  /** The first Assistant card that offers a "New Task" action. */
  assistantNewTaskCard(): Locator {
    return this.assistantCards.filter({ has: this.page.getByRole('button', { name: 'New Task' }) }).first();
  }

  /** A Quarterly Performance figure row by label (Closed / Open (>70%) / Goal). */
  quarterlyFigure(label: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: label });
  }

  async goto() {
    await this.page.goto('/lightning/page/home');
    await expect(this.heading).toBeVisible();
  }
}
