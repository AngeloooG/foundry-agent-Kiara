namespace WebApp.Api.Models.Cases;

public sealed record CaseSummaryResponse(
    string Id,
    string Title,
    string? Client,
    string? Specialist,
    string? RegisteredAt,
    string? Industry,
    string? Location,
    string? CompanySize,
    string? ProductContext,
    string? Phase,
    string Status,
    IReadOnlyList<string> Technologies,
    IReadOnlyList<string> Tags,
    string? Impact,
    string? DocumentUrl);
