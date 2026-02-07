import { monitoringSessions } from "@/mocks/monitoringSessions";
import { MonitoringPagination } from "./MonitoringPagination";

const statusColor = {
  Healthy: "text-success",
  Down: "text-error",
  Degraded: "text-warning",
};

const statusDot = {
  Healthy: "bg-success",
  Down: "bg-error",
  Degraded: "bg-warning",
};

export function MonitoringTable() {
  return (
    <div className="border border-base-300 rounded-md h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="table table-sm w-full border-collapse">
          <thead className="bg-base-200 sticky top-0 z-10">
            <tr>
              <th className="w-6 border border-base-300"></th>
              <th className="border border-base-300">Session</th>
              <th className="border border-base-300">Status</th>
              <th className="border border-base-300">Last Msg</th>
              <th className="border border-base-300">HB</th>
              <th className="border border-base-300">Seq Gap</th>
              <th className="border border-base-300">RTT</th>
              <th className="border border-base-300">Errors</th>
            </tr>
          </thead>

          <tbody>
            {monitoringSessions.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-base-200 transition-colors cursor-pointer"
              >
                <td className="pl-4 border border-base-300">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${statusDot[s.status]}`}
                  />
                </td>

                <td className="font-medium border border-base-300">
                  {s.source} → {s.target}
                  <span className="ml-1 text-xs text-base-content/60">
                    ({s.version})
                  </span>
                </td>

                <td className={`font-medium border border-base-300 ${statusColor[s.status]}`}>
                  {s.status}
                </td>

                <td className="border border-base-300">{s.lastMsg}</td>
                <td className="border border-base-300">{s.hb}</td>
                <td className="border border-base-300">{s.seqGap}</td>
                <td className="border border-base-300">{s.rtt}</td>
                <td className="border border-base-300 text-center">{s.errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MonitoringPagination />
    </div>
  );
}
