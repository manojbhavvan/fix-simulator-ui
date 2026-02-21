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
    active: "text-brand",
    good: "text-green-600",
    degraded: "text-amber-600",
    down: "text-red-600",
  };
  return (
    <div className="border border-border bg-background rounded-lg p-4 shadow-sm">
      
      <div className="text-xs text-text-muted uppercase tracking-wide">
        {title}
      </div>

      <div className={`mt-2 text-2xl font-semibold ${colors[variant]}`}>
        {value}
      </div>
      
    </div>
  );
}
