using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Options;
using WebApp.Api.Options;

namespace WebApp.Api.Services.Cases;

public sealed class PowerAutomateCasesClient : IPowerAutomateCasesClient
{
    private readonly HttpClient _httpClient;
    private readonly PowerAutomateOptions _options;
    private readonly ILogger<PowerAutomateCasesClient> _logger;

    public PowerAutomateCasesClient(
        HttpClient httpClient,
        IOptions<PowerAutomateOptions> options,
        ILogger<PowerAutomateCasesClient> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;

        var timeoutSeconds = Math.Clamp(_options.RequestTimeoutSeconds, 5, 300);
        _httpClient.Timeout = TimeSpan.FromSeconds(timeoutSeconds);
    }

    public async Task<JsonElement> GetCasesAsync(
    CancellationToken cancellationToken)
    {
        var url = RequireUrl(
            _options.CasesListUrl,
            "cases list"
        );

        var result = await GetJsonAsync(
            url,
            allowNotFound: false,
            cancellationToken
        );

        return result
            ?? throw new CasesIntegrationException(
                "The cases data source returned no content."
            );
    }

    public async Task<JsonElement?> GetCaseByIdAsync(
        string id,
        CancellationToken cancellationToken)
    {
        var baseUrl = RequireUrl(_options.CaseDetailUrl, "case detail");
        var separator = baseUrl.Contains('?', StringComparison.Ordinal) ? '&' : '?';
        var url = $"{baseUrl}{separator}caseId={Uri.EscapeDataString(id)}";
        return await GetJsonAsync(url, allowNotFound: true, cancellationToken);
    }

    private async Task<JsonElement?> GetJsonAsync(
        string url,
        bool allowNotFound,
        CancellationToken cancellationToken)
    {
        try
        {
            using var response = await _httpClient.GetAsync(url, cancellationToken);

            if (allowNotFound && response.StatusCode == HttpStatusCode.NotFound)
            {
                return null;
            }

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogWarning(
                    "Power Automate cases request failed with status {StatusCode}",
                    (int)response.StatusCode);

                throw new CasesIntegrationException(
                    "The cases data source returned an unsuccessful response.",
                    response.StatusCode);
            }

            await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
            using var document = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken);
            return document.RootElement.Clone();
        }
        catch (TaskCanceledException ex) when (!cancellationToken.IsCancellationRequested)
        {
            throw new CasesIntegrationException(
                "The cases data source timed out.",
                HttpStatusCode.GatewayTimeout,
                ex);
        }
        catch (JsonException ex)
        {
            throw new CasesIntegrationException(
                "The cases data source returned invalid JSON.",
                HttpStatusCode.BadGateway,
                ex);
        }
        catch (HttpRequestException ex)
        {
            throw new CasesIntegrationException(
                "The cases data source could not be reached.",
                ex.StatusCode,
                ex);
        }
    }

    private static string RequireUrl(string? value, string resourceName)
    {
        if (string.IsNullOrWhiteSpace(value) ||
            !Uri.TryCreate(value, UriKind.Absolute, out _))
        {
            throw new CasesIntegrationException(
                $"The {resourceName} data source is not configured.",
                HttpStatusCode.ServiceUnavailable);
        }

        return value;
    }
}
