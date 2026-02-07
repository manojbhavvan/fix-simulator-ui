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
    data.messages.find(m => m.status === "FAIL") || data.messages[0]
  );

  return (
    // 🔥 FIXED HEIGHT BELOW NAVBAR
    <div className="p-6 h-[calc(100vh-64px)]">
      <div className="card bg-base-100 border h-full flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="p-5 border-b border-base-300 shrink-0 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <BackButton />
            <div className="self-stretch w-px bg-gray-300" />
            <span className="font-semibold text-base-content/80">
              Certification Results:
            </span>
            <span className="text-base-content/60">
              {data.logId}
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="card-body p-0 flex flex-col flex-1 min-h-0">

          {/* Tabs (fixed) */}
          <Tabs active={activeTab} onChange={setActiveTab} />

          {/* CONTENT */}
          <div className="grid grid-cols-12 gap-4 mt-4 flex-1 min-h-0">

            {/* LEFT PANEL — SCROLLS */}
            <div className="col-span-3 overflow-y-auto">
              <MessageList
                messages={data.messages}
                selected={selectedMessage}
                onSelect={setSelectedMessage}
              />
            </div>

            {/* RIGHT PANEL */}
            <div className="col-span-9 min-h-0">
              <div className="card bg-base-100 border h-full flex flex-col">
                
                {/* 🔥 SINGLE SCROLL OWNER */}
                <div className="card-body flex-1 min-h-0 overflow-y-auto">

                  {activeTab === "details" && (
                    <MessageDetails message={selectedMessage} />
                  )}

                  {activeTab === "sequence" && (
                    <SequenceFlowView flow={data.sequenceFlow} />
                  )}

                  {activeTab === "raw" && (
                    <pre className="bg-neutral text-neutral-content p-4 rounded text-sm">
                      {`8=FIX.4.2|9=176|35=D|49=CLIENT1|56=HUB1|55=AAPL|54=1|38=100|40=2|10=128`}
                    </pre>
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
  );
}