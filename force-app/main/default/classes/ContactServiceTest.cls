@isTest
private class ContactServiceTest {
    @isTest
    static void testGetContactCountForAccount_withContacts() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        insert new List<Contact>{
            new Contact(LastName = 'Smith', AccountId = acc.Id),
            new Contact(LastName = 'Jones', AccountId = acc.Id)
        };

        Test.startTest();
        Integer count = ContactService.getContactCountForAccount(acc.Id);
        Test.stopTest();

        System.assertEquals(2, count, 'Should count both contacts linked to the account');
    }

    @isTest
    static void testGetContactCountForAccount_noContacts() {
        Account acc = new Account(Name = 'Empty Account');
        insert acc;

        Test.startTest();
        Integer count = ContactService.getContactCountForAccount(acc.Id);
        Test.stopTest();

        System.assertEquals(0, count, 'Should be zero when the account has no contacts');
    }
}
