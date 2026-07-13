# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation/service-tabs.spec.ts >> Navigation and App Switching >> should navigate primary tabs within the Service app
- Location: tests/navigation/service-tabs.spec.ts:19:7

# Error details

```
Error: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('navigation', { name: 'Global' }).getByRole('link', { name: 'Home', exact: true })


Call Log:
- Timeout 60000ms exceeded while waiting on the predicate
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
                - button "This item doesn't support favorites" [ref=e68] [cursor=pointer]:
                  - generic [ref=e69]:
                    - img [ref=e73]
                    - tooltip "This item doesn't support favorites"
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
          - heading "Developer Edition" [level=1] [ref=e175]:
            - generic "Developer Edition" [ref=e176]
        - navigation "Global" [ref=e179]:
          - list [ref=e180]:
            - listitem [ref=e181]:
              - link "Welcome" [ref=e182] [cursor=pointer]:
                - /url: /lightning/n/devedapp__Welcome
                - generic [ref=e183]: Welcome
      - main [ref=e185]:
        - generic [ref=e193]:
          - generic [ref=e194]:
            - heading "Home" [level=1] [ref=e195]
            - generic [ref=e198]:
              - generic [ref=e199]:
                - generic [ref=e200]:
                  - heading "Quarterly Performance" [level=2] [ref=e201]:
                    - generic "Quarterly Performance" [ref=e202]
                  - button "Refresh Chart" [ref=e204] [cursor=pointer]:
                    - img [ref=e206]
                    - generic [ref=e209]: Refresh Chart
                - list [ref=e210]:
                  - listitem [ref=e211]: Closed$5,253,576
                  - listitem [ref=e212]: Open (>70%)$8,357,069
                  - listitem [ref=e213]:
                    - text: Goal--
                    - button "Edit Goal" [ref=e214] [cursor=pointer]:
                      - img [ref=e216]
                      - generic [ref=e219]: Edit Goal
              - generic [ref=e220]:
                - generic [ref=e222]:
                  - list [ref=e227]:
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                    - listitem:
                      - button
                  - generic [ref=e229]: "Chart: Quarterly Performance"
                - generic [ref=e230]:
                  - generic "Closed" [ref=e232]
                  - generic "Goal" [ref=e234]
                  - generic "Closed + Open (>70%)" [ref=e236]
              - link "Click here to view quarterly performance data":
                - /url: javascript:void(0);
                - generic [ref=e237] [cursor=pointer]: Click here to view quarterly performance data
            - generic [ref=e239]:
              - generic [ref=e240]:
                - article [ref=e243]:
                  - heading "Today's Events" [level=2] [ref=e247]:
                    - generic "Today's Events" [ref=e248]
                  - generic [ref=e252]:
                    - img [ref=e253]
                    - generic [ref=e254]: Looks like you're free and clear the rest of the day.
                  - button "View Calendar" [ref=e256] [cursor=pointer]
                - article [ref=e259]:
                  - heading "Recent Records" [level=2] [ref=e263]:
                    - generic "Recent Records" [ref=e264]
                  - list [ref=e266]:
                    - listitem [ref=e267]:
                      - generic [ref=e268]:
                        - img [ref=e272]
                        - link "Manish Paul" [ref=e275] [cursor=pointer]:
                          - /url: /lightning/r/001dL00002KLCBLQA5/view
                    - listitem [ref=e276]:
                      - generic [ref=e277]:
                        - img [ref=e281]
                        - 'link "Sample Flow Report: Screen Flows" [ref=e284] [cursor=pointer]':
                          - /url: /lightning/r/00OdL00000Qju09UAB/view
                    - listitem [ref=e285]:
                      - generic [ref=e286]:
                        - img [ref=e290]
                        - link "Enablement Dashboard" [ref=e293] [cursor=pointer]:
                          - /url: /lightning/r/01ZdL00000B1pkcUAB/view
                    - listitem [ref=e294]:
                      - generic [ref=e295]:
                        - img [ref=e299]
                        - link "PW PathRender 1783833238200" [ref=e302] [cursor=pointer]:
                          - /url: /lightning/r/006dL00000QDl5NQAT/view
                    - listitem [ref=e303]:
                      - generic [ref=e304]:
                        - img [ref=e308]
                        - link "PW PathExplore 1783833169207" [ref=e311] [cursor=pointer]:
                          - /url: /lightning/r/006dL00000QDl0XQAT/view
                  - button "View All Recent Records" [ref=e313] [cursor=pointer]: View All
              - generic [ref=e314]:
                - article [ref=e317]:
                  - generic [ref=e318]:
                    - heading "Today’s Tasks" [level=2] [ref=e321]:
                      - generic "Today’s Tasks" [ref=e322]
                    - button "Select a view of your tasks" [ref=e325] [cursor=pointer]:
                      - img [ref=e327]
                      - generic [ref=e330]: Select a view of your tasks
                  - generic [ref=e334]:
                    - img [ref=e335]
                    - generic [ref=e336]: Nothing due today. Be a go-getter, and check back soon.
                  - button "View All Tasks" [ref=e338] [cursor=pointer]: View All
                - article [ref=e341]:
                  - generic [ref=e342]:
                    - heading "Key Deals - Recent Opportunities" [level=2] [ref=e345]:
                      - generic "Key Deals - Recent Opportunities" [ref=e346]
                    - button "Key Deals Trigger" [ref=e348] [cursor=pointer]:
                      - button "Key Deals Trigger" [ref=e354]:
                        - generic [ref=e356]:
                          - img [ref=e358]
                          - generic [ref=e361]: Key Deals Trigger
                        - img [ref=e365]
                  - list [ref=e370]:
                    - listitem [ref=e371]:
                      - generic [ref=e373]:
                        - link "PW PathRender 1783833238200" [ref=e376] [cursor=pointer]:
                          - /url: /lightning/r/006dL00000QDl5NQAT/view
                        - list [ref=e377]:
                          - listitem
                          - listitem [ref=e378]: · 31/12/2026
                          - listitem
                    - listitem [ref=e379]:
                      - generic [ref=e381]:
                        - link "PW PathExplore 1783833169207" [ref=e384] [cursor=pointer]:
                          - /url: /lightning/r/006dL00000QDl0XQAT/view
                        - list [ref=e385]:
                          - listitem
                          - listitem [ref=e386]: · 31/12/2026
                          - listitem
                    - listitem [ref=e387]:
                      - generic [ref=e389]:
                        - link "Sold Mansion" [ref=e392] [cursor=pointer]:
                          - /url: /lightning/r/006dL00000QDEmAQAX/view
                        - list [ref=e393]:
                          - listitem [ref=e394]:
                            - link "Parth Parikh" [ref=e396] [cursor=pointer]:
                              - /url: /lightning/r/001dL00002KLUg8QAH/view
                          - listitem [ref=e397]: · 9/7/2026
                          - listitem [ref=e398]: $8,000,000.00
                    - listitem [ref=e399]:
                      - generic [ref=e401]:
                        - link "Anderson Education 427 - Deal 1" [ref=e404] [cursor=pointer]:
                          - /url: /lightning/r/006dL00000QByImQAL/view
                        - list [ref=e405]:
                          - listitem [ref=e406]:
                            - link "Anderson Education 427" [ref=e408] [cursor=pointer]:
                              - /url: /lightning/r/001dL00002KEQpnQAH/view
                          - listitem [ref=e409]: · 27/10/2026
                          - listitem [ref=e410]: $128,759.00
                  - button "View All Key Deals" [ref=e412] [cursor=pointer]
          - generic [ref=e415]:
            - heading "Assistant" [level=2] [ref=e419]:
              - generic [ref=e420]: Assistant
            - list [ref=e424]:
              - listitem [ref=e425]:
                - generic [ref=e427]:
                  - generic [ref=e428]:
                    - button "Expand Card" [ref=e429] [cursor=pointer]:
                      - generic [ref=e431]:
                        - img [ref=e433]
                        - generic [ref=e436]: Expand Card
                    - img "Opportunity" [ref=e439]
                    - heading "30 days without any activity" [level=2] [ref=e440]
                    - link "Thomas Retail 250 - Deal 2" [ref=e443] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByEOQA1/view
                  - group [ref=e444]:
                    - button "New Task" [ref=e445] [cursor=pointer]:
                      - img [ref=e447]
                      - generic [ref=e450]: New Task
                    - button "New Event" [ref=e451] [cursor=pointer]:
                      - img [ref=e453]
                      - generic [ref=e456]: New Event
                    - button "Dismiss recommendation" [ref=e457] [cursor=pointer]:
                      - img [ref=e459]
                      - generic [ref=e462]: Dismiss recommendation
              - listitem [ref=e463]:
                - generic [ref=e465]:
                  - generic [ref=e466]:
                    - button "Expand Card" [ref=e467] [cursor=pointer]:
                      - generic [ref=e469]:
                        - img [ref=e471]
                        - generic [ref=e474]: Expand Card
                    - img "Opportunity" [ref=e477]
                    - heading "30 days without any activity" [level=2] [ref=e478]
                    - link "Thomas Healthcare 429 - Deal 1" [ref=e481] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByIoQAL/view
                  - group [ref=e482]:
                    - button "New Task" [ref=e483] [cursor=pointer]:
                      - img [ref=e485]
                      - generic [ref=e488]: New Task
                    - button "New Event" [ref=e489] [cursor=pointer]:
                      - img [ref=e491]
                      - generic [ref=e494]: New Event
                    - button "Dismiss recommendation" [ref=e495] [cursor=pointer]:
                      - img [ref=e497]
                      - generic [ref=e500]: Dismiss recommendation
              - listitem [ref=e501]:
                - generic [ref=e503]:
                  - generic [ref=e504]:
                    - button "Expand Card" [ref=e505] [cursor=pointer]:
                      - generic [ref=e507]:
                        - img [ref=e509]
                        - generic [ref=e512]: Expand Card
                    - img "Opportunity" [ref=e515]
                    - heading "30 days without any activity" [level=2] [ref=e516]
                    - link "Taylor Technology 282 - Deal 2" [ref=e519] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByFAQA1/view
                  - group [ref=e520]:
                    - button "New Task" [ref=e521] [cursor=pointer]:
                      - img [ref=e523]
                      - generic [ref=e526]: New Task
                    - button "New Event" [ref=e527] [cursor=pointer]:
                      - img [ref=e529]
                      - generic [ref=e532]: New Event
                    - button "Dismiss recommendation" [ref=e533] [cursor=pointer]:
                      - img [ref=e535]
                      - generic [ref=e538]: Dismiss recommendation
              - listitem [ref=e539]:
                - generic [ref=e541]:
                  - generic [ref=e542]:
                    - button "Expand Card" [ref=e543] [cursor=pointer]:
                      - generic [ref=e545]:
                        - img [ref=e547]
                        - generic [ref=e550]: Expand Card
                    - img "Opportunity" [ref=e553]
                    - heading "30 days without any activity" [level=2] [ref=e554]
                    - link "Johnson Manufacturing 453 - Deal 1" [ref=e557] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByJPQA1/view
                  - group [ref=e558]:
                    - button "New Task" [ref=e559] [cursor=pointer]:
                      - img [ref=e561]
                      - generic [ref=e564]: New Task
                    - button "New Event" [ref=e565] [cursor=pointer]:
                      - img [ref=e567]
                      - generic [ref=e570]: New Event
                    - button "Dismiss recommendation" [ref=e571] [cursor=pointer]:
                      - img [ref=e573]
                      - generic [ref=e576]: Dismiss recommendation
              - listitem [ref=e577]:
                - generic [ref=e579]:
                  - generic [ref=e580]:
                    - button "Expand Card" [ref=e581] [cursor=pointer]:
                      - generic [ref=e583]:
                        - img [ref=e585]
                        - generic [ref=e588]: Expand Card
                    - img "Opportunity" [ref=e591]
                    - heading "30 days without any activity" [level=2] [ref=e592]
                    - link "Taylor Technology 282 - Deal 1" [ref=e595] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByF9QAL/view
                  - group [ref=e596]:
                    - button "New Task" [ref=e597] [cursor=pointer]:
                      - img [ref=e599]
                      - generic [ref=e602]: New Task
                    - button "New Event" [ref=e603] [cursor=pointer]:
                      - img [ref=e605]
                      - generic [ref=e608]: New Event
                    - button "Dismiss recommendation" [ref=e609] [cursor=pointer]:
                      - img [ref=e611]
                      - generic [ref=e614]: Dismiss recommendation
              - listitem [ref=e615]:
                - generic [ref=e617]:
                  - generic [ref=e618]:
                    - button "Expand Card" [ref=e619] [cursor=pointer]:
                      - generic [ref=e621]:
                        - img [ref=e623]
                        - generic [ref=e626]: Expand Card
                    - img "Opportunity" [ref=e629]
                    - heading "30 days without any activity" [level=2] [ref=e630]
                    - link "Thomas Transportation 292 - Deal 1" [ref=e633] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByFPQA1/view
                  - group [ref=e634]:
                    - button "New Task" [ref=e635] [cursor=pointer]:
                      - img [ref=e637]
                      - generic [ref=e640]: New Task
                    - button "New Event" [ref=e641] [cursor=pointer]:
                      - img [ref=e643]
                      - generic [ref=e646]: New Event
                    - button "Dismiss recommendation" [ref=e647] [cursor=pointer]:
                      - img [ref=e649]
                      - generic [ref=e652]: Dismiss recommendation
              - listitem [ref=e653]:
                - generic [ref=e655]:
                  - generic [ref=e656]:
                    - button "Expand Card" [ref=e657] [cursor=pointer]:
                      - generic [ref=e659]:
                        - img [ref=e661]
                        - generic [ref=e664]: Expand Card
                    - img "Opportunity" [ref=e667]
                    - heading "30 days without any activity" [level=2] [ref=e668]
                    - link "Williams Education 423 - Deal 1" [ref=e671] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByIfQAL/view
                  - group [ref=e672]:
                    - button "New Task" [ref=e673] [cursor=pointer]:
                      - img [ref=e675]
                      - generic [ref=e678]: New Task
                    - button "New Event" [ref=e679] [cursor=pointer]:
                      - img [ref=e681]
                      - generic [ref=e684]: New Event
                    - button "Dismiss recommendation" [ref=e685] [cursor=pointer]:
                      - img [ref=e687]
                      - generic [ref=e690]: Dismiss recommendation
              - listitem [ref=e691]:
                - generic [ref=e693]:
                  - generic [ref=e694]:
                    - button "Expand Card" [ref=e695] [cursor=pointer]:
                      - generic [ref=e697]:
                        - img [ref=e699]
                        - generic [ref=e702]: Expand Card
                    - img "Opportunity" [ref=e705]
                    - heading "30 days without any activity" [level=2] [ref=e706]
                    - link "Davis Education 253 - Deal 1" [ref=e709] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByERQA1/view
                  - group [ref=e710]:
                    - button "New Task" [ref=e711] [cursor=pointer]:
                      - img [ref=e713]
                      - generic [ref=e716]: New Task
                    - button "New Event" [ref=e717] [cursor=pointer]:
                      - img [ref=e719]
                      - generic [ref=e722]: New Event
                    - button "Dismiss recommendation" [ref=e723] [cursor=pointer]:
                      - img [ref=e725]
                      - generic [ref=e728]: Dismiss recommendation
              - listitem [ref=e729]:
                - generic [ref=e731]:
                  - generic [ref=e732]:
                    - button "Expand Card" [ref=e733] [cursor=pointer]:
                      - generic [ref=e735]:
                        - img [ref=e737]
                        - generic [ref=e740]: Expand Card
                    - img "Opportunity" [ref=e743]
                    - heading "30 days without any activity" [level=2] [ref=e744]
                    - link "Rodriguez Healthcare 308 - Deal 1" [ref=e747] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByFpQAL/view
                  - group [ref=e748]:
                    - button "New Task" [ref=e749] [cursor=pointer]:
                      - img [ref=e751]
                      - generic [ref=e754]: New Task
                    - button "New Event" [ref=e755] [cursor=pointer]:
                      - img [ref=e757]
                      - generic [ref=e760]: New Event
                    - button "Dismiss recommendation" [ref=e761] [cursor=pointer]:
                      - img [ref=e763]
                      - generic [ref=e766]: Dismiss recommendation
              - listitem [ref=e767]:
                - generic [ref=e769]:
                  - generic [ref=e770]:
                    - button "Expand Card" [ref=e771] [cursor=pointer]:
                      - generic [ref=e773]:
                        - img [ref=e775]
                        - generic [ref=e778]: Expand Card
                    - img "Opportunity" [ref=e781]
                    - heading "30 days without any activity" [level=2] [ref=e782]
                    - link "Thomas Education 392 - Deal 1" [ref=e785] [cursor=pointer]:
                      - /url: /lightning/r/006dL00000QByHtQAL/view
                  - group [ref=e786]:
                    - button "New Task" [ref=e787] [cursor=pointer]:
                      - img [ref=e789]
                      - generic [ref=e792]: New Task
                    - button "New Event" [ref=e793] [cursor=pointer]:
                      - img [ref=e795]
                      - generic [ref=e798]: New Event
                    - button "Dismiss recommendation" [ref=e799] [cursor=pointer]:
                      - img [ref=e801]
                      - generic [ref=e804]: Dismiss recommendation
  - generic:
    - status
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures';
  2  | import { NavBar } from '../pages/NavBar';
  3  | import type { Page } from '@playwright/test';
  4  | 
  5  | // Each Service-app tab and the URL prefix it should navigate to. Object tabs
  6  | // resolve to their list view (e.g. /lightning/o/Account/list?...), so match the
  7  | // stable object prefix rather than the tab's /home href.
  8  | const TABS: { name: string; urlFragment: string }[] = [
  9  |   { name: 'Home', urlFragment: '/lightning/page/home' },
  10 |   { name: 'Chatter', urlFragment: '/lightning/page/chatter' },
  11 |   { name: 'Accounts', urlFragment: '/lightning/o/Account/' },
  12 |   { name: 'Contacts', urlFragment: '/lightning/o/Contact/' },
  13 |   { name: 'Cases', urlFragment: '/lightning/o/Case/' },
  14 |   { name: 'Reports', urlFragment: '/lightning/o/Report/' },
  15 |   { name: 'Dashboards', urlFragment: '/lightning/o/Dashboard/' },
  16 | ];
  17 | 
  18 | test.describe('Navigation and App Switching', () => {
  19 |   test('should navigate primary tabs within the Service app', async ({ page, homePage }) => {
  20 |     await homePage.goto();
  21 |     const navBar = new NavBar(page);
  22 | 
  23 |     for (const { name, urlFragment } of TABS) {
  24 |       await openTab(page, navBar, name, urlFragment);
  25 |       // Tab renders as selected once its page loads.
  26 |       await expect(navBar.tab(name)).toBeVisible();
  27 |     }
  28 |   });
  29 | });
  30 | 
  31 | /**
  32 |  * Clicks a nav tab and waits for its page to load. Lightning is a SPA that can
  33 |  * drop a click (or leave a tab briefly un-actionable) while the previous view is
  34 |  * still settling, so retry the whole click+navigation until the URL changes.
  35 |  */
  36 | async function openTab(page: Page, navBar: NavBar, name: string, urlFragment: string) {
  37 |   const urlPattern = new RegExp(urlFragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  38 |   await expect(async () => {
  39 |     await navBar.tab(name).click({ timeout: 10_000 });
  40 |     await page.waitForURL(urlPattern, { timeout: 10_000 });
> 41 |   }).toPass({ timeout: 60_000 });
     |      ^ Error: locator.click: Timeout 10000ms exceeded.
  42 | }
  43 | 
```