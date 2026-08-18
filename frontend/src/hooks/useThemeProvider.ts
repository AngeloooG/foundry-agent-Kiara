import { useCallback, useEffect, useMemo, useState } from "react";
import type { ThemeContextValue, ThemeType } from "../contexts/ThemeContext";
import { darkTheme, lightTheme } from "../config/themes";

const THEME_STORAGE_KEY = "ai-foundry-theme";
const VALID_THEMES: ThemeType[] = ["Light", "Dark", "System"];

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateMatches);
    updateMatches();
    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

export const useThemeProvider = (): ThemeContextValue => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [savedTheme, setSavedTheme] = useState<ThemeType>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
    return storedTheme && VALID_THEMES.includes(storedTheme) ? storedTheme : "System";
  });

  const isDarkMode = useMemo(
    () => (savedTheme === "System" ? prefersDark : savedTheme === "Dark"),
    [savedTheme, prefersDark],
  );
  const currentTheme = isDarkMode ? "Dark" : "Light";
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  const setTheme = useCallback((newTheme: ThemeType) => {
    setSavedTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.colorScheme = isDarkMode ? "dark" : "light";
    root.classList.toggle("dark", isDarkMode);
    root.dataset.theme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return useMemo(
    () => ({ savedTheme, currentTheme, themeStyles, setTheme, isDarkMode }),
    [savedTheme, currentTheme, themeStyles, setTheme, isDarkMode],
  );
};
