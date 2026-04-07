---
name: scan-reusables-frontend
description: Pre-task intelligence agent for frontend. Scans the entire frontend for existing reusable components, hooks, services, stores, and helpers relevant to a task. Run this before implementing anything to prevent duplicate frontend code.
---

Survey the frontend for reusable code before starting a new implementation task.

## Arguments
$ARGUMENTS is a free-form task description (e.g. "add avatar to profile page").

If $ARGUMENTS is empty, scan everything and report the full frontend inventory.

## Step 1 — Detect Frontend Root

Check for frontend root in this order (use first match):
- `apps/web/src/features/` → frontend features root
- `src/features/` → frontend features root

If no frontend root is found, report and stop.

## Step 2 — Extract Keywords from Task

From $ARGUMENTS, extract meaningful keywords by:
1. Splitting on spaces and removing stop words (add, to, the, a, an, for, in, on, of, with)
2. Also include domain-related synonyms (e.g. "avatar" → also search "image", "photo", "profile")
3. Keep the top 5 keywords for filtering

## Step 3 — Frontend Scan

Use Glob to discover all frontend files:

```
<frontend-root>/*/components/**/*.tsx
<frontend-root>/*/pages/**/*.tsx
<frontend-root>/*/hooks/**/*.ts
<frontend-root>/*/services/**/*.ts
<frontend-root>/*/stores/**/*.ts
<frontend-root>/*/utils/**/*.ts
<frontend-root>/*/helpers/**/*.ts
<frontend-root>/*/types/**/*.ts
```

Also scan global locations:
```
src/components/**/*.tsx         (or apps/web/src/components/)
src/hooks/**/*.ts
src/services/**/*.ts
src/stores/**/*.ts
src/lib/**/*.ts
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
## Frontend Reusability Report
Task: "<$ARGUMENTS>"
Scanned: <date>

---

### Components
| File | Export | Purpose |
|------|--------|---------|
| path/to/Component.tsx | ComponentName | one-line purpose |

### Hooks
| File | Export | Purpose |
|------|--------|---------|

### Services
| File | Export | Purpose |
|------|--------|---------|

### Stores / State
| File | Export | Purpose |
|------|--------|---------|

### Utilities / Helpers
| File | Export | Purpose |
|------|--------|---------|

---

### Nothing Found (create new)
The following frontend areas have no existing code matching this task:
- [ ] Component
- [ ] Data-fetching hook
- [ ] API service function
- (list only missing items)

---

### Suggested Imports
Ready-to-paste import statements for reusable items found above:

​```ts
import { ComponentName } from 'src/features/<feature>/components/ComponentName'
import { useHookName } from 'src/features/<feature>/hooks/use-<domain>.hook'
// ...
​```
```

Omit any section that has no results.
After printing, add one line: "Run `/check-conventions-frontend` after implementation to validate structure."
