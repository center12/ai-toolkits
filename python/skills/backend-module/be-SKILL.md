---
name: backend-module
description: Guides Python FastAPI backend development by scanning for reusable services, dependencies, helpers, and schemas before creating new files. Enforces module folder structure and snake_case naming conventions. Triggered when creating modules, services, routers, schemas, helpers, or constants.
---

## When This Skill Applies

Any time you are about to create or modify a backend file — Python module, service, router, schema, helper, or constant.

---

## Rule 1: Scan Before Creating

Before writing any new file, search for existing code that can be reused or imported.

### What to scan

**Shared providers (always check first):**
- `get_db` — SQLAlchemy session via `Depends(get_db)`; never create a new session
- `src/auth/` or `app/auth/` — `get_current_user`, `require_role` dependencies
- `src/common/` or `app/common/` — shared utilities, base classes, exception handlers
- `src/config.py` or `app/settings.py` — pydantic-settings `Settings` object

**Per-module locations:**
- `src/modules/*/helpers/` — existing helper functions
- `src/modules/*/constants/` — existing constants
- `src/modules/*/schemas/` — existing schemas (check before creating a duplicate)

### Decision logic

| Situation | Action |
|-----------|--------|
| Existing dependency/service covers the need | Import and inject via `Depends()` |
| Existing schema partially matches | Extend with inheritance or composition |
| Nothing suitable exists | Create a new file following Rule 2 |

---

## Rule 2: Follow the Module Folder Structure

```
src/modules/<module_name>/
  schemas/                       # Pydantic request/response schemas
  constants/                     # Module constants and enums
  helpers/                       # Pure helper/transform functions
  <module_name>_router.py        # HTTP endpoints (FastAPI APIRouter)
  <module_name>_service.py       # Business logic
  __init__.py
```

---

## Rule 3: Naming Conventions

| File type | Pattern | Example |
|-----------|---------|---------|
| Router | `<name>_router.py` | `user_router.py` |
| Service | `<name>_service.py` | `user_service.py` |
| Create schema | `create_<name>.py` | `create_user.py` |
| Update schema | `update_<name>.py` | `update_user.py` |
| Constants | `<name>_constants.py` | `user_constants.py` |
| Helpers | `<name>_helpers.py` | `user_helpers.py` |

**Class naming**: PascalCase — `UserService`, `CreateUserSchema`, `UserStatus`

**Do not** create root-level `constants.py`, `utils.py`, or `helpers.py` — always place inside the `constants/` or `helpers/` subdirectory with a domain-scoped filename.

---

## Rule 4: Module Registration

When creating a new module:
1. Import the router in `main.py` or `app/router.py`
2. Add `app.include_router(<name>_router, prefix="/api/v1", tags=["<Name>"])`
3. Register any new SQLAlchemy model in `Base.metadata`

---

## Rule 5: Schema Patterns

- Use Pydantic `BaseModel` for all schemas
- Include `model_config = ConfigDict(json_schema_extra={"example": {...}})` for Swagger
- Update schemas use `str | None = None` (all fields optional)
- Keep schemas flat — no nested logic

---

## Rule 6: Swagger / OpenAPI

FastAPI generates OpenAPI docs automatically. Enforce on every route:
- `response_model=` — the Pydantic response schema
- `tags=[...]` — set on the `APIRouter`, not individual routes
- `summary=` — short one-line description
- `description=` — optional longer description

---

## Rule 7: Logging

Use Python `logging` module — never `print()`.

```python
import logging

logger = logging.getLogger(__name__)
```

| Level | When to use |
|-------|-------------|
| `logger.debug()` | Entry into a method, input params for tracing |
| `logger.info()` | Successful operations (created, updated, deleted) |
| `logger.warning()` | Expected but notable conditions (not found, skipped) |
| `logger.error()` | In `except`: unexpected failures, with `exc_info=True` |

- Wrap each service method in `try/except`
- In `except`, call `logger.error(...)` with `exc_info=True` and then re-raise
- Re-raise `HTTPException` without an extra `error` log (it's expected)
- Routers do not log — delegate to the service layer
- Never log sensitive data (passwords, tokens, PII)

---

## Rule 8: Auth Conventions

- Use `Depends(get_current_user)` to protect individual endpoints
- Use `dependencies=[Depends(get_current_user)]` on the `APIRouter` to protect all routes
- Never hardcode auth logic in a service — use the shared dependency

---

## Checklist Before Creating Any File

- [ ] Searched `src/modules/*/` for existing similar services, helpers, schemas
- [ ] Checked if `get_db`, `get_current_user`, or other shared providers apply
- [ ] Confirmed nothing reusable exists before creating a new file
- [ ] Used correct snake_case file naming
- [ ] Placed files in correct subdirectory (`schemas/`, `constants/`, `helpers/`)
- [ ] Registered router in `main.py` (for new modules)
- [ ] Added `logging.getLogger(__name__)` to every service file
- [ ] Every route has `response_model=`, `summary=`, `description=`
- [ ] Every service method has `try/except` with `logger.error(..., exc_info=True)` and re-raise
