// Template: Service interface
// Location: src/Modules/<ModuleName>/I<ModuleName>Service.cs

namespace YourApp.Modules.ModuleName;

public interface IModuleNameService
{
    Task<IEnumerable<ModuleName>> FindAllAsync();
    Task<ModuleName> FindOneAsync(string id);
    Task<ModuleName> CreateAsync(CreateModuleNameDto dto);
    Task<ModuleName> UpdateAsync(string id, UpdateModuleNameDto dto);
    Task RemoveAsync(string id);
}
