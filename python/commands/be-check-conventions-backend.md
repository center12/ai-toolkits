---
name: be-check-conventions-backend
description: Post-task validator for Python FastAPI backend. Scans source code for violations of folder structure and naming conventions. Run after implementing new modules to catch misplaced files and naming errors before committing.
---

Validate that backend code follows the required Python FastAPI folder structure and naming conventions.

## Arguments
$ARGUMENTS is an optional subdirectory path to limit scope (e.g. `src/modules/chat`).

If empty, scan the entire backend.

## Step 1 — Detect Backend Root

Check for backend root (use first match):
- `app/modules/` → backend modules root
- `src/modules/` → backend modules root

If $ARGUMENTS is set, restrict scanning to that path only.

If no backend root found, report and stop.

## Step 2 — Backend Checks

### Check B1: Snake_case file naming
- Glob: `<backend-root>/**/*.py`
- Rule: filename (without extension) must be all lowercase with underscores only — `^[a-z][a-z0-9_]+$`
- Violation: any CamelCase or hyphen-case filename (e.g. `UserService.py`, `user-service.py`)
- Fix: rename to snake_case

### Check B2: Schema naming
- Glob: `<backend-root>/*/schemas/**/*.py`
- Rule: must match `^(create|update|query|response)_[a-z][a-z0-9_]+\.py$`
- Violation: schemas not following naming pattern
- Fix: rename

### Check B3: No root-level constants/helpers/utils
- Glob: `<backend-root>/*/*.py`
- Rule: filenames `constants.py`, `helpers.py`, `utils.py` at module root are violations
- Fix: move to `constants/<domain>_constants.py` or `helpers/<domain>_helpers.py`

### Check B4: Module completeness
- For each directory under `<backend-root>/`:
  - Must contain: `<name>_router.py`, `<name>_service.py`, `__init__.py`
  - Warn if any of these is missing (may be intentional for lib-only modules)

### Check B5: Constants/helpers in correct subfolder
- Glob: `<backend-root>/*/constants/*.py`
- Rule: must match `<domain>_constants.py`
- Same for helpers: must match `<domain>_helpers.py`
- Violation: files named just `__init__.py` or `constants.py` inside the subfolder (unless `__init__.py`)

### Check B6: Swagger completeness on routers
- Glob: `<backend-root>/**/*_router.py`
- Rule: every `@router.get/@router.post/@router.put/@router.delete` decorator must include `summary=`
- Violation: route without `summary=`
- Fix: add `summary="..."` to the decorator

## Step 3 — Output Report

```
## Backend Convention Check Report
Scanned: <path or "full backend">
Date: <today>

---

### Violations

| Check | File | Issue | Fix |
|-------|------|-------|-----|
| B1    | src/modules/user/UserService.py | Not snake_case | Rename to user_service.py |
| ...   | ...  | ...   | ... |

Backend violations: <N>

---

### Suggestions (non-blocking)

- <file>: <suggestion>

---

### Summary

Total violations: <N>
Suggestions: <N>

<If 0 violations>: All backend conventions pass. ✓
```

If violations are found, ask the user: "Fix violations now? (yes/no)"
If yes, rename/move the files and print a diff of changes made.
