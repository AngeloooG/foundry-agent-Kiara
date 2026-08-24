import { CasesApi } from "~/services/casesApi";
import type {
  CaseDetailApiResponse,
  CaseSummaryApiResponse,
  KnowledgeCase,
} from "~/types/knowledgeCase";

export interface CasesRepository {
  list(signal?: AbortSignal): Promise<KnowledgeCase[]>;

  getById(
    id: string,
    signal?: AbortSignal,
  ): Promise<KnowledgeCase | null>;
}

export class ApiCasesRepository implements CasesRepository {
  constructor(
    private readonly api: CasesApi,
  ) {}

  async list(
    signal?: AbortSignal,
  ): Promise<KnowledgeCase[]> {
    const response = await this.api.list(signal);

    return response.items.map(mapSummary);
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

function mapSummary(
  item: CaseSummaryApiResponse,
): KnowledgeCase {
  const impact =
    item.impact ?? "";

  return {
    id: item.id,
    title: item.title,
    client:
      item.client ??
      "Cliente no registrado",
    specialist:
      item.specialist ??
      "Especialista no registrado",
    specialistRole:
      "Especialista CONSEIN",
    area:
      item.industry ??
      "Industria no registrada",
    technology: [
      ...item.technologies,
    ],
    tags: [
      ...item.tags,
    ],
    status:
      item.status,
    date:
      item.registeredAt ??
      "1970-01-01",
    impact,
    description:
      item.productContext ??
      "Sin contexto registrado.",
    executiveSummary: "",
    context:
      buildContext(item),
    problem: "",
    solution: "",
    results:
      impact,
    resultItems:
      impact
        ? [impact]
        : [],
    metrics: [],
    lessons: [],
    risks: [],
    innovations: [],
    observations: [],
    implementedSolutions: [],
    reuse: "",
    phase:
      item.phase ??
      "Fase no registrada",
    duration:
      "No registrada",
    sharePointPath:
      item.documentUrl ??
      "Documento no disponible",
    documentUrl:
      item.documentUrl,
    location:
      item.location,
    companySize:
      item.companySize,
    consultativeContent:
      null,
  };
}

function mapDetail(
  item: CaseDetailApiResponse,
): KnowledgeCase {
  return {
    ...mapSummary(item),
    executiveSummary:
      item.executiveSummary ?? "",
    context:
      buildContext(item),
    problem:
      item.problem ?? "",
    solution:
      item.solution ?? "",

    // Debe permanecer en una sola línea lógica.
    results:
      item.results.join("\n\n"),

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

function buildContext(
  item: CaseSummaryApiResponse,
): string {
  const parts: string[] = [];

  if (item.productContext) {
    parts.push(
      item.productContext,
    );
  }

  if (item.companySize) {
    parts.push(
      `Tamaño de empresa: ${item.companySize}.`,
    );
  }

  if (item.location) {
    parts.push(
      `Ubicación: ${item.location}.`,
    );
  }

  return parts.join(" ");
}