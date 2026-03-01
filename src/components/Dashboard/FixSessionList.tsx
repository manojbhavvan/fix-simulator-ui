import { ArrowRight } from "lucide-react";
import { mockSessions } from "@/mocks/mockSessions";
import { SessionRow } from "@/components/Dashboard/SessionRow";

export function FixSessionList() {
  return (
    <div>
      <div className="pb-4 text-base font-semibold text-brand dark:text-brand-dark">
        FIX Session Health
      </div>

      <div
        className="
          overflow-hidden rounded-lg
          border border-borderColor dark:border-darkBorder
          bg-background dark:bg-darkBackground-muted
          shadow-sm dark:shadow-lg dark:shadow-black/20
          transition-colors duration-300
        "
      >
        <table className="min-w-full text-sm">
          <thead
            className="
              bg-background-muted
              dark:bg-darkBackground-subtle
              border-b border-borderColor dark:border-darkBorder
            "
          >
            <tr className="text-left text-sm font-medium text-text-muted dark:text-darkText-muted tracking-wide">
              <th className="w-6 px-4 py-3"></th>
              <th className="px-4 py-3">Session</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Detail</th>
              <th className="px-4 py-3">Seq#</th>
              <th className="px-4 py-3">Last Seen</th>
              <th className="w-6 px-4 py-3"></th>
            </tr>
          </thead>

          <tbody>
            {mockSessions.map((session, idx) => (
              <SessionRow key={idx} {...session} />
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="
          flex justify-end items-center gap-2
          px-4 py-3
          border-t border-borderColor dark:border-darkBorder
          mt-3 text-sm
          transition-colors duration-300
        "
      >
        <span className="text-brand dark:text-brand-dark font-medium cursor-pointer hover:underline">
          View All Sessions
        </span>

        <ArrowRight className="w-4 h-4 text-brand dark:text-brand-dark" />
      </div>
    </div>
  );
}