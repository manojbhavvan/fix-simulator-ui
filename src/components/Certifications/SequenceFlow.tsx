import { useEffect, useState } from "react";

type FixEvent = {
  seq: number;
  type: string;
  label: string;
  status?: "ok" | "missing" | "gap";
};

const MOCK_EVENT_STREAM: FixEvent[] = [
  { seq: 1, type: "A", label: "Logon" },
  { seq: 2, type: "0", label: "Heartbeat", status: "missing" },
  { seq: 3, type: "D", label: "New Order" },
];

export default function SequenceFlow({
  simulationId,
  onCompleted,
}: {
  simulationId: string;
  onCompleted: () => void;
}) {
  const [events, setEvents] = useState<FixEvent[]>([]);
  const [status, setStatus] = useState<
    "STARTING" | "RUNNING" | "COMPLETED"
  >("STARTING");

  // Mock polling Orchestrator
  useEffect(() => {
    setStatus("RUNNING");

    let index = 0;
    const interval = setInterval(() => {
      setEvents(prev => [...prev, MOCK_EVENT_STREAM[index]]);
      index++;

      if (index === MOCK_EVENT_STREAM.length) {
        clearInterval(interval);
        setStatus("COMPLETED");
        setTimeout(onCompleted, 800);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [onCompleted]);

  return (
    <div className="card bg-base-100 shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">Sequence Flow</h2>

      <div className="text-sm opacity-70">
        Simulation: {simulationId} • Status: {status}
      </div>

      <div className="flex justify-between font-semibold text-sm">
        <span>Client</span>
        <span>Exchange</span>
      </div>

      <div className="space-y-2">
        {events.map(e => (
          <div
            key={e.seq}
            className={`badge ${
              e.status === "missing" ? "badge-error" : "badge-success"
            }`}
          >
            #{e.seq} {e.label}
          </div>
        ))}
      </div>
    </div>
  );
}
