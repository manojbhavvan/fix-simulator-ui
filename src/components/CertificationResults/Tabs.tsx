type TabKey = "details" | "raw" | "sequence" | "heartbeat" | "ai";

export function Tabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "details", label: "Message Details" },
    { key: "raw", label: "Raw FIX" },
    { key: "sequence", label: "Sequence Flow" },
    { key: "heartbeat", label: "Heartbeat" },
    { key: "ai", label: "AI Analysis" },
  ];

  return (
    <div className="border-b border-border">
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => {
          const isActive = active === t.key;

          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`
                relative pb-3 pt-2 text-sm font-medium whitespace-nowrap
                transition-colors
                ${
                  isActive
                    ? "text-brand"
                    : "text-text-muted hover:text-text"
                }
              `}
            >
              {t.label}

              {isActive && (
                <span
                  className="
                    absolute left-0 bottom-0
                    h-[2px] w-full
                    bg-brand
                    rounded
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}