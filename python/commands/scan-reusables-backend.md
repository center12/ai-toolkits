---
name: scan-reusables-backend
description: Pre-task intelligence agent for Python FastAPI backend. Reads extracted docs from docs/modules/ to find reusable services, dependencies, schemas, and helpers relevant to a task. Falls back to source scan only if docs are missing. Run before implementing anything new.
---

Survey existing backend code before starting a new implementation task.

## Arguments
$ARGUMENTS is a free-form task description (e.g. "add rate limiting to chat module").

If $ARGUMENTS is empty, list all documented modules and their purposes.

## Step 1 — Detect docs folder

Check if `docs/modules/` exists and contains `.md` files.

- **Docs exist** → follow Step 2 (fast path — read docs only)
- **Docs missing** → follow Step 3 (fallback — scan source)

---

## Step 2 (fast path) — Read from docs/modules/

### 2a — Extract keywords
From $ARGUMENTS, extract meaningful keywords:
1. Split on spaces, drop stop words: a, an, the, for, to, add, in, of, with, on
2. Include domain synonyms (e.g. "auth" → also "jwt", "dependency", "token")
3. Keep top 5 keywords

### 2b — Filter doc files
Glob: `docs/modules/*.md`

Always include these if they exist — they are relevant to every task:
- `docs/modules/_global.md` — shared dependencies, middleware, exception handlers
- `docs/modules/auth.md` — auth is a shared dependency in every module

For the remaining files, keep only those whose filename contains at least one keyword.
If $ARGUMENTS is empty, keep all doc files.

### 2c — Read matched docs (cap at 10 files)
Read each matched `docs/modules/<name>.md`. These are compact summaries — do not read source files.

From each doc extract:
- Service methods and signatures
- API routes
- Schemas and their fields
- Dependencies applied (auth, db, etc.)
- Exported helpers

Skip to Step 4 — output the report.

---

## Step 3 (fallback) — Scan source directly

Only run this if `docs/modules/` does not exist. Prompt the user to run `/extract-modules` first, then continue with source scan as a best-effort.

### 3a — Detect backend root
- `app/modules/` → use this
- `src/modules/` → use this

### 3b — Keyword filter on paths (no file reads yet)
Glob paths only:
```
<backend-root>/*/helpers/**/*.py
<backend-root>/*/**/*_service.py
<backend-root>/*/**/*_router.py
<backend-root>/*/schemas/**/*.py
<backend-root>/*/__init__.py
```
Keep only paths whose filename or immediate parent folder contains at least one keyword.
If nothing matches, report "nothing found" and stop.

### 3c — Read matched files (cap at 15)
Read only keyword-matched files to extract exported names and purpose.

---

## Step 4 — Output Report

```
## Backend Reusability Report
Task: "<$ARGUMENTS>"
Source: docs/modules/ (or source scan if fallback)

---

### Services
| Module | Method | Signature |
|--------|--------|-----------|

### Dependencies / Providers
| Module | Export | Purpose |
|--------|--------|---------|

### Schemas
| Module | Class | Fields |
|--------|-------|--------|

### Helpers
| Module | Export | Signature |
|--------|--------|-----------|

---

### Nothing Found (create new)
- [ ] Service method
- [ ] Dependency
- [ ] Schema
- [ ] Helper
- (list only missing items)

---

### Suggested Imports
​```python
from app.modules.<module>.<module>_service import ServiceName
from app.dependencies import get_current_user
​```
```

Omit any section that has no results.
After printing, add: "Run `/check-conventions-backend` after implementation to validate structure."
If docs were missing, add: "Tip: run `/extract-modules` to enable fast doc-based scanning."
