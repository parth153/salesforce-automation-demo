import { request } from '@playwright/test';
import { test, expect, dataPath } from '../../api-fixtures';
import { getSessionViaJwt } from '../../utils/jwt-auth';
import { SF_LOGIN_URL } from '../../utils/env';

test.describe('API: JWT bearer token exchange', () => {
  test('exchanges a signed JWT for a usable session', async () => {
    const session = await getSessionViaJwt();
    expect(session.accessToken).toBeTruthy();
    expect(session.instanceUrl).toMatch(/^https:\/\//);
  });

  test('the issued token authorizes a REST call', async ({ api }) => {
    const res = await api.get(dataPath('sobjects/Account'));
    expect(res.ok()).toBeTruthy();
    const meta = (await res.json()) as { objectDescribe: { name: string } };
    expect(meta.objectDescribe.name).toBe('Account');
  });

  test('rejects a malformed assertion at the token endpoint', async () => {
    const anon = await request.newContext();
    const res = await anon.post(`${SF_LOGIN_URL.replace(/\/$/, '')}/services/oauth2/token`, {
      form: {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: 'not-a-real-jwt',
      },
    });
    expect(res.ok()).toBeFalsy();
    const body = (await res.json()) as { error?: string };
    expect(body.error).toBeTruthy();
    await anon.dispose();
  });
});
