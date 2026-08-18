import {
  loadEnv,
  type UserConfig,
} from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import {
  dirname,
  resolve,
} from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { envCheckPlugin } from "./plugins/envcheck";

const currentDirectory = dirname(
  fileURLToPath(import.meta.url),
);

function normalizeEnvironmentVariable(
  value: string | undefined,
): string | undefined {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const lowercaseValue =
    normalizedValue.toLowerCase();

  if (
    lowercaseValue === "undefined" ||
    lowercaseValue === "null"
  ) {
    return undefined;
  }

  return normalizedValue;
}

function setOptionalEnvironmentVariable(
  name: string,
  value: string | undefined,
): void {
  const normalizedValue =
    normalizeEnvironmentVariable(value);

  if (normalizedValue) {
    process.env[name] = normalizedValue;
    return;
  }

  delete process.env[name];
}

export default defineConfig(
  ({ mode }): UserConfig => {
    const azdEnvironmentsPath = resolve(
      currentDirectory,
      "../.azure",
    );

    const environmentName =
      process.env.ENVIRONMENT_NAME ||
      process.env.AZURE_ENV_NAME ||
      "localdev";

    const azdEnvironmentDirectory = resolve(
      azdEnvironmentsPath,
      environmentName,
    );

    const azdEnvironmentFile = resolve(
      azdEnvironmentDirectory,
      ".env",
    );

    const envDir = existsSync(
      azdEnvironmentFile,
    )
      ? azdEnvironmentDirectory
      : currentDirectory;

    const env = loadEnv(
      mode,
      envDir,
      "",
    );

    setOptionalEnvironmentVariable(
      "VITE_ENTRA_SPA_CLIENT_ID",
      env.ENTRA_SPA_CLIENT_ID ||
      env.VITE_ENTRA_SPA_CLIENT_ID,
    );

    setOptionalEnvironmentVariable(
      "VITE_ENTRA_TENANT_ID",
      env.ENTRA_TENANT_ID ||
      env.VITE_ENTRA_TENANT_ID,
    );

    setOptionalEnvironmentVariable(
      "VITE_ENTRA_BACKEND_CLIENT_ID",
      env.ENTRA_BACKEND_CLIENT_ID ||
      env.VITE_ENTRA_BACKEND_CLIENT_ID,
    );

    setOptionalEnvironmentVariable(
      "VITE_APPLICATIONINSIGHTS_CONNECTION_STRING",
      env.APPLICATIONINSIGHTS_CONNECTION_STRING ||
      env.VITE_APPLICATIONINSIGHTS_CONNECTION_STRING,
    );

    setOptionalEnvironmentVariable(
      "VITE_API_URL",
      env.API_URL ||
      env.VITE_API_URL,
    );

    return {
      envDir,

      plugins: [
        react(),
        envCheckPlugin(),
      ],

      resolve: {
        alias: {
          "~": resolve(
            currentDirectory,
            "./src",
          ),
        },
      },

      server: {
        host: true,
        port: 5173,

        proxy: {
          "/api": {
            target: "http://localhost:8080",
            changeOrigin: true,
            secure: false,
          },
        },
      },

      test: {
        globals: true,
        environment: "jsdom",
        include: [
          "src/**/*.test.{ts,tsx}",
        ],
      },
    };
  },
);