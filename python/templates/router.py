# Template: FastAPI APIRouter
# Location: src/modules/<module_name>/<module_name>_router.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.modules.module_name.module_name_service import ModuleNameService
from app.modules.module_name.schemas.create_module_name import CreateModuleNameSchema
from app.modules.module_name.schemas.update_module_name import UpdateModuleNameSchema

# Add dependencies=[Depends(get_current_user)] to protect all routes
router = APIRouter(
    prefix="/module-name",
    tags=["ModuleName"],
)


@router.get(
    "/",
    summary="List all items",
    description="Returns all ModuleName items.",
)
def find_all(db: Session = Depends(get_db)):
    return ModuleNameService(db).find_all()


@router.get(
    "/{item_id}",
    summary="Get one item",
    description="Returns a single ModuleName by ID.",
)
def find_one(item_id: str, db: Session = Depends(get_db)):
    return ModuleNameService(db).find_one(item_id)


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    summary="Create item",
    description="Creates a new ModuleName.",
)
def create(dto: CreateModuleNameSchema, db: Session = Depends(get_db)):
    return ModuleNameService(db).create(dto)


@router.put(
    "/{item_id}",
    summary="Update item",
    description="Updates an existing ModuleName by ID.",
)
def update(item_id: str, dto: UpdateModuleNameSchema, db: Session = Depends(get_db)):
    return ModuleNameService(db).update(item_id, dto)


@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete item",
    description="Deletes a ModuleName by ID.",
)
def remove(item_id: str, db: Session = Depends(get_db)):
    ModuleNameService(db).remove(item_id)
