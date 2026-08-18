import {
  LogLevel,
} from "@azure/msal-browser";
import type {
  Configuration,
  RedirectRequest,
  SilentRequest,
} from "@azure/msal-browser";

function getRequiredEnvironmentVariable(
  name: string,
  value: string | undefined,
): string {
  const normalizedValue =
    normalizeEnvironmentVariable(value);

  if (!normalizedValue) {
    throw new Error(
      `${name} is not set. ` +
      "This value must be provided during build time.",
    );
  }

  return normalizedValue;
}

function normalizeEnvironmentVariable(
  value: string | undefined,
): string | undefined {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  if (
    normalizedValue.toLowerCase() ===
    "undefined" ||
    normalizedValue.toLowerCase() ===
    "null"
  ) {
    return undefined;
  }

  return normalizedValue;
}

const clientId =
  getRequiredEnvironmentVariable(
    "VITE_ENTRA_SPA_CLIENT_ID",
    import.meta.env
      .VITE_ENTRA_SPA_CLIENT_ID,
  );

const tenantId =
  getRequiredEnvironmentVariable(
    "VITE_ENTRA_TENANT_ID",
    import.meta.env
      .VITE_ENTRA_TENANT_ID,
  );

const backendClientId =
  normalizeEnvironmentVariable(
    import.meta.env
      .VITE_ENTRA_BACKEND_CLIENT_ID,
  );

const scopeClientId =
  backendClientId ?? clientId;

const chatScope =
  `api://${scopeClientId}/Chat.ReadWrite`;

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority:
      `https://login.microsoftonline.com/${tenantId}`,
    redirectUri:
      window.location.origin,
    postLogoutRedirectUri:
      window.location.origin,
    navigateToLoginRequestUrl: false,
  },

  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },

  system: {
    loggerOptions: {
      logLevel: import.meta.env.DEV
        ? LogLevel.Info
        : LogLevel.Warning,

      loggerCallback: (
        level,
        message,
        containsPii,
      ) => {
        if (containsPii) {
          return;
        }

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;

          case LogLevel.Warning:
            console.warn(message);
            break;

          case LogLevel.Info:
            console.info(message);
            break;

          case LogLevel.Verbose:
            console.debug(message);
            break;
        }
      },
    },
  },
};

export const loginRequest:
  RedirectRequest = {
  scopes: [chatScope],
};

export const tokenRequest:
  Omit<SilentRequest, "account"> = {
  scopes: [chatScope],
  forceRefresh: false,
};

if (import.meta.env.DEV) {
  console.info(
    "[Auth configuration]",
    {
      tenantId,
      spaClientId: clientId,
      backendClientId:
        backendClientId ??
        "(using SPA client ID)",
      scope: chatScope,
    },
  );
}