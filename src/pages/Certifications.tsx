import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

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

  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunCertification = async () => {
    try {
      setLoading(true);

      const payload = {
        simId: null,
        fixVersion: "FIX44",
        logPath: uploadedFileName
          ? `/log/${uploadedFileName}`
          : "/log/log.txt",
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/rest/simulation`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Simulation Created:", data);

      setSimulationId(String(data.simId));
      setStep("sequence");

    } catch (error: any) {
      console.error(
        "Error running certification:",
        error?.response?.data || error.message
      );
      alert("Failed to run certification");
    } finally {
      setLoading(false);
    }
  };

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
            onRun={handleRunCertification}
            onBack={() => setStep("upload")}
            uploadedFileName={uploadedFileName}
            allowUpload={!uploadedFileName}
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
  );
}
