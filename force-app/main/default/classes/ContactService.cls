public with sharing class ContactService {
    public static Integer getContactCountForAccount(Id accountId) {
        return [SELECT COUNT() FROM Contact WHERE AccountId = :accountId];
    }
}
