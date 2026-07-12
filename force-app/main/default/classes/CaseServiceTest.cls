@isTest
private class CaseServiceTest {
    @isTest
    static void testGetOpenCaseCountForAccount_mixedCases() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        insert new List<Case>{
            new Case(AccountId = acc.Id, Status = 'New'),
            new Case(AccountId = acc.Id, Status = 'Working'),
            new Case(AccountId = acc.Id, Status = 'Closed')
        };

        Test.startTest();
        Integer count = CaseService.getOpenCaseCountForAccount(acc.Id);
        Test.stopTest();

        System.assertEquals(2, count, 'Should only count open (non-closed) cases');
    }

    @isTest
    static void testGetOpenCaseCountForAccount_noCases() {
        Account acc = new Account(Name = 'Empty Account');
        insert acc;

        Test.startTest();
        Integer count = CaseService.getOpenCaseCountForAccount(acc.Id);
        Test.stopTest();

        System.assertEquals(0, count, 'Should be zero when the account has no cases');
    }
}
