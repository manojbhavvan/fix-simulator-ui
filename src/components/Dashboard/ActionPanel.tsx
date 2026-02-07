import { Play, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ActionPanel() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="px-2 pb-3">
                <div className="border-b border-color-gray pb-2">
                    <h2 className="text-lg font-semibold tracking-wide text-base-content/80">
                        Dashboard
                    </h2>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <button
                        className="btn btn-sm btn-outline gap-2 px-2
                            bg-primary text-primary-content shadow-sm 
                            hover:bg-transparent hover:text-primary hover:shadow-md
                            transition-all duration-200"
                        onClick={() => navigate("/certifications")}
                    >
                        <Play className="w-4 h-4" />
                        Run Certification
                    </button>

                    <button
                        className="btn btn-sm btn-outline gap-2 px-2 
                            bg-base-200 text-base-content shadow-sm
                            hover:bg-transparent hover:text-primary 
                            hover:border-primary hover:shadow-md
                            transition-all duration-200"
                        onClick={() => navigate("/certifications")}
                    >
                        <Upload className="w-4 h-4" />
                        Upload FIX Log
                    </button>
                </div>
            </div>
        </div>
    );
}
