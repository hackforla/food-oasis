# Two-Agent Development Workflow — Food Oasis

This describes how the **implementer** and **reviewer** agents work together on
a change in this repo. Their individual instructions live in
[.claude/agents/implementer.md](../.claude/agents/implementer.md) and
[.claude/agents/reviewer.md](../.claude/agents/reviewer.md). Project-wide rules
both agents follow are in [CLAUDE.md](../CLAUDE.md). The reviewer's checklist is
[review-checklist.md](review-checklist.md).

## Why two agents

CI in this repo only runs Playwright E2E tests (see CLAUDE.md §5) — nothing
enforces lint, typecheck, or unit tests, and the client's own lint/unit-test
tooling is currently broken (CLAUDE.md §7). There is no automated quality gate
to lean on. Splitting implementation from review, with the reviewer explicitly
barred from fixing things itself on the first pass, is what stands in for that
missing gate: one perspective builds and self-checks, a second, independent
perspective verifies before anything is considered finished.

## The sequence

```
1. Request
        ↓
2. Implementer investigates
   (reads CLAUDE.md, greps for existing patterns, reads migrations,
    checks CLAUDE.md §8 risk areas)
        ↓
3. Implementer writes an implementation plan
   (files to touch, pattern being followed, auth/validation/test plan,
    assumptions, risk flags)
        ↓
4. User approval
   — required when the plan touches auth/roles, the SQL query-builder
     risk area, needs a new migration, introduces a new library/pattern,
     was ambiguous, or is large/hard to reverse.
   — optional for small, unambiguous, low-risk changes clearly within
     existing patterns (implementer may proceed, but still records the plan).
        ↓
5. Implementer implements incrementally
   (matches existing file conventions, reuses existing abstractions,
    never adds new string-interpolated SQL)
        ↓
6. Implementer runs checks
   (typecheck + lint + tests + build for touched workspace(s); compares
    test failures against the known baselines in CLAUDE.md §7 rather than
    assuming red = their fault or green = all clear)
        ↓
7. Implementer reviews its own diff
   (git diff, read top to bottom, check for drift from the plan, leftover
    debug code, missed reuse opportunities)
        ↓
8. Implementer documents what changed
   (file-by-file summary, assumptions, check results, remaining concerns,
    follow-ups worth a separate task)
        ↓
9. Reviewer independently reviews
   (does NOT modify application code; re-derives correctness rather than
    trusting the implementer's summary; runs its own typecheck/lint/tests;
    works through review-checklist.md in full)
        ↓
10. Reviewer returns a verdict
    APPROVED  → go to step 12
    CHANGES REQUESTED → findings listed by severity (Blocker/Major/Minor/Nit)
    with concrete, pattern-referencing recommendations → go to step 11
        ↓
11. Implementer addresses findings
    (fixes in severity order, or states explicitly why a finding doesn't
     apply — never silently ignores one; re-runs relevant checks;
     stays within the scope of the findings, flagging anything larger
     as a separate follow-up)
        ↓ back to step 9 (reviewer re-reviews only the new diff)
        ↓
12. Reviewer performs final review → APPROVED
        ↓
13. Complete
```

## Handoff contract

What the implementer must hand the reviewer:
- The diff (or a pointer to it — branch/commit range).
- The original request/requirement, if not already obvious from context.
- The Step 8 summary: what changed and why, assumptions, check results
  (explicitly pass/fail per workspace/check, with any pre-existing failures
  called out), remaining concerns, follow-ups.

What the reviewer must hand back:
- Either APPROVED (with a brief confirmation of what was verified), or
- CHANGES REQUESTED with every Blocker/Major finding stated as: file + line,
  what's wrong, concrete failure scenario, severity, and a recommendation that
  references an existing repo pattern where one applies.

## Escalating to the user

Either agent should pause and ask the user rather than guess when:
- A requirement is genuinely ambiguous and the two readings lead to materially
  different implementations.
- A change would touch one of the CLAUDE.md §8 security discipline areas in a
  way beyond a narrow, in-place fix (e.g. "should we fix an auth check we
  noticed is missing on an unrelated route as part of this?" is a question for
  the user, not a decision either agent should make unilaterally).
- Fixing a review finding properly would require a scope the user hasn't
  approved (e.g. fixing client lint tooling repo-wide to satisfy one PR).
- The reviewer and implementer are at an impasse after a round of findings
  (implementer believes a finding doesn't apply, reviewer disagrees) — don't
  loop indefinitely, surface the disagreement.
- **Either agent identifies a concrete, currently-exploitable security issue.**
  This repo is public — never write the specifics (which endpoint, which
  parameter, why it's exploitable) into a commit, PR description, issue, or any
  committed file, including this one. Surface it to the user directly and let
  them decide where it gets tracked (e.g. a private GitHub Security Advisory).

## What this workflow deliberately does not cover

- Trivial changes (typo fixes, a one-line copy change) don't need the full
  ceremony — use judgment. The workflow exists for non-trivial changes where
  independent verification actually earns its cost.
- This workflow doesn't replace human code review on the eventual PR — it's a
  pre-PR quality pass. Standard Hack for LA / GitHub PR process (see
  [CONTRIBUTING.md](../CONTRIBUTING.md) and the project wiki) still applies on
  top of it.
