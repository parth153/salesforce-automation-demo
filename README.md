# Salesforce Automation

[![Test Suite](https://github.com/parth153/salesforce-automation-demo/actions/workflows/test-suite.yml/badge.svg)](https://github.com/parth153/salesforce-automation-demo/actions/workflows/test-suite.yml)
&nbsp;[![Allure Report](https://img.shields.io/badge/Allure-report-9c27b0)](https://parth153.github.io/salesforce-automation-demo/)

End-to-end UI test automation for a Salesforce Developer Edition org using
[Playwright](https://playwright.dev), plus a REST API test layer and Apex unit tests for
the org's server-side code in `force-app`.

📊 **[Live Allure test report](https://parth153.github.io/salesforce-automation-demo/)** — UI, API, and Apex results with trend history, published from CI.

- **33 Playwright E2E scenarios** across 10 functional pillars (Auth, Navigation, Global
  Search, Accounts, Contacts, Cases, Opportunities, Reports & Dashboards, Chatter, Home
  widgets).
- **18 REST API tests** (the `api` project) — CRUD, SOQL, relationships, error contract,
  and metadata, straight against the Salesforce REST API.
- **10 Apex unit tests** across 4 service classes.
- Authentication via the **OAuth 2.0 JWT Bearer flow** — no interactive login, no emailed
  verification code, works headless in CI.

See [specs/test-coverage.md](specs/test-coverage.md) for the full scenario-to-spec map and
[specs/salesforce-comprehensive.plan.md](specs/salesforce-comprehensive.plan.md) for the test plan.

## Prerequisites

- Node.js 20+
- A Salesforce org with a **connected app / external client app** configured for the JWT
  Bearer flow (see [Authentication](#authentication) below)
- [Salesforce CLI](https://developer.salesforce.com/tools/salesforcecli) (`sf`) — only for
  running the Apex tests

## Setup

```bash
npm install
npx playwright install --with-deps chromium
```

Create a `.env` file in the project root:

```dotenv
SF_LOGIN_URL=https://your-domain.my.salesforce.com/
SF_LIGHTNING_URL=https://your-domain.lightning.force.com
SF_USERNAME=you@example.com
SF_PASSWORD=your-password           # only used by the (skipped) login-valid UI test
SF_CLIENT_ID=<connected app consumer key>
SF_JWT_KEY_FILE=.sfdx-keys/server.key
```

`.env` and `.sfdx-keys/` are git-ignored — never commit credentials or the private key.

## Running the tests

### Playwright (E2E)

```bash
npm test               # run the full suite (headless)
npm run test:ui        # interactive UI mode (watch, time-travel debugging)
npm run test:headed    # run with a visible browser
npm run report         # open the HTML report from the last run
npm run typecheck      # tsc type-check (no emit)
```

Run a subset:

```bash
npx playwright test accounts/                 # one pillar
npx playwright test --project=auth            # login/logout scenarios only
npx playwright test navigation/service-tabs   # a single spec
```

> In UI mode, pick the **`authenticated`** project for the CRUD/nav/search tests — it runs
> the `setup` dependency first to obtain the JWT session.

### Apex (unit tests)

Runs the `force-app` Apex tests as a check-only deploy (validates + runs tests, **no changes
committed** to the org):

```bash
sf org login jwt --username "$SF_USERNAME" --jwt-key-file .sfdx-keys/server.key \
  --client-id "$SF_CLIENT_ID" --instance-url "$SF_LOGIN_URL" --set-default

sf project deploy start --dry-run --source-dir force-app --test-level RunLocalTests --wait 20
```

## Authentication

Interactive UI login triggers Salesforce's emailed device-verification code, which can't be
automated. Instead, a Playwright **`setup` project** ([tests/auth.setup.ts](tests/auth.setup.ts)):

1. Signs a JWT and exchanges it for a session via the OAuth JWT Bearer flow
   ([tests/utils/jwt-auth.ts](tests/utils/jwt-auth.ts)).
2. Hands the token to the browser through `frontdoor.jsp` to establish a Lightning UI session.
3. Saves it to `tests/.auth/storageState.json`, which the rest of the suite reuses.

This is server-to-server and IP-independent, so it works unchanged in CI.

**One-time org setup** required for the connected app:
- OAuth scopes must include **`api`** and **`web`** (`web` is needed for `frontdoor.jsp`).
- Permitted Users = *Admin approved users are pre-authorized*, with the login user assigned
  (via a permission set or profile).
- Relax IP restrictions on the app for CI runners.

## Project structure

```
tests/
  auth.setup.ts          # JWT auth → saves storageState (the `setup` project)
  fixtures.ts            # test fixtures (loginPage, homePage)
  pages/                 # Page Object Models
  utils/                 # env, jwt-auth, sfApi (REST helpers)
  auth/ navigation/ search/ accounts/ contacts/ cases/
  opportunities/ reports/ chatter/ home/   # specs by pillar
force-app/               # Apex service classes + @isTest classes
specs/                   # test plan + coverage doc
playwright.config.ts     # 3 projects, sharding-ready, tuned for a shared dev org
.github/workflows/ci.yml # CI: Apex tests + sharded Playwright + retry-failed
```

### Test design notes

- **Page Object Models** in `tests/pages/` with role-based locators.
- **Test data**: mutating/CRUD tests create their own fixtures via the Salesforce REST API
  ([tests/utils/sfApi.ts](tests/utils/sfApi.ts)) and delete them afterward; existing org
  records are only read, never mutated. UI create/delete flows are still exercised through
  the UI.
- **Config** ([playwright.config.ts](playwright.config.ts)): four projects — `api` (headless
  REST, no browser) plus the UI trio with dependency ordering (`setup` → `authenticated` →
  `auth`) — a wide viewport (so Lightning nav tabs don't collapse), and generous timeouts /
  retries tuned for a shared Developer Edition org.

## Continuous integration

[.github/workflows/test-suite.yml](.github/workflows/test-suite.yml) is **manual-only**
(`workflow_dispatch`), since it runs against a live personal org with repo secrets:

- **`apex-tests`** — runs the Apex tests via a check-only deploy (parallel, independent).
- **`api-tests`** — the headless `api` project; the fastest auth/secrets smoke check.
- **`e2e-tests`** — the Playwright UI suite **sharded across 2 runners** (1 worker each).
- **`retry-failed`** — the real E2E gate: re-runs any shard failures on a clean runner, so a
  flake that passes on retry keeps the build green while a genuine failure turns it red.
- **`allure-report`** — collects Allure results from every source (E2E + API + Apex JUnit)
  into one report **with trend history** and publishes it to GitHub Pages.

The report is served from the `gh-pages` branch. One-time setup: **Settings → Pages →
Build and deployment → Deploy from a branch → `gh-pages` / `root`**.

Configure these repository **secrets**: `SF_LOGIN_URL`, `SF_LIGHTNING_URL`, `SF_USERNAME`,
`SF_PASSWORD`, `SF_CLIENT_ID`, and `SF_JWT_KEY` (the PEM contents of the private key —
written to `.sfdx-keys/server.key` at runtime).

## Known limitations

- **`login-valid` (1.1)** is implemented but **skips at runtime** — an interactive UI login
  requires the emailed verification code. JWT is the automatable auth path.
- **Setup & Admin (Pillar 11)** is intentionally out of scope.
- The suite runs against a **shared dev org**; under heavy parallel load, list-view/deletion
  timing-sensitive tests may occasionally need a retry (handled by config retries and the
  `retry-failed` CI job).
