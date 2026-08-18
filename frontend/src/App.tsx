import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";

import { AuthenticationBoundary } from "~/app/AuthenticationBoundary";
import { AppRouter } from "~/app/AppRouter";
import { ErrorBoundary } from "~/components/core/ErrorBoundary";
import { loginRequest } from "~/config/authConfig";

import "./App.css";

function App() {
  const {
    error: authenticationError,
    login,
  } = useMsalAuthentication(
    InteractionType.Redirect,
    loginRequest,
  );

  return (
    <ErrorBoundary>
      <AuthenticationBoundary
        authenticationError={
          authenticationError
        }
        onRetry={() => {
          void login(
            InteractionType.Redirect,
            loginRequest,
          );
        }}
      >
        <AppRouter />
      </AuthenticationBoundary>
    </ErrorBoundary>
  );
}

export default App;