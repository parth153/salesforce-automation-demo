import { test, expect, dataPath } from '../../api-fixtures';

test.describe('API: Case CRUD', () => {
  test('creates, retrieves, updates, and deletes a Case', async ({ api, track }) => {
    const subject = `PWApiCase${Date.now()}`;

    // Create — Status defaults to New; Origin is the UI-required field, sent here too.
    const createRes = await api.post(dataPath('sobjects/Case'), {
      data: { Subject: subject, Origin: 'Phone' },
    });
    expect(createRes.status()).toBe(201);
    const created = (await createRes.json()) as { id: string; success: boolean };
    expect(created.success).toBe(true);
    track('Case', created.id);
    const id = created.id;

    // Retrieve
    const getRes = await api.get(dataPath(`sobjects/Case/${id}?fields=Subject,Status`));
    expect(getRes.ok()).toBeTruthy();
    const record = await getRes.json();
    expect(record.Subject).toBe(subject);
    expect(record.Status).toBe('New');

    // Update — move it to Working.
    const patchRes = await api.patch(dataPath(`sobjects/Case/${id}`), {
      data: { Status: 'Working' },
    });
    expect(patchRes.status()).toBe(204);
    const afterUpdate = await api.get(dataPath(`sobjects/Case/${id}?fields=Status`));
    expect((await afterUpdate.json()).Status).toBe('Working');

    // Delete
    const deleteRes = await api.delete(dataPath(`sobjects/Case/${id}`));
    expect(deleteRes.status()).toBe(204);
    const goneRes = await api.get(dataPath(`sobjects/Case/${id}`));
    expect(goneRes.status()).toBe(404);
  });
});
