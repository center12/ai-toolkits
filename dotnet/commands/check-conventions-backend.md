---
name: check-conventions-backend
description: Post-task validator for ASP.NET Core backend. Scans source code for violations of folder structure and naming conventions. Run after implementing new modules to catch misplaced files and naming errors before committing.
---

Validate that backend code follows the required ASP.NET Core folder structure and naming conventions.

## Arguments
$ARGUMENTS is an optional subdirectory path to limit scope (e.g. `src/Modules/Chat`).

If empty, scan the entire backend.

## Step 1 — Detect Backend Root

Check for backend root (use first match):
- `Api/Modules/` → backend modules root
- `src/Modules/` → backend modules root

If $ARGUMENTS is set, restrict scanning to that path only.

If no backend root found, report and stop.

## Step 2 — Backend Checks

### Check B1: PascalCase file naming
- Glob: `<backend-root>/**/*.cs`
- Rule: filename (without extension) must start with uppercase and use PascalCase — `^[A-Z][A-Za-z0-9]+$`
- Violation: any snake_case or kebab-case filename (e.g. `user_service.cs`, `user-service.cs`)
- Fix: rename to PascalCase

### Check B2: DTO naming
- Glob: `<backend-root>/*/Dtos/**/*.cs`
- Rule: must match `^(Create|Update|Query|Response)[A-Z][A-Za-z0-9]+Dto\.cs$`
- Violation: DTOs not following naming pattern
- Fix: rename

### Check B3: No root-level Constants/Helpers/Utils files
- Glob: `<backend-root>/*/*.cs`
- Rule: filenames `Constants.cs`, `Helpers.cs`, `Utils.cs` at module root are violations
- Fix: move to `Constants/<Name>Constants.cs` or `Helpers/<Name>Helpers.cs`

### Check B4: Module completeness
- For each directory under `<backend-root>/`:
  - Must contain: `<Name>Controller.cs`, `<Name>Service.cs`, `I<Name>Service.cs`, `<Name>ServiceExtensions.cs`
  - Warn if any of these is missing (may be intentional for lib-only modules)

### Check B5: Constants/helpers in correct subfolder
- Glob: `<backend-root>/*/Constants/*.cs`
- Rule: must match `<Name>Constants.cs`
- Same for helpers: must match `<Name>Helpers.cs`
- Violation: files named just `Constants.cs` inside the subfolder

### Check B6: Swagger completeness on controllers
- Glob: `<backend-root>/**/*Controller.cs`
- Rule: every `[HttpGet]/[HttpPost]/[HttpPut]/[HttpDelete]` action must have:
  - `[SwaggerOperation(...)]` attribute
  - `[ProducesResponseType(...)]` attribute
  - An XML doc comment `/// <summary>`
- Violation: action without any of the above
- Fix: add missing Swagger annotations

## Step 3 — Output Report

```
## Backend Convention Check Report
Scanned: <path or "full backend">
Date: <today>

---

### Violations

| Check | File | Issue | Fix |
|-------|------|-------|-----|
| B1    | src/Modules/User/user_service.cs | Not PascalCase | Rename to UserService.cs |
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
