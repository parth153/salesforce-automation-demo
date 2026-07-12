import { test, expect } from '../fixtures';
import { createRecord, deleteRecord, getCurrentUserId, queryRecords } from '../utils/sfApi';

test.describe('Home Page Widgets', () => {
  let taskId: string;
  const subject = `PW DoneTask ${Date.now()}`;
  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local tz

  test.beforeEach(async () => {
    const userId = await getCurrentUserId();
    taskId = await createRecord('Task', {
      Subject: subject,
      ActivityDate: today,
      OwnerId: userId,
      Status: 'Not Started',
      Priority: 'Normal',
    });
  });

  test.afterEach(async () => {
    await deleteRecord('Task', taskId);
  });

  test("should mark a Task complete from Today's Tasks", async ({ page, homePage }) => {
    await homePage.goto();

    // The seeded task appears in Today's Tasks; check it off.
    const taskCheckbox = page.getByRole('checkbox', { name: subject });
    await expect(taskCheckbox).toBeVisible();
    // The SLDS <label> overlays the input and intercepts the click, so force it.
    await taskCheckbox.check({ force: true });

    // The task is marked complete.
    await expect
      .poll(async () => {
        const [task] = await queryRecords<{ Status: string }>(
          `SELECT Status FROM Task WHERE Id = '${taskId}'`,
        );
        return task?.Status;
      })
      .toBe('Completed');
  });
});
