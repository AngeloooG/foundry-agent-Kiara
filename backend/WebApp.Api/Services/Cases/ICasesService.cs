using WebApp.Api.Models.Cases;

namespace WebApp.Api.Services.Cases;

public interface ICasesService
{
    Task<CasesCollectionResponse> GetCasesAsync(
        bool forceRefresh,
        CancellationToken cancellationToken);

    Task<CaseDetailResponse?> GetCaseByIdAsync(
        string id,
        CancellationToken cancellationToken);
}
