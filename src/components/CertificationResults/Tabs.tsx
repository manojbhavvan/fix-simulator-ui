type TabKey = "details" | "sequence" | "raw" | "ai";

export function Tabs({
  active,
  onChange
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string }[] = [
    { key: "details", label: "Message Details" },
    { key: "sequence", label: "Sequence Flow" },
    { key: "raw", label: "Raw FIX" },
    { key: "ai", label: "AI Analysis" }
  ];

  return (
    <div className="flex gap-2 border-b border-base-300">
      {tabs.map(t => {
        const isActive = active === t.key;

        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`
              px-4 py-2 text-sm rounded-t
              border
              transition-colors
              ${
                isActive
                  ? `
                    bg-blue-50
                    text-blue-700 font-semibold
                    border-violet-600
                    border-b-4
                  `
                  : `
                    bg-base-200
                    text-base-content/70
                    border-base-300
                    hover:bg-base-300
                  `
              }
            `}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
