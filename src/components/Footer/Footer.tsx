export function Footer() {
  return (
    <footer
      className="
        border-t border-borderColor dark:border-darkBorder
        bg-background-muted dark:bg-darkBackground
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-brand flex items-center justify-center text-white text-[10px] font-bold">
            IF
          </div>

          <span className="text-sm font-semibold text-text dark:text-darkText tracking-tight transition-colors duration-300">
            IntelliFIX
          </span>
        </div>

        <span className="text-xs text-text-muted dark:text-darkText-muted transition-colors duration-300">
          &copy; 2026 IntelliFIX. All rights reserved.
        </span>
      </div>
    </footer>
  );
}