import { Play, Upload, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ActionPanel() {
  const navigate = useNavigate();

  const baseButton =
    "flex items-center justify-center gap-2 w-full h-10 px-4 rounded-md text-xs font-medium transition-all duration-200 border";

  return (
    <div className="bg-background rounded-lg border border-border shadow-sm">
      <div className="px-6 py-5">
        <div className="border-b border-border pb-3 mb-5">
          <h2 className="text-lg font-semibold tracking-wide text-brand">
            Quick Access
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/simulator/config")}
            className={`${baseButton}
              border-brand text-brand
              hover:bg-brand hover:text-white`}
          >
            <Settings className="w-4 h-4" />
            Simulator Configuration
          </button>

          <button
            onClick={() =>
              navigate("/certifications", { state: { entry: "upload" } })
            }
            className={`${baseButton}
              border-brand text-brand
              hover:bg-brand hover:text-white`}
          >
            <Upload className="w-4 h-4" />
            Upload FIX Log
          </button>

          <button
            onClick={() =>
              navigate("/certifications", { state: { entry: "run" } })
            }
            className={`${baseButton}
              border-brand text-brand
              hover:bg-brand hover:text-white`}
          >
            <Play className="w-4 h-4" />
            Run Certification
          </button>
        </div>
      </div>
    </div>
  );
}
