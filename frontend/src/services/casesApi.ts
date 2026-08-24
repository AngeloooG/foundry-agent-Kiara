import type {
  CaseDetailApiResponse,
  CasesCollectionApiResponse,
} from "~/types/knowledgeCase";

type GetAccessToken =
  () => Promise<string | null>;

interface ProblemDetails {
  title?: string;
  detail?: string;
  status?: number;
}

export class CasesApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);

    this.name =
      "CasesApiError";

    Object.setPrototypeOf(
      this,
      CasesApiError.prototype,
    );
  }
}

export class CasesApi {
  constructor(
    private readonly apiUrl: string,
    private readonly getAccessToken:
      GetAccessToken,
  ) { }

  async list(
    signal?: AbortSignal,
  ): Promise<CasesCollectionApiResponse> {
    return this.request<
      CasesCollectionApiResponse
    >(
      "/cases",
      signal,
      false,
    );
  }

  async getById(
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

    const response =
      await fetch(
        `${this.apiUrl}${path}`,
        {
          method: "GET",
          headers: {
            Accept:
              "application/json",
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
      const message =
        await this.readError(
          response,
        );

      throw new CasesApiError(
        message,
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
      // La respuesta podría estar vacía
      // o no contener JSON válido.
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