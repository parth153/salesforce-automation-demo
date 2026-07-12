import { test, expect, dataPath } from '../../api-fixtures';

test.describe('API: Account CRUD', () => {
  test('creates, retrieves, updates, and deletes an Account', async ({ api, track }) => {
    const name = `PWApiAccount${Date.now()}`;

    // Create
    const createRes = await api.post(dataPath('sobjects/Account'), { data: { Name: name } });
    expect(createRes.status()).toBe(201);
    const created = (await createRes.json()) as { id: string; success: boolean };
    expect(created.success).toBe(true);
    expect(created.id).toBeTruthy();
    track('Account', created.id);
    const id = created.id;

    // Retrieve
    const getRes = await api.get(dataPath(`sobjects/Account/${id}`));
    expect(getRes.ok()).toBeTruthy();
    expect((await getRes.json()).Name).toBe(name);

    // Update
    const patchRes = await api.patch(dataPath(`sobjects/Account/${id}`), {
      data: { Phone: '415-555-0100' },
    });
    expect(patchRes.status()).toBe(204);
    const afterUpdate = await api.get(dataPath(`sobjects/Account/${id}?fields=Phone`));
    expect((await afterUpdate.json()).Phone).toBe('415-555-0100');

    // Delete
    const deleteRes = await api.delete(dataPath(`sobjects/Account/${id}`));
    expect(deleteRes.status()).toBe(204);
    const goneRes = await api.get(dataPath(`sobjects/Account/${id}`));
    expect(goneRes.status()).toBe(404);
  });
});
