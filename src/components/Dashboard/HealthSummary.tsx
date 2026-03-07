export function HealthSummary() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Stat title="Active" value="4" variant="active" />
      <Stat title="Good" value="2" variant="good" />
      <Stat title="Degraded" value="1" variant="degraded" />
      <Stat title="Down" value="1" variant="down" />
    </div>
  );
}

function Stat({
  title,
  value,
  variant,
}: {
  title: string;
  value: string;
  variant: "active" | "good" | "degraded" | "down";
}) {
  const colors = {
    active: "text-brand dark:text-brand-dark",
    good: "text-green-600 dark:text-green-400",
    degraded: "text-amber-600 dark:text-amber-400",
    down: "text-red-600 dark:text-red-400",
  };

  return (
    <div
      className="
        border border-borderColor dark:border-darkBorder
        bg-background dark:bg-darkBackground-muted
        rounded-lg
        p-4
        shadow-sm dark:shadow-md dark:shadow-black/20
        transition-colors duration-300
      "
    >
      <div className="text-xs text-text-muted dark:text-darkText-muted uppercase tracking-wide">
        {title}
      </div>

      <div className={`mt-2 text-2xl font-semibold ${colors[variant]}`}>
        {value}
      </div>
      
    </div>
  );
}