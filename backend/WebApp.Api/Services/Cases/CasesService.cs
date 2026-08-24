using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using WebApp.Api.Models.Cases;
using WebApp.Api.Options;

namespace WebApp.Api.Services.Cases;

public sealed class CasesService : ICasesService
{
    private const string CasesListCacheKey = "cases:list";

    private readonly IPowerAutomateCasesClient _client;
    private readonly IMemoryCache _cache;
    private readonly PowerAutomateOptions _options;

    public CasesService(
        IPowerAutomateCasesClient client,
        IMemoryCache cache,
        IOptions<PowerAutomateOptions> options)
    {
        _client = client;
        _cache = cache;
        _options = options.Value;
    }

    public async Task<CasesCollectionResponse> GetCasesAsync(
        bool forceRefresh,
        CancellationToken cancellationToken)
    {
        if (!forceRefresh &&
            _cache.TryGetValue(CasesListCacheKey, out CasesCollectionResponse? cached) &&
            cached is not null)
        {
            return cached;
        }

        var source = await _client.GetCasesAsync(cancellationToken);
        var response = PowerAutomateCaseMapper.MapCollection(source);
        var ttl = TimeSpan.FromSeconds(Math.Clamp(_options.CacheSeconds, 10, 3600));
        _cache.Set(CasesListCacheKey, response, ttl);
        return response;
    }

    public async Task<CaseDetailResponse?> GetCaseByIdAsync(
        string id,
        CancellationToken cancellationToken)
    {
        var cacheKey = $"cases:detail:{id}";
        if (_cache.TryGetValue(cacheKey, out CaseDetailResponse? cached) &&
            cached is not null)
        {
            return cached;
        }

        var source = await _client.GetCaseByIdAsync(id, cancellationToken);
        if (source is null) return null;

        var response = PowerAutomateCaseMapper.MapDetail(source.Value);
        var ttl = TimeSpan.FromSeconds(Math.Clamp(_options.CacheSeconds, 10, 3600));
        _cache.Set(cacheKey, response, ttl);
        return response;
    }
}
