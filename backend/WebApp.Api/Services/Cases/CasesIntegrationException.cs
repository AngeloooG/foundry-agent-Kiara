using System.Net;

namespace WebApp.Api.Services.Cases;

public sealed class CasesIntegrationException : Exception
{
    public CasesIntegrationException(
        string message,
        HttpStatusCode? upstreamStatusCode = null,
        Exception? innerException = null)
        : base(message, innerException)
    {
        UpstreamStatusCode = upstreamStatusCode;
    }

    public HttpStatusCode? UpstreamStatusCode { get; }
}
