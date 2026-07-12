import { test as base, request, type APIRequestContext } from '@playwright/test';
import { getSessionViaJwt, type SfSession } from './utils/jwt-auth';

// The REST API version the suite pins to (matches tests/utils/sfApi.ts).
export const API_VERSION = 'v62.0';

/** Builds a versioned Salesforce Data API path, e.g. dataPath('sobjects/Account'). */
export const dataPath = (p: string): string => `/services/data/${API_VERSION}/${p}`;

type WorkerFixtures = {
  // A JWT session (access token + instance URL), obtained once per worker.
  session: SfSession;
  // An authenticated APIRequestContext bound to the org's instance URL. Unlike
  // the UI projects this needs no browser or Lightning storageState — the JWT
  // bearer token authorizes REST calls directly.
  api: APIRequestContext;
};

type TestFixtures = {
  // Registers a record for automatic teardown at test end (LIFO order, so
  // children are deleted before parents). Use for anything a test leaves behind.
  track: (sobject: string, id: string) => void;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  session: [
    async ({}, use) => {
      await use(await getSessionViaJwt());
    },
    { scope: 'worker' },
  ],

  api: [
    async ({ session }, use) => {
      const context = await request.newContext({
        baseURL: session.instanceUrl,
        extraHTTPHeaders: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      await use(context);
      await context.dispose();
    },
    { scope: 'worker' },
  ],

  track: async ({ api }, use) => {
    const created: Array<[string, string]> = [];
    await use((sobject, id) => {
      created.push([sobject, id]);
    });
    // Best-effort cleanup; a 404 (already deleted by the test) is fine.
    for (const [sobject, id] of created.reverse()) {
      await api.delete(dataPath(`sobjects/${sobject}/${id}`));
    }
  },
});

export { expect } from '@playwright/test';
