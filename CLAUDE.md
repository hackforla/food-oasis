# CLAUDE.md — Food Oasis Development Rules

This file is the project-wide reference for AI agents (and humans) working in this
repository. It reflects what actually exists in the codebase as of this writing, not
aspirational conventions. Where the codebase is inconsistent, that is called out
explicitly rather than papered over.

Two companion files define the two-agent workflow that should be used for
non-trivial changes:

- [.claude/agents/implementer.md](.claude/agents/implementer.md)
- [.claude/agents/reviewer.md](.claude/agents/reviewer.md)
- [docs/agent-workflow.md](docs/agent-workflow.md) — how the two agents hand off to each other
- [docs/review-checklist.md](docs/review-checklist.md) — the reviewer's checklist

## 1. What this project is

Food Oasis is a directory of food pantries and meal programs, serving multiple
regions (**multi-tenant**, one deployment, tenant-scoped data) via one codebase:
LA County, Hawaiian Islands, Santa Barbara County, and McKinney TX
(`la.foodoasis.net`, `hi.foodoasis.net`, `sb.foodoasis.net`, `mck.foodoasis.net`).
It is a Hack for LA open-source civic tech project (GPL-2.0).

It is a **monorepo** with two npm workspaces coordinated by **Lerna**:

- `client/` — React SPA (public food-seeker search + admin/data-entry back office)
- `server/` — Express REST API (`/api/*`)

There is no shared package between them; they communicate purely over HTTP/JSON.

## 2. Architecture

### Server (`server/`)

Layered, one Express `Router` per resource:

```
routes/*.ts        → validates auth/role, wires middleware, calls controller
controllers/*.ts    → thin: parses req, calls service, shapes res
services/*.ts        → business logic + SQL queries live here
```

- Entry point: [server/server.ts](server/server.ts). All routers are mounted in
  [server/app/routes/index.ts](server/app/routes/index.ts) under `/api/<resource>`.
- Database access is **pg-promise**, via the singleton exported from
  [server/app/services/db.ts](server/app/services/db.ts). Every service imports
  `db` from there and writes raw SQL using named parameters: `db.one(sql, { id })`,
  `` `where id = $<id>` ``. This is the standard, correct pattern — reuse it.
  - `server/app/services/postgres-pool.ts` (a plain `pg.Pool`) and the `massive`
    npm dependency are **dead code** — not imported anywhere. Do not build new
    features on them; don't be surprised they exist.
- Request body validation is done selectively with **ajv** JSON Schemas
  (`app/validation-schema/*.ts`) run through
  [server/middleware/request-validation-middlewares.ts](server/middleware/request-validation-middlewares.ts).
  It is only wired up on some POST/PUT routes (see §7, "Areas of technical debt").
- DB schema changes go through **node-pg-migrate** migrations in
  `server/migrations/` (54+ timestamped files). Never hand-edit the schema outside
  a migration.
- camelCase ⇄ snake_case: Postgres columns are `snake_case`; service layer converts
  rows to camelCase with `camelcase-keys` before returning them. Keep this
  boundary — camelCase in TS/JSON, snake_case in SQL.

### Client (`client/`)

- React 18 + TypeScript, built with **Vite** (migrated off Create React App —
  see §7 for the leftover CRA artifacts this left behind).
- Routing: `react-router-dom` v7, all routes declared in
  [client/src/Routes.tsx](client/src/Routes.tsx). Admin/back-office routes are
  gated with [PrivateRoute.tsx](client/src/components/PrivateRoute.tsx), which
  checks role flags on the user object from `userContext`.
- State management: no Redux/Zustand/React Query. Global/cross-cutting state
  (current user, site/tenant config, toaster notifications) lives in three React
  Context providers under `client/src/contexts/`. Resource-specific data fetching
  is done with one custom hook per resource in `client/src/hooks/` (e.g.
  `useOrganizations`, `useCategories`), each wrapping a matching module in
  `client/src/services/` that calls the API with `axios`. Follow this
  hook-wraps-service pattern for new resources rather than fetching ad hoc from
  components.
- UI kit: MUI v5 (`@mui/material`, `@mui/x-data-grid`, `@mui/x-date-pickers`).
  Theme lives in `client/src/theme/`. Forms use `formik` + `yup` (~17 files use
  Formik; this is the established form pattern for anything more than a trivial
  input).
- Multi-tenant/region behavior on the client is driven by `siteContext`
  (tenant id, name, map bounds, branding) — check there before hardcoding
  region-specific text, styling, or category lists.
- `client/src` is fully TypeScript (`.ts`/`.tsx`); no `.js`/`.jsx` remain except
  two legacy Jest test files (see §7). Do not introduce new `.js`/`.jsx` files.

### Auth model

- Login: `passport-local` validates email/password against `login`/`login_tenant`
  tables (bcrypt hash) — [server/middleware/authenticate.ts](server/middleware/authenticate.ts).
- Session: **stateless JWT**, not server sessions. On login, the server signs a JWT
  (`server/middleware/jwt-session.ts`) whose `sub` claim encodes the user's roles
  as a string (e.g. `"admin"` or a role list) and returns it as both a `jwt` cookie
  and a JSON field, so non-cookie clients work too.
- Authorization: routes call
  `jwtSession.validateUserHasRequiredRoles(["admin", "coordinator", ...])` and the
  middleware regex-tests the JWT `sub` against the permitted role list. Known
  JWT roles (`Role` type in `server/types/account-types.ts`): `admin`,
  `security_admin`, `data_entry`, `coordinator`, `global_admin`.
  `global_reporting` is not one of them — it only exists as an `is_global_reporting`
  boolean column on the account, not a role encoded on the JWT `sub`.
- Every admin-facing mutating route is expected to carry a role check — that
  pattern should hold without exception. Don't assume a sibling route's
  presence or absence of a role check is precedent; verify it against what the
  route actually needs (see §8).
- `stakeholderbests` routes (`/api/stakeholderbests/*`) are intentionally public —
  they power the unauthenticated food-seeker search — so no JWT check is expected
  there. Be extra careful with anything unvalidated on that path (see §8).
- On the client, the JWT is decoded client-side (`atob` on the payload) purely to
  populate role flags for UI gating — the client never trusts this for anything
  security-sensitive; the server re-validates on every request.

## 3. Commands (ground-truthed, not aspirational)

Run workspace commands from inside `client/` or `server/`, not the repo root,
unless noted. The root `package.json` only exposes `typecheck` (via
`lerna run typecheck`, which fans out to both workspaces) and `release-notes`.

| Task | Client | Server |
|---|---|---|
| Install | `npm ci` (from `client/`) | `npm ci` (from `server/`) |
| Dev server | `npm start` (Vite, port 3000, proxies `/api` to `:5001`) | `npm start` (`ts-node-dev`, port 5001, watches & respawns) |
| Build | `npm run build` (`tsc && vite build`) | `npm run build` (`tsc`, output to `server/build`) |
| Typecheck | `npm run typecheck` (`tsc --noEmit`) — **passes clean today** | `npm run typecheck` (`tsc --noEmit`) — **passes clean today** |
| Lint | `npm run lint` — **currently broken**, see §7 | `npm run lint` (flat ESLint config) — **passes clean today** |
| Unit tests | `npm run test:unit` (`jest --ci`, rooted at `src/`) — **passes clean today** (2 suites; Playwright in `tests/` is the main client suite) | `npx jest --ci` (do **not** use `npm test`, it's `jest --watch`) — **passes clean today** (14 suites) |
| E2E tests | `npx playwright test` (needs `npm start` running on `:3000` first; this is what CI actually runs) | — |

Before telling the user "tests pass" or "lint is clean," actually run the command
above and read the output — do not assume the `npm run <script>` name implies a
working, CI-meaningful check (see §7 for exactly where that assumption breaks).
Run `npm ci` in the relevant workspace first if you haven't already in this
session — don't assume a clean typecheck/test baseline without confirming the
lockfile is actually installed.

## 4. Environment / running locally

- Postgres is required. `docker-compose.yml` spins up Postgres 11 plus the API in
  Docker; alternatively point `server/.env` (`POSTGRES_*` or `DATABASE_URL`) at a
  local/dev instance. `server/db/demo-db/foodoasis.sql` is a seedable demo dataset.
- `server/db/config.js` and `server/app/services/db.ts` both read the same
  `POSTGRES_*`/`DATABASE_URL` env vars — keep them in sync if you ever touch
  connection config.
- Migrations: `npm run migrate` in `server/` (node-pg-migrate).

## 5. CI/CD (what's actually enforced)

- [.github/workflows/playwright.yml](.github/workflows/playwright.yml) is the
  **only** test workflow: runs client Playwright E2E tests against a locally
  started Vite dev server, on push/PR to `main`/`master`/`develop`.
- There is **no CI step** that runs server Jest tests, client Jest tests, either
  workspace's lint, or `tsc --noEmit`. Root `package.json` declares a Husky
  `pre-commit` hook (`lerna run lint`) via the legacy `"husky": { "hooks": {...} }`
  config key, but the installed `husky` version is `^9`, which ignores that key
  entirely and only runs hooks from a `.husky/` directory — there is no
  `.husky/` directory and no `prepare` script to create one. So this hook is
  **not active for anyone** right now, not just for contributors without Husky
  installed; don't rely on it as a gate.
- Deploys: pushes to `main`/`develop`/`vite` branches auto-deploy to matching
  Heroku apps (`foodoasis`, `foodoasisdev`, `foodoasisvite`) via
  `akhileshns/heroku-deploy`. Two Docker Hub publish workflows exist but are
  explicitly commented "not currently used, as the web app is running on Heroku."
  An `awsBastion.yml` workflow scales an AWS bastion ASG up/down manually.
- Dependabot is active and merged frequently (see recent commit history) —
  routine dependency bumps are the norm, not something to second-guess.

Because CI doesn't enforce lint/typecheck/unit-tests, **the implementer agent is
the actual quality gate** for those checks on every change — see
[.claude/agents/implementer.md](.claude/agents/implementer.md).

## 6. Coding conventions actually in use

- **TypeScript everywhere**, `strict: true` in both `tsconfig.json`s. Both
  workspaces currently typecheck clean — keep it that way; don't introduce `any`
  to silence an error (server ESLint has `@typescript-eslint/no-explicit-any`
  turned **off**, so the linter won't stop you, but it's still against the grain
  of a strict-mode codebase).
- **Formatting**: Prettier in both workspaces (`npm run format`), enforced via
  ESLint's `prettier/recommended` in `server`. Don't hand-format against it.
- **SQL**: always parameterized (`db.one(sql, { param })` / `` $<param> `` syntax),
  *except* in a handful of query-builder helper functions inside
  `stakeholder-service.ts` and `stakeholder-best-service.ts` that string-interpolate
  filter values directly into SQL — that is legacy, not a pattern to extend (§8).
  When touching search/filter SQL, prefer converting the specific clause you touch
  to a bound parameter over adding another interpolated one.
- **Naming**: camelCase in TS (client and server), snake_case in SQL/DB — convert
  at the service boundary with `camelcase-keys`, not ad hoc.
- **React components**: function components + hooks only; no class components in
  current code. One resource = one hook (`useX`) + one service module
  (`x-service.ts`) on the client, one service module (`x-service.ts`) + one
  controller + one router on the server. New resources should follow this
  four/five-file shape.
- **Branching**: `<github-issue-number>-<short-kebab-description>` (e.g.
  `2695-add-pending-suggestion-to-top-of-org-edit`). PRs target `develop`.

## 7. Known inconsistencies (documented, not silently "fixed")

These are real, current states of the repo, verified by running the actual
commands — not guesses:

- **Client lint is broken.** `client/package.json`'s `lint` script runs
  `eslint -c .eslintrc.json ...`, and `.eslintrc.json` extends `"react-app"` (the
  Create React App / `eslint-config-react-app` preset). But the client no longer
  uses CRA — it's Vite — and `eslint` itself isn't installed as a dependency
  anywhere in the client (or the root). Running the lint script fails outright
  with `sh: eslint: command not found` — it never gets far enough to fail on
  the missing `react-app` config. This is leftover from the CRA→Vite migration.
  Until this is fixed, don't treat "client lint passed" as a meaningful signal
  — it can't currently run at all. Recommended: replace with a
  flat ESLint config for TS/React (mirroring server's approach) as a follow-up.
- **Client Jest is small and easy to misrun.** Only two Jest files exist
  (`client/src/__test__/App.test.js` and `Helpers.test.js`); run them with
  `npm run test:unit`, not `npm test` — `client/package.json`'s `test` script
  launches Playwright (`playwright test --ui --headed`). `jest.config.cjs`
  transforms everything through `babel-jest` (the `ts-jest` preset is
  overridden), so TypeScript syntax only parses because
  `@babel/preset-typescript` is in `babel.config.json` — keep it there, and
  keep it on the 7.x line to match `@babel/core`. Jest `roots` is pinned to
  `src/` so it never picks up the Playwright specs in `client/tests/`, which
  fail under Jest. **Playwright is still the client's main test suite** (7 spec
  files in `client/tests/`, and it's what CI runs).
- **Server Jest snapshot format is pinned.** `server/jest.config.ts` sets
  `snapshotFormat: { printBasicPrototype: false }` so inline snapshots in
  `server/__test__/account.test.ts` read as `{ ... }` rather than
  `Object { ... }` (the Jest 29 default, on an installed Jest 28). If a Jest
  upgrade or config change flips that setting, `account.test.ts` will go red on
  format alone — fix the config, don't rewrite the snapshots.
- **`server/test/test_neighborhood_service.ts`** exists (hits a real DB via
  `mocha`-style bare `it()` blocks — `mocha` is a server devDependency) but is
  **not picked up by Jest** (wrong location/naming for Jest's default test glob)
  and there is no `mocha` script to run it either. It appears to be orphaned —
  treat it as reference/dead code, not a test that runs anywhere, until proven
  otherwise.
- **Two competing DB access modules**: `server/app/services/db.ts` (pg-promise —
  used by every real service) and `server/app/services/postgres-pool.ts` (plain
  `pg.Pool` — imported nowhere). Same for the `massive` npm package (a dependency,
  unused). Use `db.ts`.
- **Request-body validation is inconsistent**: some POST/PUT routes run an ajv
  schema via `requestValidationMiddleware` (e.g. `stakeholder-router.ts`), others
  don't validate the body shape at all before it reaches the service. When adding
  a new mutating route, prefer adding a schema and wiring the middleware, matching
  the routes that already do it, rather than skipping it because some siblings do.

## 8. Security discipline — read before touching auth, SQL, or secrets

This is a public open-source repository, so this section deliberately states
**rules to follow**, not an inventory of specific current weaknesses — don't
turn it (or a commit message, PR description, issue, or code comment) into a
writeup of exactly how a particular endpoint or query is currently exploitable.
If you find something concrete while working, stop and raise it with the user
directly instead of documenting it in anything that gets committed; let the
user decide how and where to track it (e.g. a private security advisory).

- **Every mutating route (`POST`/`PUT`/`DELETE`) must carry an explicit
  role/auth check** appropriate to its sensitivity, matching sibling routes for
  the same resource. Never remove, comment out, or weaken an existing check as
  a side effect of an unrelated change. If you notice a route that appears to
  be missing one, don't treat it as precedent to copy and don't "fix" it
  silently — flag it to the user so it gets its own deliberate, reviewed fix.
- **All SQL must be parameterized** (`db.one(sql, { param })` / `` $<param> ``
  syntax) — never string-interpolate a value into a SQL string. The
  query-builder helpers in
  [server/app/services/stakeholder-service.ts](server/app/services/stakeholder-service.ts)
  and [server/app/services/stakeholder-best-service.ts](server/app/services/stakeholder-best-service.ts)
  predate this rule and still build filter clauses via string interpolation —
  that's legacy debt, not a pattern to copy or extend. When you touch any of
  those helpers, convert the specific parameter you're touching to a bound
  parameter rather than adding another interpolated one, and treat any diff in
  this area as high-scrutiny regardless of how small it looks (see
  [docs/review-checklist.md](docs/review-checklist.md)).
- **Secrets must come from environment variables in every deployed
  environment.** Don't rely on a hardcoded fallback value for anything
  security-relevant (e.g. a signing secret) reaching a non-local environment.
  If you find a hardcoded fallback for a secret in
  [server/middleware/jwt-session.ts](server/middleware/jwt-session.ts) or
  elsewhere, don't repeat the literal value in commits, comments, or docs —
  and don't "fix" it unprompted; flag it to the user, since hardening it can
  have deployment implications they need to confirm.
- **File upload / import**: `import-controller.ts` accepts CSV uploads (via
  `multer`) that get parsed and bulk-inserted — validate any changes here for
  size/type limits and injection via CSV content.
- **Multi-tenant data isolation**: nearly every table and query is scoped by
  `tenant_id`. Any new query must filter by tenant (or explicitly justify why not,
  e.g. truly global lookups like categories). A missing `tenant_id` filter is a
  cross-tenant data leak, not just a bug.
- Secrets (`server/.env`) are git-ignored; never commit real credentials, and
  never print `.env` contents into logs, PR descriptions, or commit messages.

## 9. Documentation that already exists

- [README.md](README.md) — project overview, regions, contribution entry point.
- [CONTRIBUTING.md](CONTRIBUTING.md) — points to the GitHub wiki for onboarding
  and the actual "Contributing Code" process; wiki is the source of truth for
  human contributor process, not this repo.
- `doc/` — deployment/Docker/dev-environment notes (`development-environments.md`,
  `developing-in-docker.md`, `deploy-docker-container-to-heroku.md`).
- `embed/README.md` — the embeddable widget subproject.
- `thunder-tests/` — a Thunder Client (VS Code REST client) collection for
  manually exercising the API; useful as a live example of real request shapes.

## 10. What NOT to do

- Don't add new features on `postgres-pool.ts` or `massive` — use `db.ts`.
- Don't add new string-interpolated SQL — use `$<param>` bound parameters, even
  inside the existing query-builder helpers if you're touching them anyway.
- Don't assume `npm run lint` (client) or `npm test` (either workspace) do what
  their names imply — see §7 and always verify by running them.
- Don't silently "fix" an inconsistency documented in §7 as a drive-by inside an
  unrelated change — flag it and let the human decide whether it's in scope.
- Don't introduce new global state managers (Redux, Zustand, etc.) or new data
  fetching libraries (React Query, SWR) — the Context + custom-hook pattern is
  the established convention; raise it with the user first if you think it's
  insufficient for a specific feature.
