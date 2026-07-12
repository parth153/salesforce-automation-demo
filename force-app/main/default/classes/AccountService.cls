public with sharing class AccountService {
    public static Decimal getTotalOpenOpportunityAmount(Id accountId) {
        Decimal total = 0;
        for (Opportunity opp : [
            SELECT Amount
            FROM Opportunity
            WHERE AccountId = :accountId AND IsClosed = false
        ]) {
            if (opp.Amount != null) {
                total += opp.Amount;
            }
        }
        return total;
    }
}
