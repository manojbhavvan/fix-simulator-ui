import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import UploadFixLog from "../components/Certifications/UploadFixLog";
import RunCertification from "../components/Certifications/RunCertification";
import SequenceFlow from "../components/Certifications/SequenceFlow";
import CertificationStepper from "../components/Certifications/CertificationStepper";

type Step = "upload" | "run" | "sequence";
type Entry = "upload" | "run" | undefined;

export function Certifications() {
  const location = useLocation();
  const navigate = useNavigate();

  const entry = location.state?.entry as Entry;

  const [step, setStep] = useState<Step>(
    entry === "run" ? "run" : "upload"
  );

  const [simulationId, setSimulationId] = useState<string | null>(null);

  return (
    <div className="bg-background px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <CertificationStepper step={step} />

        {step === "upload" && (
          <div className="flex justify-center">
            <UploadFixLog
              onContinue={() => {
                setStep("run");
              }}
              onBack={() => navigate("/dashboard")}
            />
          </div>
        )}

        {step === "run" && (
          <div className="flex justify-center">
            <RunCertification
              onRunSuccess={(simId: string) => {
                setSimulationId(simId);
                setStep("sequence");
              }}
              onBack={() => setStep("upload")}
            />
          </div>
        )}

        {step === "sequence" && simulationId && (
          <SequenceFlow
            simulationId={simulationId}
            onCompleted={() =>
              navigate(`/certifications/results/${simulationId}`)
            }
          />
        )}
      </div>
    </div>
  );
}
