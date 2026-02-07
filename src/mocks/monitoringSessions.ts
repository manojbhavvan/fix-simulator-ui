export type MonitoringSession = {
  id: string;
  source: string;
  target: string;
  version: string;
  status: "Healthy" | "Down" | "Degraded";
  lastMsg: string;
  hb: "Good" | "Missed";
  seqGap: "Yes" | "No";
  rtt: string;
  errors: number;
};

export const monitoringSessions: MonitoringSession[] = [
  {
    id: "1",
    source: "OMS",
    target: "Broker",
    version: "FIX 4.2",
    status: "Healthy",
    lastMsg: "12s ago",
    hb: "Good",
    seqGap: "No",
    rtt: "120ms",
    errors: 0,
  },
  {
    id: "2",
    source: "QA",
    target: "Exchange",
    version: "FIX 4.2",
    status: "Down",
    lastMsg: "96s ago",
    hb: "Missed",
    seqGap: "Yes",
    rtt: "120ms",
    errors: 2,
  },
  {
    id: "3",
    source: "UAT",
    target: "Market",
    version: "FIX 4.4",
    status: "Degraded",
    lastMsg: "10s ago",
    hb: "Good",
    seqGap: "No",
    rtt: "450ms",
    errors: 1,
  },
  {
    id: "4",
    source: "Infra",
    target: "TestServer",
    version: "FIX 4.4",
    status: "Healthy",
    lastMsg: "3s ago",
    hb: "Good",
    seqGap: "No",
    rtt: "15ms",
    errors: 0,
  },
];
