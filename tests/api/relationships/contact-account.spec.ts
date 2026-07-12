import { test, expect, dataPath } from '../../api-fixtures';

test.describe('API: Contact/Account relationship', () => {
  test('links a Contact to an Account and resolves the parent both ways', async ({ api, track }) => {
    const accountName = `PWApiRelAcct${Date.now()}`;
    const account = (await (
      await api.post(dataPath('sobjects/Account'), { data: { Name: accountName } })
    ).json()) as { id: string };
    track('Account', account.id);

    const lastName = `PWApiRelContact${Date.now()}`;
    const contactRes = await api.post(dataPath('sobjects/Contact'), {
      data: { LastName: lastName, AccountId: account.id },
    });
    expect(contactRes.status()).toBe(201);
    const contact = (await contactRes.json()) as { id: string };
    track('Contact', contact.id);

    // The Contact record carries the AccountId foreign key.
    const contactRecord = await (
      await api.get(dataPath(`sobjects/Contact/${contact.id}?fields=AccountId`))
    ).json();
    expect(contactRecord.AccountId).toBe(account.id);

    // The Account exposes the Contact through its child relationship.
    const childRes = await api.get(
      dataPath(
        `query?q=${encodeURIComponent(
          `SELECT Id, (SELECT Id, LastName FROM Contacts) FROM Account WHERE Id = '${account.id}'`,
        )}`,
      ),
    );
    const child = (await childRes.json()) as {
      records: Array<{ Contacts: { records: Array<{ Id: string; LastName: string }> } }>;
    };
    const childContacts = child.records[0].Contacts.records;
    expect(childContacts).toHaveLength(1);
    expect(childContacts[0].Id).toBe(contact.id);
    expect(childContacts[0].LastName).toBe(lastName);
  });
});
