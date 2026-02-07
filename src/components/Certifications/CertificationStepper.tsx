import { Check } from "lucide-react";

type Step = "upload" | "run" | "sequence";

const steps: { key: Step; label: string }[] = [
  { key: "upload", label: "Upload FIX Log" },
  { key: "run", label: "Run Certification" },
  { key: "sequence", label: "Sequence Flow" },
];

export default function CertificationStepper({ step }: { step: Step }) {
  const activeIndex = steps.findIndex(s => s.key === step);

  return (
    <div className="flex justify-center mb-8">
      {/* Card – width only as needed */}
      <div
        className="
          bg-base-100
          px-10 py-5
          rounded-lg
          shadow-xl shadow-base-300/50
          border border-base-200
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
                      ${
                        isCompleted || isActive
                          ? "bg-primary text-primary-content"
                          : "bg-base-300 text-base-content/60"
                      }
                    `}
                  >
                    {isCompleted ? <Check size={18} /> : i + 1}
                  </div>

                  <span
                    className={`text-sm font-medium whitespace-nowrap ${
                      isActive || isCompleted
                        ? "text-base-content"
                        : "text-base-content/60"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="mx-8 h-px w-24 bg-base-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
