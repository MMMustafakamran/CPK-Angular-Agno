# Version Watch — scenario and rationale

Implemented by `ci/check-versions.mjs` and `.github/workflows/version-watch.yml`.

## The scenario

This repo is a QA harness for **CopilotKit's Angular client** against an
**Agno** agent, verifying that documented code snippets actually run. That makes
dependency versions part of the subject under test, not background maintenance.

Four independently-released trains meet here:

| Layer | Package | Train |
|---|---|---|
| Angular client | `@copilotkit/angular` | `0.x` |
| JS core / runtime | `@copilotkit/core`, `@copilotkit/runtime` | `1.x` |
| Wire protocol | `@ag-ui/*` | `0.0.x` |
| Python agent | `agno`, `ag-ui-protocol` | `2.x` / `0.1.x` |

They do not move together. As of 2026-08-27:

- `@copilotkit/angular@0.3.1` (latest) **exact-pins** `@copilotkit/core@1.66.0`,
  `@copilotkit/shared@1.66.0`, `@copilotkit/a2ui-renderer@1.66.0` and
  `@copilotkit/web-components@1.66.0`, while core is published at `1.69.3`.
- `@copilotkit/core` appears **twice** in the frontend tree, and the split
  follows the architecture: `@copilotkit/angular` holds `1.66.0` while the
  `channels-*` packages reached through `@copilotkit/runtime` are on the `1.69`
  line. No single version satisfies both, so npm nests a private copy for each
  side. The Angular app and the Node runtime are running different cores.
- `@ag-ui/client` exists in the tree at **three** versions at once — `0.0.54`
  under `@ag-ui/mcp-middleware`, `0.0.57` pinned by every `@copilotkit/*`
  package, and `0.0.58` hoisted at top level.
- `@ag-ui/agno` is declared `^0.0.5`. On a `0.0.x` package a caret allows
  **nothing but `0.0.5`**, so the published `0.0.6` is unreachable until someone
  edits the manifest by hand — the nightly re-resolve will never find it.

So the daily question is not "am I up to date." It is:

> **Did the version skew between these projects change today?**

## What the nightly already did, and what was missing

`ci/automate.mjs` **drops the lockfiles and re-resolves** on every run
(`npm install` for the frontend and autorecorder, `uv sync --upgrade` for the
agent; `--use-lockfile` opts back out, off by default). So the recorders already
test the newest versions the declared ranges allow, but silently. The resolution
was discarded, so:

- a broken recording could be our code or a dependency bump, with no way to tell;
- a clean run never revealed what had moved;
- nothing could see **past** the range boundary, which is where every real
  question in this repo lives.

The watch adds the record and the out-of-reach view. It changes nothing about
what gets installed or recorded.

## Why versions can be behind — three causes

Only one is ours to act on, so the report **classifies** rather than lists.

| # | Cause | Actionable? | Detected by |
|---|---|---|---|
| 1 | Upstream **exact pin** (`"@copilotkit/core": "1.66.0"`) | No — report upstream | `npm view <pkg> dependencies` |
| 2 | **peerDependency** range (Angular 22 needs `typescript >=6.0 <6.1`) | No — correct as-is | dry-run peer/`ERESOLVE` |
| 3 | Our own range is behind | **Yes — bump by hand** | `npm outdated`, dry-run clean |

Treating `npm outdated`'s `Latest` column as a to-do list is the failure mode:
TypeScript reads as a full major behind (`~6.0.2` vs `7.0.2`), but bumping it
breaks the Angular build.

**npm decides the bucket, not a hardcoded list.** For anything past the range
boundary the script runs `npm install <pkg>@latest --dry-run
--package-lock-only`, which writes nothing. `ERESOLVE` means a peer range or an
exact pin forbids the upgrade — and the message names the blocker. Success means
it is simply a range we have not bumped.

### One trap inside that trap

Exit status alone is **not** enough to bucket a package. Angular declares
TypeScript as a `peerOptional`:

```
npm warn Could not resolve dependency:
npm warn peerOptional typescript@">=6.0 <6.1" from @angular/compiler-cli@22.1.3
```

An unmet *optional* peer does not fail resolution. npm warns and exits **0**, so
a naive reading of the dry run files TypeScript 7 under "ours to bump" — the
exact recommendation that breaks the build. `peerBlockerFor()` therefore scans
the output for both `peer` and `peerOptional` conflicts naming the package being
upgraded, whether or not the command succeeded.

## What the job does

1. **Snapshot + diff** — writes `ci/resolved-versions.json` across frontend,
   autorecorder and backend (the last read from `uv.lock`) and reports what
   moved since the previous run.
2. **Classified `npm outdated`** — packages where `wanted === latest` are folded
   away, since the next re-resolve picks those up unprompted; only what sits past
   the boundary gets a dry-run and a bucket.
3. **Upstream pin probe** — what the newest `@copilotkit/angular`,
   `@copilotkit/runtime` and `@ag-ui/agno` force on consumers, dependencies and
   peerDependencies both. `npm outdated` cannot see these: they are transitive,
   so they never appear as something we asked for.
4. **Fragmentation** — multiple copies of `@ag-ui/client`, `@ag-ui/core` or
   `@copilotkit/core` in one tree, and who pulled each.

### Design decisions

- **Snapshot committed, not stored as an artifact.** Artifacts expire and are
  not diffable across runs. Committed, `git log -p ci/resolved-versions.json`
  *is* the timeline, and each recording is tied to the versions that produced it.
- **A separate workflow, not folded into the recorder.** It is sharded 3x, so an
  inline check would run three times — and three independent re-resolves can
  disagree about what "today's versions" are. One job, one resolve, one answer.
- **Not in the recorder's `needs:`.** A moved pin is news, not a build failure;
  demos must still record.
- **`contents: write`, scoped by the commit step** to `ci/resolved-versions.json`
  alone. `package.json`, `pyproject.toml` and the lockfiles are never touched.
  This is a real concession — a pure read-only job would be safer — accepted
  because git history is what makes the timeline worth having.
- **Commits only on `schedule`.** Manual runs report without writing history.
- **A rejected push warns, it does not fail.** If `main` is protected the push
  is refused; that is a repo-settings answer, not a broken run, and the report
  is already published by then. The summary says so and the job stays green.
- **A failed probe reports loudly.** If `npm outdated` returns nothing
  parseable, or a registry read comes back empty, the report says *unknown*,
  never *clean*. Silence that reads as an all-clear is the one lie this job
  cannot tell.
- **No `ncu -u` on a schedule.** It rewrites `package.json` to `Latest`
  wholesale, ignoring declared ranges — exactly the cause-2 breakage above. The
  `deps:check` / `deps:update` scripts that wrapped it have been removed from
  `frontend/package.json`. Dependabot is the safe alternative if PR-based
  automation is wanted later.

### Three implementation notes worth keeping

- **npm runs through a shell.** On Windows `npm` is a `.cmd` shim and, since the
  CVE-2024-27980 mitigation, Node refuses to `execFile` one (`EINVAL`) — which
  fails quietly enough to look like an all-clear.
- **`npm view <pkg> <field> --json` has two shapes.** It may return the object,
  or that object wrapped in a single-element array. Read naively the array form
  renders as *no pins declared* — a clean-looking report of nothing.
  `viewObject()` normalises it.
- **`^` narrows as the major approaches zero:**

  | Range | Allows |
  |---|---|
  | `^1.69.0` | `>=1.69.0 <2.0.0` |
  | `^0.3.1` | `>=0.3.1 <0.4.0` |
  | `^0.0.5` | **only `0.0.5`** |

  Every `@ag-ui/*` range is `0.0.x`, so they are effectively pinned. `npm update`
  will never move them; they need a manual edit. `npm outdated` still flags them
  — which is exactly why checking and upgrading stay separate steps.

## Two limits worth stating

**The Python side is snapshotted, not re-resolved.** The recorder runs
`uv sync --upgrade`, which rewrites `uv.lock`. Doing that inside this job would
mean committing a relock as a side effect of asking what moved, so the workflow
re-resolves only the npm workspaces. The `backend` scope of the snapshot
therefore tracks the **committed** `uv.lock` and moves when someone relocks —
not nightly. Reading `uv pip list --outdated` would need a uv install in this
job and is the obvious next step if the Python train starts causing breaks.

**Re-resolving only ever reaches the range boundary.** It will never produce
`@copilotkit/core@1.69.3` in the Angular client (upstream pins `1.66.0`), never
`@ag-ui/agno@0.0.6` (our caret forbids it), and it should never produce
TypeScript 7 (Angular forbids it). Crossing the boundary is a human edit:

```bash
git checkout -b chore/bump-<pkg>
npm --prefix frontend install <pkg>@<version>
git diff frontend/package-lock.json   # one bump can drag in dozens of transitives
npm --prefix frontend run build
# then run the harness — that is what this repo is for
```

Revert is always `git checkout frontend/package-lock.json && npm ci`. The
Python half is `cd backend && uv lock --upgrade && uv sync`.

## Running it locally

```bash
node ci/check-versions.mjs             # report only, writes nothing
node ci/check-versions.mjs --snapshot  # also rewrite ci/resolved-versions.json
```

The dry-run classification makes one network round trip per out-of-range
package, so a cold local run takes a few minutes.

**The first snapshot must be established in CI, not locally.** A baseline
resolved on a dev machine diffs against a Linux runner as hundreds of phantom
changes — platform binaries and optional deps that were never really there. Run
the workflow once with **Commit the resolved-version snapshot** ticked to
establish it; the first diff after that is the first real one.
