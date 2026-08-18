import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type {
  Dispatch,
  ReactNode,
} from "react";
import { useMsal } from "@azure/msal-react";

import type {
  AppAction,
  AppState,
} from "../types/appState";
import { initialAppState } from "../types/appState";
import { appReducer } from "../reducers/appReducer";

interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const AppContext =
  createContext<AppContextValue | undefined>(
    undefined,
  );

const devLogger = {
  enabled: import.meta.env.DEV,

  group(label: string) {
    if (this.enabled) {
      console.group(label);
    }
  },

  log(...args: unknown[]) {
    if (this.enabled) {
      console.log(...args);
    }
  },

  end() {
    if (this.enabled) {
      console.groupEnd();
    }
  },
};

const reducerWithLogging = (
  state: AppState,
  action: AppAction,
): AppState => {
  const nextState = appReducer(
    state,
    action,
  );

  if (devLogger.enabled) {
    devLogger.group(
      `State action: ${action.type}`,
    );
    devLogger.log("Action:", action);
    devLogger.log("Previous:", state);
    devLogger.log("Next:", nextState);
    devLogger.end();
  }

  return nextState;
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({
  children,
}: AppProviderProps) {
  const [state, dispatch] = useReducer(
    reducerWithLogging,
    initialAppState,
  );

  const {
    accounts,
    instance,
  } = useMsal();

  useEffect(() => {
    const account =
      instance.getActiveAccount() ??
      accounts[0] ??
      null;

    if (!account) {
      return;
    }

    if (
      instance.getActiveAccount()
        ?.homeAccountId !==
      account.homeAccountId
    ) {
      instance.setActiveAccount(account);
    }

    dispatch({
      type: "AUTH_INITIALIZED",
      user: account,
    });
  }, [
    accounts,
    instance,
  ]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return (
    <AppContext.Provider
      value={contextValue}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextValue {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used within AppProvider",
    );
  }

  return context;
}