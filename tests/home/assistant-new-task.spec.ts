import { test, expect } from '../fixtures';
import { queryRecords, deleteRecord } from '../utils/sfApi';

test.describe('Home Page Widgets', () => {
  const subject = `PW AsstTask ${Date.now()}`;

  test.afterEach(async () => {
    for (const t of await queryRecords<{ Id: string }>(
      `SELECT Id FROM Task WHERE Subject = '${subject}'`,
    )) {
      await deleteRecord('Task', t.Id);
    }
  });

  test('should create a Task from an Assistant recommendation', async ({ page, homePage }) => {
    await homePage.goto();

    // Open the New Task action on an Assistant card (pre-associated with its Opportunity).
    await expect(homePage.assistantNewTaskCard()).toBeVisible();
    await homePage.assistantNewTaskCard().getByRole('button', { name: 'New Task' }).click();

    const modal = page.getByRole('dialog', { name: 'New Task' });
    await expect(modal).toBeVisible();

    const subjectBox = modal.getByRole('combobox', { name: 'Subject' });
    await subjectBox.click();
    await subjectBox.fill(subject);
    await modal.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(modal).toBeHidden();

    // The Task is created and associated with the related Opportunity (WhatId set).
    await expect
      .poll(async () => {
        const tasks = await queryRecords<{ WhatId: string | null }>(
          `SELECT WhatId FROM Task WHERE Subject = '${subject}'`,
        );
        return tasks.length === 1 && tasks[0].WhatId != null;
      })
      .toBe(true);
  });
});
