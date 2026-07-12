@isTest
private class AccountServiceTest {
    @isTest
    static void testGetTotalOpenOpportunityAmount_withOpenOpportunities() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
        insert new List<Opportunity>{
            new Opportunity(Name = 'Open Deal 1', AccountId = acc.Id, StageName = 'Prospecting', CloseDate = Date.today().addDays(30), Amount = 1000),
            new Opportunity(Name = 'Open Deal 2', AccountId = acc.Id, StageName = 'Prospecting', CloseDate = Date.today().addDays(30), Amount = 2500),
            new Opportunity(Name = 'Closed Deal', AccountId = acc.Id, StageName = 'Closed Won', CloseDate = Date.today(), Amount = 5000)
        };

        Test.startTest();
        Decimal total = AccountService.getTotalOpenOpportunityAmount(acc.Id);
        Test.stopTest();

        System.assertEquals(3500, total, 'Total should only include open opportunities');
    }

    @isTest
    static void testGetTotalOpenOpportunityAmount_noOpportunities() {
        Account acc = new Account(Name = 'Empty Account');
        insert acc;

        Test.startTest();
        Decimal total = AccountService.getTotalOpenOpportunityAmount(acc.Id);
        Test.stopTest();

        System.assertEquals(0, total, 'Total should be zero when there are no opportunities');
    }

    @isTest
    static void testGetTotalOpenOpportunityAmount_nullAmount() {
        Account acc = new Account(Name = 'Null Amount Account');
        insert acc;
        insert new Opportunity(Name = 'No Amount Deal', AccountId = acc.Id, StageName = 'Prospecting', CloseDate = Date.today().addDays(30));

        Test.startTest();
        Decimal total = AccountService.getTotalOpenOpportunityAmount(acc.Id);
        Test.stopTest();

        System.assertEquals(0, total, 'Null amounts should be treated as zero');
    }
}
