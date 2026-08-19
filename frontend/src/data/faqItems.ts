export type FaqCategory = "Uso" | "Seguridad" | "Documentos" | "Conocimiento";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  { id: "start", category: "Uso", question: "¿Cómo comienzo una conversación con Kiara?", answer: "Abre la sección Hablar con Kiara y describe la experiencia con lenguaje natural. Kiara organizará el contexto y formulará preguntas para completar la información necesaria." },
  { id: "save", category: "Uso", question: "¿Puedo continuar una conversación anterior?", answer: "Sí. El chat permite consultar conversaciones disponibles y retomar el contexto almacenado por el servicio del agente." },
  { id: "files", category: "Uso", question: "¿Qué archivos puedo adjuntar?", answer: "La experiencia admite imágenes y documentos compatibles con la configuración del backend. El sistema valida tipo, tamaño y cantidad antes de procesarlos." },
  { id: "auth", category: "Seguridad", question: "¿Cómo se protege el acceso a Kiara?", answer: "La aplicación utiliza Microsoft Entra ID. La SPA obtiene tokens mediante MSAL y la API valida autenticación, audiencia y permisos antes de ejecutar operaciones protegidas." },
  { id: "secrets", category: "Seguridad", question: "¿Las credenciales se almacenan en el navegador?", answer: "El cliente no debe contener secretos de aplicación ni claves de servicios. Las variables públicas de la SPA identifican recursos, mientras las credenciales sensibles permanecen fuera del frontend." },
  { id: "permissions", category: "Seguridad", question: "¿Todos los usuarios pueden acceder a todo el contenido?", answer: "El acceso depende de las políticas de identidad, los permisos de la API y las autorizaciones configuradas en las fuentes empresariales." },
  { id: "generate", category: "Documentos", question: "¿Cómo se genera un documento?", answer: "Kiara recopila y estructura la experiencia. Cuando la información está completa, la automatización puede construir el documento corporativo y conservarlo en el destino configurado." },
  { id: "review", category: "Documentos", question: "¿Puedo revisar la información antes de generar el documento?", answer: "Sí. La arquitectura contempla una revisión del contenido estructurado antes de ejecutar la generación final, especialmente cuando el documento tendrá uso comercial o corporativo." },
  { id: "sharepoint", category: "Documentos", question: "¿Dónde se almacenan los documentos?", answer: "El destino previsto es un repositorio empresarial como SharePoint. La ubicación concreta depende del área, cliente, proyecto y reglas del proceso." },
  { id: "sources", category: "Conocimiento", question: "¿De dónde obtiene información Kiara?", answer: "Kiara puede combinar el contexto de la conversación con fuentes empresariales autorizadas, como SharePoint, Azure SQL o índices de Azure AI Search." },
  { id: "accuracy", category: "Conocimiento", question: "¿Cómo se mejora la precisión de las respuestas?", answer: "La calidad depende de instrucciones claras, fuentes actualizadas, recuperación relevante y validación humana para contenidos sensibles o de alto impacto." },
  { id: "cases", category: "Conocimiento", question: "¿Para qué sirve la biblioteca de casos?", answer: "La biblioteca permite encontrar experiencias comparables, tecnologías utilizadas, resultados, métricas y lecciones aprendidas para reutilizarlas en nuevos proyectos." },
];
