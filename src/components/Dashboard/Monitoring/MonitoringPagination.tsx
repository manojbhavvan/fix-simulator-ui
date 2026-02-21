import { ChevronLeft, ChevronRight } from "lucide-react";

export function MonitoringPagination() {
  return (
    <div
      className="
        px-4 py-3
        border-t border-border
        flex items-center justify-between
        text-xs text-text-muted
        bg-background
      "
    >
      <span className="font-medium">
        1–4 of 4
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled
          className="
            h-7 w-7
            flex items-center justify-center
            rounded-md
            border border-border
            text-text-muted
            bg-background-muted
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          className="
            h-7 w-7
            flex items-center justify-center
            rounded-md
            border border-border
            text-text-muted
            bg-background-muted
            hover:bg-brand hover:text-white hover:border-brand
            transition-colors
          "
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
