// Template: ASP.NET Core ApiController
// Location: src/Modules/<ModuleName>/<ModuleName>Controller.cs

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace YourApp.Modules.ModuleName;

/// <summary>ModuleName management endpoints</summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ModuleNameController : ControllerBase
{
    private readonly IModuleNameService _service;

    public ModuleNameController(IModuleNameService service)
    {
        _service = service;
    }

    /// <summary>List all ModuleName items</summary>
    [HttpGet]
    [SwaggerOperation(Summary = "List all ModuleName items", Tags = new[] { "ModuleName" })]
    [ProducesResponseType(typeof(IEnumerable<ModuleName>), StatusCodes.Status200OK)]
    public async Task<IActionResult> FindAll()
        => Ok(await _service.FindAllAsync());

    /// <summary>Get one ModuleName item by ID</summary>
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get one ModuleName item", Tags = new[] { "ModuleName" })]
    [ProducesResponseType(typeof(ModuleName), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> FindOne(string id)
        => Ok(await _service.FindOneAsync(id));

    /// <summary>Create a new ModuleName item</summary>
    [HttpPost]
    [SwaggerOperation(Summary = "Create ModuleName item", Tags = new[] { "ModuleName" })]
    [ProducesResponseType(typeof(ModuleName), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateModuleNameDto dto)
    {
        var item = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(FindOne), new { id = item.Id }, item);
    }

    /// <summary>Update an existing ModuleName item</summary>
    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Update ModuleName item", Tags = new[] { "ModuleName" })]
    [ProducesResponseType(typeof(ModuleName), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(string id, [FromBody] UpdateModuleNameDto dto)
        => Ok(await _service.UpdateAsync(id, dto));

    /// <summary>Delete a ModuleName item</summary>
    [HttpDelete("{id}")]
    [SwaggerOperation(Summary = "Delete ModuleName item", Tags = new[] { "ModuleName" })]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Remove(string id)
    {
        await _service.RemoveAsync(id);
        return NoContent();
    }
}
