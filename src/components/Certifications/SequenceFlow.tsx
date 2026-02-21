import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type FixEvent = {
  seq: number;
  type: string;
  label: string;
  status?: "ok" | "missing";
};

export default function SequenceFlow({
  simulationId,
  onCompleted,
}: {
  simulationId: string;
  onCompleted: () => void;
}) {
  const [events, setEvents] = useState<FixEvent[]>([]);
  const [showIssues, setShowIssues] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setEvents([{ seq: 1, type: "A", label: "Logon", status: "ok" }]);
    }, 900);

    const t2 = setTimeout(() => {
      setEvents((prev) => [
        ...prev,
        { seq: 2, type: "0", label: "Heartbeat", status: "missing" },
      ]);
    }, 1800);

    const t3 = setTimeout(() => {
      setEvents((prev) => [
        ...prev,
        { seq: 3, type: "D", label: "New Order", status: "ok" },
      ]);
    }, 2600);

    const t4 = setTimeout(() => {
      setShowIssues(true);
    }, 3500);

    const t5 = setTimeout(() => {
      onCompleted();
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onCompleted]);

  return (
    <div className="bg-background border border-border rounded-lg shadow-sm p-8 space-y-8 w-[900px] max-w-full mx-auto">
      <div>
        <h2 className="text-xl font-semibold text-brand">
          Sequence Flow
        </h2>
        <p className="text-sm text-text-muted mt-1">
          Simulation: {simulationId}
        </p>
      </div>

      {!showIssues && (
        <div className="flex items-center gap-2 text-sm text-brand">
          <Loader2 className="animate-spin" size={16} />
          Processing FIX messages…
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
        {events.map((event, idx) => (
          <div key={event.seq} className="flex items-center gap-6">
            <div
              className={`
                px-5 py-3 rounded-md border text-sm font-medium
                transition-colors
                ${
                  event.status === "missing"
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-border bg-background"
                }
              `}
            >
              {event.label} ({event.type})
            </div>

            {idx < events.length - 1 && (
              <span className="text-text-muted text-lg">→</span>
            )}
          </div>
        ))}

        {!showIssues && (
          <div className="px-5 py-3 rounded-md border border-dashed border-border text-sm text-text-muted">
            Processing…
          </div>
        )}
      </div>

      {showIssues && (
        <>
          <div className="h-px bg-border" />
          <div>
            <h3 className="text-sm font-semibold text-text mb-3">
              Issues Detected
            </h3>

            <ul className="space-y-2 text-sm">
              <li className="text-red-600">• Missing Heartbeat</li>
              <li className="text-amber-600">• Sequence Gap Detected</li>
              <li className="text-text-muted">• No Logout</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
