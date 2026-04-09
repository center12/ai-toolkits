// Template: Update DTO
// Location: src/Modules/<ModuleName>/Dtos/Update<ModuleName>Dto.cs
// All fields are nullable to support partial updates (PATCH semantics).

using Swashbuckle.AspNetCore.Annotations;

namespace YourApp.Modules.ModuleName.Dtos;

public class UpdateModuleNameDto
{
    [SwaggerSchema("New name (optional)")]
    public string? Name { get; set; }

    [SwaggerSchema("New description (optional)")]
    public string? Description { get; set; }

    // TODO: mirror nullable versions of fields from CreateModuleNameDto
}
