import { ArrowLeft20Regular, Home20Regular, Lightbulb20Regular } from "@fluentui/react-icons";
import { Link, useParams } from "react-router-dom";
import { CaseDetailHero } from "~/components/cases/CaseDetailHero";
import { CaseMetrics } from "~/components/cases/CaseMetrics";
import { CaseNarrativeSection } from "~/components/cases/CaseNarrativeSection";
import { CaseResultsList } from "~/components/cases/CaseResultsList";
import { CaseSidebar } from "~/components/cases/CaseSidebar";
import { useCase } from "~/hooks/useCase";
import styles from "./CaseDetailPage.module.css";

const ListBlock=({items}:{items:string[]})=><ol className={styles.knowledgeList}>{items.map((value,index)=><li key={`${index}-${value}`}><span>{String(index+1).padStart(2,"0")}</span><p>{value}</p></li>)}</ol>;

export function CaseDetailPage(){
 const {id}=useParams(); const {item,isLoading,error,notFound}=useCase(id);
 if(isLoading)return <main className={styles.state}>Cargando caso...</main>;
 if(error)return <main className={styles.state}><h1>No fue posible cargar el caso</h1><p>{error}</p><Link to="/cases"><ArrowLeft20Regular/> Volver a la biblioteca</Link></main>;
 if(notFound||!item)return <main className={styles.state}><h1>Caso no encontrado</h1><p>El identificador solicitado no existe en la biblioteca actual.</p><Link to="/cases"><ArrowLeft20Regular/> Volver a la biblioteca</Link></main>;
 return <main className={styles.page}>
  <nav className={styles.breadcrumb}><Home20Regular/><Link to="/">Inicio</Link><span>/</span><Link to="/cases">Casos</Link><span>/</span><strong>{item.title}</strong></nav>
  <Link className={styles.back} to="/cases"><ArrowLeft20Regular/> Volver a la biblioteca</Link>
  <CaseDetailHero item={item}/>
  <div className={styles.layout}><div className={styles.main}>
   {item.executiveSummary&&<CaseNarrativeSection eyebrow="Visión general" title="Resumen ejecutivo"><p>{item.executiveSummary}</p></CaseNarrativeSection>}
   {item.context&&<CaseNarrativeSection eyebrow="Contexto" title="Sobre el proyecto"><p>{item.context}</p></CaseNarrativeSection>}
   {item.problem&&<CaseNarrativeSection eyebrow="Desafío" title="Problema de negocio" tone="accent"><p>{item.problem}</p></CaseNarrativeSection>}
   {item.solution&&<CaseNarrativeSection eyebrow="Respuesta" title="Solución implementada"><p>{item.solution}</p></CaseNarrativeSection>}
   {item.resultItems.length>0&&<CaseNarrativeSection eyebrow="Impacto" title="Resultados obtenidos"><CaseResultsList items={item.resultItems}/></CaseNarrativeSection>}
   {item.metrics.length>0&&<CaseMetrics metrics={item.metrics}/>} 
   {item.lessons.length>0&&<CaseNarrativeSection eyebrow="Conocimiento transferible" title="Lecciones aprendidas"><ListBlock items={item.lessons}/></CaseNarrativeSection>}
   {item.innovations.length>0&&<CaseNarrativeSection eyebrow="Diferenciación" title="Innovaciones"><ListBlock items={item.innovations}/></CaseNarrativeSection>}
   {item.implementedSolutions.length>0&&<CaseNarrativeSection eyebrow="Ejecución" title="Soluciones implementadas"><ListBlock items={item.implementedSolutions}/></CaseNarrativeSection>}
   {item.risks.length>0&&<CaseNarrativeSection eyebrow="Consideraciones" title="Riesgos"><ListBlock items={item.risks}/></CaseNarrativeSection>}
   {item.observations.length>0&&<CaseNarrativeSection eyebrow="Notas" title="Observaciones adicionales"><ListBlock items={item.observations}/></CaseNarrativeSection>}
   {item.reuse.trim()&&<CaseNarrativeSection eyebrow="Potencial de reutilización" title="¿Cómo puede aprovecharse nuevamente?" tone="accent"><div className={styles.reuse}><Lightbulb20Regular/><p>{item.reuse}</p></div></CaseNarrativeSection>}
   {item.consultativeContent&&<CaseNarrativeSection eyebrow="Síntesis" title="Contenido consultivo"><p>{item.consultativeContent}</p></CaseNarrativeSection>}
  </div><CaseSidebar item={item}/></div>
 </main>;
}
