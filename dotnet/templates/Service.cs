// Template: Service implementation
// Location: src/Modules/<ModuleName>/<ModuleName>Service.cs

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace YourApp.Modules.ModuleName;

public class ModuleNameService : IModuleNameService
{
    private readonly AppDbContext _context;
    private readonly ILogger<ModuleNameService> _logger;

    public ModuleNameService(AppDbContext context, ILogger<ModuleNameService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<IEnumerable<ModuleName>> FindAllAsync()
    {
        _logger.LogDebug("FindAll: called");
        try
        {
            // TODO: implement — e.g. return await _context.ModuleNames.ToListAsync();
            return [];
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "FindAll: unexpected error");
            throw;
        }
    }

    public async Task<ModuleName> FindOneAsync(string id)
    {
        _logger.LogDebug("FindOne: id={Id}", id);
        try
        {
            // TODO: implement — e.g. await _context.ModuleNames.FindAsync(id)
            var item = default(ModuleName);
            if (item is null)
            {
                _logger.LogWarning("FindOne: not found id={Id}", id);
                throw new NotFoundException($"ModuleName {id} not found");
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

    public async Task<ModuleName> CreateAsync(CreateModuleNameDto dto)
    {
        _logger.LogDebug("Create: called");
        try
        {
            // TODO: implement
            // var item = new ModuleName { Name = dto.Name };
            // _context.ModuleNames.Add(item);
            // await _context.SaveChangesAsync();
            var item = default(ModuleName)!;
            _logger.LogInformation("Create: success id={Id}", item.Id);
            return item;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Create: error");
            throw;
        }
    }

    public async Task<ModuleName> UpdateAsync(string id, UpdateModuleNameDto dto)
    {
        _logger.LogDebug("Update: id={Id}", id);
        try
        {
            var item = await FindOneAsync(id); // throws NotFoundException if missing
            // TODO: apply updates
            // if (dto.Name is not null) item.Name = dto.Name;
            // await _context.SaveChangesAsync();
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
            var item = await FindOneAsync(id); // throws NotFoundException if missing
            // _context.ModuleNames.Remove(item);
            // await _context.SaveChangesAsync();
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
