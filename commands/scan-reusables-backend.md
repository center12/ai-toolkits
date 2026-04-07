---
name: scan-reusables-backend
description: Pre-task intelligence agent for backend. Scans the entire backend for existing reusable services, guards, decorators, DTOs, and helpers relevant to a task. Run this before implementing anything to prevent duplicate backend code.
---

Survey the backend for reusable code before starting a new implementation task.

## Arguments
$ARGUMENTS is a free-form task description (e.g. "add rate limiting to chat module").

If $ARGUMENTS is empty, scan everything and report the full backend inventory.

## Step 1 — Detect Backend Root

Check for backend root in this order (use first match):
- `apps/api/src/modules/` → backend modules root
- `src/modules/` → backend modules root

If no backend root is found, report and stop.

## Step 2 — Extract Keywords from Task

From $ARGUMENTS, extract meaningful keywords by:
1. Splitting on spaces and removing stop words (add, to, the, a, an, for, in, on, of, with)
2. Also include domain-related synonyms (e.g. "auth" → also search "jwt", "guard", "token")
3. Keep the top 5 keywords for filtering

## Step 3 — Backend Scan

Use Glob to discover all backend files:

```
<backend-root>/*/helpers/**/*.ts
<backend-root>/*/guards/**/*.ts
<backend-root>/*/decorators/**/*.ts
<backend-root>/*/dto/**/*.ts
<backend-root>/*/*.service.ts
<backend-root>/*/*.module.ts
```

Filter results: keep files whose path contains at least one keyword from Step 2.
If $ARGUMENTS is empty, keep all results.

## Step 4 — Read Relevant Files

For files that match keywords, read each to extract:
- Exported function/class names
- A one-line description of purpose (from JSDoc or inferred from name)

Cap at 20 files total to avoid token overuse.

## Step 5 — Output Report

```
## Backend Reusability Report
Task: "<$ARGUMENTS>"
Scanned: <date>

---

### Services
| File | Export | Purpose |
|------|--------|---------|

### Guards / Decorators
| File | Export | Purpose |
|------|--------|---------|

### DTOs
| File | Class | Fields |
|------|-------|--------|

### Helpers
| File | Export | Purpose |
|------|--------|---------|

---

### Nothing Found (create new)
The following backend areas have no existing code matching this task:
- [ ] Service method
- [ ] Guard
- [ ] DTO
- [ ] Helper
- (list only missing items)

---

### Suggested Imports
Ready-to-paste import statements for reusable items found above:

​```ts
import { ServiceName } from 'src/modules/<module>/<module>.service'
import { GuardName } from 'src/modules/<module>/guards/<guard>.guard'
// ...
​```
```

Omit any section that has no results.
After printing, add one line: "Run `/check-conventions-backend` after implementation to validate structure."
