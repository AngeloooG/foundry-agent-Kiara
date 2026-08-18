import { useParams } from "react-router-dom";
export function CaseDetailPage() { const { id } = useParams(); return <main><h1>Detalle del caso</h1><p>ID: {id}</p></main>; }
