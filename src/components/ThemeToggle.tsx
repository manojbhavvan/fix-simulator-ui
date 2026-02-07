import { useTheme } from "@/theme/useTheme";

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button className="btn btn-sm btn-ghost" onClick={toggle}>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
