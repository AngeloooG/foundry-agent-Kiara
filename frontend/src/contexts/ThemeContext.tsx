import { createContext, useContext } from "react";
import type { Theme as FluentTheme } from "@fluentui/react-components";

export type ThemeType = "Light" | "Dark" | "System";

export interface ThemeContextValue {
  savedTheme: ThemeType;
  currentTheme: "Light" | "Dark";
  themeStyles: FluentTheme;
  setTheme: (theme: ThemeType) => void;
  isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};
