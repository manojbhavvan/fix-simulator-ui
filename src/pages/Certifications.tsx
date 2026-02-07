import { useState } from "react";
import UploadFixLog from "../components/Certifications/UploadFixLog";
import RunCertification from "../components/Certifications/RunCertification";
import SequenceFlow from "../components/Certifications/SequenceFlow";
import CertificationStepper from "../components/Certifications/CertificationStepper";
import { useNavigate } from "react-router-dom";

type Step = "upload" | "run" | "sequence";

export function Certifications() {
  const [step, setStep] = useState<Step>("upload");
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <CertificationStepper step={step} />

      {step === "upload" && (
        <div className="flex justify-center">
          <UploadFixLog
            onContinue={() => setStep("run")}
            onBack={() => navigate("/")}   // back to Dashboard
          />
        </div>
      )}

      {step === "run" && (
        <div className="flex justify-center">
          <RunCertification
            onRun={() => setStep("sequence")}
            onBack={() => setStep("upload")} // back to Upload
          />
        </div>
      )}

      {step === "sequence" && (
        <SequenceFlow
          simulationId="SIM-20260123-000012"
          onCompleted={() =>
            navigate("/certifications/results/SIM-20260123-000012")
          }
        />
      )}
    </div>
  );
}
