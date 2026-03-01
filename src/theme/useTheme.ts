import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "fix-theme";

export function useTheme() {
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) return stored;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.style.colorScheme = theme;

    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return {
    theme,
    isDark: theme === "dark",
    toggle: () =>
      setTheme((prev) => (prev === "light" ? "dark" : "light")),
  };
}