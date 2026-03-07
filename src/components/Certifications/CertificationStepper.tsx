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
          bg-background dark:bg-darkBackground-muted
          px-12 py-6
          rounded-lg
          border border-borderColor dark:border-darkBorder
          shadow-sm dark:shadow-lg dark:shadow-black/20
          transition-colors duration-300
        "
      >
        <div className="flex items-center justify-center">
          {steps.map((s, i) => {
            const isCompleted = i < activeIndex;
            const isActive = i === activeIndex;

            return (
              <div key={s.key} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-9 h-9 rounded-full
                      flex items-center justify-center
                      text-sm font-semibold
                      transition-all duration-200
                      ${
                        isCompleted
                          ? `
                            bg-brand text-white
                            dark:bg-brand-dark dark:text-darkBackground
                          `
                          : isActive
                          ? `
                            border-2 border-brand text-brand
                            dark:border-brand-dark dark:text-brand-dark
                            bg-background dark:bg-darkBackground
                          `
                          : `
                            border border-borderColor dark:border-darkBorder
                            bg-background-muted dark:bg-darkBackground
                            text-text-muted dark:text-darkText-muted
                          `
                      }
                    `}
                  >
                    {isCompleted ? <Check size={16} /> : i + 1}
                  </div>

                  <span
                    className={`
                      text-sm font-medium whitespace-nowrap transition-colors
                      ${
                        isCompleted || isActive
                          ? "text-text dark:text-darkText"
                          : "text-text-muted dark:text-darkText-muted"
                      }
                    `}
                  >
                    {s.label}
                  </span>
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={`
                      mx-8 h-px w-24 transition-colors duration-300
                      ${
                        i < activeIndex
                          ? "bg-brand dark:bg-brand-dark"
                          : "bg-borderColor dark:bg-darkBorder"
                      }
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