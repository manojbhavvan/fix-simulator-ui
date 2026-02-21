export function FixSessionSummary() {
  return (
    <div>
      <div className="border-b border-border pb-3 mb-4">
        <h3 className="text-lg font-semibold text-brand">
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
    success:
      "bg-green-50 text-green-700 border-green-200",
    info:
      "bg-blue-50 text-blue-700 border-blue-200",
    warning:
      "bg-amber-50 text-amber-700 border-amber-200",
    error:
      "bg-red-50 text-red-700 border-red-200",
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
        transition-all duration-200
        ${styles[variant]}
      `}
    >
      <span className="text-xl font-semibold">
        {value}
      </span>
      <span className="text-xs font-medium mt-1 tracking-wide">
        {label}
      </span>
    </div>
  );
}