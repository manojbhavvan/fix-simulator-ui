import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

type Props = {
  onRun: () => void;
  onBack: () => void;
  uploadedFileName?: string;
  allowUpload?: boolean;
};

const DUMMY_LOGS = [
  "orderflow_2024_01.log",
  "client_fix_session.log",
  "uat_tradeflow.log",
];

const RULES = [
  "FIX Rule Validation",
  "AI Error Analysis",
  "Sequence Check",
  "Generate Corrections"
];

export default function RunCertification({
  onRun,
  onBack,
  uploadedFileName,
  allowUpload = true,
}: Props) {
  const [logMode, setLogMode] = useState<
    "previous" | "uploaded" | "upload-new"
  >(
    uploadedFileName && !allowUpload
      ? "uploaded"
      : "previous"
  );
  const [rules, setRules] = useState({
    fix: true,
    ai: true,
    sequence: true,
  });


  const [selectedLog, setSelectedLog] = useState(DUMMY_LOGS[0]);

  return (
    <div className="card bg-base-100 shadow p-6 space-y-5 w-[720px] max-w-full">
      <h2 className="text-lg font-semibold">Run Certification</h2>

      <div className="space-y-3">
        <div
          className={`
            flex items-start justify-between gap-4
            p-3 rounded-md border cursor-pointer
            ${logMode === "previous"
              ? "border-primary bg-primary/5"
              : "border-base-300 hover:bg-base-200"
            }
          `}
          onClick={() => setLogMode("previous")}
        >
          <div>
            <p className="text-sm font-medium">Use previous log</p>

            {logMode === "previous" && (
              <div className="mt-2">
                <select
                  className="
                    select select-sm
                    w-64 px-4
                    border border-black
                    focus:border-base-400
                    focus:outline-none
                  "
                  value={selectedLog}
                  onChange={(e) => setSelectedLog(e.target.value)}
                >
                  {DUMMY_LOGS.map((log) => (
                    <option key={log}>{log}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {logMode === "previous" && (
            <Check className="text-primary mt-1" size={18} />
          )}
        </div>

        {uploadedFileName && !allowUpload && (
          <div
            className={`
              flex items-start justify-between gap-4
              p-3 rounded-md border cursor-pointer
              ${logMode === "uploaded"
                ? "border-primary bg-primary/5"
                : "border-base-300 hover:bg-base-200"
              }
            `}
            onClick={() => setLogMode("uploaded")}
          >
            <div>
              <p className="text-sm font-medium">Uploaded log</p>
              <p className="text-sm text-base-content/70 mt-0.5">
                {uploadedFileName}
              </p>
            </div>

            {logMode === "uploaded" && (
              <Check className="text-primary mt-1" size={18} />
            )}
          </div>
        )}

        {allowUpload && (
          <div
            className={`
              flex items-start justify-between gap-4
              p-3 rounded-md border cursor-pointer
              ${logMode === "upload-new"
                ? "border-primary bg-primary/5"
                : "border-base-300 hover:bg-base-200"
              }
            `}
            onClick={() => {
              setLogMode("upload-new");
              onBack();
            }}
          >
            <p className="text-sm font-medium">
              Upload new log
            </p>
          </div>
        )}
      </div>

      <div className="divider my-2" />

      <div className="space-y-3">
        {RULES.map((label) => (
          <label
            key={label}
            className="flex items-center gap-3 text-sm cursor-pointer select-none"
          >
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-3 btn btn-sm bg-primary text-primary-content
            border border-primary hover:bg-transparent hover:text-primary
            transition-colors flex items-center gap-2 leading-none"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <button
          onClick={onRun}
          className="px-3 btn btn-sm bg-primary text-primary-content
            border border-primary hover:bg-transparent hover:text-primary
            transition-colors"
        >
          Run Certification
        </button>
      </div>
    </div>
  );
}
