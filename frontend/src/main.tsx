import React from "react";
import ReactDOM from "react-dom/client";
import {
  EventType,
  PublicClientApplication,
  type AuthenticationResult,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import App from "./App";
import { msalConfig } from "./config/authConfig";
import { AppProvider } from "./contexts/AppContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { initTelemetry } from "./services/telemetry";

import "./index.css";

initTelemetry();

const msalInstance =
  new PublicClientApplication(msalConfig);

async function bootstrap(): Promise<void> {
  try {
    await msalInstance.initialize();

    const redirectResult =
      await msalInstance.handleRedirectPromise();

    if (redirectResult?.account) {
      msalInstance.setActiveAccount(
        redirectResult.account,
      );
    } else {
      const existingAccount =
        msalInstance.getActiveAccount() ??
        msalInstance.getAllAccounts()[0] ??
        null;

      if (existingAccount) {
        msalInstance.setActiveAccount(
          existingAccount,
        );
      }
    }

    msalInstance.addEventCallback((event) => {
      if (
        event.eventType ===
          EventType.LOGIN_SUCCESS &&
        event.payload
      ) {
        const authenticationResult =
          event.payload as AuthenticationResult;

        if (authenticationResult.account) {
          msalInstance.setActiveAccount(
            authenticationResult.account,
          );
        }
      }
    });

    const rootElement =
      document.getElementById("root");

    if (!rootElement) {
      throw new Error(
        'Failed to find element with id "root".',
      );
    }

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <MsalProvider instance={msalInstance}>
          <AppProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </AppProvider>
        </MsalProvider>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error(
      "Application initialization failed:",
      error,
    );

    const rootElement =
      document.getElementById("root");

    if (rootElement) {
      rootElement.innerHTML = `
        <main style="
          min-height: 100vh;
          display: grid;
          place-content: center;
          padding: 32px;
          font-family: system-ui, sans-serif;
          text-align: center;
          background: #f7fafc;
          color: #11140f;
        ">
          <section>
            <h1>No fue posible iniciar Kiara</h1>
            <p>
              Ocurrió un error durante la inicialización
              de Microsoft Entra ID.
            </p>
            <p>
              Revisa la consola del navegador para ver
              el detalle técnico.
            </p>
            <button
              type="button"
              onclick="window.location.reload()"
              style="
                margin-top: 16px;
                padding: 10px 18px;
                border: 0;
                border-radius: 8px;
                background: #005b96;
                color: white;
                cursor: pointer;
                font-weight: 600;
              "
            >
              Reintentar
            </button>
          </section>
        </main>
      `;
    }
  }
}

void bootstrap();