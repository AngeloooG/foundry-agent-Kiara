namespace WebApp.Api.Options;

public sealed class PowerAutomateOptions
{
    public const string SectionName = "PowerAutomate";

    public string? CasesListUrl { get; init; }
    public string? CaseDetailUrl { get; init; }
    public int CacheSeconds { get; init; } = 120;
    public int RequestTimeoutSeconds { get; init; } = 120;
}
