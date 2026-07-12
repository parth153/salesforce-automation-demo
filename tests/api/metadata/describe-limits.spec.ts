import { test, expect, dataPath, API_VERSION } from '../../api-fixtures';

test.describe('API: metadata & platform', () => {
  test('describes the Account sobject schema', async ({ api }) => {
    const res = await api.get(dataPath('sobjects/Account/describe'));
    expect(res.ok()).toBeTruthy();
    const describe = (await res.json()) as {
      name: string;
      fields: Array<{ name: string }>;
    };
    expect(describe.name).toBe('Account');
    expect(describe.fields.length).toBeGreaterThan(0);
    expect(describe.fields.map((f) => f.name)).toContain('Name');
  });

  test('reports org API limits', async ({ api }) => {
    const res = await api.get(dataPath('limits'));
    expect(res.ok()).toBeTruthy();
    const limits = (await res.json()) as { DailyApiRequests?: { Max: number; Remaining: number } };
    expect(limits.DailyApiRequests).toBeDefined();
    expect(limits.DailyApiRequests!.Max).toBeGreaterThan(0);
  });

  test('exposes the pinned API version', async ({ api }) => {
    const res = await api.get('/services/data/');
    expect(res.ok()).toBeTruthy();
    const versions = (await res.json()) as Array<{ version: string; url: string }>;
    const versionNumber = API_VERSION.replace('v', '');
    expect(versions.map((v) => v.version)).toContain(versionNumber);
  });
});
