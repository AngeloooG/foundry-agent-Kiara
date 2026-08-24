namespace WebApp.Api.Options;

public sealed class PowerAutomateOptions
{
    public const string SectionName = "PowerAutomate";
    public const string ValidationMessage =
        "Power Automate cases URLs must be absolute HTTPS URLs; " +
        "CacheSeconds must be between 10 and 3600; " +
        "RequestTimeoutSeconds must be between 5 and 300.";

    public string? CasesListUrl { get; init; }
    public string? CaseDetailUrl { get; init; }
    public int CacheSeconds { get; init; } = 120;
    public int RequestTimeoutSeconds { get; init; } = 120;

    public static bool IsValid(PowerAutomateOptions options) =>
        IsHttpsUrl(options.CasesListUrl) &&
        IsHttpsUrl(options.CaseDetailUrl) &&
        options.CacheSeconds is >= 10 and <= 3600 &&
        options.RequestTimeoutSeconds is >= 5 and <= 300;

    private static bool IsHttpsUrl(string? value) =>
        Uri.TryCreate(value, UriKind.Absolute, out var uri) &&
        uri.Scheme == Uri.UriSchemeHttps;
}
