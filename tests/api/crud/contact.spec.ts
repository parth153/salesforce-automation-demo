import { test, expect, dataPath } from '../../api-fixtures';

test.describe('API: Contact CRUD', () => {
  test('creates, retrieves, updates, and deletes a Contact', async ({ api, track }) => {
    const lastName = `PWApiContact${Date.now()}`;

    // Create — LastName is the only required field on Contact.
    const createRes = await api.post(dataPath('sobjects/Contact'), {
      data: { LastName: lastName, FirstName: 'Api' },
    });
    expect(createRes.status()).toBe(201);
    const created = (await createRes.json()) as { id: string; success: boolean };
    expect(created.success).toBe(true);
    track('Contact', created.id);
    const id = created.id;

    // Retrieve
    const getRes = await api.get(dataPath(`sobjects/Contact/${id}`));
    expect(getRes.ok()).toBeTruthy();
    expect((await getRes.json()).LastName).toBe(lastName);

    // Update
    const patchRes = await api.patch(dataPath(`sobjects/Contact/${id}`), {
      data: { Title: 'QA Engineer' },
    });
    expect(patchRes.status()).toBe(204);
    const afterUpdate = await api.get(dataPath(`sobjects/Contact/${id}?fields=Title`));
    expect((await afterUpdate.json()).Title).toBe('QA Engineer');

    // Delete
    const deleteRes = await api.delete(dataPath(`sobjects/Contact/${id}`));
    expect(deleteRes.status()).toBe(204);
    const goneRes = await api.get(dataPath(`sobjects/Contact/${id}`));
    expect(goneRes.status()).toBe(404);
  });
});
