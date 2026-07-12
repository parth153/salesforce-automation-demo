import { test, expect, dataPath } from '../../api-fixtures';

test.describe('API: Opportunity CRUD', () => {
  test('creates, retrieves, updates, and deletes an Opportunity', async ({ api, track }) => {
    const name = `PWApiOpp${Date.now()}`;

    // Create — Name, StageName, and CloseDate (YYYY-MM-DD) are required.
    const createRes = await api.post(dataPath('sobjects/Opportunity'), {
      data: { Name: name, StageName: 'Prospecting', CloseDate: '2026-12-31', Amount: 5000 },
    });
    expect(createRes.status()).toBe(201);
    const created = (await createRes.json()) as { id: string; success: boolean };
    expect(created.success).toBe(true);
    track('Opportunity', created.id);
    const id = created.id;

    // Retrieve
    const getRes = await api.get(dataPath(`sobjects/Opportunity/${id}?fields=Name,StageName,Amount`));
    expect(getRes.ok()).toBeTruthy();
    const record = await getRes.json();
    expect(record.Name).toBe(name);
    expect(record.StageName).toBe('Prospecting');
    expect(record.Amount).toBe(5000);

    // Update — advance the stage.
    const patchRes = await api.patch(dataPath(`sobjects/Opportunity/${id}`), {
      data: { StageName: 'Qualification' },
    });
    expect(patchRes.status()).toBe(204);
    const afterUpdate = await api.get(dataPath(`sobjects/Opportunity/${id}?fields=StageName`));
    expect((await afterUpdate.json()).StageName).toBe('Qualification');

    // Delete
    const deleteRes = await api.delete(dataPath(`sobjects/Opportunity/${id}`));
    expect(deleteRes.status()).toBe(204);
    const goneRes = await api.get(dataPath(`sobjects/Opportunity/${id}`));
    expect(goneRes.status()).toBe(404);
  });
});
