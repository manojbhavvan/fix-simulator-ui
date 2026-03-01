import { Play, Upload, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ActionPanel() {
  const navigate = useNavigate();

  const baseButton =
    `
    group
    flex items-center justify-center gap-2
    w-full h-10 px-4
    rounded-md
    text-sm font-medium
    border
    transition-all duration-200
    `;

  return (
    <div
      className="
        bg-background dark:bg-darkBackground-muted
        rounded-lg
        border border-borderColor dark:border-darkBorder
        shadow-sm dark:shadow-md dark:shadow-black/20
        transition-colors duration-300
      "
    >
      <div className="px-6 py-5">
        <div className="border-b border-borderColor dark:border-darkBorder pb-3 mb-5 transition-colors duration-300">
          <h2 className="text-lg font-semibold tracking-wide text-brand dark:text-brand-dark">
            Quick Access
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/simulator/config")}
            className={`${baseButton}
              border-borderColor dark:border-darkBorder
              text-text dark:text-darkText
              bg-background dark:bg-darkBackground
              hover:border-brand dark:hover:border-brand-dark
              hover:text-brand dark:hover:text-brand-dark
            `}
          >
            <Settings className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            Simulator Configuration
          </button>

          <button
            onClick={() =>
              navigate("/certifications", { state: { entry: "upload" } })
            }
            className={`${baseButton}
              border-borderColor dark:border-darkBorder
              text-text dark:text-darkText
              bg-background dark:bg-darkBackground
              hover:border-brand dark:hover:border-brand-dark
              hover:text-brand dark:hover:text-brand-dark
            `}
          >
            <Upload className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            Upload FIX Log
          </button>

          <button
            onClick={() =>
              navigate("/certifications", { state: { entry: "run" } })
            }
            className={`${baseButton}
              border-borderColor dark:border-darkBorder
              text-text dark:text-darkText
              bg-background dark:bg-darkBackground
              hover:border-brand dark:hover:border-brand-dark
              hover:text-brand dark:hover:text-brand-dark
            `}
          >
            <Play className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            Run Certification
          </button>
        </div>
      </div>
    </div>
  );
}