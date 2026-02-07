import { monitoringSessions } from "@/mocks/monitoringSessions";

export function MonitoringSidebar() {
  return (
    <div className="border border-base-300 rounded-md h-full">
      <div className="px-4 py-3 border-b border-base-300 text-sm font-semibold text-base-content/70">
        Production Monitoring
      </div>

      <ul className="divide-y divide-base-200">
        {monitoringSessions.map((s, index) => (
          <li
            key={s.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer"
          >
            <span
              className="
                w-6 h-6 flex items-center justify-center
                text-xs font-medium
                border border-base-300 rounded
                text-base-content/70
              "
            >
              {index + 1}
            </span>
            <span className="text-sm">
              {s.source} → {s.target}
              <span className="ml-1 text-xs text-base-content/60">
                ({s.version})
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

