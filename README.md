# Kiara | Memoria organizacional inteligente de CONSEIN

🌐 **Aplicación web desplegada:** [Abrir Kiara en Azure Container Apps](https://ca-web-4j36dzuqvg2tw.wonderfulmushroom-0edfad30.centralus.azurecontainerapps.io/)

**Kiara convierte la experiencia de los especialistas en casos de éxito estructurados, documentos institucionales y conocimiento reutilizable.**

Kiara es un agente empresarial creado para reducir la fricción entre ejecutar un proyecto y documentar lo aprendido. Mediante una conversación guiada, el especialista puede relatar el contexto, el problema, la solución, los resultados y las lecciones de una experiencia. Kiara organiza esa información y la prepara para revisión, publicación y reutilización por ventas, preventa y otros equipos autorizados.

> Kiara no reemplaza la validación humana. El agente facilita la captura y estructuración del conocimiento, mientras que la organización conserva el control sobre su revisión, publicación y uso.

## Contenido

- [Objetivo](#objetivo)
- [Problema que resuelve](#problema-que-resuelve)
- [Usuarios principales](#usuarios-principales)
- [Flujo funcional](#flujo-funcional)
- [Capacidades actuales](#capacidades-actuales)
- [Biblioteca de casos](#biblioteca-de-casos)
- [Entrada por voz](#entrada-por-voz)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Seguridad](#seguridad)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo local](#desarrollo-local)
- [Variables de entorno](#variables-de-entorno)
- [Validación y pruebas](#validación-y-pruebas)
- [Despliegue](#despliegue)
- [Estado actual](#estado-actual)
- [Límites y consideraciones](#límites-y-consideraciones)
- [Documentación comercial](#documentación-comercial)

## Objetivo

Kiara busca preservar conocimiento que normalmente queda distribuido entre conversaciones, correos, documentos y la memoria de personas específicas. Su propósito es transformar relatos técnicos y comerciales en activos claros, comparables y reutilizables.

La solución ayuda a que una experiencia de proyecto pueda convertirse en:

- Un caso de éxito estructurado.
- Un documento institucional almacenado en SharePoint.
- Un registro consultable desde una biblioteca web.
- Evidencia reutilizable para propuestas, RFPs, licitaciones y reuniones comerciales.
- Una fuente de aprendizajes para futuros proyectos.

## Problema que resuelve

La experiencia pierde valor cuando:

- El conocimiento permanece en la memoria de especialistas.
- Documentar se posterga porque compite con la ejecución técnica.
- Cada caso se redacta con una estructura diferente.
- Los resultados se describen sin métricas o evidencia suficiente.
- Ventas y preventa no encuentran antecedentes comparables a tiempo.
- Se repiten análisis, argumentos y soluciones ya desarrolladas.
- Los documentos existen, pero no están conectados con una experiencia consultable.

Kiara reduce esa fricción mediante captura conversacional, estructuración homogénea y conexión con el repositorio documental de la organización.

## Usuarios principales

### Especialistas

- Capturan una experiencia mediante texto o voz.
- Documentan sin depender de formularios extensos.
- Conservan decisiones, resultados y lecciones aprendidas.
- Revisan el contenido antes de convertirlo en un activo institucional.

### Ventas y preventa

- Localizan casos comparables por cliente, industria, tecnología o especialista.
- Recuperan evidencia cuantitativa para conversaciones y cierres.
- Reutilizan soluciones, tecnologías y aprendizajes documentados.
- Acceden al documento asociado en SharePoint.

### CONSEIN

- Centraliza memoria organizacional.
- Reduce dependencia de conocimiento informal.
- Construye una biblioteca de activos para RFPs y licitaciones.
- Mantiene separación entre captura, revisión, publicación y consulta.

## Flujo funcional

```text
Especialista
    |
    v
Conversación con Kiara por texto o voz
    |
    v
Identificación de contexto, problema, solución y resultados
    |
    v
Estructuración del caso y generación documental
    |
    v
Proceso autorizado de almacenamiento y publicación
    |
    +--------------------------+
    |                          |
    v                          v
SharePoint                 Biblioteca web
Documento Word             Caso consultable
    |                          |
    +-------------+------------+
                  |
                  v
     Reutilización por ventas, preventa y equipos autorizados
```

## Capacidades actuales

### Conversación guiada

Kiara conduce la captura del relato mediante preguntas contextuales. El agente ayuda a identificar información faltante y organiza la experiencia sin exigir que el especialista redacte el documento desde cero.

### Estructuración homogénea

Los casos se presentan bajo una estructura consistente que puede incluir:

- Resumen ejecutivo.
- Contexto.
- Problema de negocio.
- Solución implementada.
- Resultados.
- Métricas.
- Lecciones aprendidas.
- Riesgos.
- Innovaciones.
- Observaciones.
- Soluciones implementadas.
- Potencial de reutilización.
- Contenido consultivo.

La interfaz renderiza únicamente las secciones que contienen información.

### Captura por voz

El chat incorpora reconocimiento de voz mediante Web Speech API. En navegadores compatibles, el usuario puede dictar en español de Venezuela y revisar el texto antes de enviarlo.

### Archivos adjuntos

El chat admite archivos permitidos por la aplicación y aplica validaciones de tipo y cantidad antes del envío.

### Generación y acceso documental

Cuando un caso tiene un documento asociado, la página de detalle muestra una acción para abrirlo directamente en SharePoint.

### Actualización manual de la biblioteca

La biblioteca dispone de una acción **Actualizar** que solicita información reciente sin recargar la aplicación completa. La búsqueda, los filtros y el orden permanecen activos durante la actualización.

### Experiencia autenticada

La aplicación utiliza Microsoft Entra ID para proteger la API y enviar tokens Bearer desde el frontend. Los endpoints protegidos validan el acceso antes de ejecutar operaciones del agente o consultar casos.

## Biblioteca de casos

La ruta `/cases` permite:

- Consultar casos almacenados.
- Buscar por título, cliente, especialista, industria, tecnología y etiquetas.
- Filtrar por estado, industria y tecnología.
- Ordenar por fecha o título.
- Actualizar la colección bajo demanda.
- Conservar los datos anteriores si una actualización falla.
- Mostrar la fecha de la última actualización.
- Abrir el detalle de cada caso.

La ruta `/cases/:id` presenta el detalle con secciones condicionales y acceso al documento asociado.

## Entrada por voz

La implementación actual utiliza `SpeechRecognition` o `webkitSpeechRecognition` en el navegador.

Configuración principal:

```ts
recognition.lang = "es-VE";
recognition.continuous = true;
recognition.interimResults = true;
```

Consideraciones:

- El usuario debe conceder permiso de micrófono al sitio.
- El funcionamiento depende de la compatibilidad y políticas del navegador.
- No requiere un recurso Azure Speech en la implementación actual.
- No requiere un rol adicional de Foundry.
- La transcripción debe revisarse antes de enviarse, especialmente cuando contiene nombres, siglas, tecnologías o cifras.

## Arquitectura

```text
Navegador
  React + TypeScript + Vite
          |
          | Microsoft Entra ID / Bearer token
          v
ASP.NET Core API en Azure Container Apps
          |
          +----------------------------+
          |                            |
          v                            v
Microsoft Foundry                 Power Automate
Agente Kiara                      Adaptadores de casos
          |                            |
          |                            v
          |                        SharePoint
          |                    Casos y documentos
          v
Respuestas, conversaciones y archivos
```

### Identidades

- La identidad del usuario protege el acceso a la aplicación y la API.
- La identidad administrada del Container App se comunica con Microsoft Foundry.
- La identidad administrada del Container App requiere el rol **Foundry User** en el proyecto Foundry porque el backend crea conversaciones y ejecuta operaciones de agentes.
- La identidad propia del agente se utiliza para acceder a herramientas externas configuradas en Foundry.

## Tecnologías

### Frontend

- React.
- TypeScript.
- Vite.
- React Router.
- Fluent UI y Fluent UI Copilot.
- Microsoft Authentication Library.
- CSS Modules.
- Web Speech API para entrada por voz.

### Backend

- ASP.NET Core.
- Azure AI Projects SDK.
- Azure Identity.
- Microsoft Identity Web.
- APIs protegidas con Microsoft Entra ID.
- Clientes HTTP tipados para integraciones.
- Caché en memoria para consultas de casos.
- Problem Details para respuestas de error controladas.

### Servicios Microsoft

- Microsoft Foundry para el agente Kiara.
- Azure Container Apps para hospedaje.
- Azure Container Registry para imágenes.
- Application Insights para observabilidad.
- Microsoft Entra ID para autenticación y autorización.
- SharePoint para casos y documentos.
- Power Automate como capa adaptadora entre SharePoint y la API.

## Seguridad

La solución aplica los siguientes principios:

- Autenticación empresarial con Microsoft Entra ID.
- Tokens Bearer para endpoints protegidos.
- Identidad administrada para comunicación entre Azure Container Apps y Foundry.
- Rol `Foundry User` asignado al principal de ejecución del Container App.
- URLs firmadas de Power Automate almacenadas como secretos de Container Apps.
- Variables de entorno que referencian secretos mediante `secretRef`.
- Ausencia de secretos reales en frontend, Git, documentación y logs.
- Mensajes de error controlados para evitar exponer detalles internos.
- Separación entre la identidad del usuario, la identidad de la aplicación y la identidad del agente.

## Estructura del proyecto

```text
foundry-agent-Kiara/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── cases/
│       │   ├── chat/
│       │   ├── home/
│       │   └── technology/
│       ├── hooks/
│       ├── pages/
│       ├── repositories/
│       ├── services/
│       └── types/
├── backend/
│   ├── WebApp.Api/
│   └── WebApp.Api.Tests/
├── deployment/
│   ├── docker/
│   └── hooks/
├── infra/
├── azure.yaml
├── README.md
└── VENTAS.md
```

## Desarrollo local

### Requisitos

- Git.
- Node.js compatible con el proyecto.
- .NET SDK compatible con el backend.
- Azure CLI.
- Azure Developer CLI.
- Acceso autorizado al proyecto Microsoft Foundry.
- Una aplicación registrada en Microsoft Entra ID.

### Preparación

```powershell
git clone <URL-DEL-REPOSITORIO>
cd foundry-agent-Kiara
git checkout Develop
```

Configura los valores locales utilizando los archivos de ejemplo del repositorio. No almacenes secretos reales en Git.

### Frontend

```powershell
cd frontend
npm ci
npm run dev
```

### Backend

En otra terminal:

```powershell
cd backend
dotnet restore
dotnet run --project .\WebApp.Api\WebApp.Api.csproj
```

Antes de probar el chat, inicia sesión en Azure CLI con una identidad que tenga acceso al proyecto Foundry:

```powershell
az login
```

## Variables de entorno

Los nombres exactos pueden evolucionar. La configuración actual utiliza valores equivalentes a:

```text
AI_AGENT_ENDPOINT
AI_AGENT_ID
AI_AGENT_VERSION
ENTRA_SPA_CLIENT_ID
ENTRA_TENANT_ID
MANAGED_IDENTITY_CLIENT_ID
APPLICATIONINSIGHTS_CONNECTION_STRING
APPLICATIONINSIGHTS_FRONTEND_CONNECTION_STRING
PowerAutomate__CasesListUrl
PowerAutomate__CaseDetailUrl
PowerAutomate__CacheSeconds
PowerAutomate__RequestTimeoutSeconds
```

Reglas:

- Las URLs de Power Automate son secretos.
- Los valores productivos deben almacenarse en Container Apps o en un gestor de secretos autorizado.
- El frontend nunca debe recibir las URLs firmadas de Power Automate.
- `MANAGED_IDENTITY_CLIENT_ID` debe coincidir con la identidad asignada al Container App.

## Validación y pruebas

### Frontend

```powershell
cd frontend
npm run build
npm run lint
npm run test:run
```

### Backend

```powershell
cd backend
dotnet restore
dotnet build
dotnet test .\WebApp.Api.Tests\WebApp.Api.Tests.csproj --no-build
```

### Pruebas funcionales

- Inicio de sesión con Entra ID.
- `GET /api/agent` responde correctamente.
- El chat crea conversaciones y transmite respuestas.
- El micrófono solicita permiso y transcribe en español.
- `/cases` carga la colección real.
- La acción **Actualizar** conserva filtros y datos previos.
- `/cases/:id` muestra únicamente secciones con información.
- El enlace documental abre SharePoint.
- `/api/health` responde satisfactoriamente.

## Despliegue

El proyecto utiliza Azure Developer CLI y un hook `predeploy` personalizado para construir la imagen, publicarla en Azure Container Registry y actualizar Azure Container Apps.

```powershell
azd deploy
```

Después del despliegue verifica:

```powershell
$resourceGroup = azd env get-value AZURE_RESOURCE_GROUP_NAME
$appName = azd env get-value AZURE_CONTAINER_APP_NAME

$app = az containerapp show `
  --name $appName `
  --resource-group $resourceGroup `
  --output json |
  ConvertFrom-Json

[PSCustomObject]@{
  Image = $app.properties.template.containers[0].image
  LatestRevision = $app.properties.latestRevisionName
  ReadyRevision = $app.properties.latestReadyRevisionName
  ProvisioningState = $app.properties.provisioningState
} | Format-List
```

La validación correcta requiere:

```text
LatestRevision = ReadyRevision
ProvisioningState = Succeeded
```

## Estado actual

La versión estable incluye:

- Agente Kiara conectado con Microsoft Foundry.
- Autenticación empresarial.
- Chat con streaming de respuestas.
- Entrada por voz en español mediante navegador compatible.
- Adjuntos y validaciones de archivo.
- Biblioteca de casos conectada con SharePoint mediante Power Automate.
- Búsqueda, filtros, orden y actualización manual.
- Detalle condicional de casos.
- Acceso al documento asociado en SharePoint.
- Despliegue en Azure Container Apps.
- Observabilidad mediante Application Insights.

Las métricas agregadas y gráficas demostrativas permanecen suspendidas hasta disponer de una fuente productiva verificable.

## Límites y consideraciones

- La calidad de los casos depende de la información suministrada y validada.
- La transcripción de voz puede cometer errores con nombres, siglas o términos técnicos.
- Web Speech API depende del navegador y de sus políticas.
- Los datos de la biblioteca dependen de la disponibilidad de SharePoint y Power Automate.
- Kiara no publica conocimiento sin los procesos autorizados por la organización.
- La aplicación no debe presentar métricas estáticas como resultados productivos.
- Las respuestas del agente apoyan el trabajo profesional, pero no sustituyen la validación humana.

## Documentación comercial

Consulta [VENTAS.md](./VENTAS.md) para revisar la propuesta de valor, beneficios, casos de uso y enfoque de adopción.

---

**Kiara convierte la experiencia de cada proyecto en conocimiento que CONSEIN puede volver a utilizar.**
