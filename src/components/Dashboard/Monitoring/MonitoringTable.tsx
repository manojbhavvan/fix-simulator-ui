import { monitoringSessions } from "@/mocks/monitoringSessions";
import { MonitoringPagination } from "./MonitoringPagination";

const statusColor = {
  Healthy: "text-green-600 dark:text-green-400",
  Down: "text-red-600 dark:text-red-400",
  Degraded: "text-amber-600 dark:text-amber-400",
};

const statusDot = {
  Healthy: "bg-green-500",
  Down: "bg-red-500",
  Degraded: "bg-amber-500",
};

export function MonitoringTable() {
  return (
    <div
      className="
        border border-borderColor dark:border-darkBorder
        rounded-lg
        bg-background dark:bg-darkBackground-muted
        flex flex-col overflow-hidden
        shadow-sm dark:shadow-lg dark:shadow-black/20
        transition-colors duration-300
      "
    >
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead
            className="
              bg-background-muted
              dark:bg-darkBackground-subtle
              sticky top-0 z-10
              border-b border-borderColor dark:border-darkBorder
            "
          >
            <tr className="text-left font-medium text-text-muted dark:text-darkText-muted tracking-wide">
              <th className="w-6 px-4 py-3"></th>
              <th className="px-4 py-3">Session</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Msg</th>
              <th className="px-4 py-3">HB</th>
              <th className="px-4 py-3">Seq Gap</th>
              <th className="px-4 py-3">RTT</th>
              <th className="px-4 py-3 text-center">Errors</th>
            </tr>
          </thead>

          <tbody>
            {monitoringSessions.map((s) => (
              <tr
                key={s.id}
                className="
                  group
                  border-b border-borderColor dark:border-darkBorder
                  transition-all duration-200
                  cursor-pointer
                "
              >
                <td className="pl-4 py-3">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${statusDot[s.status]}`}
                  />
                </td>

                <td className="px-4 py-3 font-medium text-text dark:text-darkText">
                  {s.source} → {s.target}
                  <span className="ml-2 text-[11px] text-text-muted dark:text-darkText-muted">
                    ({s.version})
                  </span>
                </td>

                <td className={`px-4 py-3 font-medium ${statusColor[s.status]}`}>
                  {s.status}
                </td>

                <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
                  {s.lastMsg}
                </td>

                <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
                  {s.hb}
                </td>

                <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
                  {s.seqGap}
                </td>

                <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
                  {s.rtt}
                </td>

                <td className="px-4 py-3 text-center text-text-muted dark:text-darkText-muted">
                  {s.errors}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MonitoringPagination />
    </div>
  );
}
