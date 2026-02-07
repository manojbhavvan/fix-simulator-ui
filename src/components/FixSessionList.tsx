import { ArrowRight, ChevronRight } from "lucide-react";
import { mockSessions } from "@/mocks/mockSessions";
import { SessionRow } from "@/components/SessionRow";

export function FixSessionList() {
  return (
    <div className="pt-4">
      <div className="pb-4 text-base font-semibold text-base-content/70">
        FIX Session Health
      </div>

      <div className="overflow-hidden rounded-md border border-base-300">
        <table className="table table-sm w-full">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="w-6"></th>
              <th className="text-xs font-semibold text-base-content/70">
                Session
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Status
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Detail
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Seq#
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Last Seen
              </th>
              <th className="w-6"></th>
            </tr>
          </thead>

          <tbody>
            {mockSessions.map((session, idx) => (
              <SessionRow key={idx} {...session} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 border-t border-base-200 text-right text-sm text-primary cursor-pointer hover:underline">
        View All Sessions <ArrowRight className="w-3 h-3 inline-block" />
      </div>
    </div>
  );
}


