public with sharing class CaseService {
    public static Integer getOpenCaseCountForAccount(Id accountId) {
        return [SELECT COUNT() FROM Case WHERE AccountId = :accountId AND IsClosed = false];
    }
}
