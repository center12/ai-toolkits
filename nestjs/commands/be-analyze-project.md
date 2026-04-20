---
name: be-analyze-project
description: 4-phase codebase audit pipeline — extract modules, analyze each, cross-analyze patterns, generate final report. Optional args: src=<path> out=<path>
---

You are running a 4-phase codebase audit pipeline. Execute each phase in sequence. Do not skip any phase.

## Argument Parsing

Parse `$ARGUMENTS` by splitting on spaces, then on `=`. Extract:

- `src` → source root (default: `src`)
- `out` → output directory (default: `analysis`)

Example: `/be-analyze-project src=backend out=reports` → `src=backend`, `out=reports`.

## Setup

1. Ensure the output directory exists: run `Bash: mkdir -p <out>`
2. Use TodoWrite to initialize 4 tasks:
   - "Phase 1 — Extract modules" (pending)
   - "Phase 2 — Analyze modules (loop)" (pending)
   - "Phase 3 — Cross-analysis" (pending)
   - "Phase 4 — Final report" (pending)

## Phase 1 — Extract Modules

Mark "Phase 1 — Extract modules" as in_progress.

Invoke `Skill: be-extract-modules` with argument `src=<src>`.

The skill returns a numbered list followed by a YAML block. Parse the YAML block to get the feature list. The YAML block looks like:

```yaml
modules:
  - index: "01"
    name: "Module Name"
    slug: "slug"
    src: "src/modules/slug"
```

Store this list for Phase 2. Mark Phase 1 as completed.

## Phase 2 — Analyze Modules (Loop)

Mark "Phase 2 — Analyze modules (loop)" as in_progress.

For each module in the YAML list, in order (NOT in parallel):

1. Check if `<out>/<index>-<slug>.md` already exists using Glob. If it exists, skip this module (log: "Skipping <name> — already analyzed").
2. If it does not exist, read `docs/modules/<slug>.md` and relevant source files to produce `<out>/<index>-<slug>.md`.
3. Wait for completion before moving to the next feature.

Add a sub-task per module to TodoWrite so progress is visible. Mark each sub-task done as it completes.

Mark Phase 2 as completed when all modules are done.

## Phase 3 — Cross-Analysis

Mark "Phase 3 — Cross-analysis" as in_progress.

Invoke `Skill: be-cross-analysis` with argument `out=<out>`.

Wait for completion. Mark Phase 3 as completed.

## Phase 4 — Final Report

Mark "Phase 4 — Final report" as in_progress.

Invoke `Skill: be-final-report` with argument `out=<out>`.

Wait for completion. Mark Phase 4 as completed.

## Summary

Print a summary table:

| Item                      | Value                   |
| ------------------------- | ----------------------- |
| Modules analyzed          | <count>                 |
| Output directory          | <out>/                  |
| Files written             | <list of written files> |
| Skipped (already existed) | <count or "none">       |

The pipeline is complete.
