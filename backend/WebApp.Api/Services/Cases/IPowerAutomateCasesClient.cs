using System.Text.Json;

namespace WebApp.Api.Services.Cases;

public interface IPowerAutomateCasesClient
{
    Task<JsonElement> GetCasesAsync(CancellationToken cancellationToken);
    Task<JsonElement?> GetCaseByIdAsync(string id, CancellationToken cancellationToken);
}
