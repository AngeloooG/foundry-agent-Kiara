using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using WebApp.Api.Models.Cases;
using WebApp.Api.Options;

namespace WebApp.Api.Services.Cases;

public sealed class CasesService : ICasesService
{
    private const string CasesListCacheKey = "cases:list";
    private const string CacheGenerationKey = "cases:generation";

    private readonly IPowerAutomateCasesClient _client;
    private readonly IMemoryCache _cache;
    private readonly PowerAutomateOptions _options;
    private readonly ILogger<CasesService> _logger;

    public CasesService(
        IPowerAutomateCasesClient client,
        IMemoryCache cache,
        IOptions<PowerAutomateOptions> options,
        ILogger<CasesService> logger)
    {
        _client = client;
        _cache = cache;
        _options = options.Value;
        _logger = logger;
    }

    public async Task<CasesCollectionResponse> GetCasesAsync(
        bool forceRefresh,
        CancellationToken cancellationToken)
    {
        if (!forceRefresh &&
            _cache.TryGetValue(CasesListCacheKey, out CasesCollectionResponse? cached) &&
            cached is not null)
        {
            _logger.LogDebug(
                "Cases list cache hit. Total cases: {Total}",
                cached.Total);
            return cached;
        }

        _logger.LogDebug(
            "Cases list cache {CacheState}",
            forceRefresh ? "refresh requested" : "miss");

        var source = await _client.GetCasesAsync(cancellationToken);
        var response = PowerAutomateCaseMapper.MapCollection(source);
        var ttl = GetTtl();

        if (forceRefresh)
        {
            var nextGeneration = GetGeneration() + 1;
            _cache.Set(CacheGenerationKey, nextGeneration, ttl);
            _logger.LogInformation(
                "Cases cache generation advanced to {Generation}",
                nextGeneration);
        }

        _cache.Set(CasesListCacheKey, response, ttl);
        _logger.LogInformation(
            "Cases list cache stored. Total cases: {Total}; TTL seconds: {TtlSeconds}",
            response.Total,
            (int)ttl.TotalSeconds);

        return response;
    }

    public async Task<CaseDetailResponse?> GetCaseByIdAsync(
        string id,
        CancellationToken cancellationToken)
    {
        var generation = GetGeneration();
        var cacheKey = $"cases:detail:{generation}:{id}";

        if (_cache.TryGetValue(cacheKey, out CaseDetailResponse? cached) &&
            cached is not null)
        {
            _logger.LogDebug(
                "Case detail cache hit. Case ID: {CaseId}; Generation: {Generation}",
                id,
                generation);
            return cached;
        }

        _logger.LogDebug(
            "Case detail cache miss. Case ID: {CaseId}; Generation: {Generation}",
            id,
            generation);

        var source = await _client.GetCaseByIdAsync(id, cancellationToken);
        if (source is null)
        {
            _logger.LogInformation("Case not found. Case ID: {CaseId}", id);
            return null;
        }

        var response = PowerAutomateCaseMapper.MapDetail(source.Value);
        _cache.Set(cacheKey, response, GetTtl());
        return response;
    }

    private int GetGeneration() =>
        _cache.TryGetValue(CacheGenerationKey, out int generation)
            ? generation
            : 0;

    private TimeSpan GetTtl() =>
        TimeSpan.FromSeconds(_options.CacheSeconds);
}
