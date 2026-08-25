import {
  ArrowSync24Regular,
  DataUsage24Regular,
  DocumentDismiss24Regular,
  PeopleTeam24Regular,
  Search24Regular,
  Timer24Regular,
} from "@fluentui/react-icons";
import { SectionHeading } from "./SectionHeading";
import styles from "./ProblemSection.module.css";

const problems = [
  {
    icon: (
      <DocumentDismiss24Regular
        aria-hidden="true"
      />
    ),
    problem:
      "Conocimiento disperso",
    solution:
      "Centralización mediante procesamiento de voz",
    description:
      "Procesa audios espontáneos y conversaciones informales para transformarlos en una narrativa ejecutiva estructurada.",
  },
  {
    icon: (
      <Timer24Regular
        aria-hidden="true"
      />
    ),
    problem:
      "Documentar toma tiempo",
    solution:
      "Captura ágil de 1 a 5 minutos",
    description:
      "Elimina la carga de redacción manual de los equipos técnicos. Los especialistas pueden grabar o cargar audios breves que Kiara transcribe y organiza automáticamente.",
  },
  {
    icon: (
      <Search24Regular
        aria-hidden="true"
      />
    ),
    problem:
      "Difícil de encontrar",
    solution:
      "Estructuración estandarizada por fases",
    description:
      "Organiza cada caso bajo una plantilla homogénea de contexto, problema, solución y resultados, facilitando la localización de experiencias comparables para ventas y preventa.",
  },
  {
    icon: (
      <PeopleTeam24Regular
        aria-hidden="true"
      />
    ),
    problem:
      "Dependencia de especialistas",
    solution:
      "Codificación del conocimiento tácito",
    description:
      "Extrae el relato estratégico directamente de los especialistas para generar documentos institucionales reutilizables por todo el equipo.",
  },
  {
    icon: (
      <DataUsage24Regular
        aria-hidden="true"
      />
    ),
    problem:
      "Métricas incompletas",
    solution:
      "Matriz cuantitativa Antes / Durante / Después",
    description:
      "Solicita y prioriza indicadores concretos en cada etapa, como cifras operativas, retorno de inversión, win ratio y forecast accuracy, evitando descripciones genéricas.",
  },
  {
    icon: (
      <ArrowSync24Regular
        aria-hidden="true"
      />
    ),
    problem:
      "Trabajo repetido",
    solution:
      "Activos comerciales listos para usar",
    description:
      "Produce hasta dos versiones de redacción, ejecutiva o narrativa, adaptadas al público objetivo: Junta Directiva, Gerencia o Dirección Comercial.",
  },
] as const;

export function ProblemSection() {
  return (
    <section className={styles.section}>
      <SectionHeading
        eyebrow="Memoria organizacional"
        title="Cada experiencia se convierte en conocimiento reutilizable"
        description="Kiara reduce la fricción entre ejecutar un proyecto y dejar conocimiento útil para el siguiente equipo."
        align="center"
      />

      <div className={styles.grid}>
        {problems.map(
          (
            problem,
            index,
          ) => (
            <article
              className={styles.card}
              key={problem.problem}
            >
              <span className={styles.number}>
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <span className={styles.icon}>
                {problem.icon}
              </span>

              <p className={styles.problem}>
                {problem.problem}
              </p>

              <h3>
                {problem.solution}
              </h3>

              <p className={styles.description}>
                {problem.description}
              </p>
            </article>
          ),
        )}
      </div>
    </section>
  );
}