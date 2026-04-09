# .NET Backend Toolkit

Claude Code skills, agents, and commands for .NET backend projects (ASP.NET Core 8 + Entity Framework Core).

## Install

```bash
mkdir -p .claude/agents .claude/commands
cp dotnet/agents/*.md .claude/agents/
cp -r dotnet/skills/* ~/.claude/skills/
cp dotnet/commands/*.md .claude/commands/
```

## Contents

### Skills (`skills/`)
| Skill | Trigger | Purpose |
|-------|---------|---------|
| `backend-module` | Creating modules, services, controllers, DTOs, helpers | Scan before creating; enforce .NET module structure |

### Agents (`agents/`)
| Agent | Auto-triggers when... |
|-------|----------------------|
| `backend-dev` | Creating modules, services, controllers, DTOs, helpers |

### Commands (`commands/`)
| Command | Usage | Purpose |
|---------|-------|---------|
| `/new-module` | `/new-module <Name>` | Scaffold a new .NET module with boilerplate |
| `/extract-modules` | `/extract-modules [Name]` | Extract module docs to `docs/modules/` |
| `/scan-reusables-backend` | `/scan-reusables-backend <task>` | Scan for reusable services, interfaces, DTOs |
| `/check-conventions-backend` | `/check-conventions-backend [path]` | Validate folder structure and naming |
| `/analyze-project` | `/analyze-project` | Full project structure analysis |
| `/cross-analysis` | `/cross-analysis` | Cross-module pattern analysis |
| `/sync-docs` | `/sync-docs [--cron <interval>]` | Sync docs or schedule automatic extraction |
| `/final-report` | `/final-report` | Generate a final implementation report |
| `/review-pr` | `/review-pr base=<branch> head=<branch>` | Review code changes between two branches |

---

## Module Folder Structure

```
src/Modules/<ModuleName>/
  Dtos/
    Create<ModuleName>Dto.cs
    Update<ModuleName>Dto.cs
  Constants/
    <ModuleName>Constants.cs
  Helpers/
    <ModuleName>Helpers.cs
  <ModuleName>Controller.cs
  <ModuleName>Service.cs
  I<ModuleName>Service.cs
  <ModuleName>ServiceExtensions.cs
```

---

## Naming Conventions

| File type | Convention | Example |
|-----------|-----------|---------|
| All files | PascalCase | `DevTaskService.cs` |
| Classes | PascalCase | `DevTaskService` |
| Interfaces | `I<Name>` | `IDevTaskService` |
| Methods/Properties | PascalCase | `FindAll`, `ItemId` |
| Private fields | `_camelCase` | `_context`, `_logger` |
| Controller | `<Name>Controller.cs` | `DevTaskController.cs` |
| Service | `<Name>Service.cs` | `DevTaskService.cs` |
| Interface | `I<Name>Service.cs` | `IDevTaskService.cs` |
| Create DTO | `Create<Name>Dto.cs` | `CreateDevTaskDto.cs` |
| Update DTO | `Update<Name>Dto.cs` | `UpdateDevTaskDto.cs` |
| Constants | `<Name>Constants.cs` | `DevTaskConstants.cs` |
| Helpers | `<Name>Helpers.cs` | `DevTaskHelpers.cs` |
| Registration | `<Name>ServiceExtensions.cs` | `DevTaskServiceExtensions.cs` |

**Never**: `devtask_service.cs`, `devtaskservice.cs`, `Constants.cs` at module root.

---

## Key Patterns

### Service
```csharp
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

public class ModuleNameService : IModuleNameService
{
    private readonly AppDbContext _context;
    private readonly ILogger<ModuleNameService> _logger;

    public ModuleNameService(AppDbContext context, ILogger<ModuleNameService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ModuleName?> FindOneAsync(string id)
    {
        _logger.LogDebug("FindOne: id={Id}", id);
        var item = await _context.ModuleNames.FindAsync(id);
        if (item is null)
        {
            _logger.LogWarning("FindOne: not found id={Id}", id);
            throw new NotFoundException($"ModuleName {id} not found");
        }
        return item;
    }
}
```

### DTOs with Swagger
```csharp
// Dtos/Create<Name>Dto.cs
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

public class CreateModuleNameDto
{
    [Required]
    [SwaggerSchema("The name of the item")]
    public string Name { get; set; } = string.Empty;

    [SwaggerSchema("Optional description")]
    public string? Description { get; set; }
}
```

### Swagger / OpenAPI
Swashbuckle.AspNetCore is the standard library. Always include:
- XML doc comments (`/// <summary>`) on every controller action
- `[ProducesResponseType(typeof(ModuleNameDto), StatusCodes.Status200OK)]` on every action
- `[SwaggerOperation(Summary = "...", Tags = new[]{"ModuleName"})]` on every action
- `ServiceExtensions.cs` wires up `AddSwaggerGen` with XML comments enabled

### Auth Conventions
- Use `[Authorize]` on the controller class to protect all endpoints
- Use `[AllowAnonymous]` on individual actions to expose them publicly
- Inject `ICurrentUserService` to access the current user in services

### Logging Levels
- `LogDebug` — method entry with key params
- `LogInformation` — successful mutations with result ID
- `LogWarning` — expected failures (not found, skipped)
- `LogError` — caught exceptions (pass the exception as first arg)
- Controllers do not log — delegate to services
- Never log sensitive data (passwords, tokens, PII)

### Module Registration
After creating a new module:
1. Call `services.AddModuleNameModule()` in `Program.cs`
2. Map the controller endpoints: `app.MapControllers()` (already global)
3. Add any new EF Core entities to `AppDbContext`

### Well-Known Shared Providers (scan before creating)
- `AppDbContext` — EF Core context, never create a new one
- `[Authorize]` — attribute-based auth guard
- `ICurrentUserService` — current authenticated user
- `IMapper` — AutoMapper instance
