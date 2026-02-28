import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { ArrowRight } from "lucide-react";

type FixEvent = {
  id: number;
  type: string;
  label: string;
  raw: string;
};

type FixLogStreamDTO = {
  simId: string;
  sessionId: string;
  messageType: string;
  message: string;
};

type StreamStatus = "active" | "inactive";

type SequenceFlowProps = {
  simulationId: string;
  onCompleted: () => void;
};

export default function SequenceFlow({
  simulationId,
  onCompleted,
}: SequenceFlowProps) {
  const [events, setEvents] = useState<FixEvent[]>([]);
  const [issues, setIssues] = useState<string[]>([]);
  const [streamStatus, setStreamStatus] =
    useState<StreamStatus>("inactive");
  const [countdown, setCountdown] = useState<number>(60);

  const heartbeatTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const clientRef = useRef<Client | null>(null);

  const getLabel = (type: string): string => {
    switch (type) {
      case "A":
        return "Logon";
      case "0":
        return "Heartbeat";
      case "D":
        return "New Order";
      case "5":
        return "Logout";
      default:
        return `Message ${type}`;
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current)
      clearTimeout(inactivityTimer.current);

    if (countdownInterval.current)
      clearInterval(countdownInterval.current);

    setCountdown(60);

    countdownInterval.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval.current!);
          setStreamStatus("inactive");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    inactivityTimer.current = setTimeout(() => {
      setStreamStatus("inactive");
    }, 60000);
  };

  const resetHeartbeatTimer = () => {
    if (heartbeatTimer.current)
      clearTimeout(heartbeatTimer.current);

    heartbeatTimer.current = setTimeout(() => {
      setIssues((prev) => [
        ...prev,
        "Heartbeat timeout detected",
      ]);
    }, 10000);
  };

  useEffect(() => {
    if (!simulationId) return;

    setEvents([]);
    setIssues([]);
    setStreamStatus("inactive");

    const socketUrl = "/ws";

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    client.onConnect = () => {
      console.log("STOMP Connected");

      client.subscribe(
        `/topic/logs/${simulationId}`,
        (msg: IMessage) => {
          try {
            const data: FixLogStreamDTO =
              JSON.parse(msg.body);

            setStreamStatus("active");
            resetInactivityTimer();

            const newEvent: FixEvent = {
              id: Date.now(),
              type: data.messageType,
              label: getLabel(data.messageType),
              raw: data.message,
            };

            setEvents((prev) => [...prev, newEvent]);

            if (data.messageType === "0") {
              resetHeartbeatTimer();
            }

            if (data.messageType === "8") {
              setTimeout(() => {
                onCompleted();
              }, 1500);
            }
          } catch (err) {
            console.error("Invalid message:", err);
            setIssues((prev) => [
              ...prev,
              "Invalid message received",
            ]);
          }
        }
      );
    };

    client.onStompError = (frame) => {
      console.error("Broker error:", frame.headers["message"]);
      setIssues((prev) => [
        ...prev,
        "STOMP broker error occurred",
      ]);
    };

    client.onWebSocketError = (event: Event) => {
      console.error("WebSocket error:", event);
      setIssues((prev) => [
        ...prev,
        "WebSocket error occurred",
      ]);
    };

    client.onWebSocketClose = () => {
      console.warn("WebSocket closed");
      setStreamStatus("inactive");
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();

      if (heartbeatTimer.current)
        clearTimeout(heartbeatTimer.current);

      if (inactivityTimer.current)
        clearTimeout(inactivityTimer.current);

      if (countdownInterval.current)
        clearInterval(countdownInterval.current);
    };
  }, [simulationId, onCompleted]);

  const statusColor: Record<StreamStatus, string> = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
  };

  return (
    <div className="bg-background border border-border rounded-lg shadow-sm p-8 space-y-8 w-[1000px] max-w-full mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-brand">
            Sequence Flow
          </h2>
          <p className="text-sm text-text-muted">
            Simulation: {simulationId}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${statusColor[streamStatus]}`}
          />
          <div className="text-sm">
            {streamStatus === "active" ? (
              <>
                <span className="text-green-600 font-medium">
                  Active
                </span>
                <span className="ml-2 text-text-muted">
                  (Inactive in {countdown}s)
                </span>
              </>
            ) : (
              <span className="text-gray-500 font-medium">
                In-Active
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-6">
        {events.map((e, index) => (
          <div key={e.id} className="flex items-center">
            <div className="px-4 py-2 border border-border rounded-md text-sm bg-background">
              {e.label} ({e.type})
            </div>

            {index !== events.length - 1 && (
              <ArrowRight
                size={16}
                className="mx-2 text-text-muted shrink-0"
              />
            )}
          </div>
        ))}

        {events.length === 0 && (
          <div className="px-4 py-2 border border-dashed rounded-md text-sm text-text-muted">
            Waiting for messages...
          </div>
        )}
      </div>

      {issues.length > 0 && (
        <>
          <div className="h-px bg-border" />
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Issues Detected
            </h3>
            <ul className="text-sm space-y-1">
              {issues.map((issue, i) => (
                <li key={i} className="text-red-600">
                  • {issue}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}