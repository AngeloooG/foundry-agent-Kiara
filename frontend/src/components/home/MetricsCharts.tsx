import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  casesByTechnology,
  dashboardMetrics,
  documentsByMonth,
} from "~/data/dashboardMetrics";
import { ChartTooltip } from "./ChartTooltip";
import styles from "./MetricsCharts.module.css";

const publicationData = [
  { name: "Publicados", value: dashboardMetrics.published, color: "var(--kiara-color-brand-accent)" },
  { name: "Borradores", value: dashboardMetrics.drafts, color: "var(--kiara-color-accent)" },
];


export function MetricsCharts() {
  return (
    <div className={styles.grid}>
      <article className={styles.card}>
        <header><p>Estado documental</p><h3>Publicados y borradores</h3></header>
        <div className={styles.pieLayout}>
          <div className={styles.chart} role="img" aria-label="27 casos publicados y 11 borradores">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={publicationData} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="82%" paddingAngle={4} stroke="none">
                  {publicationData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  content={(props) => (
                    <ChartTooltip {...props} />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.pieCenter}><strong>{dashboardMetrics.totalCases}</strong><span>Total</span></div>
          </div>
          <ul className={styles.legend}>
            {publicationData.map((entry) => <li key={entry.name}><i style={{ background: entry.color }} /><span>{entry.name}</span><strong>{entry.value}</strong></li>)}
          </ul>
        </div>
      </article>

      <article className={styles.card}>
        <header><p>Distribución</p><h3>Casos por tecnología</h3></header>
        <div className={styles.wideChart} role="img" aria-label="Gráfico de barras de casos por tecnología">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={casesByTechnology} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 6 }}>
              <CartesianGrid stroke="var(--kiara-color-border)" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--kiara-color-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fill: "var(--kiara-color-text-secondary)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                content={(props) => (
                  <ChartTooltip {...props} />
                )}
              />
              <Bar dataKey="value" name="Casos" fill="var(--kiara-color-brand-accent)" radius={[0, 7, 7, 0]} barSize={17} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className={`${styles.card} ${styles.fullWidth}`}>
        <header><p>Evolución</p><h3>Documentos generados por mes</h3></header>
        <div className={styles.lineChart} role="img" aria-label="Gráfico de documentos generados de enero a agosto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={documentsByMonth} margin={{ top: 12, right: 16, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="var(--kiara-color-border)" vertical={false} strokeDasharray="4 5" />
              <XAxis dataKey="month" tick={{ fill: "var(--kiara-color-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: "var(--kiara-color-text-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                content={(props) => (
                  <ChartTooltip {...props} />
                )}
              />
              <Line type="monotone" dataKey="documents" name="Documentos" stroke="var(--kiara-color-brand-accent)" strokeWidth={3} dot={{ r: 4, fill: "var(--kiara-color-surface)", strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  );
}
