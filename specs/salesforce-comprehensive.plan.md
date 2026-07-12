# Salesforce Comprehensive Test Plan

## Application Overview

This plan covers end-to-end functional testing of a Salesforce Developer Edition org (Lightning Experience; the org's URLs are supplied via `SF_LOGIN_URL` / `SF_LIGHTNING_URL` rather than hardcoded). The org runs a "Service" Lightning app by default with standard CRM objects (Accounts, Contacts, Cases, Opportunities), Reports, Dashboards, and Chatter. The App Launcher exposes additional apps: Developer Edition, Digital Experiences, Marketing CRM Classic, Community, Salesforce Chatter, and Content. Tests are grouped into pillars: Authentication, Navigation/App Switching, Global Search, core CRM object CRUD (Accounts/Contacts/Cases/Opportunities), Reports & Dashboards, Chatter, Home page widgets (Tasks/Events/Assistant), and Setup/Admin access. Login requires identity verification via emailed code on first/new-device login, so authenticated tests should reuse a saved storage state where possible rather than re-logging in per test.

## Implementation Status

**Status: implemented (Pillars 1–10 UI + API Layer) — 33 automated UI scenarios (1.1 `login-valid` skips at runtime) plus 18 API-layer tests, all green.** See [test-coverage.md](test-coverage.md) for the full scenario-to-spec mapping.

- **Authentication model:** Authenticated tests obtain their session via the **OAuth 2.0 JWT Bearer flow** (server-to-server) rather than an interactive UI login. A `setup` Playwright project mints a token, exchanges it via `frontdoor.jsp` for a Lightning UI session, and saves `tests/.auth/storageState.json`, which every other test reuses. This sidesteps the emailed device-verification code entirely and is IP-independent (works in CI). See `tests/auth.setup.ts` and `tests/utils/jwt-auth.ts`.
- **Project ordering:** `setup` → `authenticated` (everything except `tests/auth/**`) → `auth` (login/logout scenarios, clean context, runs last so the destructive logout can't invalidate the shared session mid-run).
- **Test data:** Mutating/CRUD tests create their own fixtures via the Salesforce REST API (`tests/utils/sfApi.ts`) and delete them afterward (create-then-delete-own-data); UI create/delete flows are still exercised through the UI. Existing org records are only read, never mutated.
- **Deviations from the plan below:**
  - **1.1 `login-valid`** — implemented but **skips at runtime**: an interactive UI login still triggers the emailed device-verification code, which can't be automated. JWT is the automatable path (used by `setup`).

## Test Scenarios

### 1. Authentication

#### 1.1. should log in with valid credentials and land on Home

**File:** `tests/auth/login-valid.spec.ts`

**Steps:**
  1. Navigate to the Salesforce login page
  2. Enter a valid username and password and click Log In
    - expect: If prompted, complete identity verification via emailed code
    - expect: User lands on the Lightning Home page
    - expect: Global header (Search, Setup, Notifications, App Launcher) is visible

#### 1.2. should show an error for invalid credentials

**File:** `tests/auth/login-invalid.spec.ts`

**Steps:**
  1. Navigate to the Salesforce login page
  2. Enter an invalid username/password combination and click Log In
    - expect: An error message indicating invalid username or password is displayed
    - expect: User remains on the login page

#### 1.3. should navigate to forgot password flow

**File:** `tests/auth/forgot-password.spec.ts`

**Steps:**
  1. Navigate to the Salesforce login page
  2. Click the 'Forgot Your Password?' link
    - expect: User is taken to the password reset request page

#### 1.4. should log out successfully

**File:** `tests/auth/logout.spec.ts`

**Steps:**
  1. Start from an authenticated session on the Home page
  2. Open the user profile menu and click Log Out
    - expect: User is redirected to the login page
    - expect: Session is no longer authenticated (revisiting an authenticated URL redirects to login)

### 2. Navigation and App Switching

#### 2.1. should open App Launcher and list available apps

**File:** `tests/navigation/app-launcher-list.spec.ts`

**Steps:**
  1. From Home, click the App Launcher icon
    - expect: A dialog opens with a search box and an 'Apps' section
    - expect: Apps listed include Developer Edition, Digital Experiences, Service, Marketing CRM Classic, Community, Salesforce Chatter, and Content

#### 2.2. should switch between apps via App Launcher

**File:** `tests/navigation/app-switch.spec.ts`

**Steps:**
  1. Open App Launcher and select 'Developer Edition'
    - expect: The app header updates to 'Developer Edition' and its nav tabs load
  2. Open App Launcher again and select 'Service'
    - expect: The app header updates back to 'Service' with Home/Chatter/Accounts/Contacts/Cases/Reports/Dashboards tabs visible

#### 2.3. should search apps and items from App Launcher

**File:** `tests/navigation/app-launcher-search.spec.ts`

**Steps:**
  1. Open App Launcher and type an app name (e.g. 'Content') into the search box
    - expect: The Apps list filters to matching results

#### 2.4. should navigate primary tabs within the Service app

**File:** `tests/navigation/service-tabs.spec.ts`

**Steps:**
  1. From the Service app, click each of Home, Chatter, Accounts, Contacts, Cases, Reports, Dashboards in the nav bar
    - expect: Each tab loads its corresponding page without error (Home page, Chatter feed, Account list/home, Contact list/home, Case list/home, Report list/home, Dashboard list/home)

### 3. Global Search

#### 3.1. should return results for a known Account name

**File:** `tests/search/global-search-account.spec.ts`

**Steps:**
  1. Click the global Search box and type a known Account name (e.g. from Recent Records)
    - expect: Search suggestions/results include the matching Account record

#### 3.2. should show no results state for a nonsense query

**File:** `tests/search/global-search-empty.spec.ts`

**Steps:**
  1. Click the global Search box and type a random string unlikely to match any record
    - expect: Search results show no matches or an appropriate empty state

### 4. Accounts

#### 4.1. should create a new Account

**File:** `tests/accounts/create-account.spec.ts`

**Steps:**
  1. Navigate to Accounts tab and click New
  2. Fill in required Account fields (e.g. Account Name) and click Save
    - expect: The new Account record page opens showing the entered name
    - expect: Account appears in the Accounts list view

#### 4.2. should edit an existing Account

**File:** `tests/accounts/edit-account.spec.ts`

**Steps:**
  1. Open an existing Account record and click Edit
  2. Change a field (e.g. Phone or Industry) and click Save
    - expect: The updated value is reflected on the Account detail page

#### 4.3. should view Account related lists

**File:** `tests/accounts/view-related-lists.spec.ts`

**Steps:**
  1. Open an existing Account record and scroll to related lists
    - expect: Related Contacts, Opportunities, and Cases lists are visible and show associated records if present

#### 4.4. should delete an Account

**File:** `tests/accounts/delete-account.spec.ts`

**Steps:**
  1. Open an Account created specifically for this test and choose Delete from the actions menu
  2. Confirm the deletion in the dialog
    - expect: The Account no longer appears in the Accounts list view
    - expect: Navigating directly to the deleted record shows a not-found/deleted message

#### 4.5. should search and filter within Accounts list view

**File:** `tests/accounts/list-view-search.spec.ts`

**Steps:**
  1. Navigate to Accounts list view and use the list search/filter to search for a known Account
    - expect: The list view filters down to matching Account(s)

### 5. Contacts

#### 5.1. should create a new Contact linked to an Account

**File:** `tests/contacts/create-contact.spec.ts`

**Steps:**
  1. Navigate to Contacts tab and click New
  2. Fill in required fields (Last Name) and link to an existing Account, then Save
    - expect: New Contact record page opens
    - expect: Contact appears under the linked Account's related Contacts list

#### 5.2. should edit an existing Contact

**File:** `tests/contacts/edit-contact.spec.ts`

**Steps:**
  1. Open an existing Contact and click Edit
  2. Update a field (e.g. Email or Title) and Save
    - expect: Updated value shows on the Contact detail page

#### 5.3. should delete a Contact

**File:** `tests/contacts/delete-contact.spec.ts`

**Steps:**
  1. Open a Contact created specifically for this test and choose Delete
  2. Confirm deletion
    - expect: Contact no longer appears in Contacts list view

### 6. Cases

#### 6.1. should create a new Case

**File:** `tests/cases/create-case.spec.ts`

**Steps:**
  1. Navigate to Cases tab and click New
  2. Fill required fields (e.g. Subject, Status) and Save
    - expect: New Case record page opens with entered Subject
    - expect: Case appears in Cases list view

#### 6.2. should update Case status

**File:** `tests/cases/update-case-status.spec.ts`

**Steps:**
  1. Open an existing Case and change its Status field (e.g. to Closed)
  2. Save the change
    - expect: Case detail page reflects the new status

#### 6.3. should filter Cases list by status

**File:** `tests/cases/filter-cases.spec.ts`

**Steps:**
  1. Navigate to Cases list view and apply/select a filter for a specific status (e.g. 'Closed Cases' view)
    - expect: List view shows only Cases matching that status

### 7. Opportunities

#### 7.1. should create a new Opportunity linked to an Account

**File:** `tests/opportunities/create-opportunity.spec.ts`

**Steps:**
  1. Navigate to an Account and use the related list to create a New Opportunity, or use global New action
  2. Fill required fields (Opportunity Name, Stage, Close Date) and Save
    - expect: New Opportunity record page opens with entered details
    - expect: Opportunity appears in the Account's related Opportunities list

#### 7.2. should progress an Opportunity through stages

**File:** `tests/opportunities/update-stage.spec.ts`

**Steps:**
  1. Open an existing Opportunity and change its Stage field to the next stage
  2. Save the change
    - expect: Opportunity detail page and path indicator reflect the new stage

#### 7.3. should view Key Deals on Home page

**File:** `tests/opportunities/home-key-deals.spec.ts`

**Steps:**
  1. Navigate to Home page and locate the 'Key Deals - Recent Opportunities' widget
    - expect: Widget lists recent Opportunities with name, close date, and amount
    - expect: Clicking an Opportunity link navigates to its detail page

### 8. Reports and Dashboards

#### 8.1. should navigate Reports tab and open a report

**File:** `tests/reports/view-report.spec.ts`

**Steps:**
  1. Navigate to Reports tab
  2. Open an existing report from the list
    - expect: Report runs and displays data/grouping without error

#### 8.2. should navigate Dashboards tab and open a dashboard

**File:** `tests/reports/view-dashboard.spec.ts`

**Steps:**
  1. Navigate to Dashboards tab
  2. Open an existing dashboard from the list
    - expect: Dashboard components render without error
    - expect: Refresh action updates the dashboard

#### 8.3. should refresh the Quarterly Performance chart on Home

**File:** `tests/reports/home-refresh-chart.spec.ts`

**Steps:**
  1. On the Home page, click 'Refresh Chart' on the Quarterly Performance widget
    - expect: Chart reloads and Closed/Open/Goal figures are displayed

### 9. Chatter

#### 9.1. should post an update to Chatter feed

**File:** `tests/chatter/post-update.spec.ts`

**Steps:**
  1. Navigate to the Chatter tab
  2. Compose and post a new text update
    - expect: The new post appears at the top of the Chatter feed

#### 9.2. should comment on a Chatter post

**File:** `tests/chatter/comment-post.spec.ts`

**Steps:**
  1. Open an existing Chatter post and add a comment
    - expect: Comment appears beneath the post

### 10. Home Page Widgets

#### 10.1. should display and dismiss an Assistant recommendation

**File:** `tests/home/assistant-dismiss.spec.ts`

**Steps:**
  1. On Home page, locate an Assistant card (e.g. 'Opportunity is overdue')
  2. Click 'Dismiss recommendation'
    - expect: The card is removed from the Assistant list

#### 10.2. should create a Task from an Assistant recommendation

**File:** `tests/home/assistant-new-task.spec.ts`

**Steps:**
  1. On Home page, locate an Assistant card offering 'New Task' (e.g. '30 days without any activity')
  2. Click 'New Task' and fill in required fields, then Save
    - expect: Task is created and associated with the related Opportunity

#### 10.3. should mark a Task complete from Today's Tasks

**File:** `tests/home/complete-task.spec.ts`

**Steps:**
  1. On Home page, locate Today's Tasks list and check the checkbox next to a task
    - expect: Task is marked complete and reflected in the task list/state

#### 10.4. should view Today's Events and open Calendar

**File:** `tests/home/view-events.spec.ts`

**Steps:**
  1. On Home page, review Today's Events list and click 'View Calendar'
    - expect: Calendar view opens showing scheduled events

## API Layer Tests (REST)

Direct tests of the Salesforce REST API as the system under test — no browser and no
Lightning session. They authenticate with the JWT bearer token directly and run as a
dedicated `api` Playwright project (fast, self-contained smoke layer for the org + auth).

### A1. JWT bearer token exchange

**File:** `tests/api/auth/token-exchange.spec.ts`

**Steps:**
  1. Exchange a signed JWT for a session
    - expect: An `access_token` and `https://` `instance_url` are returned
    - expect: The issued token authorizes a `/sobjects/Account` REST call
    - expect: A malformed assertion at the token endpoint is rejected with an `error`

### A2. CRUD lifecycle per core object (Account, Contact, Case, Opportunity)

**Files:** `tests/api/crud/{account,contact,case,opportunity}.spec.ts`

**Steps:**
  1. `POST` create the record with its required fields
    - expect: `201` with `success: true` and a new id
  2. `GET` retrieve it, `PATCH` update a field, `GET` again
    - expect: Created values persist; `PATCH` returns `204` and the updated value reads back
  3. `DELETE` the record
    - expect: `204`, and a subsequent `GET` returns `404`

### A3. SOQL query

**File:** `tests/api/query/soql.spec.ts`

**Steps:**
  1. Seed a record, then query it back with an exact field filter
    - expect: `totalSize` 1, `done` true, matching id + field
  2. Query a Contact selecting a parent relationship field (`Account.Name`)
    - expect: The parent field resolves to the linked Account's name

### A4. Contact/Account relationship

**File:** `tests/api/relationships/contact-account.spec.ts`

**Steps:**
  1. Create an Account, then a Contact with that `AccountId`
    - expect: The Contact record carries the `AccountId` foreign key
    - expect: The Account's `Contacts` child-relationship subquery returns the Contact

### A5. Validation & error responses

**File:** `tests/api/validation/errors.spec.ts`

**Steps:**
  1. Exercise the API's error contract
    - expect: Create without a required field → `400 REQUIRED_FIELD_MISSING`
    - expect: Create with an unknown field → `400 INVALID_FIELD`
    - expect: `GET` a nonexistent id → `404 NOT_FOUND`
    - expect: Invalid SOQL → `400 MALFORMED_QUERY`
    - expect: Request with no bearer token → `401 INVALID_SESSION_ID`

### A6. Metadata & platform endpoints

**File:** `tests/api/metadata/describe-limits.spec.ts`

**Steps:**
  1. Call the schema/platform endpoints
    - expect: `sobjects/Account/describe` returns the object schema (includes `Name`)
    - expect: `/limits` reports `DailyApiRequests` with a positive `Max`
    - expect: `/services/data/` lists the pinned API version