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
    <div className="card bg-base-100 shadow p-6 space-y-6 w-[900px] max-w-full mx-auto">
      <div>
        <h2 className="text-lg font-semibold">Sequence Flow</h2>
        <p className="text-sm text-base-content/60">
          Simulation: {simulationId}
        </p>
      </div>

      {!showIssues && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="animate-spin" size={16} />
          Processing FIX messages…
        </div>
      )}

      <div className="flex items-center justify-center gap-4 mt-4">
        {events.map((event, idx) => (
          <div key={event.seq} className="flex items-center gap-4">
            <div
              className={`
                px-4 py-2 rounded-md border text-sm font-medium
                ${
                  event.status === "missing"
                    ? "border-error bg-error/10 text-error"
                    : "border-base-300 bg-base-100"
                }
              `}
            >
              {event.label} {event.type}
            </div>

            {idx < events.length - 1 && (
              <span className="text-base-content/50 text-lg">→</span>
            )}
          </div>
        ))}

        {!showIssues && (
          <div className="px-4 py-2 rounded-md border border-dashed border-base-300 text-sm text-base-content/50">
            Processing…
          </div>
        )}
      </div>

      {showIssues && (
        <>
          <div className="divider my-2" />
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Issues Detected:
            </h3>

            <ul className="space-y-1 text-sm">
              <li className="text-error">• Missing Heartbeat</li>
              <li className="text-warning">• Seq Gap Detected</li>
              <li className="text-base-content/70">• No Logout</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
