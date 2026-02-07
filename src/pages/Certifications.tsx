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

  const [uploadedFileName, setUploadedFileName] = useState<
    string | undefined
  >(undefined);

  return (
    <div className="p-6 space-y-6">
      <CertificationStepper step={step} />

      {step === "upload" && (
        <div className="flex justify-center">
          <UploadFixLog
            onContinue={(fileName?: string) => {
              setUploadedFileName(fileName);
              setStep("run");
            }}
            onBack={() => navigate("/dashboard")}
          />
        </div>
      )}

      {step === "run" && (
        <div className="flex justify-center">
          <RunCertification
            onRun={() => setStep("sequence")}
            onBack={() => setStep("upload")}
            uploadedFileName={uploadedFileName}
            allowUpload={!uploadedFileName}
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
