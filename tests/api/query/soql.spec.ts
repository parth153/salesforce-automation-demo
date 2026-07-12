import { test, expect, dataPath } from '../../api-fixtures';

const soql = (q: string) => dataPath(`query?q=${encodeURIComponent(q)}`);

test.describe('API: SOQL query', () => {
  test('finds a seeded record by an exact field filter', async ({ api, track }) => {
    const name = `PWApiQuery${Date.now()}`;
    const create = (await (
      await api.post(dataPath('sobjects/Account'), { data: { Name: name } })
    ).json()) as { id: string };
    track('Account', create.id);

    const res = await api.get(soql(`SELECT Id, Name FROM Account WHERE Name = '${name}'`));
    expect(res.ok()).toBeTruthy();
    const body = (await res.json()) as {
      totalSize: number;
      done: boolean;
      records: Array<{ Id: string; Name: string }>;
    };
    expect(body.totalSize).toBe(1);
    expect(body.done).toBe(true);
    expect(body.records[0].Id).toBe(create.id);
    expect(body.records[0].Name).toBe(name);
  });

  test('traverses a parent relationship in the SELECT clause', async ({ api, track }) => {
    const accountName = `PWApiQueryAcct${Date.now()}`;
    const account = (await (
      await api.post(dataPath('sobjects/Account'), { data: { Name: accountName } })
    ).json()) as { id: string };
    track('Account', account.id);

    const lastName = `PWApiQueryContact${Date.now()}`;
    const contact = (await (
      await api.post(dataPath('sobjects/Contact'), {
        data: { LastName: lastName, AccountId: account.id },
      })
    ).json()) as { id: string };
    track('Contact', contact.id);

    const res = await api.get(
      soql(`SELECT Id, LastName, Account.Name FROM Contact WHERE Id = '${contact.id}'`),
    );
    expect(res.ok()).toBeTruthy();
    const body = (await res.json()) as {
      records: Array<{ LastName: string; Account: { Name: string } }>;
    };
    expect(body.records[0].LastName).toBe(lastName);
    expect(body.records[0].Account.Name).toBe(accountName);
  });
});
