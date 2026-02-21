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
  const [error, setError] = useState<string | null>(null);

  const handleRunCertification = async () => {
    try {
      setLoading(true);
      setError(null);

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

      setSimulationId(String(data.simId));
      setStep("sequence");
    } catch (error: any) {
      console.error(
        "Error running certification:",
        error?.response?.data || error.message
      );

      setError("Failed to run certification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <CertificationStepper step={step} />

        {error && (
          <div className="max-w-xl mx-auto border border-red-200 bg-red-50 rounded-md px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

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

        {loading && (
          <div className="flex justify-center">
            <div className="px-6 py-4 border border-border rounded-md bg-background-muted text-sm text-text-muted">
              Running certification...
            </div>
          </div>
        )}
        {step === "sequence" && simulationId && !loading && (
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
