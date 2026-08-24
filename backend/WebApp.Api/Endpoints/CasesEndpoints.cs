using System.Net;
using WebApp.Api.Services.Cases;

namespace WebApp.Api.Endpoints;

public static class CasesEndpoints
{
    public static IEndpointRouteBuilder MapCasesEndpoints(
        this IEndpointRouteBuilder endpoints,
        string authorizationPolicy)
    {
        var group = endpoints.MapGroup("/api/cases")
            .RequireAuthorization(authorizationPolicy)
            .WithTags("Cases");

        group.MapGet("/", GetCasesAsync)
            .WithName("GetCases");

        group.MapGet("/{id}", GetCaseByIdAsync)
            .WithName("GetCaseById");

        return endpoints;
    }

    private static async Task<IResult> GetCasesAsync(
        bool? refresh,
        ICasesService service,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await service.GetCasesAsync(
                refresh == true,
                cancellationToken);
            return Results.Ok(response);
        }
        catch (CasesIntegrationException ex)
        {
            return ToProblem(ex);
        }
    }

    private static async Task<IResult> GetCaseByIdAsync(
        string id,
        ICasesService service,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(id) ||
            !int.TryParse(id, out var numericId) ||
            numericId <= 0)
        {
            return Results.Problem(
                title: "Invalid case ID",
                detail: "The case ID must be a positive integer.",
                statusCode: StatusCodes.Status400BadRequest);
        }

        try
        {
            var response = await service.GetCaseByIdAsync(id, cancellationToken);
            return response is null
                ? Results.Problem(
                    title: "Case not found",
                    detail: "The requested case does not exist or is unavailable.",
                    statusCode: StatusCodes.Status404NotFound)
                : Results.Ok(response);
        }
        catch (CasesIntegrationException ex)
        {
            return ToProblem(ex);
        }
    }

    private static IResult ToProblem(CasesIntegrationException exception)
    {
        var statusCode = exception.UpstreamStatusCode switch
        {
            HttpStatusCode.ServiceUnavailable => StatusCodes.Status503ServiceUnavailable,
            HttpStatusCode.GatewayTimeout => StatusCodes.Status504GatewayTimeout,
            HttpStatusCode.NotFound => StatusCodes.Status404NotFound,
            _ => StatusCodes.Status502BadGateway,
        };

        return Results.Problem(
            title: "Cases integration error",
            detail: exception.Message,
            statusCode: statusCode);
    }
}
