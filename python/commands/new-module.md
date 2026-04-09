Scaffold a new Python FastAPI backend module with boilerplate router, service, and schema files.

## Arguments
$ARGUMENTS must be a module name in snake_case (e.g. `user`, `dev_task`, `test_case`).

If $ARGUMENTS is empty, ask the user for the module name before proceeding.

## Step 1 — Validate

- Module name: `$ARGUMENTS`
- Target root: `src/modules/$ARGUMENTS/`

Check if `src/modules/$ARGUMENTS/` already exists. If it does, stop and inform the user.

Detect the backend root by looking for `src/modules/` relative to the current working directory.
Common locations: `src/modules/`, `app/modules/`. Use whichever exists.

Convert `$ARGUMENTS` to PascalCase for class names (e.g. `dev_task` → `DevTask`).
Use `$PascalName` below to mean this PascalCase form.

## Step 2 — Create folder structure and files

Create the following:

```
src/modules/$ARGUMENTS/
  schemas/
    create_$ARGUMENTS.py
    update_$ARGUMENTS.py
  constants/
    $ARGUMENTS_constants.py
  helpers/
    $ARGUMENTS_helpers.py
  $ARGUMENTS_router.py
  $ARGUMENTS_service.py
  __init__.py
```

### Content for `__init__.py`
```python
from .$ARGUMENTS_router import router as $ARGUMENTS_router

__all__ = ["$ARGUMENTS_router"]
```

### Content for `$ARGUMENTS_service.py`

**Logging / errors:** Every service method wraps its logic in `try/except`. In `except`, call `logger.error(...)` with `exc_info=True` and then re-raise. For expected `HTTPException` paths (e.g. 404), re-raise without an extra `error` log to avoid double-logging.

```python
import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

logger = logging.getLogger(__name__)


class $PascalNameService:
    def __init__(self, db: Session):
        self.db = db

    def find_all(self):
        logger.debug("find_all: called")
        try:
            # TODO: implement
            return []
        except Exception:
            logger.error("find_all: unexpected error", exc_info=True)
            raise

    def find_one(self, item_id: str):
        logger.debug("find_one: id=%s", item_id)
        try:
            # TODO: implement
            item = None
            if not item:
                logger.warning("find_one: not found id=%s", item_id)
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"$PascalName {item_id} not found",
                )
            return item
        except HTTPException:
            raise
        except Exception:
            logger.error("find_one: unexpected error id=%s", item_id, exc_info=True)
            raise

    def create(self, dto):
        logger.debug("create: called")
        try:
            # TODO: implement
            logger.info("create: success")
        except Exception:
            logger.error("create: error", exc_info=True)
            raise

    def update(self, item_id: str, dto):
        logger.debug("update: id=%s", item_id)
        try:
            # TODO: implement
            logger.info("update: success id=%s", item_id)
        except Exception:
            logger.error("update: error id=%s", item_id, exc_info=True)
            raise

    def remove(self, item_id: str):
        logger.debug("remove: id=%s", item_id)
        try:
            # TODO: implement
            logger.info("remove: success id=%s", item_id)
        except Exception:
            logger.error("remove: error id=%s", item_id, exc_info=True)
            raise
```

### Content for `$ARGUMENTS_router.py`
```python
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.modules.$ARGUMENTS.$ARGUMENTS_service import $PascalNameService
from app.modules.$ARGUMENTS.schemas.create_$ARGUMENTS import Create$PascalNameSchema
from app.modules.$ARGUMENTS.schemas.update_$ARGUMENTS import Update$PascalNameSchema

router = APIRouter(
    prefix="/$ARGUMENTS",
    tags=["$PascalName"],
)


@router.get(
    "/",
    summary="List all $ARGUMENTS items",
    description="Returns all $PascalName items.",
)
def find_all(db: Session = Depends(get_db)):
    return $PascalNameService(db).find_all()


@router.get(
    "/{item_id}",
    summary="Get one $ARGUMENTS item",
    description="Returns a single $PascalName by ID.",
)
def find_one(item_id: str, db: Session = Depends(get_db)):
    return $PascalNameService(db).find_one(item_id)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Create $ARGUMENTS item",
    description="Creates a new $PascalName.",
)
def create(dto: Create$PascalNameSchema, db: Session = Depends(get_db)):
    return $PascalNameService(db).create(dto)


@router.put(
    "/{item_id}",
    summary="Update $ARGUMENTS item",
    description="Updates an existing $PascalName by ID.",
)
def update(item_id: str, dto: Update$PascalNameSchema, db: Session = Depends(get_db)):
    return $PascalNameService(db).update(item_id, dto)


@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete $ARGUMENTS item",
    description="Deletes a $PascalName by ID.",
)
def remove(item_id: str, db: Session = Depends(get_db)):
    $PascalNameService(db).remove(item_id)
```

### Content for `schemas/create_$ARGUMENTS.py`
```python
from pydantic import BaseModel, ConfigDict


class Create$PascalNameSchema(BaseModel):
    # TODO: add fields
    name: str

    model_config = ConfigDict(json_schema_extra={"example": {"name": "example"}})
```

### Content for `schemas/update_$ARGUMENTS.py`
```python
from pydantic import BaseModel, ConfigDict


class Update$PascalNameSchema(BaseModel):
    # TODO: add fields (all optional for partial update)
    name: str | None = None

    model_config = ConfigDict(json_schema_extra={"example": {"name": "updated"}})
```

### Content for `constants/$ARGUMENTS_constants.py`
```python
# Constants for the $ARGUMENTS module

# TODO: add constants and enums
# Example:
# from enum import Enum
# class $PascalNameStatus(str, Enum):
#     ACTIVE = "active"
#     INACTIVE = "inactive"
```

### Content for `helpers/$ARGUMENTS_helpers.py`
```python
# Helpers for the $ARGUMENTS module
# Rules: pure functions only — no FastAPI, no SQLAlchemy, no side effects


# TODO: add helper functions
# Example:
# def format_$ARGUMENTS_item(item) -> str:
#     return f"{item.id}: {item.name}"
```

## Step 3 — Extract module docs

Run the `extract-modules` command with `$ARGUMENTS` as the argument to generate the initial doc for the new module.

Wait for completion. Note the path of the doc file written (e.g. `docs/modules/$ARGUMENTS.md`).

## Step 4 — Print summary

After all files and docs are created, output:

```
Module scaffolded: src/modules/$ARGUMENTS/

Files created:
  __init__.py
  $ARGUMENTS_router.py
  $ARGUMENTS_service.py
  schemas/create_$ARGUMENTS.py
  schemas/update_$ARGUMENTS.py
  constants/$ARGUMENTS_constants.py
  helpers/$ARGUMENTS_helpers.py

Docs generated:
  docs/modules/$ARGUMENTS.md

Next steps:
  1. Import and register in main.py: app.include_router($ARGUMENTS_router, prefix="/api/v1")
  2. Create the SQLAlchemy model and add to Base.metadata
  3. Fill in the service methods with actual database queries
  4. Add schema fields with proper Pydantic types
  5. Run /sync-docs any time to keep docs up to date
```
