@isTest
private class OpportunityServiceTest {
    @isTest
    static void testIsOverdue_openPastCloseDate() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        Opportunity opp = new Opportunity(
            Name = 'Overdue Deal',
            AccountId = acc.Id,
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(-10)
        );
        insert opp;

        Test.startTest();
        Boolean overdue = OpportunityService.isOverdue(opp.Id);
        Test.stopTest();

        System.assertEquals(true, overdue, 'An open opportunity with a past close date should be overdue');
    }

    @isTest
    static void testIsOverdue_openFutureCloseDate() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        Opportunity opp = new Opportunity(
            Name = 'On Track Deal',
            AccountId = acc.Id,
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(10)
        );
        insert opp;

        Test.startTest();
        Boolean overdue = OpportunityService.isOverdue(opp.Id);
        Test.stopTest();

        System.assertEquals(false, overdue, 'An open opportunity with a future close date should not be overdue');
    }

    @isTest
    static void testIsOverdue_closedPastCloseDate() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        Opportunity opp = new Opportunity(
            Name = 'Closed Deal',
            AccountId = acc.Id,
            StageName = 'Closed Won',
            CloseDate = Date.today().addDays(-10)
        );
        insert opp;

        Test.startTest();
        Boolean overdue = OpportunityService.isOverdue(opp.Id);
        Test.stopTest();

        System.assertEquals(false, overdue, 'A closed opportunity should never be considered overdue');
    }
}
