---
name: backend-module
description: Guides ASP.NET Core backend development by scanning for reusable services, interfaces, middleware, helpers, and providers before creating new files. Enforces module folder structure and PascalCase naming conventions. Triggered when creating modules, services, controllers, DTOs, helpers, or constants.
---

## When This Skill Applies

Any time you are about to create or modify a backend file — .NET module, service, controller, DTO, helper, or constant.

---

## Rule 1: Scan Before Creating

Before writing any new file, search for existing code that can be reused or imported.

### What to scan

**Shared providers (always check first):**
- `AppDbContext` — EF Core context; never create a new one, inject via constructor
- `src/Auth/` or `src/Common/Auth/` — `[Authorize]`, `[AllowAnonymous]`, `ICurrentUserService`
- `src/Common/` — shared base classes, exception types, middleware
- `IMapper` — AutoMapper instance (if configured)

**Per-module locations:**
- `src/Modules/*/Helpers/` — existing helper methods
- `src/Modules/*/Constants/` — existing constants
- `src/Modules/*/Dtos/` — existing DTOs (check before creating a duplicate)

### Decision logic

| Situation | Action |
|-----------|--------|
| Existing service/interface covers the need | Inject via constructor DI |
| Existing DTO partially matches | Inherit or compose with existing |
| Nothing suitable exists | Create a new file following Rule 2 |

---

## Rule 2: Follow the Module Folder Structure

```
src/Modules/<ModuleName>/
  Dtos/                              # Request/response DTOs
  Constants/                         # Module constants and enums
  Helpers/                           # Pure static helper methods
  <ModuleName>Controller.cs          # HTTP endpoints ([ApiController])
  <ModuleName>Service.cs             # Business logic implementation
  I<ModuleName>Service.cs            # Service interface
  <ModuleName>ServiceExtensions.cs   # DI registration
```

---

## Rule 3: Naming Conventions

| File type | Pattern | Example |
|-----------|---------|---------|
| Controller | `<Name>Controller.cs` | `UserController.cs` |
| Service | `<Name>Service.cs` | `UserService.cs` |
| Interface | `I<Name>Service.cs` | `IUserService.cs` |
| Create DTO | `Create<Name>Dto.cs` | `CreateUserDto.cs` |
| Update DTO | `Update<Name>Dto.cs` | `UpdateUserDto.cs` |
| Constants | `<Name>Constants.cs` | `UserConstants.cs` |
| Helpers | `<Name>Helpers.cs` | `UserHelpers.cs` |
| Registration | `<Name>ServiceExtensions.cs` | `UserServiceExtensions.cs` |

**Class naming**: PascalCase — `UserService`, `CreateUserDto`, `IUserService`
**Private fields**: `_camelCase` — `_context`, `_logger`, `_mapper`

**Do not** create root-level `Constants.cs`, `Utils.cs`, or `Helpers.cs` — always place inside the `Constants/` or `Helpers/` subdirectory with a module-scoped filename.

---

## Rule 4: Module Registration

When creating a new module:
1. Implement `<ModuleName>ServiceExtensions.cs` with `AddModuleNameModule(this IServiceCollection services)` extension method
2. Register the service: `services.AddScoped<IModuleNameService, ModuleNameService>()`
3. Call `services.AddModuleNameModule()` in `Program.cs`
4. Add any new EF Core entity to `AppDbContext`
5. Ensure `app.MapControllers()` is called in `Program.cs` (usually already global)

---

## Rule 5: DTO Patterns

- Use `[Required]` for mandatory fields
- Use `[SwaggerSchema("description")]` for Swagger docs
- Use `[StringLength]`, `[Range]`, `[EmailAddress]` for validation
- Update DTOs have all fields nullable (optional updates)
- Keep DTOs flat — no nested logic

---

## Rule 6: Swagger / OpenAPI

Swashbuckle.AspNetCore is the standard. Enforce on every controller action:
- XML doc comment (`/// <summary>`) on the action method
- `[SwaggerOperation(Summary = "...", Tags = new[] { "ModuleName" })]`
- `[ProducesResponseType(typeof(T), StatusCodes.Status200OK)]` for success
- `[ProducesResponseType(StatusCodes.Status404NotFound)]` for possible 404

Also in `ServiceExtensions.cs`:
```csharp
services.AddSwaggerGen(c =>
{
    c.EnableAnnotations();
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
```

---

## Rule 7: Logging

Use `ILogger<T>` — never `Console.WriteLine`.

```csharp
private readonly ILogger<ModuleNameService> _logger;

_logger.LogDebug("FindOne: id={Id}", id);
_logger.LogInformation("Create: success id={Id}", item.Id);
_logger.LogWarning("FindOne: not found id={Id}", id);
_logger.LogError(ex, "Create: failed");
```

- Wrap each service method in `try/catch`
- In `catch`, call `_logger.LogError(ex, "MethodName: message", args)` then re-throw
- Re-throw known exceptions (e.g. `NotFoundException`) without extra `LogError`
- Controllers do not log — delegate to services
- Never log sensitive data

---

## Rule 8: Auth Conventions

- Apply `[Authorize]` at the **controller class level** to protect all endpoints
- Use `[AllowAnonymous]` on individual actions to expose them publicly
- Inject `ICurrentUserService` to access the authenticated user's ID/claims
- Never hardcode auth logic in a service

---

## Checklist Before Creating Any File

- [ ] Searched `src/Modules/*/` for existing similar services, helpers, DTOs
- [ ] Checked if `AppDbContext`, `[Authorize]`, or other shared providers apply
- [ ] Confirmed nothing reusable exists before creating a new file
- [ ] Used correct PascalCase file naming
- [ ] Placed files in correct subdirectory (`Dtos/`, `Constants/`, `Helpers/`)
- [ ] Created both `IService.cs` and `Service.cs`
- [ ] Created `ServiceExtensions.cs` with DI registration
- [ ] Added `Program.cs` registration step to summary
- [ ] Every action has `[SwaggerOperation]`, `[ProducesResponseType]`, and XML doc comment
- [ ] Every service has `private readonly ILogger<ClassName> _logger`
- [ ] Every service method has `try/catch` with `_logger.LogError(ex, ...)` and re-throw
