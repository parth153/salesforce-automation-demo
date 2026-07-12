import crypto from 'node:crypto';
import fs from 'node:fs';
import { SF_CLIENT_ID, SF_USERNAME, SF_JWT_KEY_FILE, SF_LOGIN_URL, SF_JWT_AUDIENCE } from './env';

export interface SfSession {
  accessToken: string;
  instanceUrl: string;
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Authenticates server-to-server via the OAuth 2.0 JWT Bearer flow and returns a
 * session token + instance URL. This is not an interactive UI login, so it never
 * triggers device activation / emailed verification codes — which makes it the
 * CI-friendly way to obtain a Salesforce session regardless of runner IP.
 */
export async function getSessionViaJwt(): Promise<SfSession> {
  const loginUrl = SF_LOGIN_URL.replace(/\/$/, '');
  const audience = (SF_JWT_AUDIENCE ?? SF_LOGIN_URL).replace(/\/$/, '');
  const privateKey = fs.readFileSync(SF_JWT_KEY_FILE, 'utf8');

  let lastError = '';
  // Dev orgs occasionally return transient 404/5xx or empty bodies, so retry a
  // few times before giving up.
  for (let attempt = 1; attempt <= 4; attempt++) {
    const header = base64url(JSON.stringify({ alg: 'RS256' }));
    const claims = base64url(
      JSON.stringify({
        iss: SF_CLIENT_ID,
        sub: SF_USERNAME,
        aud: audience,
        exp: Math.floor(Date.now() / 1000) + 180,
      }),
    );
    const signingInput = `${header}.${claims}`;
    const signature = base64url(crypto.sign('RSA-SHA256', Buffer.from(signingInput), privateKey));
    const assertion = `${signingInput}.${signature}`;

    const response = await fetch(`${loginUrl}/services/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }),
    });

    const body = await response.text();
    let data: { access_token?: string; instance_url?: string; error?: string; error_description?: string } = {};
    try {
      data = body ? JSON.parse(body) : {};
    } catch {
      // Non-JSON (e.g. transient HTML 404) — treat as retryable below.
    }

    if (response.ok && data.access_token && data.instance_url) {
      return { accessToken: data.access_token, instanceUrl: data.instance_url };
    }

    // A genuine auth rejection (4xx with an OAuth error) won't fix itself — fail fast.
    if (data.error) {
      throw new Error(`JWT bearer auth failed (${response.status}): ${data.error} - ${data.error_description ?? ''}`);
    }

    lastError = `HTTP ${response.status}: ${body.slice(0, 200) || '<empty body>'}`;
    if (attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }

  throw new Error(`JWT bearer auth failed after retries. Last response: ${lastError}`);
}
