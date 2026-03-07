export function FixSessionSummary() {
  return (
    <div>
      <div
        className="
          border-b border-borderColor dark:border-darkBorder
          pb-3 mb-4
          transition-colors duration-300
        "
      >
        <h3 className="text-lg font-semibold text-brand dark:text-brand-dark">
          FIX Session Health
        </h3>
      </div>

      <div className="flex gap-4">
        <StatusBlock label="Active" value={4} variant="success" />
        <StatusBlock label="Good" value={2} variant="info" />
        <StatusBlock label="Degraded" value={1} variant="warning" />
        <StatusBlock label="Down" value={1} variant="error" />
      </div>
    </div>
  );
}

function StatusBlock({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: "success" | "info" | "warning" | "error";
}) {
  const styles = {
    success: `
      bg-green-50 text-green-700 border-green-200
      dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30
    `,
    info: `
      bg-blue-50 text-blue-700 border-blue-200
      dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30
    `,
    warning: `
      bg-amber-50 text-amber-700 border-amber-200
      dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30
    `,
    error: `
      bg-red-50 text-red-700 border-red-200
      dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30
    `,
  };

  return (
    <div
      className={`
        flex-1
        flex flex-col items-center justify-center
        px-4 py-4
        border
        rounded-lg
        text-center
        transition-all duration-300
        shadow-sm
        dark:shadow-md dark:shadow-black/20
        ${styles[variant]}
      `}
    >
      <span className="text-xl font-semibold">
        {value}
      </span>

      <span className="text-xs font-medium mt-1 tracking-wide opacity-80">
        {label}
      </span>
    </div>
  );
}