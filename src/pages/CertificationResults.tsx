import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronDown, ArrowRight } from "lucide-react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { Tabs } from "@/components/CertificationResults/Tabs";
import { MessageList } from "@/components/CertificationResults/MessageList";
import { MessageAnalysis } from "@/components/CertificationResults/MessageAnalysis";
import { SequenceFlowView } from "@/components/CertificationResults/SequenceFlowView";
import { BackButton } from "@/components/utils/BackButton";
import { MessageDetails } from "@/components/CertificationResults/MessageDetails";

type TabKey = "details" | "raw" | "sequence" | "heartbeat" | "ai";

type ValidationError = {
  errorId: number;
  errorCode: string;
  tagNumber: number;
  description: string;
};

type SimulationMessage = {
  sessionMsgId: number;
  seqNum: number;
  msgType: string;
  msgName?: string | null;
  isValid: boolean;
  rawFixMsg: any;
  validationErrors: ValidationError[];
};

type SimulationSession = {
  simSessionId: number;
  fixSessionId: string;
  simulationDetail?: {
    currentStatus?: {
      simId: number;
      status: string;
      message: string;
      timestamp: string;
    };
  };
  messages: SimulationMessage[];
};

const renderSessionLabel = (value?: string) => {
  if (!value) return null;
  const [left, right] = value.split("->");
  if (!right) return <span>{value}</span>;
  return (
    <span className="flex items-center gap-2">
      <span>{left}</span>
      <ArrowRight size={16} className="text-text-muted" />
      <span>{right}</span>
    </span>
  );
};

export function CertificationResults() {
  const { id } = useParams();

  const [sessions, setSessions] = useState<SimulationSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [lastHeartbeatTime, setLastHeartbeatTime] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);

  const healthClientRef = useRef<Client | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`/api/rest/simulation/session/simulation/${id}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setSessions(data);
        if (data.length > 0) {
          setSelectedSessionId(data[0].simSessionId);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const selectedSession = useMemo(
    () => sessions.find((s) => s.simSessionId === selectedSessionId),
    [sessions, selectedSessionId]
  );

  const sessionMessages = useMemo(() => {
    if (!selectedSession?.messages) return [];
    return selectedSession.messages.map((msg) => ({
      id: msg.sessionMsgId,
      seqNum: msg.seqNum,
      msgType: msg.msgType,
      type: msg.msgName,
      sender: msg.rawFixMsg?.["49"],
      target: msg.rawFixMsg?.["56"],
      direction: `${msg.rawFixMsg?.["49"]} → ${msg.rawFixMsg?.["56"]}`,
      status: msg.isValid ? "PASS" : "FAIL",
      rawFixMsg: msg.rawFixMsg,
      validationErrors: msg.validationErrors,
      sessionId: selectedSession.fixSessionId,
    }));
  }, [selectedSession]);

  useEffect(() => {
    setSelectedMessage(sessionMessages[0] ?? null);
  }, [sessionMessages]);

  useEffect(() => {
    if (!id || !selectedSession?.fixSessionId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("/ws"),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      const topic = `/topic/health/${id}/${selectedSession.fixSessionId}`;

      client.subscribe(topic, (msg: IMessage) => {
        try {
          const data = JSON.parse(msg.body);
          const rawMessage: string = data.message;

          if (rawMessage.includes("35=0")) {
            const now = new Date();
            setLastHeartbeatTime(now);
            setIsLive(true);
          }
        } catch (err) {
          console.error("Heartbeat parse error", err);
        }
      });
    };

    client.activate();
    healthClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [id, selectedSession?.fixSessionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastHeartbeatTime) return;

      const diff = Date.now() - lastHeartbeatTime.getTime();

      if (diff > 60000) {
        setIsLive(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastHeartbeatTime]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-muted">
        Loading results...
      </div>
    );
  }

  const backendStatus = selectedSession?.simulationDetail?.currentStatus?.status;

  const statusBadgeClass = "bg-blue-100 text-blue-700";

  return (
    <div className="bg-background px-6 py-8">
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">
        <div className="border border-border rounded-lg bg-background shadow-sm flex flex-col overflow-hidden h-full">
          <div className="px-6 py-5 border-b border-border">
            <div className="flex items-center gap-3 text-sm">
              <BackButton />
              <div className="w-px h-5 bg-border" />
              <span className="font-semibold text-brand">
                Certification Results
              </span>
              <span className="text-text-muted">
                Simulation ID: {id}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`}
              >
                {backendStatus}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0">
            <div className="px-6 pt-4">
              <div ref={dropdownRef} className="relative w-80">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full flex justify-between items-center border border-border rounded-lg px-4 py-2 bg-background shadow-sm text-sm font-medium"
                >
                  {renderSessionLabel(selectedSession?.fixSessionId)}
                  <ChevronDown size={18} />
                </button>

                {dropdownOpen && (
                  <div className="absolute mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    {sessions.map((s) => (
                      <button
                        key={s.simSessionId}
                        onClick={() => {
                          setSelectedSessionId(s.simSessionId);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-background-muted"
                      >
                        {renderSessionLabel(s.fixSessionId)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 pt-4">
              <Tabs active={activeTab} onChange={setActiveTab} />
            </div>

            <div className="grid grid-cols-12 gap-6 px-6 py-6 flex-1 min-h-0">
              <div className="col-span-3 min-h-0">
                <MessageList
                  messages={sessionMessages}
                  selected={selectedMessage}
                  onSelect={setSelectedMessage}
                />
              </div>

              <div className="col-span-9 min-h-0">
                <div className="border border-border rounded-lg bg-background h-full flex flex-col shadow-sm">
                  <div className="flex-1 min-h-0 overflow-auto p-6">
                    {activeTab === "details" && (
                      <MessageDetails message={selectedMessage} />
                    )}
                    {activeTab === "raw" && (
                      <pre className="text-xs font-mono">
                        {JSON.stringify(selectedMessage?.rawFixMsg, null, 2)}
                      </pre>
                    )}
                    {activeTab === "sequence" && (
                      <SequenceFlowView session={selectedSession} />
                    )}
                    {activeTab === "heartbeat" && (
                      <div className="max-w-md">
                        <div className="border border-border rounded-lg shadow-sm p-6 bg-background space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-text">
                              Session Live Status
                            </span>

                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3 h-3 rounded-full ${isLive ? "bg-green-500" : "bg-red-500"
                                  }`}
                              />
                              <span
                                className={`text-sm font-medium ${isLive
                                  ? "text-green-600"
                                  : "text-red-600"
                                  }`}
                              >
                                {isLive ? "Live" : "Disconnected"}
                              </span>
                            </div>
                          </div>

                          <div className="h-px bg-border" />

                          <div>
                            <p className="text-xs text-text-muted">
                              Last Heartbeat
                            </p>

                            <p className="text-sm font-medium text-text mt-1">
                              {lastHeartbeatTime
                                ? lastHeartbeatTime.toLocaleString()
                                : "No heartbeat received yet"}
                            </p>
                          </div>

                          {isLive && (
                            <p className="text-xs text-green-600">
                              Receiving heartbeat every ~30 seconds
                            </p>
                          )}

                          {!isLive && lastHeartbeatTime && (
                            <p className="text-xs text-red-600">
                              No heartbeat received for 60 seconds
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {activeTab === "ai" && (
                      <MessageAnalysis message={selectedMessage} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}