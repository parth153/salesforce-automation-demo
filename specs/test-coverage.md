# Test Coverage

End-to-end Playwright coverage for the Salesforce Developer Edition org, implementing
[salesforce-comprehensive.plan.md](salesforce-comprehensive.plan.md).

- **Scenarios automated:** 33 UI (Pillars 1–10; `login-valid` (1.1) is automated but skips at runtime) + 18 API-layer tests
- **Last full run:** UI 33 passed, 1 skipped (`login-valid`), 0 failed (occasional retry-caught flake under full parallel load); API 18 passed in ~11s
- **Out of scope:** Pillar 11 (Setup & Admin) — excluded by request ("no Setup mode")

## Summary

| Pillar | Scenarios | Automated | Status |
|--------|-----------|-----------|--------|
| 1. Authentication | 4 | 4 | ✅ (1.1 skips at runtime — see notes) |
| 2. Navigation & App Switching | 4 | 4 | ✅ |
| 3. Global Search | 2 | 2 | ✅ |
| 4. Accounts | 5 | 5 | ✅ |
| 5. Contacts | 3 | 3 | ✅ |
| 6. Cases | 3 | 3 | ✅ |
| 7. Opportunities | 3 | 3 | ✅ |
| 8. Reports & Dashboards | 3 | 3 | ✅ |
| 9. Chatter | 2 | 2 | ✅ |
| 10. Home Page Widgets | 4 | 4 | ✅ |
| 11. Setup & Admin | 2 | 0 | ⏭️ Out of scope |
| API Layer (REST) | 18 | 18 | ✅ (dedicated `api` project — no browser) |
| **Total** | **53** | **50** | |

## Coverage detail

Legend — **Verify** column: `UI` = assertion against rendered UI; `API` = authoritative check via Salesforce REST; `URL` = navigation assertion.

### 1. Authentication (`auth` project — unauthenticated context)

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 1.1 | Log in with valid credentials → Home | [login-valid.spec.ts](../tests/auth/login-valid.spec.ts) | UI | **Skips** if the emailed verification prompt appears (can't be automated). JWT is the real auth path used by `setup`. |
| 1.2 | Error for invalid credentials | [login-invalid.spec.ts](../tests/auth/login-invalid.spec.ts) | UI | Asserts error text + login form persists. |
| 1.3 | Forgot-password flow | [forgot-password.spec.ts](../tests/auth/forgot-password.spec.ts) | URL + UI | Navigates to the reset page. |
| 1.4 | Log out | [logout.spec.ts](../tests/auth/logout.spec.ts) | UI | Opts into saved state, logs out, confirms authed URL redirects to login. |

### 2. Navigation & App Switching

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 2.1 | Open App Launcher, list apps | [app-launcher-list.spec.ts](../tests/navigation/app-launcher-list.spec.ts) | UI | Asserts all 7 expected apps. |
| 2.2 | Switch apps via App Launcher | [app-switch.spec.ts](../tests/navigation/app-switch.spec.ts) | UI | Developer Edition ↔ Service; verifies app name + tabs. |
| 2.3 | Search apps in App Launcher | [app-launcher-search.spec.ts](../tests/navigation/app-launcher-search.spec.ts) | UI | Filters the Apps list. |
| 2.4 | Navigate Service primary tabs | [service-tabs.spec.ts](../tests/navigation/service-tabs.spec.ts) | URL | All 7 tabs load their pages. |

### 3. Global Search

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 3.1 | Results for a known Account | [global-search-account.spec.ts](../tests/search/global-search-account.spec.ts) | UI | Data-driven: reads a real Account name from the list, then asserts its record suggestion. |
| 3.2 | Empty state for nonsense query | [global-search-empty.spec.ts](../tests/search/global-search-empty.spec.ts) | UI | Asserts the "no matches" state. |

### 4. Accounts

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 4.1 | Create an Account | [create-account.spec.ts](../tests/accounts/create-account.spec.ts) | UI + API cleanup | UI create; verifies record page + list; deletes via API. |
| 4.2 | Edit an Account | [edit-account.spec.ts](../tests/accounts/edit-account.spec.ts) | UI | API-seeded; UI edits Phone + Industry. |
| 4.3 | View related lists | [view-related-lists.spec.ts](../tests/accounts/view-related-lists.spec.ts) | UI | Contacts / Opportunities / Cases lists visible (read-only). |
| 4.4 | Delete an Account | [delete-account.spec.ts](../tests/accounts/delete-account.spec.ts) | UI | API-seeded; UI delete; verifies deleted-record message + list absence. |
| 4.5 | Search/filter list view | [list-view-search.spec.ts](../tests/accounts/list-view-search.spec.ts) | UI | Filters list to matching rows. |

### 5. Contacts

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 5.1 | Create Contact linked to Account | [create-contact.spec.ts](../tests/contacts/create-contact.spec.ts) | UI + API cleanup | Account lookup; verifies under Account's related Contacts. |
| 5.2 | Edit a Contact | [edit-contact.spec.ts](../tests/contacts/edit-contact.spec.ts) | UI | API-seeded; UI edits Email + Title. |
| 5.3 | Delete a Contact | [delete-contact.spec.ts](../tests/contacts/delete-contact.spec.ts) | UI | API-seeded; UI delete; verifies gone. |

### 6. Cases

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 6.1 | Create a Case | [create-case.spec.ts](../tests/cases/create-case.spec.ts) | UI + API cleanup | Subject + required Case Origin. |
| 6.2 | Update Case status | [update-case-status.spec.ts](../tests/cases/update-case-status.spec.ts) | UI | Advances status to Working (edit picklist has no Closed). |
| 6.3 | Filter Cases by status | [filter-cases.spec.ts](../tests/cases/filter-cases.spec.ts) | UI | Seeds a Closed case; present in "All Closed Cases", absent from "All Open Cases". |

### 7. Opportunities

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 7.1 | Create Opportunity linked to Account | [create-opportunity.spec.ts](../tests/opportunities/create-opportunity.spec.ts) | UI + API cleanup | Name/Stage/Close Date + Account link; verifies related list. |
| 7.2 | Progress through stages | [update-stage.spec.ts](../tests/opportunities/update-stage.spec.ts) | UI | Advances stage; asserts the Path shows the new selected stage. |
| 7.3 | Key Deals on Home | [home-key-deals.spec.ts](../tests/opportunities/home-key-deals.spec.ts) | UI | Widget lists opps (name/date/amount); click navigates to detail. |

### 8. Reports & Dashboards

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 8.1 | Open a report | [view-report.spec.ts](../tests/reports/view-report.spec.ts) | UI (iframe) | Report runs + shows data (Report Viewer iframe). |
| 8.2 | Open a dashboard + refresh | [view-dashboard.spec.ts](../tests/reports/view-dashboard.spec.ts) | UI (iframe) | Components render; Refresh re-renders. |
| 8.3 | Refresh Home Quarterly chart | [home-refresh-chart.spec.ts](../tests/reports/home-refresh-chart.spec.ts) | UI | Closed/Open/Goal figures shown after refresh. |

### 9. Chatter (serial, feed-cleaned)

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 9.1 | Post an update | [chatter.spec.ts](../tests/chatter/chatter.spec.ts) | UI | New post appears at top of feed. |
| 9.2 | Comment on a post | [chatter.spec.ts](../tests/chatter/chatter.spec.ts) | API + UI | Seeds a post; comment persisted (FeedComment) + shown in feed. |

### 10. Home Page Widgets

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| 10.1 | Dismiss an Assistant recommendation | [assistant-dismiss.spec.ts](../tests/home/assistant-dismiss.spec.ts) | UI | Card removed from the list. |
| 10.2 | New Task from Assistant | [assistant-new-task.spec.ts](../tests/home/assistant-new-task.spec.ts) | API cleanup | Task created + associated with the card's Opportunity (WhatId). |
| 10.3 | Complete a task from Today's Tasks | [complete-task.spec.ts](../tests/home/complete-task.spec.ts) | API | Seeds a task due today; check off → Status=Completed. |
| 10.4 | View Today's Events → Calendar | [view-events.spec.ts](../tests/home/view-events.spec.ts) | URL + UI | View Calendar opens the Calendar view. |

### 11. Setup & Admin — ⏭️ Out of scope

| ID | Scenario | Status |
|----|----------|--------|
| 11.1 | Open Setup from global header | Not implemented (no Setup mode). |
| 11.2 | Find an object via Object Manager | Not implemented (no Setup mode). |

### API Layer (REST) — `api` project (no browser, no Lightning session)

Direct tests of the Salesforce REST API as the system under test. They authenticate with
the JWT bearer token directly (no `frontdoor.jsp`, no `storageState`) and run as a
standalone project — a fast smoke layer for org + auth. Each test seeds and tears down its
own records via `tests/api-fixtures.ts` (`track()`, LIFO cleanup). Run alone with
`npx playwright test --project=api`.

| ID | Scenario | Spec | Verify | Notes |
|----|----------|------|--------|-------|
| A1 | JWT bearer token exchange | [token-exchange.spec.ts](../tests/api/auth/token-exchange.spec.ts) | API | Token minted + authorizes REST; malformed assertion rejected. |
| A2a | Account CRUD lifecycle | [crud/account.spec.ts](../tests/api/crud/account.spec.ts) | API | create→get→patch→delete, asserting 201/204/404. |
| A2b | Contact CRUD lifecycle | [crud/contact.spec.ts](../tests/api/crud/contact.spec.ts) | API | Same lifecycle; LastName required. |
| A2c | Case CRUD lifecycle | [crud/case.spec.ts](../tests/api/crud/case.spec.ts) | API | Status defaults to New → updated to Working. |
| A2d | Opportunity CRUD lifecycle | [crud/opportunity.spec.ts](../tests/api/crud/opportunity.spec.ts) | API | Name/StageName/CloseDate/Amount; stage advanced. |
| A3 | SOQL query | [query/soql.spec.ts](../tests/api/query/soql.spec.ts) | API | Exact-filter match + parent-relationship traversal. |
| A4 | Contact/Account relationship | [relationships/contact-account.spec.ts](../tests/api/relationships/contact-account.spec.ts) | API | FK on Contact + child-relationship subquery on Account. |
| A5 | Validation & error contract | [validation/errors.spec.ts](../tests/api/validation/errors.spec.ts) | API | 400 `REQUIRED_FIELD_MISSING`/`INVALID_FIELD`/`MALFORMED_QUERY`, 404 `NOT_FOUND`, 401 `INVALID_SESSION_ID`. |
| A6 | Metadata & platform endpoints | [metadata/describe-limits.spec.ts](../tests/api/metadata/describe-limits.spec.ts) | API | sobject describe, `/limits`, version list. |

## Test infrastructure

| Area | Location | Purpose |
|------|----------|---------|
| Auth setup | `tests/auth.setup.ts`, `tests/utils/jwt-auth.ts` | JWT Bearer → `frontdoor.jsp` → saved `storageState` |
| UI seed/cleanup helpers | `tests/utils/sfApi.ts` | REST `createRecord` / `deleteRecord` / `queryRecords` / `getCurrentUserId` (used by UI specs) |
| API-test fixtures | `tests/api-fixtures.ts` | `api` (authed `APIRequestContext`) / `session` (JWT) / `track()` cleanup; `dataPath()` + `API_VERSION` |
| Env | `tests/utils/env.ts` | Loads `.env`; typed required vars |
| Fixtures | `tests/fixtures.ts` | `loginPage` / `homePage` fixtures |
| Page objects | `tests/pages/*.ts` | LoginPage, GlobalHeader, AppLauncher, NavBar, GlobalSearch, HomePage, ObjectListPage, RecordFormModal, RecordPage, ChatterPage |
| Config | `playwright.config.ts` | 4 projects (`api`, `setup`, `authenticated`, `auth`), wide viewport, tuned timeouts/retries |
| CI | `.github/workflows/ci.yml` | Three test jobs: **Apex tests**, **API tests** (`api` project, no browser), and **Playwright E2E** (UI, sharded); secrets-driven, JWT key written at runtime |

### Apex tests (`force-app`)

The CI **Apex tests** job authenticates the Salesforce CLI via the same JWT credentials and runs the Apex unit tests as a **check-only deploy** (`sf project deploy start --dry-run --source-dir force-app --test-level RunLocalTests`) — this validates the source compiles against the org and runs all local tests **without committing changes**. Currently **10 Apex tests across 4 test classes** (`AccountServiceTest`, `ContactServiceTest`, `CaseServiceTest`, `OpportunityServiceTest`), all passing.

## Known reliability notes

- **Shared dev-org load:** the suite runs at modest concurrency (3 workers local / 2 CI) with `retries` (1 local / 2 CI). Under full-parallel load, list-view search-index lag and delete-modal timing can occasionally require a retry; these paths use `expect(...).toPass()` reload-polls to minimize flakiness.
- **`login-valid` (1.1)** is expected to report as *skipped*, not passed.
