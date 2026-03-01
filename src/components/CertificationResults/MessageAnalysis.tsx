export function MessageAnalysis({ message }: any) {
  const a = message.analysis;

  if (!a) {
    return (
      <div className="text-sm text-green-600 font-medium">
        No AI issues detected for this message.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Section title="AI Analysis">
        <p className="text-sm text-text">{a.summary}</p>

        {Array.isArray(a.explanation) && (
          <ul className="list-disc ml-5 mt-3 space-y-1 text-sm text-text-muted">
            {a.explanation.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </Section>

      {a.suggestedFix && (
        <Section title="Suggested FIX">
          <pre className="text-xs font-mono bg-background-muted border border-border rounded-md p-4 overflow-x-auto">
            {a.suggestedFix}
          </pre>
        </Section>
      )}

      {a.possibleReason && (
        <Section title="Possible Reason">
          <div className="text-sm text-text">
            {a.possibleReason}
          </div>
        </Section>
      )}

      {a.recommendation && (
        <Section title="Recommendation">
          <div className="text-sm text-text">
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
    <div className="border border-border rounded-lg bg-background shadow-sm">
      <div className="px-5 py-3 border-b border-border bg-background-muted text-sm font-semibold text-brand">
        {title}
      </div>

      <div className="px-5 py-4 space-y-2">
        {children}
      </div>
    </div>
  );
}