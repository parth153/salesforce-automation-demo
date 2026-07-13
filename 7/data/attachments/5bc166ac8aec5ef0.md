# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contacts/delete-contact.spec.ts >> Contacts >> should delete a Contact
- Location: tests/contacts/delete-contact.spec.ts:17:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/couldn.t find the record|may have been deleted|no longer exists/i)
Expected: visible
Timeout: 8000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 8000ms
  - waiting for getByText(/couldn.t find the record|may have been deleted|no longer exists/i)


Call Log:
- Timeout 45000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link "Skip to Navigation" [ref=e4] [cursor=pointer]:
        - /url: javascript:void(0);
      - link "Skip to Main Content" [ref=e5] [cursor=pointer]:
        - /url: javascript:void(0);
      - generic [ref=e9]:
        - generic [ref=e13]:
          - button "Toggle Panel" [ref=e17] [cursor=pointer]:
            - img [ref=e21]
            - generic [ref=e24]: Menu
          - generic [ref=e29]:
            - img [ref=e33]
            - generic [ref=e36]: Developer Edition
        - button "Show menu" [ref=e45] [cursor=pointer]:
          - img [ref=e47]
          - generic [ref=e50]: Show menu
      - generic [ref=e51]:
        - button "Search" [ref=e57]:
          - img [ref=e59]
          - text: Search...
        - navigation "Global Header" [ref=e62]:
          - list [ref=e64]:
            - listitem [ref=e65]:
              - group [ref=e66]:
                - button "Add favorite" [ref=e68] [cursor=pointer]:
                  - generic [ref=e69]:
                    - img [ref=e73]
                    - tooltip "Add favorite"
                - button "Favorites list" [ref=e77] [cursor=pointer]:
                  - generic [ref=e78]:
                    - img [ref=e82]
                    - tooltip "Favorites list"
            - listitem [ref=e85]:
              - button "Global Actions" [ref=e91] [cursor=pointer]:
                - generic [ref=e92]:
                  - img [ref=e96]
                  - tooltip "Global Actions"
            - listitem [ref=e99]:
              - button "Guidance Center" [ref=e101] [cursor=pointer]:
                - generic [ref=e102]:
                  - img [ref=e106]
                  - tooltip "Guidance Center"
            - listitem [ref=e109]:
              - button "Salesforce Help" [ref=e112] [cursor=pointer]:
                - generic [ref=e113]:
                  - img [ref=e117]
                  - tooltip "Salesforce Help"
            - listitem [ref=e120]:
              - button "Setup" [ref=e126] [cursor=pointer]:
                - generic [ref=e127]:
                  - img [ref=e131]
                  - tooltip "Setup"
            - listitem [ref=e134]:
              - button "Notifications" [ref=e137] [cursor=pointer]:
                - generic [ref=e138]:
                  - img [ref=e143]
                  - tooltip "Notifications"
            - listitem [ref=e147]:
              - button "View profile" [ref=e150] [cursor=pointer]:
                - generic [ref=e151]:
                  - tooltip "View profile"
    - generic [ref=e155]:
      - generic [ref=e158]:
        - generic [ref=e160]:
          - navigation "App" [ref=e161]:
            - button "App Launcher" [ref=e163] [cursor=pointer]:
              - generic [ref=e174]: App Launcher
          - heading "Service" [level=1] [ref=e175]:
            - generic "Service" [ref=e176]
        - navigation "Global" [ref=e179]:
          - list [ref=e180]:
            - listitem [ref=e181]:
              - link "Home" [ref=e182] [cursor=pointer]:
                - /url: /lightning/page/home
                - generic [ref=e183]: Home
            - listitem [ref=e184]:
              - link "Chatter" [ref=e185] [cursor=pointer]:
                - /url: /lightning/page/chatter
                - generic [ref=e186]: Chatter
            - listitem [ref=e187]:
              - link "Accounts" [ref=e188] [cursor=pointer]:
                - /url: /lightning/o/Account/home
                - generic [ref=e189]: Accounts
              - button "Accounts List" [ref=e193] [cursor=pointer]:
                - img [ref=e197]
                - generic [ref=e200]: Accounts List
            - listitem [ref=e201] [cursor=pointer]:
              - link "Contacts" [ref=e202]:
                - /url: /lightning/o/Contact/home
                - generic [ref=e203]: Contacts
              - button "Contacts List" [ref=e207]:
                - img [ref=e211]
                - generic [ref=e214]: Contacts List
            - listitem [ref=e215]:
              - link "Cases" [ref=e216] [cursor=pointer]:
                - /url: /lightning/o/Case/home
                - generic [ref=e217]: Cases
              - button "Cases List" [ref=e221] [cursor=pointer]:
                - img [ref=e225]
                - generic [ref=e228]: Cases List
            - listitem [ref=e229]:
              - link "Reports" [ref=e230] [cursor=pointer]:
                - /url: /lightning/o/Report/home
                - generic [ref=e231]: Reports
              - button "Reports List" [ref=e235] [cursor=pointer]:
                - img [ref=e239]
                - generic [ref=e242]: Reports List
            - listitem [ref=e243]:
              - link "Dashboards" [ref=e244] [cursor=pointer]:
                - /url: /lightning/o/Dashboard/home
                - generic [ref=e245]: Dashboards
              - button "Dashboards List" [ref=e249] [cursor=pointer]:
                - img [ref=e253]
                - generic [ref=e256]: Dashboards List
            - listitem [ref=e257]:
              - button "Help" [ref=e261] [cursor=pointer]:
                - img [ref=e263]
                - generic [ref=e266]: Help
      - main [ref=e268]:
        - generic [ref=e284]:
          - generic [ref=e293]:
            - generic [ref=e294]:
              - generic [ref=e295]:
                - heading "Contact PWDelete1783920557351" [level=1] [ref=e302]:
                  - generic [ref=e304]: Contact
                  - generic [ref=e305]: PWDelete1783920557351
                - button "View Contact Hierarchy" [ref=e314] [cursor=pointer]:
                  - img [ref=e316]
                  - generic [ref=e319]: View Contact Hierarchy
              - button "Follow" [ref=e324] [cursor=pointer]:
                - generic [ref=e325]:
                  - img [ref=e329]
                  - text: Follow
              - generic [ref=e334]:
                - generic "New Case" [ref=e335]:
                  - button "New Case" [ref=e340] [cursor=pointer]
                - generic "New Note" [ref=e341]:
                  - button "New Note" [ref=e346] [cursor=pointer]
                - generic "Submit for Approval" [ref=e347]:
                  - button "Submit for Approval" [ref=e352] [cursor=pointer]
                - button "Show more actions" [ref=e354] [cursor=pointer]:
                  - img [ref=e356]
                  - generic [ref=e359]: Show more actions
            - generic [ref=e360]:
              - generic [ref=e362]:
                - paragraph [ref=e363]: Title
                - paragraph
              - generic [ref=e365]:
                - paragraph [ref=e366]: Account Name
                - paragraph
              - generic [ref=e368]:
                - button "Phone (2)" [ref=e369] [cursor=pointer]:
                  - paragraph [ref=e370]:
                    - text: Phone (2)
                    - img [ref=e375]
                - list [ref=e378]:
                  - generic [ref=e381]:
                    - paragraph
              - generic [ref=e383]:
                - paragraph [ref=e384]: Email
                - paragraph
              - generic [ref=e386]:
                - paragraph [ref=e387]: Contact Owner
                - paragraph [ref=e388]:
                  - generic [ref=e391]:
                    - generic [ref=e398]:
                      - link "Parth Parikh" [ref=e399] [cursor=pointer]:
                        - /url: /lightning/r/User/005dL00001oTk6zQAC/view
                        - generic [ref=e403]: Parth Parikh
                      - button "Preview" [ref=e405] [cursor=pointer]:
                        - img [ref=e407]
                        - generic [ref=e410]: Preview
                    - button "Change Owner" [ref=e412] [cursor=pointer]:
                      - img [ref=e414]
                      - generic [ref=e417]: Change Owner
          - generic [ref=e419]:
            - generic [ref=e425]:
              - heading "Tabs" [level=2] [ref=e426]
              - generic "Tabs" [ref=e427]:
                - generic [ref=e428]:
                  - heading "Tabs" [level=2] [ref=e429]
                  - tablist "Tabs" [ref=e431]:
                    - tab "Related" [selected] [ref=e432] [cursor=pointer]
                    - tab "Details" [ref=e433] [cursor=pointer]
                  - tabpanel "Related" [ref=e436]:
                    - generic [ref=e437]:
                      - article [ref=e442]:
                        - generic [ref=e444]:
                          - img [ref=e449]
                          - generic "We found no potential duplicates of this Contact." [ref=e453]
                      - generic [ref=e457]:
                        - article "Opportunities" [ref=e463]:
                          - generic [ref=e468]:
                            - generic [ref=e470]:
                              - img [ref=e474]
                              - heading "Opportunities (0)" [level=2] [ref=e476]:
                                - link "Opportunities (0)" [ref=e477] [cursor=pointer]:
                                  - /url: /lightning/r/Contact/003dL00002FKkeXQAT/related/Opportunities/view
                                  - generic "Opportunities" [ref=e478]
                                  - generic "(0)" [ref=e479]
                            - generic "New" [ref=e483]:
                              - button "New" [ref=e488] [cursor=pointer]
                        - article "Cases" [ref=e494]:
                          - generic [ref=e499]:
                            - generic [ref=e501]:
                              - img [ref=e505]
                              - heading "Cases (0)" [level=2] [ref=e507]:
                                - link "Cases (0)" [ref=e508] [cursor=pointer]:
                                  - /url: /lightning/r/Contact/003dL00002FKkeXQAT/related/Cases/view
                                  - generic "Cases" [ref=e509]
                                  - generic "(0)" [ref=e510]
                            - generic "New" [ref=e514]:
                              - button "New" [ref=e519] [cursor=pointer]
                        - article "Campaign History" [ref=e527]:
                          - generic [ref=e528]:
                            - heading "Campaign History (0)" [level=2] [ref=e534]:
                              - link "Campaign History (0)" [ref=e535] [cursor=pointer]:
                                - /url: /lightning/r/Contact/003dL00002FKkeXQAT/related/CampaignMembers/view
                                - generic "Campaign History" [ref=e536]
                                - generic "(0)" [ref=e537]
                            - list [ref=e540]:
                              - listitem [ref=e541]:
                                - button "Add to Campaign" [ref=e542] [cursor=pointer]:
                                  - generic "Add to Campaign" [ref=e543]
                        - article "Notes & Attachments" [ref=e551]:
                          - generic [ref=e552]:
                            - heading "Notes & Attachments (0)" [level=2] [ref=e558]:
                              - link "Notes & Attachments (0)" [ref=e559] [cursor=pointer]:
                                - /url: /lightning/r/Contact/003dL00002FKkeXQAT/related/CombinedAttachments/view
                                - generic "Notes & Attachments" [ref=e560]
                                - generic "(0)" [ref=e561]
                            - list [ref=e564]:
                              - listitem [ref=e565]:
                                - button "Upload Files" [ref=e566] [cursor=pointer]:
                                  - generic "Upload Files" [ref=e567]
                          - generic [ref=e573]:
                            - generic [ref=e575]:
                              - img [ref=e579]
                              - generic [ref=e582]: Drop Files
                            - generic [ref=e583]:
                              - generic [ref=e585]:
                                - generic [ref=e589]:
                                  - button "Upload Files Or drop files" [ref=e590]
                                  - generic [ref=e591]:
                                    - generic [ref=e592]:
                                      - img [ref=e594]
                                      - text: Upload Files
                                    - generic [ref=e597]: Or drop files
                                - status
                              - list
            - generic [ref=e603]:
              - heading "Tabs" [level=2] [ref=e604]
              - generic "Tabs" [ref=e605]:
                - generic [ref=e606]:
                  - heading "Tabs" [level=2] [ref=e607]
                  - tablist "Tabs" [ref=e609]:
                    - tab "Activity" [selected] [ref=e610] [cursor=pointer]
                    - tab "Chatter" [ref=e611] [cursor=pointer]
                  - tabpanel "Activity" [ref=e614]:
                    - generic [ref=e620]:
                      - heading "Activity Publisher" [level=2] [ref=e621]
                      - generic [ref=e622]:
                        - group [ref=e623]:
                          - generic [ref=e625]:
                            - button "New Task" [ref=e626] [cursor=pointer]:
                              - generic [ref=e628]:
                                - img [ref=e630]
                                - generic [ref=e633]: New Task
                              - generic: New Task
                            - generic [ref=e634]:
                              - button "No Additional New Task Actions" [disabled]:
                                - generic:
                                  - img
                                - generic: No Additional New Task Actions
                        - group [ref=e635]:
                          - generic [ref=e637]:
                            - button "Log a Call" [ref=e638] [cursor=pointer]:
                              - generic [ref=e640]:
                                - img [ref=e642]
                                - generic [ref=e645]: Log a Call
                              - generic: Log a Call
                            - generic [ref=e646]:
                              - button "No Additional Log a Call Actions" [disabled]:
                                - generic:
                                  - img
                                - generic: No Additional Log a Call Actions
                        - group [ref=e647]:
                          - generic [ref=e649]:
                            - button "New Event" [ref=e650] [cursor=pointer]:
                              - generic [ref=e652]:
                                - img [ref=e654]
                                - generic [ref=e657]: New Event
                              - generic: New Event
                            - button "More New Event Actions" [ref=e659] [cursor=pointer]:
                              - img [ref=e661]
                              - generic [ref=e664]: More New Event Actions
                        - group [ref=e665]:
                          - generic [ref=e667]:
                            - button "Email" [ref=e668] [cursor=pointer]:
                              - generic [ref=e670]:
                                - img [ref=e672]
                                - generic [ref=e675]: Email
                              - generic: Email
                            - button "More Email Actions" [ref=e677] [cursor=pointer]:
                              - img [ref=e679]
                              - generic [ref=e682]: More Email Actions
                      - heading "Activity Timeline" [level=2] [ref=e683]
                      - generic [ref=e685]:
                        - link "Skip to the bottom of the activity timeline" [ref=e686] [cursor=pointer]:
                          - /url: javascript:void(0);
                        - generic [ref=e688]:
                          - generic [ref=e690]: "Filters: All time • All activities • All types"
                          - button "Timeline Settings" [ref=e691] [cursor=pointer]:
                            - img [ref=e693]
                            - generic [ref=e696]: Timeline Settings
                        - generic [ref=e699]:
                          - button "Refresh" [ref=e700] [cursor=pointer]
                          - text: •
                          - button "Expand All. Show details for activities in the timeline." [ref=e701] [cursor=pointer]: Expand All
                          - text: •
                          - button "View All" [ref=e702] [cursor=pointer]
                        - generic [ref=e704]:
                          - heading "Upcoming & Overdue" [level=3] [ref=e705]:
                            - button "Upcoming & Overdue" [expanded] [ref=e706] [cursor=pointer]:
                              - img [ref=e708]
                              - text: Upcoming & Overdue
                          - generic [ref=e711]:
                            - generic:
                              - list
                            - generic [ref=e714]:
                              - text: No activities to show.
                              - text: Get started by sending an email, scheduling a task, and more.
                        - status [ref=e715]:
                          - generic [ref=e717]:
                            - img [ref=e721]
                            - generic [ref=e724]: information
                          - paragraph [ref=e726]: To change what's shown, try changing your filters.
                        - button "Show All Activities" [ref=e728] [cursor=pointer]
                        - link "Skip to the top of the activity timeline" [ref=e729] [cursor=pointer]:
                          - /url: javascript:void(0);
  - generic:
    - status
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures';
  2  | import { ObjectListPage } from '../pages/ObjectListPage';
  3  | import { RecordPage } from '../pages/RecordPage';
  4  | import { createRecord, deleteRecord } from '../utils/sfApi';
  5  | 
  6  | test.describe('Contacts', () => {
  7  |   let contactId: string | undefined;
  8  |   const lastName = `PWDelete${Date.now()}`;
  9  | 
  10 |   test.afterEach(async () => {
  11 |     if (contactId) {
  12 |       await deleteRecord('Contact', contactId);
  13 |       contactId = undefined;
  14 |     }
  15 |   });
  16 | 
  17 |   test('should delete a Contact', async ({ page }) => {
  18 |     // Create a Contact specifically for this test.
  19 |     contactId = await createRecord('Contact', { LastName: lastName });
  20 | 
  21 |     await page.goto(`/lightning/r/Contact/${contactId}/view`);
  22 |     const record = new RecordPage(page);
  23 |     await record.expectLoaded(lastName);
  24 | 
  25 |     await record.delete();
  26 |     await record.confirmDelete();
  27 | 
  28 |     // Navigating directly to the deleted record shows a not-found/deleted message.
  29 |     // Reload-poll as the page can lag under load.
  30 |     await expect(async () => {
  31 |       await page.goto(`/lightning/r/Contact/${contactId}/view`);
  32 |       await expect(
  33 |         page.getByText(/couldn.t find the record|may have been deleted|no longer exists/i),
  34 |       ).toBeVisible({ timeout: 8_000 });
> 35 |     }).toPass({ timeout: 45_000 });
     |        ^ Error: expect(locator).toBeVisible() failed
  36 | 
  37 |     // No longer in the Recently Viewed list. The deleted contact was just viewed,
  38 |     // so it would appear if still present; poll with reload as the list lags.
  39 |     const contacts = new ObjectListPage(page, 'Contact');
  40 |     await expect(async () => {
  41 |       await contacts.goto();
  42 |       await expect(contacts.rowLink(lastName)).toHaveCount(0, { timeout: 5_000 });
  43 |     }).toPass({ timeout: 60_000 });
  44 | 
  45 |     contactId = undefined; // deleted via UI; skip API cleanup
  46 |   });
  47 | });
  48 | 
```