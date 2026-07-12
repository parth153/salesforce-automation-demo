import { type Locator, type Page, expect } from '@playwright/test';

/** The Chatter feed page: publisher (post) and per-post commenting. */
export class ChatterPage {
  readonly page: Page;
  readonly feed: Locator;
  readonly shareUpdateButton: Locator;
  readonly commentBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.feed = page.getByRole('region', { name: 'Feed' });
    this.shareUpdateButton = page.getByRole('button', { name: 'Share an update...' });
    this.commentBox = page.getByRole('textbox', { name: 'Write a comment...' });
  }

  async goto() {
    await this.page.goto('/lightning/page/chatter');
    await this.shareUpdateButton.waitFor();
  }

  /** Composes and posts a text update. */
  async post(body: string) {
    await this.shareUpdateButton.click();
    const composer = this.page.getByRole('textbox').first();
    await composer.click();
    await composer.fill(body);
    // The publisher's Share button is the first one on the page.
    await this.page.getByRole('button', { name: 'Share', exact: true }).first().click();
  }

  postArticle(body: string): Locator {
    return this.page.getByRole('article').filter({ hasText: body }).first();
  }

  /** Adds a comment to the post containing the given body text. */
  async commentOn(body: string, comment: string) {
    // The post footer's Comment button reveals the comment composer.
    await this.postArticle(body).getByRole('button', { name: 'Comment', exact: true }).first().click();
    await this.commentBox.fill(comment);
    await expect(this.commentBox).toHaveText(new RegExp(comment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    // The composer's submit is the trailing "Comment" button.
    await this.page.getByRole('button', { name: 'Comment', exact: true }).last().click();
  }
}
