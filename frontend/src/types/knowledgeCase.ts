export type CaseStatus = "Borrador" | "Publicado";

export interface CaseMetric {
  label: string;
  before: string;
  after: string;
}

export interface KnowledgeCase {
  id: string;
  title: string;
  client: string;
  specialist: string;
  specialistRole: string;
  area: string;
  technology: string[];
  status: CaseStatus;
  date: string;
  impact: string;
  description: string;
  executiveSummary: string;
  context: string;
  problem: string;
  solution: string;
  results: string;
  metrics: CaseMetric[];
  lessons: string[];
  reuse: string;
  phase: string;
  duration: string;
  sharePointPath: string;
}

export type CaseSort = "newest" | "oldest" | "title";

export interface CaseFilters {
  query: string;
  status: "Todos" | CaseStatus;
  area: string;
  technology: string;
  sort: CaseSort;
}
