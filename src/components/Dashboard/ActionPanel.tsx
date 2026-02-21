import { Play, Upload, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ActionPanel() {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 rounded-lg border border-base-300 shadow-sm">
      <div className="px-6 py-5">
        <div className="border-b border-base-300 pb-3 mb-5">
          <h2 className="text-xl font-semibold tracking-wide text-base-content">
            Dashboard
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() =>
              navigate("/certifications", { state: { entry: "run" } })
            }
            className="
              flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md
              bg-primary text-primary-content text-xs font-semibold shadow-sm
              hover:shadow transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5" />
            Run Certification
          </button>

          <button
            onClick={() =>
              navigate("/certifications", { state: { entry: "upload" } })
            }
            className="
              flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md
              border border-base-300 bg-base-100 text-xs font-medium
              hover:border-primary hover:text-primary transition-all duration-200"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload FIX Log
          </button>

          <button
            onClick={() => navigate("/simulator/config")}
            className="
              flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md
              border border-[#465391] text-[#465391] text-xs font-medium bg-white
              hover:bg-[#465391] hover:text-white transition-all duration-200"
          >
            <Settings className="w-3.5 h-3.5" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
