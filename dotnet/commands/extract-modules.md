Extract structured documentation for ASP.NET Core modules in this project and
save each as a compact Markdown file under docs/modules/. Future prompts can
reference these files instead of reading source code to reduce token usage.

## Arguments
$ARGUMENTS may be empty (extract all modules) or a single module name like `Auth`
or `DevTask` (extract only that module).

## Step 1 — Identify targets

Root: `src/Modules/` (or `Api/Modules/` — use whichever exists)

If $ARGUMENTS is set, process only the matching module folder. Otherwise process all subdirectories.

## Step 2 — Read each module

For `src/Modules/<Name>/`, read in order (skip absent files):
1. `<Name>Controller.cs` — every `[HttpGet]/[HttpPost]/[HttpPut]/[HttpDelete]` action:
   record HTTP method, route, input params/body fields, response type, `ProducesResponseType` codes
2. `<Name>Service.cs` — top 3 most important public methods; infer core flows
   from method logic (numbered steps); note thrown exceptions and business rules
3. `I<Name>Service.cs` — interface method signatures
4. `Dtos/*.cs` — DTO class names and key fields
5. `<Name>ServiceExtensions.cs` — registered services and their lifetimes
6. `Constants/<Name>Constants.cs` — scalar constant values and enums
7. `Helpers/<Name>Helpers.cs` — static method names

Also infer:
- **Scope**: what the module owns (In) vs. what it delegates (Out)
- **Relationships**: foreign keys or cross-service dependencies between entities
- **Constraints**: validators (business rules), thrown/caught exceptions (edge cases),
  rate limits / TTL / concurrency notes (non-functional)

## Step 3 — Write docs/modules/<Name>.md

Use this template. Omit any section whose content is empty.
Overwrite the file completely if it already exists. Keep the file under 100 lines.

```
# Module: <Name>
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

Scan backend folders outside `Modules/` (shared providers, common utilities):
- `src/Common/**/*.cs`
- `src/Auth/**/*.cs`
- `src/Middleware/**/*.cs`
- `src/Exceptions/**/*.cs`
- `src/Extensions/**/*.cs`

For each file found, read to extract: export name + one-line purpose.

Write `docs/modules/_global.md` using this template (omit empty sections):

```
# Global Backend Shared Code
**Purpose**: Shared services, middleware, exception types, and utilities used across two or more modules.

## Services / Interfaces
| File | Export | Purpose |
|------|--------|---------|

## Middleware
| File | Export | Purpose |
|------|--------|---------|

## Exception Types
| File | Export | Purpose |
|------|--------|---------|

## Common Utilities / Extensions
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

## Backend Modules (`src/Modules/`)
| Module | Doc | Purpose |
|--------|-----|---------|
| Auth | [docs/modules/Auth.md](modules/Auth.md) | <one-line purpose> |
| ... | ... | ... |

## Usage
Reference these docs instead of source code to reduce token usage:
​```
Read docs/modules/DevTask.md, then add a new endpoint.
​```
```

## Step 6 — Print summary

After all files are written, output:

```
Backend docs extracted:
  docs/modules/<Name>.md
  ...
  docs/modules/_global.md
  docs/INDEX.md (updated)

Total: Y module docs + 1 global doc written
Refresh a single module: /extract-modules <Name>
```
