Scaffold a new ASP.NET Core backend module with boilerplate controller, service, interface, and DTO files.

## Arguments
$ARGUMENTS must be a module name in PascalCase (e.g. `User`, `DevTask`, `TestCase`).

If $ARGUMENTS is empty, ask the user for the module name before proceeding.

## Step 1 — Validate

- Module name: `$ARGUMENTS`
- Target root: `src/Modules/$ARGUMENTS/`

Check if `src/Modules/$ARGUMENTS/` already exists. If it does, stop and inform the user.

Detect the backend root by looking for `src/Modules/` relative to the current working directory.
Common locations: `src/Modules/`, `Api/Modules/`. Use whichever exists.

The PascalCase module name is `$ARGUMENTS` (used as-is for class names).
Derive the kebab-case route prefix by converting PascalCase to kebab (e.g. `DevTask` → `dev-task`).

## Step 2 — Create folder structure and files

Create the following:

```
src/Modules/$ARGUMENTS/
  Dtos/
    Create$ARGUMENTSDto.cs
    Update$ARGUMENTSDto.cs
  Constants/
    $ARGUMENTSConstants.cs
  Helpers/
    $ARGUMENTSHelpers.cs
  $ARGUMENTSController.cs
  $ARGUMENTSService.cs
  I$ARGUMENTSService.cs
  $ARGUMENTSServiceExtensions.cs
```

### Content for `I$ARGUMENTSService.cs`
```csharp
namespace YourApp.Modules.$ARGUMENTS;

public interface I$ARGUMENTSService
{
    Task<IEnumerable<$ARGUMENTS>> FindAllAsync();
    Task<$ARGUMENTS> FindOneAsync(string id);
    Task<$ARGUMENTS> CreateAsync(Create$ARGUMENTSDto dto);
    Task<$ARGUMENTS> UpdateAsync(string id, Update$ARGUMENTSDto dto);
    Task RemoveAsync(string id);
}
```

### Content for `$ARGUMENTSService.cs`
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace YourApp.Modules.$ARGUMENTS;

public class $ARGUMENTSService : I$ARGUMENTSService
{
    private readonly AppDbContext _context;
    private readonly ILogger<$ARGUMENTSService> _logger;

    public $ARGUMENTSService(AppDbContext context, ILogger<$ARGUMENTSService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<$ARGUMENTS>> FindAllAsync()
    {
        _logger.LogDebug("FindAll: called");
        try
        {
            // TODO: implement
            return [];
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "FindAll: unexpected error");
            throw;
        }
    }

    public async Task<$ARGUMENTS> FindOneAsync(string id)
    {
        _logger.LogDebug("FindOne: id={Id}", id);
        try
        {
            // TODO: implement
            var item = default($ARGUMENTS);
            if (item is null)
            {
                _logger.LogWarning("FindOne: not found id={Id}", id);
                throw new NotFoundException($"$ARGUMENTS {id} not found");
            }
            return item;
        }
        catch (NotFoundException) { throw; }
        catch (Exception ex)
        {
            _logger.LogError(ex, "FindOne: unexpected error id={Id}", id);
            throw;
        }
    }

    public async Task<$ARGUMENTS> CreateAsync(Create$ARGUMENTSDto dto)
    {
        _logger.LogDebug("Create: called");
        try
        {
            // TODO: implement
            var item = default($ARGUMENTS)!;
            _logger.LogInformation("Create: success id={Id}", item.Id);
            return item;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Create: error");
            throw;
        }
    }

    public async Task<$ARGUMENTS> UpdateAsync(string id, Update$ARGUMENTSDto dto)
    {
        _logger.LogDebug("Update: id={Id}", id);
        try
        {
            // TODO: implement
            var item = default($ARGUMENTS)!;
            _logger.LogInformation("Update: success id={Id}", id);
            return item;
        }
        catch (NotFoundException) { throw; }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Update: error id={Id}", id);
            throw;
        }
    }

    public async Task RemoveAsync(string id)
    {
        _logger.LogDebug("Remove: id={Id}", id);
        try
        {
            // TODO: implement
            _logger.LogInformation("Remove: success id={Id}", id);
        }
        catch (NotFoundException) { throw; }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Remove: error id={Id}", id);
            throw;
        }
    }
}
```

### Content for `$ARGUMENTSController.cs`
```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace YourApp.Modules.$ARGUMENTS;

/// <summary>$ARGUMENTS management endpoints</summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class $ARGUMENTSController : ControllerBase
{
    private readonly I$ARGUMENTSService _service;

    public $ARGUMENTSController(I$ARGUMENTSService service)
    {
        _service = service;
    }

    /// <summary>List all $ARGUMENTS items</summary>
    [HttpGet]
    [SwaggerOperation(Summary = "List all $ARGUMENTS items", Tags = new[] { "$ARGUMENTS" })]
    [ProducesResponseType(typeof(IEnumerable<$ARGUMENTS>), StatusCodes.Status200OK)]
    public async Task<IActionResult> FindAll()
        => Ok(await _service.FindAllAsync());

    /// <summary>Get one $ARGUMENTS item by ID</summary>
    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get one $ARGUMENTS item", Tags = new[] { "$ARGUMENTS" })]
    [ProducesResponseType(typeof($ARGUMENTS), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> FindOne(string id)
        => Ok(await _service.FindOneAsync(id));

    /// <summary>Create a new $ARGUMENTS item</summary>
    [HttpPost]
    [SwaggerOperation(Summary = "Create $ARGUMENTS item", Tags = new[] { "$ARGUMENTS" })]
    [ProducesResponseType(typeof($ARGUMENTS), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] Create$ARGUMENTSDto dto)
    {
        var item = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(FindOne), new { id = item.Id }, item);
    }

    /// <summary>Update an existing $ARGUMENTS item</summary>
    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Update $ARGUMENTS item", Tags = new[] { "$ARGUMENTS" })]
    [ProducesResponseType(typeof($ARGUMENTS), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(string id, [FromBody] Update$ARGUMENTSDto dto)
        => Ok(await _service.UpdateAsync(id, dto));

    /// <summary>Delete a $ARGUMENTS item</summary>
    [HttpDelete("{id}")]
    [SwaggerOperation(Summary = "Delete $ARGUMENTS item", Tags = new[] { "$ARGUMENTS" })]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Remove(string id)
    {
        await _service.RemoveAsync(id);
        return NoContent();
    }
}
```

### Content for `Dtos/Create$ARGUMENTSDto.cs`
```csharp
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace YourApp.Modules.$ARGUMENTS.Dtos;

public class Create$ARGUMENTSDto
{
    [Required]
    [SwaggerSchema("The name of the $ARGUMENTS item")]
    public string Name { get; set; } = string.Empty;

    // TODO: add more fields
}
```

### Content for `Dtos/Update$ARGUMENTSDto.cs`
```csharp
using Swashbuckle.AspNetCore.Annotations;

namespace YourApp.Modules.$ARGUMENTS.Dtos;

public class Update$ARGUMENTSDto
{
    [SwaggerSchema("New name (optional)")]
    public string? Name { get; set; }

    // TODO: add more optional fields
}
```

### Content for `Constants/$ARGUMENTSConstants.cs`
```csharp
namespace YourApp.Modules.$ARGUMENTS.Constants;

// TODO: add module-specific constants and enums
// Example:
// public static class $ARGUMENTSConstants
// {
//     public const int MaxItems = 100;
// }
//
// public enum $ARGUMENTSStatus
// {
//     Active,
//     Inactive,
// }
```

### Content for `Helpers/$ARGUMENTSHelpers.cs`
```csharp
namespace YourApp.Modules.$ARGUMENTS.Helpers;

// Rules: pure static methods only — no DI, no EF Core, no side effects
public static class $ARGUMENTSHelpers
{
    // TODO: add helper methods
    // Example:
    // public static string Format(string id, string name) => $"{id}: {name}";
}
```

### Content for `$ARGUMENTSServiceExtensions.cs`
```csharp
using Microsoft.Extensions.DependencyInjection;

namespace YourApp.Modules.$ARGUMENTS;

public static class $ARGUMENTSServiceExtensions
{
    public static IServiceCollection Add$ARGUMENTSModule(this IServiceCollection services)
    {
        services.AddScoped<I$ARGUMENTSService, $ARGUMENTSService>();
        return services;
    }
}
```

## Step 3 — Extract module docs

Run the `be-extract-modules` command with `$ARGUMENTS` as the argument to generate the initial doc for the new module.

Wait for completion. Note the path of the doc file written (e.g. `docs/modules/$ARGUMENTS.md`).

## Step 4 — Print summary

After all files and docs are created, output:

```
Module scaffolded: src/Modules/$ARGUMENTS/

Files created:
  I$ARGUMENTSService.cs
  $ARGUMENTSService.cs
  $ARGUMENTSController.cs
  $ARGUMENTSServiceExtensions.cs
  Dtos/Create$ARGUMENTSDto.cs
  Dtos/Update$ARGUMENTSDto.cs
  Constants/$ARGUMENTSConstants.cs
  Helpers/$ARGUMENTSHelpers.cs

Docs generated:
  docs/modules/$ARGUMENTS.md

Next steps:
  1. Add services.Add$ARGUMENTSModule() to Program.cs
  2. Create the EF Core entity and add to AppDbContext
  3. Fill in the service methods with actual database queries
  4. Add DTO fields and validation attributes
  5. Run /be-sync-docs any time to keep docs up to date
```
