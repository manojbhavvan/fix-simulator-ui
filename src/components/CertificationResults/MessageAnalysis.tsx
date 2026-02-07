export function MessageAnalysis({ message }: any) {
  const a = message.analysis;

  if (!a) {
    return (
      <div className="text-sm text-success">
        No AI issues detected for this message.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border border-base-300 rounded">
        <div className="px-4 py-2 border-b border-base-300 bg-base-200 font-semibold text-sm">
          AI Analysis
        </div>

        <div className="px-4 py-3 text-sm space-y-3 bg-base-100">
          <p>{a.summary}</p>

          {Array.isArray(a.explanation) && (
            <ul className="list-disc ml-5 space-y-1">
              {a.explanation.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {a.suggestedFix && (
        <div className="border border-base-300 rounded">
          <div className="flex items-center justify-between px-4 py-2 border-b border-base-300 bg-base-200 text-sm font-medium font-semibold">
            <span>Suggested FIX</span>
          </div>

          <pre className="px-4 py-3 bg-base-100 text-xs font-mono overflow-x-auto">
            {a.suggestedFix}
          </pre>
        </div>
      )}
      
      {a.possibleReason && (
        <div className="border border-base-300 rounded">
          <div className="px-4 py-2 border-b border-base-300 bg-base-200 text-sm font-medium font-semibold">
            Possible Reason
          </div>

          <div className="px-4 py-3 text-sm bg-base-100">
            {a.possibleReason}
          </div>
        </div>
      )}

      {a.recommendation && (
        <div className="border border-base-300 rounded">
          <div className="px-4 py-2 border-b border-base-300 bg-base-200 text-sm font-medium font-semibold">
            Recommendation
          </div>

          <div className="px-4 py-3 text-sm bg-base-100">
            {a.recommendation}
          </div>
        </div>
      )}
    </div>
  );
}
