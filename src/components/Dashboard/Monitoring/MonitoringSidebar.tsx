import { monitoringSessions } from "@/mocks/monitoringSessions";

export function MonitoringSidebar() {
  return (
    <div
      className="
        border border-borderColor dark:border-darkBorder
        rounded-lg
        bg-background dark:bg-darkBackground-muted
        h-full flex flex-col overflow-hidden
        shadow-sm dark:shadow-lg dark:shadow-black/20
        transition-colors duration-300
      "
    >
      <div
        className="
          px-4 py-3
          border-b border-borderColor dark:border-darkBorder
          text-sm font-semibold
          text-brand dark:text-brand-dark
          transition-colors duration-300
        "
      >
        Production Monitoring
      </div>

      <ul className="divide-y divide-borderColor dark:divide-darkBorder flex-1 overflow-auto">
        {monitoringSessions.map((s, index) => (
          <li
            key={s.id}
            className="
              group
              flex items-center gap-3
              px-4 py-3
              cursor-pointer
              transition-all duration-200
            "
          >
            <span
              className="
                w-6 h-6 flex items-center justify-center
                text-[11px] font-medium
                border border-borderColor dark:border-darkBorder
                rounded-md
                text-text-muted dark:text-darkText-muted
                bg-background-muted dark:bg-darkBackground
                transition-colors duration-200
                group-hover:border-brand dark:group-hover:border-brand-dark
                group-hover:text-brand dark:group-hover:text-brand-dark
              "
            >
              {index + 1}
            </span>

            <span className="text-sm font-medium text-text dark:text-darkText">
              {s.source} → {s.target}
              <span className="ml-2 text-[11px] text-text-muted dark:text-darkText-muted">
                ({s.version})
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

