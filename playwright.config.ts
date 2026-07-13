import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { LIGHTNING_BASE_URL } from './tests/utils/env';

const STORAGE_STATE = path.join(__dirname, 'tests/.auth/storageState.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Allure is the primary reporter (published to GitHub Pages); `line` keeps the
  // console output readable. Each project/job writes to ./allure-results, which
  // CI collects across shards + the API + Apex jobs into one report.
  reporter: [['line'], ['allure-playwright', { resultsDir: 'allure-results' }]],
  // A shared dev org is slow under load and occasionally drops a SPA click, so
  // retry flaky tests and keep concurrency modest to limit org contention.
  retries: process.env.CI ? 2 : 1,
  // One worker per CI shard: two shards already run concurrently against the
  // single shared dev org, so a higher per-shard count just adds contention.
  workers: process.env.CI ? 1 : 3,
  // Salesforce Lightning is heavy and slower under parallel load, so allow more
  // time than Playwright's defaults for tests, assertions, and navigations.
  timeout: 90_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL: LIGHTNING_BASE_URL,
    trace: 'on-first-retry',
    // Capture a screenshot on failure so the Allure report has visual context.
    screenshot: 'only-on-failure',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    // Wide enough that the Lightning nav bar shows all app tabs instead of
    // collapsing them into an overflow "More" menu.
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      // Authenticates via the JWT Bearer flow and saves STORAGE_STATE for the
      // suite. Server-to-server, so it runs headless and needs no emailed code.
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      // Pure REST API tests: no browser, no Lightning session, no dependency on
      // the UI setup — the JWT bearer token authorizes calls directly, so this
      // project is a fast, self-contained smoke layer for the org + auth.
      name: 'api',
      testDir: './tests/api',
    },
    {
      // Every UI scenario except auth/** and api/**: reuses the session from setup.
      name: 'authenticated',
      testIgnore: ['**/auth/**', '**/api/**', /auth\.setup\.ts/],
      dependencies: ['setup'],
      use: {
        storageState: STORAGE_STATE,
      },
    },
    {
      // Login/logout scenarios. Runs after 'authenticated' so the destructive
      // logout test can't invalidate the shared session mid-run; the next run's
      // setup regenerates it. Unauthenticated tests start from a clean context.
      name: 'auth',
      testDir: './tests/auth',
      dependencies: ['authenticated'],
      use: {
        storageState: { cookies: [], origins: [] },
      },
    },
  ],
});
