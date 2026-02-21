import { useState } from "react";
import { certificationRunMock } from "@/mocks/certificationRun";
import { Tabs } from "@/components/CertificationResults/Tabs";
import { MessageList } from "@/components/CertificationResults/MessageList";
import { MessageAnalysis } from "@/components/CertificationResults/MessageAnalysis";
import { SequenceFlowView } from "@/components/CertificationResults/SequenceFlowView";
import { BackButton } from "@/components/utils/BackButton";
import { MessageDetails } from "@/components/CertificationResults/MessageDetails";

type TabKey = "details" | "sequence" | "raw" | "ai";

export function CertificationResults() {
  const data = certificationRunMock;

  const [activeTab, setActiveTab] = useState<TabKey>("details");
  const [selectedMessage, setSelectedMessage] = useState(
    data.messages.find((m) => m.status === "FAIL") ||
      data.messages[0]
  );

  return (
    <div className="min-h-screen bg-background px-6 py-8">
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
                {data.logId}
              </span>
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0">

            <div className="px-6 pt-4">
              <Tabs active={activeTab} onChange={setActiveTab} />
            </div>

            <div className="grid grid-cols-12 gap-6 px-6 py-6 flex-1 min-h-0">

              <div className="col-span-3 min-h-0">
                <MessageList
                  messages={data.messages}
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

                    {activeTab === "sequence" && (
                      <SequenceFlowView flow={data.sequenceFlow} />
                    )}

                    {activeTab === "raw" && (
                      <div className="border border-border rounded-md bg-background-muted">
                        <div className="px-4 py-2 border-b border-border text-sm font-medium text-brand">
                          Raw FIX Message
                        </div>
                        <pre className="px-4 py-4 text-xs font-mono text-text overflow-x-auto">
                          {`8=FIX.4.2|9=176|35=D|49=CLIENT1|56=HUB1|55=AAPL|54=1|38=100|40=2|10=128`}
                        </pre>
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