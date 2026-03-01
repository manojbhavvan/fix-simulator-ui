import { ChevronLeft, ChevronRight } from "lucide-react";

export function MonitoringPagination() {
  return (
    <div
      className="
        px-4 py-3
        border-t border-borderColor dark:border-darkBorder
        flex items-center justify-between
        text-sm text-text-muted dark:text-darkText-muted
        bg-background dark:bg-darkBackground-muted
        transition-colors duration-300
      "
    >
      <span className="font-medium text-text dark:text-darkText">
        1–4 of 4
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled
          className="
            h-8 w-8
            flex items-center justify-center
            rounded-md
            border border-borderColor dark:border-darkBorder
            text-text-muted dark:text-darkText-muted
            bg-background dark:bg-darkBackground
            transition-all duration-200
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          className="
            h-8 w-8
            flex items-center justify-center
            rounded-md
            border border-borderColor dark:border-darkBorder
            text-text dark:text-darkText
            bg-background dark:bg-darkBackground
            transition-all duration-200
            hover:border-brand dark:hover:border-brand-dark
            hover:text-brand dark:hover:text-brand-dark
          "
        >
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}