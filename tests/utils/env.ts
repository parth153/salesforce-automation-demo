if (!process.env.SF_LOGIN_URL) {
  process.loadEnvFile();
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const SF_LOGIN_URL = required('SF_LOGIN_URL');
export const SF_USERNAME = required('SF_USERNAME');
export const SF_PASSWORD = required('SF_PASSWORD');

// JWT Bearer flow (used by the setup project to get a session without UI login).
export const SF_CLIENT_ID = required('SF_CLIENT_ID');
export const SF_JWT_KEY_FILE = required('SF_JWT_KEY_FILE');
// Optional: override the JWT `aud` claim (defaults to SF_LOGIN_URL).
export const SF_JWT_AUDIENCE = process.env.SF_JWT_AUDIENCE;

// The Lightning (UI) host, used as Playwright's baseURL. Kept out of source so
// the repo doesn't name a specific org — supply it via .env / a CI secret.
export const LIGHTNING_BASE_URL = required('SF_LIGHTNING_URL');
