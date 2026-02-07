import { ArrowRight } from "lucide-react";

export function SequenceFlowView({ flow }: any) {
  return (
    // NO height logic here — parent scrolls
    <div className="space-y-6">

      {/* Sequence Flow */}
      <div className="border border-base-300 rounded">
        <div className="px-4 py-2 font-semibold border-b border-base-300">
          Sequence Flow
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-2 text-sm">
            {flow.nodes.map((node: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="px-3 py-1 border border-base-300 rounded bg-base-100 font-medium">
                  {node}
                </span>
                {idx < flow.nodes.length - 1 && (
                  <ArrowRight size={14} className="text-base-content/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues */}
      {flow.issues?.length > 0 && (
        <div className="border border-warning/40 bg-warning/10 rounded">
          <div className="px-4 py-2 font-semibold text-warning border-b border-warning/30">
            Issues Detected
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-warning/20">
              {flow.issues.map((issue: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-4 py-3 font-medium text-warning whitespace-nowrap">
                    {issue.type}
                  </td>
                  <td className="px-4 py-3 text-base-content/80">
                    {issue.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* AI Insights */}
      {flow.insights?.length > 0 && (
        <div className="border border-info/40 bg-info/5 rounded">
          <div className="px-4 py-2 font-semibold text-info border-b border-info/30">
            AI Insights
          </div>

          <ul className="list-disc ml-5 px-4 py-3 text-sm space-y-1">
            {flow.insights.map((insight: string, idx: number) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
