export function HealthSummary() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Stat title="Active" value="4" color="text-success" />
      <Stat title="Good" value="2" color="text-info" />
      <Stat title="Degraded" value="1" color="text-warning" />
      <Stat title="Down" value="1" color="text-error" />
    </div>
  );
}

function Stat({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="stat bg-base-200 rounded-box">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${color}`}>
        {value}
      </div>
    </div>
  );
}
