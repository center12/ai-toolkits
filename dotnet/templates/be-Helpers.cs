// Template: Module helpers
// Location: src/Modules/<ModuleName>/Helpers/<ModuleName>Helpers.cs
// Rules: pure static methods only — no DI, no EF Core, no side effects

namespace YourApp.Modules.ModuleName.Helpers;

public static class ModuleNameHelpers
{
    /// <summary>
    /// Format a ModuleName item for display.
    /// Replace with your actual helper logic.
    /// </summary>
    public static string Format(string id, string name)
        => $"{id}: {name}"; // TODO: implement

    /// <summary>
    /// Filter items by some criteria.
    /// Replace with your actual helper logic.
    /// </summary>
    public static IEnumerable<T> Filter<T>(IEnumerable<T> items, string query)
        => items; // TODO: implement
}
