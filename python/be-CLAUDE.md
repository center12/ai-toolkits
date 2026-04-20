# Python Backend Toolkit

Claude Code skills, agents, and commands for Python backend projects (FastAPI + Pydantic + SQLAlchemy).

## Install

```bash
mkdir -p .claude/agents .claude/commands
cp python/agents/*.md .claude/agents/
cp -r python/skills/* ~/.claude/skills/
cp python/commands/*.md .claude/commands/
```

## Contents

### Skills (`skills/`)
| Skill | Trigger | Purpose |
|-------|---------|---------|
| `backend-module` | Creating modules, services, routers, schemas, helpers | Scan before creating; enforce Python module structure |

### Agents (`agents/`)
| Agent | Auto-triggers when... |
|-------|----------------------|
| `backend-dev` | Creating modules, services, routers, schemas, helpers |

### Commands (`commands/`)
| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-module` | `/new-module <name>` | Scaffold a new Python module with boilerplate |
| `/extract-modules` | `/extract-modules [name]` | Extract module docs to `docs/modules/` |
| `/scan-reusables-backend` | `/scan-reusables-backend <task>` | Scan for reusable services, dependencies, schemas |
| `/check-conventions-backend` | `/check-conventions-backend [path]` | Validate folder structure and naming |
| `/analyze-project` | `/analyze-project` | Full project structure analysis |
| `/cross-analysis` | `/cross-analysis` | Cross-module pattern analysis |
| `/sync-docs` | `/sync-docs [--cron <interval>]` | Sync docs or schedule automatic extraction |
| `/final-report` | `/final-report` | Generate a final implementation report |
| `/review-pr` | `/review-pr base=<branch> head=<branch>` | Review code changes between two branches |

---

## Module Folder Structure

```
src/modules/<module_name>/
  schemas/
    create_<module_name>.py
    update_<module_name>.py
  constants/
    <module_name>_constants.py
  helpers/
    <module_name>_helpers.py
  <module_name>_router.py
  <module_name>_service.py
  __init__.py
```

---

## Naming Conventions

| File type | Convention | Example |
|-----------|-----------|---------|
| All files | snake_case | `dev_task_service.py` |
| Classes | PascalCase | `DevTaskService` |
| Functions/variables | snake_case | `find_all`, `module_name` |
| Router | `<name>_router.py` | `dev_task_router.py` |
| Service | `<name>_service.py` | `dev_task_service.py` |
| Create schema | `create_<name>.py` | `create_dev_task.py` |
| Update schema | `update_<name>.py` | `update_dev_task.py` |
| Constants | `<name>_constants.py` | `dev_task_constants.py` |
| Helpers | `<name>_helpers.py` | `dev_task_helpers.py` |

**Never**: `DevTaskService.py`, `devtask_service.py`, `constants.py` at module root.

---

## Key Patterns

### Service
```python
import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException

logger = logging.getLogger(__name__)

class ModuleNameService:
    def __init__(self, db: Session):
        self.db = db

    def find_one(self, item_id: str):
        logger.debug("find_one: id=%s", item_id)
        item = self.db.query(ModuleName).filter(ModuleName.id == item_id).first()
        if not item:
            logger.warning("find_one: not found id=%s", item_id)
            raise HTTPException(status_code=404, detail=f"ModuleName {item_id} not found")
        return item
```

### Schemas (Pydantic)
```python
# schemas/create_<name>.py
from pydantic import BaseModel, ConfigDict

class CreateModuleNameSchema(BaseModel):
    name: str
    description: str | None = None

    model_config = ConfigDict(json_schema_extra={"example": {"name": "example"}})

# schemas/update_<name>.py
from pydantic import BaseModel

class UpdateModuleNameSchema(BaseModel):
    name: str | None = None
    description: str | None = None
```

### Swagger / OpenAPI
FastAPI generates OpenAPI docs automatically. Always include:
- `response_model=` on every route
- `tags=[...]` on every `APIRouter`
- `summary=` and `description=` on every endpoint
- `model_config = ConfigDict(json_schema_extra={"example": {...}})` on every schema

### Auth Conventions
- Use `Depends(get_current_user)` to protect endpoints
- Use `router = APIRouter(dependencies=[Depends(get_current_user)])` to protect all routes in a router
- Use `@router.get("/public", dependencies=[])` to explicitly expose an endpoint

### Logging Levels
- `logger.debug` — method entry with key params
- `logger.info` — successful mutations with result ID
- `logger.warning` — expected failures (not found, skipped)
- `logger.error` — caught exceptions with `exc_info=True`
- Routers do not log — delegate to services
- Never log sensitive data (passwords, tokens, PII)

### Module Registration
After creating a new module:
1. Import the router in `main.py` or `app/router.py`
2. Add `app.include_router(module_router, prefix="/api/v1")`
3. Register any new dependency in the DI setup

### Well-Known Shared Providers (scan before creating)
- `db: Session` — SQLAlchemy session via `Depends(get_db)`, never create a new one
- `get_current_user` — FastAPI dependency for auth
- `settings` — pydantic-settings config object
- `get_db` — database session factory
