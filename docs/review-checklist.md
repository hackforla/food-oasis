# Review Checklist — Food Oasis

Used by the reviewer agent ([.claude/agents/reviewer.md](../.claude/agents/reviewer.md))
for every review pass. Grounded in this repo's actual architecture, described in
[CLAUDE.md](../CLAUDE.md) — check off what applies to the diff; not every item
applies to every change (e.g. a client-only CSS tweak skips the SQL section).

## 1. Requirement satisfaction

- [ ] The change actually does what was requested — re-derive this from the
      diff and the stated requirement, don't take the implementer's word for it.
- [ ] No silent scope reduction (a hard part of the request quietly dropped)
      or scope creep (unrelated changes bundled in) without it being called out.
- [ ] Edge cases implied by the request are handled (empty results, no
      matching tenant, missing optional fields), not just the happy path.

## 2. Correctness

- [ ] Logic does what the code appears to intend — trace at least one
      non-trivial branch by hand.
- [ ] Async code handles rejections (server: try/catch or `.catch` at the
      controller boundary, matching the pattern in sibling controllers; client:
      hooks set an error state on the `catch` path, matching `useOrganizations`'s
      shape).
- [ ] Off-by-ones, null/undefined handling (`user === undefined` vs `null` is
      meaningful in `userContext` — "not yet loaded" vs "not logged in"; don't
      collapse that distinction accidentally).
- [ ] `camelcase-keys` is applied at the service return boundary for any new
      query that returns DB rows to a controller — not applied ad hoc later, not
      skipped.

## 3. Architecture & convention fit (CLAUDE.md §2, §6)

- [ ] Server: new logic lives in the right layer (route = auth/wiring only,
      controller = thin request/response shaping, service = business logic +
      SQL). A route or controller with real business logic in it is a finding.
- [ ] Client: new data fetching follows hook-wraps-service, not fetching
      directly inside a component.
- [ ] New resource, if any, has the conventional file set (router + controller
      + service [+ validation schema] on the server; hook + service on the
      client) rather than being bolted onto an unrelated existing file.
- [ ] No new state-management library, data-fetching library, or SQL access
      pattern introduced without explicit justification — Context+hooks and
      pg-promise are the established choices (CLAUDE.md §2).
- [ ] Existing abstractions reused where they fit (existing hook extended
      rather than duplicated; existing validation schema extended rather than
      a parallel one created).
- [ ] TypeScript types reused from `server/types/` / `client/src/types/`
      rather than redeclared inline.

## 4. Database & migrations

- [ ] Any schema change is a `node-pg-migrate` migration in `server/migrations/`,
      not a hand-written one-off — and has a sensible, reversible `down`.
- [ ] Every new/changed query is scoped by `tenant_id` where the table has one,
      or there's an explicit, correct reason it shouldn't be (e.g. genuinely
      global reference data).
- [ ] SQL naming stays snake_case; JS/TS stays camelCase; conversion happens
      once, at the boundary.

## 5. Security (CLAUDE.md §8 — apply carefully, even to small diffs)

This repo is public. Findings in this section go in the review's severity list
like any other — file, line, failure scenario — but never spell out a
currently-exploitable specific in a way that would be more useful to an
attacker than to the person fixing it (e.g. don't write "this lets an
unauthenticated caller do X against production"; write "this route is missing
the role check its siblings have" and let the recommendation carry the fix).
If a finding looks like a live, concrete vulnerability rather than a
convention violation, raise it with the user directly instead of writing the
exploit reasoning into the review output.

- [ ] **All new/changed SQL uses parameterized queries** (`db.one(sql, { x })`
      / `` $<x> ``). Any new string interpolation into a SQL string is a
      **Blocker**, full stop — including inside `stakeholder-service.ts` /
      `stakeholder-best-service.ts`'s existing query-builder helpers, which
      already have this problem and should not gain more of it.
- [ ] Any new or changed route has the auth/role check appropriate to its
      sensitivity, matching what sibling routes for the same resource use.
      A mutating route (`POST`/`PUT`/`DELETE`) with no role check is a
      **Blocker** unless it's deliberately public and that's justified (rare —
      `stakeholderbests` search-style routes are the only current example).
- [ ] If the diff touches a route whose auth/role check looks weaker than its
      siblings (missing, commented out, or overly permissive), that's a
      **Blocker** — flag it in the review by pattern ("missing the role check
      its siblings have"), don't fix it unprompted unless that's the actual
      task, and don't narrate why/how it's exploitable in the written review.
- [ ] No secrets, credentials, or `.env` contents introduced into source,
      comments, logs, or commit messages.
- [ ] File upload handling (if touched) still constrains size/type; CSV import
      logic doesn't trust file content beyond what it did before.
- [ ] No hardcoded fallback value for a secret (e.g. `JWT_SECRET`) is reachable
      in a way that could apply outside local dev — deployed environments must
      set the real env var. Don't repeat the literal fallback value in the
      review.

## 6. Error handling & resilience

- [ ] Server: errors return an appropriate status code (401 for auth failures
      matching `jwt-session.ts`'s pattern, 400 for bad input, 500 only for
      truly unexpected failures) — not everything collapsed to 500 or 200.
- [ ] Client: network/API failures surface to the user via the existing
      toaster pattern (`toasterContext`) rather than failing silently or only
      logging to console.
- [ ] No swallowed exceptions (empty `catch` blocks) without a comment
      explaining why swallowing is correct there.

## 7. Performance

- [ ] No obvious N+1 query pattern introduced (a loop issuing one query per
      iteration where a single joined/batched query would do).
- [ ] Large result sets (stakeholder search, exports) aren't fully loaded into
      memory unnecessarily where the existing code already streams/paginates.
- [ ] No new unbounded query (missing a `LIMIT`/pagination) on a table that can
      grow large, unless matching existing unbounded queries deliberately.

## 8. Accessibility (client changes)

- [ ] Interactive elements are real interactive elements (`button`, `a`,
      form controls) or have the appropriate ARIA role — not a `div` with an
      `onClick` and nothing else.
- [ ] New form fields have associated labels (Formik + MUI's `TextField`
      `label` prop is the existing pattern — use it).
- [ ] Images/icons convey meaning via `alt` text or `aria-label`, matching
      how existing icon components in `client/src/icons/` are used.
- [ ] Color is not the only signal for state (error/success), consistent with
      existing MUI theme usage (icons/text alongside color).
- [ ] Keyboard navigation isn't broken by a new custom interactive component
      (prefer MUI components, which handle this, over hand-rolled ones).

## 9. Test coverage

- [ ] Non-trivial new server logic has a Jest unit test in `server/__test__/`
      following the existing `jest.mock(...)` + controller-level test pattern
      seen in `account.test.ts` / `stakeholder-controller.test.ts`.
- [ ] A new user-facing flow on the client has (or should have) Playwright
      coverage added to `client/tests/`, matching the existing spec file
      pattern — this is the client's only currently-working test suite
      (CLAUDE.md §7), so it's the meaningful place to add coverage, not the
      broken Jest setup.
- [ ] Existing tests weren't weakened to make them pass (loosened assertions,
      skipped tests, deleted coverage) without explicit justification.
- [ ] Test-run results reported by the implementer were actually verified,
      not just repeated — check failures against the known baselines
      (CLAUDE.md §7: 10 pre-existing `account.test.ts` snapshot failures;
      client Jest fully broken; client lint fully broken) rather than assuming
      any red/green is meaningful without checking it against those.

## 10. Diff hygiene

- [ ] No leftover debug code (`console.log`, commented-out blocks, dead code
      paths).
- [ ] No unrelated formatting-only churn mixed into a functional diff.
- [ ] No unnecessary new dependency added when the existing dependency set
      already covers the need (check `package.json` diffs specifically).
- [ ] Naming in new code matches the file/module's existing naming style.

## Verdict

After working through the applicable sections: any unresolved Blocker or
Major → **CHANGES REQUESTED**, findings listed with file/line, concrete
failure scenario, and severity. Otherwise → **APPROVED**, with a brief note of
what was verified (checks run, sections applied).
