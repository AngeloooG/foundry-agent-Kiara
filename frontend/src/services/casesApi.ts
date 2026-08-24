import type {
  CaseDetailApiResponse,
  CasesCollectionApiResponse,
} from "~/types/knowledgeCase";

type GetAccessToken =
  () => Promise<string | null>;

interface ProblemDetails {
  title?: string;
  detail?: string;
}

export class CasesApiError extends Error {
  readonly status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super(message);

    this.name = "CasesApiError";
    this.status = status;

    Object.setPrototypeOf(
      this,
      CasesApiError.prototype,
    );
  }
}

export class CasesApi {
  private readonly apiUrl: string;

  private readonly getAccessToken:
    GetAccessToken;

  constructor(
    apiUrl: string,
    getAccessToken: GetAccessToken,
  ) {
    this.apiUrl = apiUrl;
    this.getAccessToken =
      getAccessToken;
  }

  list(
    signal?: AbortSignal,
    refresh = false,
  ): Promise<CasesCollectionApiResponse> {
    const query = refresh
      ? "?refresh=true"
      : "";

    return this.request<
      CasesCollectionApiResponse
    >(
      `/cases${query}`,
      signal,
      false,
    );
  }

  getById(
    id: string,
    signal?: AbortSignal,
  ): Promise<CaseDetailApiResponse | null> {
    return this.request<
      CaseDetailApiResponse
    >(
      `/cases/${encodeURIComponent(id)}`,
      signal,
      true,
    );
  }

  private async request<T>(
    path: string,
    signal: AbortSignal | undefined,
    allowNotFound: true,
  ): Promise<T | null>;

  private async request<T>(
    path: string,
    signal?: AbortSignal,
    allowNotFound?: false,
  ): Promise<T>;

  private async request<T>(
    path: string,
    signal?: AbortSignal,
    allowNotFound = false,
  ): Promise<T | null> {
    const token =
      await this.getAccessToken();

    if (!token) {
      throw new CasesApiError(
        "No fue posible obtener el token de acceso.",
        401,
      );
    }

    const response = await fetch(
      `${this.apiUrl}${path}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        signal,
      },
    );

    if (
      allowNotFound &&
      response.status === 404
    ) {
      return null;
    }

    if (!response.ok) {
      throw new CasesApiError(
        await this.readError(response),
        response.status,
      );
    }

    return await response.json() as T;
  }

  private async readError(
    response: Response,
  ): Promise<string> {
    try {
      const problem =
        await response.json() as
        ProblemDetails;

      if (problem.detail) {
        return problem.detail;
      }

      if (problem.title) {
        return problem.title;
      }
    } catch {
      // La respuesta puede estar vacía
      // o no ser JSON.
    }

    const messages:
      Record<number, string> = {
      400:
        "La solicitud de casos no es válida.",
      401:
        "Tu sesión no está autorizada para consultar los casos.",
      403:
        "No tienes permisos para consultar los casos.",
      404:
        "El caso solicitado no existe.",
      502:
        "La fuente de casos devolvió una respuesta inválida.",
      503:
        "La integración de casos no está disponible.",
      504:
        "La consulta de casos excedió el tiempo permitido.",
    };

    return (
      messages[response.status] ??
      `No fue posible consultar los casos (${response.status}).`
    );
  }
}