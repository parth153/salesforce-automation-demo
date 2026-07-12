import { getSessionViaJwt, type SfSession } from './jwt-auth';
import { SF_USERNAME } from './env';

const API_VERSION = 'v62.0';

// Reuse a single JWT session across API calls within a run.
let sessionPromise: Promise<SfSession> | undefined;
function session(): Promise<SfSession> {
  return (sessionPromise ??= getSessionViaJwt());
}

/** Creates a record via the REST API and returns its id. */
export async function createRecord(sobject: string, fields: Record<string, unknown>): Promise<string> {
  const { accessToken, instanceUrl } = await session();
  const res = await fetch(`${instanceUrl}/services/data/${API_VERSION}/sobjects/${sobject}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  const data = (await res.json()) as { id?: string; [k: string]: unknown };
  if (!res.ok || !data.id) {
    throw new Error(`Create ${sobject} failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data.id;
}

/** Runs a SOQL query and returns the matching records. */
export async function queryRecords<T = Record<string, unknown>>(soql: string): Promise<T[]> {
  const { accessToken, instanceUrl } = await session();
  const res = await fetch(
    `${instanceUrl}/services/data/${API_VERSION}/query?q=${encodeURIComponent(soql)}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const data = (await res.json()) as { records?: T[]; [k: string]: unknown };
  if (!res.ok) {
    throw new Error(`Query failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data.records ?? [];
}

/** Returns the id of the authenticated (login) user. */
export async function getCurrentUserId(): Promise<string> {
  const [user] = await queryRecords<{ Id: string }>(
    `SELECT Id FROM User WHERE Username = '${SF_USERNAME}'`,
  );
  if (!user) throw new Error(`No User found for ${SF_USERNAME}`);
  return user.Id;
}

/** Deletes a record via the REST API. A 404 (already gone) is treated as success. */
export async function deleteRecord(sobject: string, id: string): Promise<void> {
  const { accessToken, instanceUrl } = await session();
  const res = await fetch(`${instanceUrl}/services/data/${API_VERSION}/sobjects/${sobject}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(`Delete ${sobject}/${id} failed (${res.status})`);
  }
}
