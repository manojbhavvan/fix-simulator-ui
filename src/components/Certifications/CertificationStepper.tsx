import { Check } from "lucide-react";

type Step = "upload" | "run" | "sequence";

const steps: { key: Step; label: string }[] = [
  { key: "upload", label: "Upload FIX Log" },
  { key: "run", label: "Run Certification" },
  { key: "sequence", label: "Sequence Flow" },
];

export default function CertificationStepper({ step }: { step: Step }) {
  const activeIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex justify-center mb-10">
      <div
        className="
          bg-background
          px-12 py-6
          rounded-lg
          border border-border
          shadow-sm
        "
      >
        <div className="flex items-center justify-center">
          {steps.map((s, i) => {
            const isCompleted = i < activeIndex;
            const isActive = i === activeIndex;

            return (
              <div key={s.key} className="flex items-center">                
                {/* Step */}
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-9 h-9 rounded-full
                      flex items-center justify-center
                      text-sm font-semibold
                      transition-colors
                      ${
                        isCompleted
                          ? "bg-brand text-white"
                          : isActive
                          ? "border-2 border-brand text-brand bg-background"
                          : "bg-background-muted text-text-muted border border-border"
                      }
                    `}
                  >
                    {isCompleted ? <Check size={16} /> : i + 1}
                  </div>

                  <span
                    className={`text-sm font-medium whitespace-nowrap ${
                      isCompleted || isActive
                        ? "text-text"
                        : "text-text-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div
                    className={`mx-8 h-px w-24
                      ${
                        i < activeIndex
                          ? "bg-brand"
                          : "bg-border"
                      }
                      transition-colors
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
