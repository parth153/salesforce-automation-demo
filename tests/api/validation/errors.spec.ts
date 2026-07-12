import { request } from '@playwright/test';
import { test, expect, dataPath } from '../../api-fixtures';

test.describe('API: validation & errors', () => {
  test('rejects a create that omits a required field (400 REQUIRED_FIELD_MISSING)', async ({ api }) => {
    const res = await api.post(dataPath('sobjects/Contact'), { data: {} });
    expect(res.status()).toBe(400);
    const errors = (await res.json()) as Array<{ errorCode: string }>;
    expect(errors[0].errorCode).toBe('REQUIRED_FIELD_MISSING');
  });

  test('rejects a create that references an unknown field (400)', async ({ api }) => {
    const res = await api.post(dataPath('sobjects/Account'), {
      data: { Name: `PWApiBadField${Date.now()}`, NotARealField__c: 'x' },
    });
    expect(res.status()).toBe(400);
    const errors = (await res.json()) as Array<{ errorCode: string }>;
    // Unknown fields surface as INVALID_FIELD on the sobjects endpoint.
    expect(errors[0].errorCode).toBe('INVALID_FIELD');
  });

  test('returns 404 NOT_FOUND for a nonexistent record id', async ({ api }) => {
    const res = await api.get(dataPath('sobjects/Account/001000000000000AAA'));
    expect(res.status()).toBe(404);
    const errors = (await res.json()) as Array<{ errorCode: string }>;
    expect(errors[0].errorCode).toBe('NOT_FOUND');
  });

  test('returns 400 MALFORMED_QUERY for invalid SOQL', async ({ api }) => {
    const res = await api.get(dataPath(`query?q=${encodeURIComponent('SELECT FROM Account')}`));
    expect(res.status()).toBe(400);
    const errors = (await res.json()) as Array<{ errorCode: string }>;
    expect(errors[0].errorCode).toBe('MALFORMED_QUERY');
  });

  test('returns 401 for a request with no bearer token', async ({ session }) => {
    const anon = await request.newContext({ baseURL: session.instanceUrl });
    const res = await anon.get(dataPath('sobjects/Account'));
    expect(res.status()).toBe(401);
    const errors = (await res.json()) as Array<{ errorCode: string }>;
    expect(errors[0].errorCode).toBe('INVALID_SESSION_ID');
    await anon.dispose();
  });
});
