# Template: Pydantic create schema
# Location: src/modules/<module_name>/schemas/create_<module_name>.py

from pydantic import BaseModel, ConfigDict


class CreateModuleNameSchema(BaseModel):
    # TODO: add fields with appropriate types
    name: str
    description: str | None = None

    # Common field types:
    # email: EmailStr  (from pydantic import EmailStr)
    # status: ModuleNameStatus  (use Enum from constants)
    # count: int = 0
    # is_active: bool = True
    # tags: list[str] = []

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "example name",
                "description": "optional description",
            }
        }
    )
