import { test as setup, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { HomePage } from './pages/HomePage';
import { getSessionViaJwt } from './utils/jwt-auth';

export const STORAGE_STATE = path.join(__dirname, '.auth/storageState.json');

/**
 * Establishes an authenticated browser session and saves it to STORAGE_STATE for
 * reuse by the 'authenticated' project. Runs as a Playwright setup dependency.
 *
 * Auth is obtained server-to-server via the OAuth JWT Bearer flow (no UI login),
 * then handed to the browser through frontdoor.jsp. This never triggers device
 * activation / emailed verification codes and is IP-independent, so it works
 * unchanged in CI.
 */
setup('authenticate', async ({ page }) => {
  const { accessToken, instanceUrl } = await getSessionViaJwt();

  // frontdoor.jsp converts the API access token into a Lightning UI session.
  const retUrl = encodeURIComponent('/lightning/page/home');
  await page.goto(`${instanceUrl}/secur/frontdoor.jsp?sid=${accessToken}&retURL=${retUrl}`);

  const homePage = new HomePage(page);
  await expect(homePage.heading).toBeVisible({ timeout: 60_000 });
  await homePage.header.expectVisible();

  fs.mkdirSync(path.dirname(STORAGE_STATE), { recursive: true });
  await page.context().storageState({ path: STORAGE_STATE });
});
