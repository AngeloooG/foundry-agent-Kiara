import type { ReactNode } from "react";
import {
  Bot24Regular,
  Cloud24Regular,
  Database24Regular,
  Document24Regular,
  Flow24Regular,
  LockClosed24Regular,
  PeopleTeam24Regular,
  Search24Regular,
  Server24Regular,
} from "@fluentui/react-icons";

export interface ArchitectureLayer {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  technologies: string[];
}

export interface ArchitecturePrinciple {
  title: string;
  description: string;
  icon: ReactNode;
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "experience",
    eyebrow: "Experiencia",
    title: "Aplicación web",
    description: "Interfaz autenticada para conversar con Kiara, explorar casos y consultar conocimiento reutilizable.",
    icon: <PeopleTeam24Regular />,
    technologies: ["React", "TypeScript", "Fluent UI", "React Router"],
  },
  {
    id: "identity",
    eyebrow: "Identidad",
    title: "Microsoft Entra ID",
    description: "Autenticación de la SPA, adquisición de tokens y autorización de las operaciones expuestas por la API.",
    icon: <LockClosed24Regular />,
    technologies: ["MSAL", "Microsoft.Identity.Web", "OAuth 2.0", "PKCE"],
  },
  {
    id: "api",
    eyebrow: "Servicios",
    title: "API de orquestación",
    description: "Backend responsable de validar solicitudes, transmitir respuestas y coordinar servicios empresariales.",
    icon: <Server24Regular />,
    technologies: ["ASP.NET Core", ".NET", "SSE", "Managed Identity"],
  },
  {
    id: "agent",
    eyebrow: "Inteligencia",
    title: "Microsoft Foundry Agent Service",
    description: "Runtime del agente, razonamiento conversacional, herramientas, recuperación y respuestas con streaming.",
    icon: <Bot24Regular />,
    technologies: ["Agents API", "Responses API", "MCP", "Tool calling"],
  },
  {
    id: "knowledge",
    eyebrow: "Conocimiento",
    title: "Fuentes empresariales",
    description: "Documentación, datos y casos estructurados disponibles para recuperación y reutilización controlada.",
    icon: <Database24Regular />,
    technologies: ["SharePoint", "Azure SQL", "Azure AI Search", "Microsoft Graph"],
  },
  {
    id: "automation",
    eyebrow: "Automatización",
    title: "Generación documental",
    description: "Procesos para construir documentos corporativos, administrar aprobaciones y conservar resultados.",
    icon: <Flow24Regular />,
    technologies: ["Power Automate", "Word", "SharePoint", "Approvals"],
  },
];

export const architecturePrinciples: ArchitecturePrinciple[] = [
  {
    title: "Seguridad por diseño",
    description: "Tokens de corta duración, acceso autorizado y secretos fuera del cliente web.",
    icon: <LockClosed24Regular />,
  },
  {
    title: "Fuentes trazables",
    description: "El conocimiento recuperado puede conservar referencias hacia su origen empresarial.",
    icon: <Search24Regular />,
  },
  {
    title: "Componentes desacoplados",
    description: "La experiencia, el dominio y las fuentes de datos evolucionan mediante contratos definidos.",
    icon: <Cloud24Regular />,
  },
  {
    title: "Documentos reutilizables",
    description: "Las experiencias se convierten en activos consistentes para nuevos proyectos y propuestas.",
    icon: <Document24Regular />,
  },
];
