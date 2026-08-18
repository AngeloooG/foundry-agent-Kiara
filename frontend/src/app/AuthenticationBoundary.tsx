import type { PropsWithChildren } from "react";
import type { AuthError } from "@azure/msal-browser";
import { InteractionStatus } from "@azure/msal-browser";
import {
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import {
  Button,
  Spinner,
} from "@fluentui/react-components";

import styles from "./AuthenticationBoundary.module.css";

interface AuthenticationBoundaryProps
  extends PropsWithChildren {
  authenticationError: AuthError | null;
  onRetry: () => void;
}

export function AuthenticationBoundary({
  children,
  authenticationError,
  onRetry,
}: AuthenticationBoundaryProps) {
  const isAuthenticated =
    useIsAuthenticated();

  const {
    accounts,
    inProgress,
    instance,
  } = useMsal();

  const account =
    instance.getActiveAccount() ??
    accounts[0] ??
    null;

  if (authenticationError) {
    return (
      <main
        className={styles.centered}
        role="alert"
      >
        <h1>
          No fue posible iniciar sesión
        </h1>

        <p>
          {authenticationError.message}
        </p>

        <p>
          Código:
          {" "}
          <code>
            {authenticationError.errorCode ||
              "authentication_error"}
          </code>
        </p>

        <Button
          appearance="primary"
          onClick={onRetry}
        >
          Reintentar inicio de sesión
        </Button>
      </main>
    );
  }

  if (isAuthenticated && account) {
    return children;
  }

  if (
    inProgress !== InteractionStatus.None
  ) {
    return (
      <main
        className={styles.centered}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Spinner
          size="large"
          label={getAuthenticationMessage(
            inProgress,
          )}
        />
      </main>
    );
  }

  return (
    <main
      className={styles.centered}
      role="status"
      aria-live="polite"
    >
      <h1>Inicia sesión para usar Kiara</h1>

      <p>
        No se encontró una sesión activa de
        Microsoft Entra ID.
      </p>

      <Button
        appearance="primary"
        onClick={onRetry}
      >
        Iniciar sesión
      </Button>
    </main>
  );
}

function getAuthenticationMessage(
  status: InteractionStatus,
): string {
  switch (status) {
    case InteractionStatus.Startup:
      return "Inicializando Microsoft Entra ID...";

    case InteractionStatus.HandleRedirect:
      return "Procesando el inicio de sesión...";

    case InteractionStatus.Login:
      return "Iniciando sesión...";

    case InteractionStatus.AcquireToken:
      return "Validando permisos...";

    case InteractionStatus.SsoSilent:
      return "Restaurando tu sesión...";

    case InteractionStatus.Logout:
      return "Cerrando sesión...";

    default:
      return "Preparando tu sesión...";
  }
}