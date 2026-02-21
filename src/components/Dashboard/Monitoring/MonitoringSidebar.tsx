import { monitoringSessions } from "@/mocks/monitoringSessions";

export function MonitoringSidebar() {
  return (
    <div className="border border-border rounded-lg bg-background h-full flex flex-col overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-border text-sm font-semibold text-brand">
        Production Monitoring
      </div>

      <ul className="divide-y divide-border flex-1 overflow-auto">
        {monitoringSessions.map((s, index) => (
          <li
            key={s.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-background-subtle transition-colors cursor-pointer"
          >
            <span
              className="
                w-6 h-6 flex items-center justify-center
                text-[11px] font-medium
                border border-border rounded-md
                text-text-muted
                bg-background-muted
              "
            >
              {index + 1}
            </span>
            <span className="text-sm text-text font-medium">
              {s.source} → {s.target}
              <span className="ml-2 text-[11px] text-text-muted">
                ({s.version})
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

