import { CasesApi } from "~/services/casesApi";
import type {
  CaseDetailApiResponse,
  CaseSummaryApiResponse,
  KnowledgeCase,
} from "~/types/knowledgeCase";

export interface CasesRepositoryResult {
  items: KnowledgeCase[];
  total: number;
  lastUpdatedUtc: string;
}

export interface CasesRepository {
  list(options?: { refresh?: boolean; signal?: AbortSignal }): Promise<CasesRepositoryResult>;
  getById(id: string, signal?: AbortSignal): Promise<KnowledgeCase | null>;
}

export class ApiCasesRepository
  implements CasesRepository {
  private readonly api: CasesApi;

  constructor(api: CasesApi) {
    this.api = api;
  }

  async list(
    options: {
      refresh?: boolean;
      signal?: AbortSignal;
    } = {},
  ): Promise<CasesRepositoryResult> {
    const response = await this.api.list(
      options.signal,
      options.refresh === true,
    );

    return {
      items: response.items.map(mapSummary),
      total: response.total,
      lastUpdatedUtc: response.lastUpdatedUtc,
    };
  }

  async getById(
    id: string,
    signal?: AbortSignal,
  ): Promise<KnowledgeCase | null> {
    const response = await this.api.getById(
      id,
      signal,
    );

    return response
      ? mapDetail(response)
      : null;
  }
}

function mapSummary(item: CaseSummaryApiResponse): KnowledgeCase {
  const impact = item.impact ?? "";
  return {
    id: item.id,
    title: item.title,
    client: item.client ?? "Cliente no registrado",
    specialist: item.specialist ?? "Especialista no registrado",
    specialistRole: "Especialista CONSEIN",
    area: item.industry ?? "Industria no registrada",
    technology: [...item.technologies],
    tags: [...item.tags],
    status: item.status,
    date: item.registeredAt ?? "1970-01-01",
    impact,
    description: item.productContext ?? "Sin contexto registrado.",
    executiveSummary: "",
    context: buildContext(item),
    problem: "",
    solution: "",
    results: impact,
    resultItems: impact ? [impact] : [],
    metrics: [],
    lessons: [],
    risks: [],
    innovations: [],
    observations: [],
    implementedSolutions: [],
    reuse: "",
    phase: item.phase ?? "Fase no registrada",
    duration: "No registrada",
    sharePointPath: item.documentUrl ?? "Documento no disponible",
    documentUrl: item.documentUrl,
    location: item.location,
    companySize: item.companySize,
    consultativeContent: null,
  };
}

function mapDetail(
  item: CaseDetailApiResponse,
): KnowledgeCase {
  return {
    ...mapSummary(item),

    executiveSummary:
      item.executiveSummary ?? "",

    problem:
      item.problem ?? "",

    solution:
      item.solution ?? "",

    results:
      item.results.join(
        String.fromCharCode(10, 10),
      ),

    resultItems: [
      ...item.results,
    ],

    lessons: [
      ...item.lessons,
    ],

    risks: [
      ...item.risks,
    ],

    innovations: [
      ...item.innovations,
    ],

    observations: [
      ...item.observations,
    ],

    implementedSolutions: [
      ...item.implementedSolutions,
    ],

    reuse:
      item.strategicReflection ?? "",

    consultativeContent:
      item.consultativeContent,
  };
}
function buildContext(item: CaseSummaryApiResponse): string {
  return [
    item.productContext,
    item.companySize ? `Tamaño de empresa: ${item.companySize}.` : null,
    item.location ? `Ubicación: ${item.location}.` : null,
  ].filter((value): value is string => Boolean(value)).join(" ");
}
