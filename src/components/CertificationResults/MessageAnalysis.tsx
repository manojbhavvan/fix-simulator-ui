export function MessageAnalysis({ message }: any) {
  const a = message?.analysis;

  if (!a) {
    return (
      <div
        className="
          inline-flex items-center gap-2
          px-4 py-2
          rounded-md
          text-sm font-medium
          bg-green-50 text-green-700
          border border-green-200
          dark:bg-green-900/20 dark:text-green-400 dark:border-green-700/40
          transition-colors duration-300
        "
      >
        No AI issues detected for this message.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Section title="AI Analysis">
        <p className="text-sm text-text dark:text-darkText">
          {a.summary}
        </p>

        {Array.isArray(a.explanation) && (
          <ul className="list-disc ml-5 mt-3 space-y-1 text-sm text-text-muted dark:text-darkText-muted">
            {a.explanation.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </Section>

      {a.suggestedFix && (
        <Section title="Suggested FIX">
          <pre
            className="
              text-xs font-mono
              bg-background-muted dark:bg-darkBackground-subtle
              border border-borderColor dark:border-darkBorder
              rounded-md p-4
              overflow-x-auto
              text-text dark:text-darkText
              transition-colors duration-300
            "
          >
            {a.suggestedFix}
          </pre>
        </Section>
      )}

      {a.possibleReason && (
        <Section title="Possible Reason">
          <div className="text-sm text-text dark:text-darkText">
            {a.possibleReason}
          </div>
        </Section>
      )}

      {a.recommendation && (
        <Section title="Recommendation">
          <div className="text-sm text-text dark:text-darkText">
            {a.recommendation}
          </div>
        </Section>
      )}
    </div>
  );
}


function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        border border-borderColor dark:border-darkBorder
        rounded-lg
        bg-background dark:bg-darkBackground-subtle
        shadow-sm
        transition-colors duration-300
      "
    >
      <div
        className="
          px-5 py-3
          border-b border-borderColor dark:border-darkBorder
          bg-background-muted dark:bg-darkBackground-muted
          text-sm font-semibold
          text-brand
          transition-colors duration-300
        "
      >
        {title}
      </div>

      <div className="px-5 py-4 space-y-2">
        {children}
      </div>
    </div>
  );
}