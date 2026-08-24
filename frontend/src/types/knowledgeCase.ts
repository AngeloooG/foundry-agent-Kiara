export type CaseStatus = "Borrador" | "Publicado";

export interface CaseMetric {
  label: string;
  before: string;
  after: string;
}

/**
 * Modelo de presentación consumido por los componentes actuales.
 * Durante 5E.1 se mantiene para evitar una migración visual masiva.
 */
export interface KnowledgeCase {
  id: string;
  title: string;
  client: string;
  specialist: string;
  specialistRole: string;
  area: string;
  technology: string[];
  tags: string[];
  status: CaseStatus;
  date: string;
  impact: string;
  description: string;
  executiveSummary: string;
  context: string;
  problem: string;
  solution: string;
  results: string;
  resultItems: string[];
  metrics: CaseMetric[];
  lessons: string[];
  risks: string[];
  innovations: string[];
  observations: string[];
  implementedSolutions: string[];
  reuse: string;
  phase: string;
  duration: string;
  sharePointPath: string;
  documentUrl: string | null;
  location: string | null;
  companySize: string | null;
  consultativeContent: string | null;
}

export interface CasesCollectionApiResponse {
  items: CaseSummaryApiResponse[];
  total: number;
  lastUpdatedUtc: string;
}

export interface CaseSummaryApiResponse {
  id: string;
  title: string;
  client: string | null;
  specialist: string | null;
  registeredAt: string | null;
  industry: string | null;
  location: string | null;
  companySize: string | null;
  productContext: string | null;
  phase: string | null;
  status: CaseStatus;
  technologies: string[];
  tags: string[];
  impact: string | null;
  documentUrl: string | null;
}

export interface CaseDetailApiResponse extends CaseSummaryApiResponse {
  executiveSummary: string | null;
  problem: string | null;
  solution: string | null;
  strategicReflection: string | null;
  consultativeContent: string | null;
  results: string[];
  lessons: string[];
  risks: string[];
  innovations: string[];
  observations: string[];
  implementedSolutions: string[];
}

export type CaseSort = "newest" | "oldest" | "title";

export interface CaseFilters {
  query: string;
  status: "Todos" | CaseStatus;
  area: string;
  technology: string;
  sort: CaseSort;
}
