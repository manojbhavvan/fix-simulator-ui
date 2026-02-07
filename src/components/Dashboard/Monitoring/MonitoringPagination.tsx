import { ChevronLeft, ChevronRight } from "lucide-react";

export function MonitoringPagination() {
  return (
    <div className="
      px-4 py-2
      border-t border-base-300
      flex items-center justify-between
      text-xs text-base-content/60
    ">
      <span>
        1-4 of 4
      </span>

      <div className="flex items-center gap-1">
        <button
          className="
            btn btn-xs btn-ghost
            text-base-content/40
            hover:text-base-content
            disabled:opacity-30
          "
          disabled
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          className="
            btn btn-xs btn-ghost
            text-base-content/40
            hover:text-base-content
          "
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
