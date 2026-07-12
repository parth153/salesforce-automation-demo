import { test, expect } from '../fixtures';
import { ChatterPage } from '../pages/ChatterPage';
import { getCurrentUserId, createRecord, deleteRecord, queryRecords } from '../utils/sfApi';

// Both scenarios act on the shared Chatter feed, so run them serially against a
// cleaned feed to keep post/comment scoping deterministic.
test.describe.configure({ mode: 'serial' });

test.describe('Chatter', () => {
  let userId: string;

  test.beforeAll(async () => {
    userId = await getCurrentUserId();
  });

  test.beforeEach(async () => {
    // Start each test from a clean feed (remove this user's feed items).
    for (const p of await queryRecords<{ Id: string }>(
      `SELECT Id FROM FeedItem WHERE CreatedById = '${userId}'`,
    )) {
      await deleteRecord('FeedItem', p.Id);
    }
  });

  test('should post an update to Chatter feed', async ({ page }) => {
    const body = `PW post ${Date.now()}`;
    const chatter = new ChatterPage(page);
    await chatter.goto();

    await chatter.post(body);

    // The new post appears at the top of the feed.
    await expect(chatter.feed.getByRole('article').first()).toContainText(body);
  });

  test('should comment on a Chatter post', async ({ page }) => {
    const body = `PW commentpost ${Date.now()}`;
    const comment = `PW comment ${Date.now()}`;
    // Seed a post to comment on.
    const feedItemId = await createRecord('FeedItem', { ParentId: userId, Body: body });

    const chatter = new ChatterPage(page);
    await chatter.goto();
    await chatter.commentOn(body, comment);

    // The comment is persisted against the post...
    await expect
      .poll(async () => {
        const comments = await queryRecords<{ CommentBody: string }>(
          `SELECT CommentBody FROM FeedComment WHERE FeedItemId = '${feedItemId}'`,
        );
        return comments.some((c) => c.CommentBody.includes(comment));
      })
      .toBe(true);

    // ...and shown in the feed beneath the post.
    await expect(chatter.feed.getByText(comment)).toBeVisible();
  });
});
