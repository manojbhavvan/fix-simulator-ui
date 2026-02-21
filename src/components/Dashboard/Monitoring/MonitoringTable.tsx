import { monitoringSessions } from "@/mocks/monitoringSessions";
import { MonitoringPagination } from "./MonitoringPagination";

const statusColor = {
  Healthy: "text-green-600",
  Down: "text-red-600",
  Degraded: "text-amber-600",
};

const statusDot = {
  Healthy: "bg-green-500",
  Down: "bg-red-500",
  Degraded: "bg-amber-500",
};

export function MonitoringTable() {
  return (
    <div className="border border-border rounded-lg bg-background flex flex-col overflow-hidden shadow-sm">
      
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-xs border-collapse">
          <thead className="bg-background-muted sticky top-0 z-10 border-b border-border">
            <tr className="text-left font-medium text-text-muted tracking-wide">
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
                className="border-b border-border hover:bg-background-subtle transition-colors cursor-pointer"
              >
                <td className="pl-4 py-3">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${statusDot[s.status]}`}
                  />
                </td>

                <td className="px-4 py-3 font-medium text-text">
                  {s.source} → {s.target}
                  <span className="ml-2 text-[11px] text-text-muted">
                    ({s.version})
                  </span>
                </td>

                <td className={`px-4 py-3 font-medium ${statusColor[s.status]}`}>
                  {s.status}
                </td>

                <td className="px-4 py-3 text-text-muted">{s.lastMsg}</td>
                <td className="px-4 py-3 text-text-muted">{s.hb}</td>
                <td className="px-4 py-3 text-text-muted">{s.seqGap}</td>
                <td className="px-4 py-3 text-text-muted">{s.rtt}</td>
                <td className="px-4 py-3 text-center text-text-muted">
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
