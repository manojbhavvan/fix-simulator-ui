import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

type Props = {
  onRunSuccess: (simId: string) => void;
  onBack: () => void;
};

interface FixVersion {
  fixVersionId: number;
  fixVersionName: string;
  description: string;
}

interface SimulatorConfig {
  simulatorConfigId: number;
  simulatorConfigName: string;
  simulatorConfigType: string;
  beginString: string;
  senderCompId: string;
  targetCompId: string;
  socketConnectHost: string;
  socketConnectPort: string;
  fixVersion: FixVersion;
}

interface UploadLog {
  uploadId: number;
  fileName: string;
  filePath: string;
  uploadStatus: string;
  dateCreated: string;
}

export default function RunCertification({
  onRunSuccess,
  onBack,
}: Props) {
  const [simulators, setSimulators] = useState<SimulatorConfig[]>([]);
  const [fixVersions, setFixVersions] = useState<FixVersion[]>([]);
  const [uploadLogs, setUploadLogs] = useState<UploadLog[]>([]);

  const [selectedSimulator, setSelectedSimulator] =
    useState<SimulatorConfig | null>(null);
  const [selectedFixVersion, setSelectedFixVersion] =
    useState<FixVersion | null>(null);
  const [selectedUploadLog, setSelectedUploadLog] =
    useState<UploadLog | null>(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    simulator: "",
    version: "",
    log: "",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/rest/simulator/config/type/CLIENT`)
      .then((res) => setSimulators(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/rest/fix/version/all`)
      .then((res) => setFixVersions(res.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/rest/upload/log/all`)
      .then((res) => {
        const sortedLogs = (res.data || [])
          .filter((log: UploadLog) => log.uploadStatus === "COMPLETED")
          .sort(
            (a: UploadLog, b: UploadLog) =>
              new Date(b.dateCreated).getTime() -
              new Date(a.dateCreated).getTime()
          );
        setUploadLogs(sortedLogs);
      })
      .catch(() => {});
  }, []);

  const validate = () => {
    const newErrors = {
      simulator: selectedSimulator ? "" : "Simulator is required",
      version: selectedFixVersion ? "" : "FIX Version is required",
      log: selectedUploadLog ? "" : "Upload Log is required",
    };

    setErrors(newErrors);
    return !newErrors.simulator && !newErrors.version && !newErrors.log;
  };

  const handleRun = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        simId: null,
        clientSimulatorConfig: selectedSimulator,
        brokerSimulatorConfig: selectedSimulator,
        fixVersion: selectedFixVersion,
        uploadLog: selectedUploadLog,
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/rest/simulation`,
        payload
      );

      onRunSuccess(String(data.simId));
    } catch (err: any) {
      console.error("Simulation failed", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    selectedSimulator && selectedFixVersion && selectedUploadLog;

  const selectBase = `
    w-full px-3 py-2.5
    rounded-md
    border
    bg-background dark:bg-darkBackground
    text-text dark:text-darkText
    border-borderColor dark:border-darkBorder
    focus:outline-none
    focus:ring-1 focus:ring-brand dark:focus:ring-brand-dark
    transition-all duration-200
  `;

  return (
    <div
      className="
        bg-background dark:bg-darkBackground-muted
        border border-borderColor dark:border-darkBorder
        rounded-lg
        shadow-sm dark:shadow-lg dark:shadow-black/20
        p-8 space-y-6
        w-[900px] max-w-full mx-auto
        transition-colors duration-300
      "
    >
      <h2 className="text-xl font-semibold text-brand dark:text-brand-dark">
        Run Certification
      </h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text dark:text-darkText">
          Select CLIENT Simulator Config
        </label>
        <select
          className={`${selectBase} ${
            errors.simulator
              ? "border-error focus:ring-error"
              : ""
          }`}
          onChange={(e) => {
            const sim = simulators.find(
              (s) => s.simulatorConfigId === Number(e.target.value)
            );
            setSelectedSimulator(sim || null);
            setErrors((prev) => ({ ...prev, simulator: "" }));
          }}
        >
          <option value="">Select Simulator</option>
          {simulators.map((sim) => (
            <option
              key={sim.simulatorConfigId}
              value={sim.simulatorConfigId}
            >
              {sim.simulatorConfigName}
            </option>
          ))}
        </select>
        {errors.simulator && (
          <p className="text-xs text-error">{errors.simulator}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text dark:text-darkText">
          Select FIX Version
        </label>
        <select
          className={`${selectBase} ${
            errors.version ? "border-error focus:ring-error" : ""
          }`}
          onChange={(e) => {
            const version = fixVersions.find(
              (v) => v.fixVersionId === Number(e.target.value)
            );
            setSelectedFixVersion(version || null);
            setErrors((prev) => ({ ...prev, version: "" }));
          }}
        >
          <option value="">Select Version</option>
          {fixVersions.map((v) => (
            <option key={v.fixVersionId} value={v.fixVersionId}>
              {v.fixVersionName}
            </option>
          ))}
        </select>
        {errors.version && (
          <p className="text-xs text-error">{errors.version}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text dark:text-darkText">
          Select Uploaded Log
        </label>
        <select
          className={`${selectBase} ${
            errors.log ? "border-error focus:ring-error" : ""
          }`}
          onChange={(e) => {
            const log = uploadLogs.find(
              (l) => l.uploadId === Number(e.target.value)
            );
            setSelectedUploadLog(log || null);
            setErrors((prev) => ({ ...prev, log: "" }));
          }}
        >
          <option value="">Select Log</option>
          {uploadLogs.map((log) => (
            <option key={log.uploadId} value={log.uploadId}>
              {log.fileName}
            </option>
          ))}
        </select>
        {errors.log && (
          <p className="text-xs text-error">{errors.log}</p>
        )}
      </div>

      <div className="flex justify-between items-center pt-6">
        <button
          onClick={onBack}
          className="
            flex items-center gap-2
            px-4 py-2 text-sm
            border border-borderColor dark:border-darkBorder
            rounded-md
            text-text dark:text-darkText
            bg-background dark:bg-darkBackground
            hover:border-brand dark:hover:border-brand-dark
            hover:text-brand dark:hover:text-brand-dark
            transition-all duration-200
          "
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={handleRun}
          disabled={loading || !isFormValid}
          className={`
            px-5 py-2 text-sm font-semibold rounded-md
            transition-all duration-200
            ${
              loading || !isFormValid
                ? `
                  border border-borderColor dark:border-darkBorder
                  bg-background dark:bg-darkBackground
                  text-text-muted dark:text-darkText-muted
                  cursor-not-allowed
                `
                : `
                  bg-brand text-white
                  hover:bg-brand-dark
                `
            }
          `}
        >
          {loading ? "Running..." : "Run Certification"}
        </button>
      </div>
    </div>
  );
}