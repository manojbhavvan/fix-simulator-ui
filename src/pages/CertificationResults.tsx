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
import { AdvancedReplayView } from "@/components/CertificationResults/AdvancedReplayView";

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
    uploadLog?: {
      uploadId: number;
      fileName: string;
      uploadStatus: string;
      dateCreated: string;
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
      <ArrowRight className="w-4 h-4 text-text-muted dark:text-darkText-muted" />
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
  const [advancedView, setAdvancedView] = useState(false);
  const [advancedSessions, setAdvancedSessions] = useState<any[]>([]);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

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

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/rest/simulation/session/summary/${id}`)
      .then((res) => {
        setAdvancedSessions(res.data?.sessionObjects || []);
      })
      .catch((err) => console.error("Session summary fetch failed", err));
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

  const backendStatus =
    selectedSession?.simulationDetail?.currentStatus?.status;

  const uploadLog = selectedSession?.simulationDetail?.uploadLog;

  const statusBadgeClass =
    "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/40";

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-var(--navbar-height))] flex items-center justify-center text-text-muted dark:text-darkText-muted">
        Loading results...
      </div>
    );
  }

  return (
    <div className="bg-background dark:bg-darkBackground px-6 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">

        <div className="border border-borderColor dark:border-darkBorder rounded-xl bg-background dark:bg-darkBackground-muted shadow-sm dark:shadow-lg dark:shadow-black/20 flex flex-col overflow-hidden h-full">

          <div className="px-6 py-5 border-b border-borderColor dark:border-darkBorder">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3 text-sm">
                <BackButton />
                <div className="w-px h-5 bg-borderColor dark:bg-darkBorder" />

                <span className="font-semibold text-brand">
                  Certification Results
                </span>

                <span className="text-text-muted dark:text-darkText-muted">
                  Simulation ID: {id}
                </span>

                {backendStatus && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`}>
                    {backendStatus}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted dark:text-darkText-muted">
                  Advanced View
                </span>

                <button
                  onClick={() => setAdvancedView(!advancedView)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${advancedView ? "bg-brand" : "bg-gray-300"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${advancedView ? "translate-x-5" : ""}`}
                  />
                </button>
              </div>

            </div>
          </div>

          {uploadLog && (
            <div className="px-6 py-3 border-b border-borderColor dark:border-darkBorder bg-background-muted dark:bg-darkBackground-muted flex items-center justify-between text-sm">

              <div className="flex items-center gap-6">

                <div className="text-text dark:text-darkText">
                  <span className="text-text-muted dark:text-darkText-muted mr-1">
                    Uploaded File:
                  </span>
                  <span className="font-medium">
                    {uploadLog.fileName}
                  </span>
                </div>

                <div className="text-text dark:text-darkText">
                  <span className="text-text-muted dark:text-darkText-muted mr-1">
                    Status:
                  </span>
                  <span className="font-medium">
                    {uploadLog.uploadStatus}
                  </span>
                </div>

                <div className="text-text dark:text-darkText">
                  <span className="text-text-muted dark:text-darkText-muted mr-1">
                    Uploaded At:
                  </span>
                  <span className="font-medium">
                    {new Date(uploadLog.dateCreated).toLocaleString()}
                  </span>
                </div>

              </div>

              {advancedView && (
                <button
                  onClick={() => setShowAIAnalysis((p) => !p)}
                  className="px-3 py-1 text-xs font-medium rounded-md bg-brand text-white"
                >
                  AI Analysis
                </button>
              )}

            </div>
          )}

          <div className="flex flex-col flex-1 min-h-0">
            {!advancedView && (
              <>
                <div className="px-6 pt-4">
                  <div ref={dropdownRef} className="relative w-80">

                    <button
                      onClick={() => setDropdownOpen((p) => !p)}
                      className="w-full flex justify-between items-center border border-borderColor dark:border-darkBorder rounded-lg px-4 py-2 bg-background dark:bg-darkBackground-subtle text-sm font-medium"
                    >
                      {renderSessionLabel(selectedSession?.fixSessionId)}
                      <ChevronDown className="w-4 h-4 text-text-muted dark:text-darkText-muted" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute mt-2 w-full bg-background dark:bg-darkBackground-subtle border border-borderColor dark:border-darkBorder rounded-lg shadow-lg z-50 overflow-hidden">
                        {sessions.map((s) => (
                          <button
                            key={s.simSessionId}
                            onClick={() => {
                              setSelectedSessionId(s.simSessionId);
                              setDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-text dark:text-darkText"
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
              </>
            )}

            {!advancedView ? (
              <div className="grid grid-cols-12 gap-6 px-6 py-6 flex-1 min-h-0">

                <div className="col-span-3 min-h-0">
                  <MessageList
                    messages={sessionMessages}
                    selected={selectedMessage}
                    onSelect={setSelectedMessage}
                  />
                </div>

                <div className="col-span-9 min-h-0">
                  <div className="border border-borderColor dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground-subtle h-full flex flex-col shadow-sm">

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
                          <div className="border border-borderColor dark:border-darkBorder rounded-lg p-6 bg-background dark:bg-darkBackground-subtle space-y-4">

                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-text dark:text-darkText">
                                Session Live Status
                              </span>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-3 h-3 rounded-full ${isLive
                                    ? "bg-green-500"
                                    : "bg-red-500"
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

                            <div className="h-px bg-borderColor dark:bg-darkBorder" />

                            <div>
                              <p className="text-xs text-text-muted dark:text-darkText-muted">
                                Last Heartbeat
                              </p>
                              <p className="text-sm font-medium text-text dark:text-darkText mt-1">
                                {lastHeartbeatTime
                                  ? lastHeartbeatTime.toLocaleString()
                                  : "No heartbeat received yet"}
                              </p>
                            </div>
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
            ) : (
              <AdvancedReplayView
                sessions={advancedSessions}
                showAIAnalysis={showAIAnalysis}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}