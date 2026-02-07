import { useEffect, useState } from "react";

export type Theme = "fix-cert" | "fix-cert-dark";

const STORAGE_KEY = "fix-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(STORAGE_KEY) as Theme) || "fix-cert";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return {
    theme,
    isDark: theme === "fix-cert-dark",
    toggle: () =>
      setTheme((t) =>
        t === "fix-cert" ? "fix-cert-dark" : "fix-cert"
      ),
  };
}
