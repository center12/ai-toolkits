---
name: cross-analysis
description: Read all analysis/<NN>-*.md module files and write analysis/cross-analysis.md with cross-cutting patterns, issue heatmap, and aggregated scores.
---

You are performing a cross-module analysis of a Python FastAPI codebase.

## Argument Parsing

Parse `$ARGUMENTS` by splitting on spaces then `=`. Extract:

- `out` → output directory containing module analysis files (default: `analysis`)

## Step 1 — Load Module Analyses

Use `Glob` on `<out>/[0-9][0-9]-*.md` to find all module analysis files.
This pattern matches `01-auth.md` but excludes `cross-analysis.md` and `FINAL-AUDIT-REPORT.md`.

Read all matched files. For each file extract:

- **Module name** (from `# Module:` heading)
- **Score table** (all score lines: Architecture, Code Quality, Performance, API Design)
- **Issues section** (all `- **[Severity]**` lines)
- **Service & Business Logic section** (full text)
- **API & Data Flow section** (full text)
- **Risks section** (full text)

## Step 2 — Analyze Cross-Cutting Patterns

Analyze across all module files for these six areas. Be specific — cite module names and concrete evidence from the files.

### Architecture Patterns

- What architectural patterns are used consistently? (e.g. service class per module, shared `get_db` dependency)
- Where do patterns diverge? (e.g. some modules use class-based services, others use plain functions)
- Are there hybrid or unusual internal layouts?
- How is dependency injection applied across modules?

### Service & Business Logic

- Which modules have overly large services that should be split?
- Are there naming collisions in service method names across modules?
- Which modules import from other modules' services (cross-module coupling)?
- Where are there duplicate implementations of the same logic?
- Are there modules missing try/except or logging?

### API & Data Flow

- Which modules use inconsistent HTTP status codes?
- Where is the response model missing or `Any`-typed?
- Are there inconsistent error response shapes (detail string vs. object)?
- Which modules share or overlap API prefixes?
- Where is Swagger documentation (`summary=`, `description=`) missing?

### Error Handling Consistency

- Which modules raise HTTPException directly in the router (instead of the service)?
- Where are errors swallowed without logging?
- How consistent is the 404/422/500 error taxonomy?
- Which modules have inconsistent rollback patterns on DB errors?

### Performance

- Which modules query without pagination?
- Where is N+1 query risk present?
- Which modules could benefit from caching?
- Where are large result sets returned without limits?

### Issue Heatmap

Build a severity summary table:

1. Count total issues per severity (`[Critical]`, `[High]`, `[Medium]`, `[Low]`) across ALL modules.
2. List which modules appear most frequently with `[Critical]` or `[High]` issues.
3. Identify the top 5 recurring issue themes (e.g. "missing swagger docs", "no pagination", "cross-module coupling").

## Step 3 — Write Output

Write to `<out>/cross-analysis.md`:

```markdown
# Cross-Module Analysis

**Source:** <count> module analysis files from `<out>/`
**Date:** <today's date in YYYY-MM-DD>

---

## Architecture Patterns

<content>

---

## Service & Business Logic

<content>

---

## API & Data Flow

<content>

---

## Error Handling Consistency

<content>

---

## Performance

<content>

---

## Issue Heatmap

### Severity Counts

| Severity  | Count |
| --------- | ----- |
| Critical  | N     |
| High      | N     |
| Medium    | N     |
| Low       | N     |
| **Total** | **N** |

### Modules with Most Critical/High Issues

| Module | Critical | High |
| ------ | -------- | ---- |
| ...    | N        | N    |

### Top Recurring Issue Themes

1. <theme> — affects: <module list>
2. ...
```

After writing, confirm: "Written: `<out>/cross-analysis.md`"
