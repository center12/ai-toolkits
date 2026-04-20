# Template: Pydantic update schema
# Location: src/modules/<module_name>/schemas/update_<module_name>.py
# All fields are optional to support partial updates (PATCH semantics).

from pydantic import BaseModel, ConfigDict


class UpdateModuleNameSchema(BaseModel):
    # TODO: mirror fields from CreateModuleNameSchema but all optional
    name: str | None = None
    description: str | None = None

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "updated name",
            }
        }
    )
