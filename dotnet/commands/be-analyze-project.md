---
name: be-analyze-project
description: 4-phase codebase audit pipeline — extract modules, analyze each, cross-analyze patterns, generate final report. Optional args: src=<path> out=<path>
---

You are running a 4-phase codebase audit pipeline. Execute each phase in sequence. Do not skip any phase.

## Argument Parsing

Parse `$ARGUMENTS` by splitting on spaces, then on `=`. Extract:

- `src` → source root (default: `src`)
- `out` → output directory (default: `analysis`)

Example: `/be-analyze-project src=Api out=reports` → `src=Api`, `out=reports`.

## Setup

1. Ensure the output directory exists: run `Bash: mkdir -p <out>`
2. Use TodoWrite to initialize 4 tasks:
   - "Phase 1 — Extract modules" (pending)
   - "Phase 2 — Analyze modules (loop)" (pending)
   - "Phase 3 — Cross-analysis" (pending)
   - "Phase 4 — Final report" (pending)

## Phase 1 — Extract Modules

Mark "Phase 1 — Extract modules" as in_progress.

Run `/be-extract-modules` with no arguments to extract docs for all modules.

After completion, glob `docs/modules/*.md` (excluding `_global.md`) to get the module list.
Parse each filename to extract the module name.

Store this list for Phase 2. Mark Phase 1 as completed.

## Phase 2 — Analyze Modules (Loop)

Mark "Phase 2 — Analyze modules (loop)" as in_progress.

For each module name in the list, in order (NOT in parallel):

1. Check if `<out>/<index>-<name>.md` already exists using Glob. If it exists, skip this module (log: "Skipping <name> — already analyzed").
2. If it does not exist, read `docs/modules/<name>.md` and the module source files. Produce a detailed analysis file at `<out>/<index>-<name>.md` using the template below.
3. Wait for completion before moving to the next module.

Add a sub-task per module to TodoWrite so progress is visible. Mark each sub-task done as it completes.

### Module Analysis Template

```markdown
# Module: <Name>

**Path:** src/Modules/<Name>/
**Date:** <YYYY-MM-DD>

---

## 1. Responsibilities
- What does this module own?

---

## 2. Structure
- File layout observations
- Any deviations from standard structure

---

## 3. Service & Business Logic
- Key service methods
- Business rules enforced
- Interface coverage

---

## 4. API & Data Flow
- Endpoint patterns
- Request/response DTOs
- Swagger documentation completeness
- Error handling approach

---

## 5. Issues
- **[Critical]** <issue description>
- **[High]** <issue description>
- **[Medium]** <issue description>
- **[Low]** <issue description>

---

## 6. Risks & Technical Debt
- <risk description>

---

## Score (1–10)
- Architecture: X
- Code Quality: X
- Performance: X
- API Design: X
```

Mark Phase 2 as completed when all modules are done.

## Phase 3 — Cross-Analysis

Mark "Phase 3 — Cross-analysis" as in_progress.

Run `/be-cross-analysis out=<out>`.

Wait for completion. Mark Phase 3 as completed.

## Phase 4 — Final Report

Mark "Phase 4 — Final report" as in_progress.

Run `/be-final-report out=<out>`.

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
