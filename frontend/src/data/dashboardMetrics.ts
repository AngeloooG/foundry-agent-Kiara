export interface TechnologyMetric {
  name: string;
  value: number;
}

export interface MonthlyDocumentMetric {
  month: string;
  documents: number;
}

export interface DashboardMetrics {
  totalCases: number;
  specialists: number;
  documents: number;
  published: number;
  drafts: number;
  averageMinutes: number;
}

export const dashboardMetrics: DashboardMetrics = {
  totalCases: 38,
  specialists: 14,
  documents: 52,
  published: 27,
  drafts: 11,
  averageMinutes: 8,
};

export const casesByTechnology: TechnologyMetric[] = [
  { name: "IA y agentes", value: 12 },
  { name: "Automatización", value: 9 },
  { name: "Cloud", value: 8 },
  { name: "Datos", value: 6 },
  { name: "Microsoft 365", value: 3 },
];

export const documentsByMonth: MonthlyDocumentMetric[] = [
  { month: "Ene", documents: 3 },
  { month: "Feb", documents: 4 },
  { month: "Mar", documents: 5 },
  { month: "Abr", documents: 6 },
  { month: "May", documents: 7 },
  { month: "Jun", documents: 8 },
  { month: "Jul", documents: 9 },
  { month: "Ago", documents: 10 },
];
