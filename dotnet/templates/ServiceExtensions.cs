// Template: DI registration (equivalent to NestJS module.ts)
// Location: src/Modules/<ModuleName>/<ModuleName>ServiceExtensions.cs
// Call services.AddModuleNameModule() in Program.cs

using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace YourApp.Modules.ModuleName;

public static class ModuleNameServiceExtensions
{
    /// <summary>
    /// Register ModuleName module services in the DI container.
    /// Call this in Program.cs: builder.Services.AddModuleNameModule()
    /// </summary>
    public static IServiceCollection AddModuleNameModule(this IServiceCollection services)
    {
        services.AddScoped<IModuleNameService, ModuleNameService>();

        // TODO: register additional services if needed
        // services.AddScoped<IModuleNameRepository, ModuleNameRepository>();

        return services;
    }

    /// <summary>
    /// Configure Swagger/OpenAPI with XML comments and annotations.
    /// Call this once in Program.cs (not per module) — shown here as a reference.
    /// </summary>
    public static IServiceCollection AddSwaggerWithAnnotations(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.EnableAnnotations();

            // Include XML doc comments
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            if (File.Exists(xmlPath))
                c.IncludeXmlComments(xmlPath);

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Enter your JWT token",
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                    },
                    Array.Empty<string>()
                }
            });
        });

        return services;
    }
}
