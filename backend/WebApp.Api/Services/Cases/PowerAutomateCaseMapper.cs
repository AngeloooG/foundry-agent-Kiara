using System.Text.Json;
using WebApp.Api.Models.Cases;

namespace WebApp.Api.Services.Cases;

public static class PowerAutomateCaseMapper
{
    public static CasesCollectionResponse MapCollection(JsonElement root)
    {
        var payload = TryGetProperty(root, "body", out var body)
            ? UnwrapJsonString(body)
            : UnwrapJsonString(root);

        var items = new List<CaseSummaryResponse>();
        if (TryGetProperty(payload, "items", out var itemsElement))
        {
            itemsElement = UnwrapJsonString(itemsElement);
            if (itemsElement.ValueKind == JsonValueKind.Array)
            {
                foreach (var item in itemsElement.EnumerateArray())
                {
                    items.Add(MapSummary(item));
                }
            }
        }

        var lastUpdated = ParseDateTimeOffset(GetString(payload, "lastUpdatedUtc"))
            ?? DateTimeOffset.UtcNow;

        return new CasesCollectionResponse(items, items.Count, lastUpdated);
    }

    public static CaseDetailResponse MapDetail(JsonElement root)
    {
        var item = TryGetProperty(root, "body", out var body)
            ? UnwrapJsonString(body)
            : UnwrapJsonString(root);

        return new CaseDetailResponse(
            Id: GetRequiredId(item),
            Title: NullIfEmpty(GetString(item, "title")) ?? "Caso sin título",
            Client: NullIfEmpty(GetString(item, "client")),
            Specialist: NullIfEmpty(GetString(item, "specialist")),
            RegisteredAt: NullIfEmpty(GetString(item, "registeredAt")),
            Industry: NullIfEmpty(GetString(item, "industry")),
            Location: NullIfEmpty(GetString(item, "location")),
            CompanySize: NullIfEmpty(GetString(item, "companySize")),
            ProductContext: NullIfEmpty(GetString(item, "productContext")),
            Phase: NullIfEmpty(GetString(item, "phase")),
            Status: ReadStatus(item),
            ExecutiveSummary: NullIfEmpty(GetString(item, "executiveSummary")),
            Problem: NullIfEmpty(GetString(item, "problem")),
            Solution: NullIfEmpty(GetString(item, "solution")),
            StrategicReflection: NullIfEmpty(GetString(item, "strategicReflection")),
            ConsultativeContent: NullIfEmpty(GetString(item, "consultativeContent")),
            Technologies: ReadStringCollection(item, "technologies", "Nombre"),
            Tags: ReadStringCollection(item, "tags", "tag"),
            Results: ReadStringCollection(item, "results", "ResultadoObtenido_RO"),
            Lessons: ReadFlexibleCollection(item, "lessons"),
            Risks: ReadFlexibleCollection(item, "risks"),
            Innovations: ReadFlexibleCollection(item, "innovations"),
            Observations: ReadFlexibleCollection(item, "observations"),
            ImplementedSolutions: ReadFlexibleCollection(item, "implementedSolutions"),
            DocumentUrl: NullIfEmpty(GetString(item, "documentUrl")));
    }

    private static CaseSummaryResponse MapSummary(JsonElement item) =>
        new(
            Id: GetRequiredId(item),
            Title: NullIfEmpty(GetString(item, "title")) ?? "Caso sin título",
            Client: NullIfEmpty(GetString(item, "client")),
            Specialist: NullIfEmpty(GetString(item, "specialist")),
            RegisteredAt: NullIfEmpty(GetString(item, "registeredAt")),
            Industry: NullIfEmpty(GetString(item, "industry")),
            Location: NullIfEmpty(GetString(item, "location")),
            CompanySize: NullIfEmpty(GetString(item, "companySize")),
            ProductContext: NullIfEmpty(GetString(item, "productContext")),
            Phase: NullIfEmpty(GetString(item, "phase")),
            Status: ReadStatus(item),
            Technologies: ReadStringCollection(item, "technologies", "Nombre"),
            Tags: ReadStringCollection(item, "tags", "tag"),
            Impact: ReadObjectString(item, "impact", "ResultadoObtenido_RO"),
            DocumentUrl: NullIfEmpty(GetString(item, "documentUrl")));

    private static string ReadStatus(JsonElement item)
    {
        if (!TryGetProperty(item, "status", out var status)) return "Borrador";
        var normalized = UnwrapJsonString(status);
        if (normalized.ValueKind == JsonValueKind.Object &&
            TryGetProperty(normalized, "Value", out var value))
        {
            return NullIfEmpty(value.ToString()) ?? "Borrador";
        }
        return NullIfEmpty(normalized.ToString()) ?? "Borrador";
    }

    private static string? ReadObjectString(
        JsonElement item,
        string propertyName,
        string nestedPropertyName)
    {
        if (!TryGetProperty(item, propertyName, out var value)) return null;
        value = UnwrapJsonString(value);
        if (value.ValueKind == JsonValueKind.Object &&
            TryGetProperty(value, nestedPropertyName, out var nested))
        {
            return NullIfEmpty(nested.ToString());
        }
        return NullIfEmpty(value.ToString());
    }

    private static IReadOnlyList<string> ReadStringCollection(
        JsonElement item,
        string propertyName,
        string objectPropertyName)
    {
        if (!TryGetProperty(item, propertyName, out var value)) return [];
        value = UnwrapJsonString(value);
        if (value.ValueKind != JsonValueKind.Array) return [];

        return value.EnumerateArray()
            .Select(entry =>
            {
                if (entry.ValueKind == JsonValueKind.String)
                    return NullIfEmpty(entry.GetString());
                if (entry.ValueKind == JsonValueKind.Object &&
                    TryGetProperty(entry, objectPropertyName, out var nested))
                    return NullIfEmpty(nested.ToString());
                return null;
            })
            .Where(value => value is not null)
            .Select(value => value!)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();
    }

    private static IReadOnlyList<string> ReadFlexibleCollection(
        JsonElement item,
        string propertyName)
    {
        if (!TryGetProperty(item, propertyName, out var value)) return [];
        value = UnwrapJsonString(value);
        if (value.ValueKind != JsonValueKind.Array) return [];

        return value.EnumerateArray()
            .Select(entry => entry.ValueKind == JsonValueKind.String
                ? NullIfEmpty(entry.GetString())
                : NullIfEmpty(entry.ToString()))
            .Where(entry => entry is not null)
            .Select(entry => entry!)
            .ToArray();
    }

    private static JsonElement UnwrapJsonString(JsonElement value)
    {
        if (value.ValueKind != JsonValueKind.String) return value;
        var text = value.GetString();
        if (string.IsNullOrWhiteSpace(text)) return value;
        try
        {
            using var document = JsonDocument.Parse(text);
            return document.RootElement.Clone();
        }
        catch (JsonException)
        {
            return value;
        }
    }

    private static string GetRequiredId(JsonElement item)
    {
        var id = GetString(item, "id");
        if (string.IsNullOrWhiteSpace(id))
            throw new CasesIntegrationException("A case returned without an ID.");
        return id;
    }

    private static string? GetString(JsonElement element, string propertyName)
    {
        if (!TryGetProperty(element, propertyName, out var value) ||
            value.ValueKind is JsonValueKind.Null or JsonValueKind.Undefined)
            return null;
        return value.ValueKind == JsonValueKind.String
            ? value.GetString()
            : value.ToString();
    }

    private static bool TryGetProperty(
        JsonElement element,
        string propertyName,
        out JsonElement value)
    {
        if (element.ValueKind == JsonValueKind.Object)
        {
            foreach (var property in element.EnumerateObject())
            {
                if (string.Equals(property.Name, propertyName, StringComparison.OrdinalIgnoreCase))
                {
                    value = property.Value;
                    return true;
                }
            }
        }
        value = default;
        return false;
    }

    private static string? NullIfEmpty(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();

    private static DateTimeOffset? ParseDateTimeOffset(string? value) =>
        DateTimeOffset.TryParse(value, out var parsed) ? parsed : null;
}
