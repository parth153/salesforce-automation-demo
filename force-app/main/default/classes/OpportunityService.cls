public with sharing class OpportunityService {
    public static Boolean isOverdue(Id opportunityId) {
        Opportunity opp = [
            SELECT CloseDate, IsClosed
            FROM Opportunity
            WHERE Id = :opportunityId
        ];
        if (opp.IsClosed || opp.CloseDate == null) {
            return false;
        }
        return opp.CloseDate < Date.today();
    }
}
