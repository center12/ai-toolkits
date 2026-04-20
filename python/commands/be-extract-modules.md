Extract structured documentation for Python FastAPI modules in this project and
save each as a compact Markdown file under docs/modules/. Future prompts can
reference these files instead of reading source code to reduce token usage.

## Arguments
$ARGUMENTS may be empty (extract all modules) or a single module name like `auth`
or `dev_task` (extract only that module).

## Step 1 — Identify targets

Root: `src/modules/` (or `app/modules/` — use whichever exists)

If $ARGUMENTS is set, process only the matching module folder. Otherwise process all subdirectories.

## Step 2 — Read each module

For `src/modules/<name>/`, read in order (skip absent files):
1. `<name>_router.py` — every `@router.get/@router.post/@router.put/@router.delete` method:
   record HTTP method, path, input params/body fields, output shape, response model, error codes
2. `<name>_service.py` — top 3 most important public methods; infer core flows
   from method logic (numbered steps); note raised exceptions and business rules
3. `schemas/create_<name>.py`, `schemas/update_<name>.py` — Pydantic fields and types
4. `__init__.py` — exported names
5. `constants/<name>_constants.py` — scalar constant values and enums
6. `helpers/<name>_helpers.py` — exported function names

Also infer:
- **Scope**: what the module owns (In) vs. what it delegates (Out)
- **Relationships**: foreign keys or cross-service dependencies between entities
- **Constraints**: validators (business rules), raised/caught errors (edge cases),
  rate limits / TTL / concurrency notes (non-functional)

## Step 3 — Write docs/modules/<name>.md

Use this template. Omit any section whose content is empty.
Overwrite the file completely if it already exists. Keep the file under 100 lines.

```
# Module: <name>
**Purpose**: one sentence describing what this module does

## Scope
- In: (what this module owns / is responsible for)
- Out: (what it delegates to other modules)

## Data Model
| Entity | Key Fields | Storage |
|--------|-----------|---------|

**Relationships**: <EntityA> (1) → (N) <EntityB>, ...

## API Contracts
| Method | Path | Input | Output | Errors |
|--------|------|-------|--------|--------|

## Core Flows (top 3)
### <Flow Name>
1. step
2. step

## Constraints
- (business rules, edge cases, non-functional: rate limits, TTL, concurrency, expiry)

## Dependencies
- Depends on: (modules/services this module imports or calls)
- Used by: (modules/features that depend on this module)
```

## Step 4 — Extract global shared backend code

Scan backend folders outside `modules/` (shared providers, common utilities):
- `src/common/**/*.py` (or `app/common/`)
- `src/auth/**/*.py`
- `src/dependencies/**/*.py`
- `src/middleware/**/*.py`
- `src/exceptions/**/*.py`
- `src/utils/**/*.py`

For each file found, read to extract: export name + one-line purpose.

Write `docs/modules/_global.md` using this template (omit empty sections):

```
# Global Backend Shared Code
**Purpose**: Shared dependencies, middleware, exceptions, and utilities used across two or more modules.

## Dependencies / Providers
| File | Export | Purpose |
|------|--------|---------|

## Middleware
| File | Export | Purpose |
|------|--------|---------|

## Exception Handlers
| File | Export | Purpose |
|------|--------|---------|

## Common Utilities
| File | Export | Purpose |
|------|--------|---------|
```

Keep the file under 150 lines. Overwrite if it already exists.

## Step 5 — Update docs/INDEX.md

If `docs/INDEX.md` exists, update only the rows in the "Backend Modules" table
for the modules just processed, preserving all other content.

If `docs/INDEX.md` does not exist, create it with this structure:

```
# Documentation Index
_Last updated: <today's date>_

## Backend Modules (`src/modules/`)
| Module | Doc | Purpose |
|--------|-----|---------|
| auth | [docs/modules/auth.md](modules/auth.md) | <one-line purpose> |
| ... | ... | ... |

## Usage
Reference these docs instead of source code to reduce token usage:
​```
Read docs/modules/dev_task.md, then add a new pipeline step.
​```
```

## Step 6 — Print summary

After all files are written, output:

```
Backend docs extracted:
  docs/modules/<name>.md
  ...
  docs/modules/_global.md
  docs/INDEX.md (updated)

Total: Y module docs + 1 global doc written
Refresh a single module: /be-extract-modules <name>
```
