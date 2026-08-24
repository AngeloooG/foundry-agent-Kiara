namespace WebApp.Api.Models.Cases;

public sealed record CasesCollectionResponse(
    IReadOnlyList<CaseSummaryResponse> Items,
    int Total,
    DateTimeOffset LastUpdatedUtc);
