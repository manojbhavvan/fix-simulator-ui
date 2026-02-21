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
  "Generate Corrections",
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
    uploadedFileName && !allowUpload ? "uploaded" : "previous"
  );

  const [selectedLog, setSelectedLog] = useState(DUMMY_LOGS[0]);

  return (
    <div className="bg-background border border-border rounded-lg shadow-sm p-8 space-y-6 w-[720px] max-w-full">
      
      <h2 className="text-xl font-semibold text-brand">
        Run Certification
      </h2>

      <div className="space-y-4">
        <SelectableCard
          active={logMode === "previous"}
          onClick={() => setLogMode("previous")}
        >
          <div>
            <p className="text-sm font-medium text-text">
              Use previous log
            </p>

            {logMode === "previous" && (
              <div className="mt-3">
                <select
                  className="
                    w-64 px-3 py-2
                    text-sm
                    border border-border
                    rounded-md
                    bg-background
                    focus:outline-none
                    focus:ring-2 focus:ring-brand/40
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
            <Check className="text-brand mt-1" size={18} />
          )}
        </SelectableCard>

        {uploadedFileName && !allowUpload && (
          <SelectableCard
            active={logMode === "uploaded"}
            onClick={() => setLogMode("uploaded")}
          >
            <div>
              <p className="text-sm font-medium text-text">
                Uploaded log
              </p>
              <p className="text-sm text-text-muted mt-1">
                {uploadedFileName}
              </p>
            </div>

            {logMode === "uploaded" && (
              <Check className="text-brand mt-1" size={18} />
            )}
          </SelectableCard>
        )}

        {allowUpload && (
          <SelectableCard
            active={logMode === "upload-new"}
            onClick={() => {
              setLogMode("upload-new");
              onBack();
            }}
          >
            <p className="text-sm font-medium text-text">
              Upload new log
            </p>
          </SelectableCard>
        )}
      </div>

      <div className="h-px bg-border" />

      <div className="space-y-3">
        {RULES.map((label) => (
          <label
            key={label}
            className="flex items-center gap-3 text-sm cursor-pointer select-none text-text"
          >
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 border border-border
                rounded accent-[var(--brand)]"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between items-center pt-6">
        <button
          onClick={onBack}
          className="
            flex items-center gap-2
            px-4 py-2
            text-sm font-medium
            border border-border
            rounded-md
            bg-background
            hover:border-brand hover:text-brand
            transition-colors
          "
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={onRun}
          className="
            px-5 py-2
            text-sm font-semibold
            rounded-md
            bg-brand
            text-white
            hover:bg-brand-dark
            transition-colors
          "
        >
          Run Certification
        </button>
      </div>
    </div>
  );
}


function SelectableCard({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-start justify-between gap-4
        p-4 rounded-md border cursor-pointer
        transition-colors
        ${
          active
            ? "border-brand bg-brand/5"
            : "border-border hover:bg-background-subtle"
        }
      `}
    >
      {children}
    </div>
  );
}