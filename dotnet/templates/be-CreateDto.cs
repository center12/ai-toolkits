// Template: Create DTO
// Location: src/Modules/<ModuleName>/Dtos/Create<ModuleName>Dto.cs

using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace YourApp.Modules.ModuleName.Dtos;

public class CreateModuleNameDto
{
    [Required]
    [SwaggerSchema("The name of the item")]
    public string Name { get; set; } = string.Empty;

    [SwaggerSchema("Optional description")]
    public string? Description { get; set; }

    // TODO: add more fields
    // Common annotations:
    // [StringLength(200)] public string Title { get; set; } = string.Empty;
    // [Range(1, 100)] public int Count { get; set; }
    // [EmailAddress] public string Email { get; set; } = string.Empty;
}
