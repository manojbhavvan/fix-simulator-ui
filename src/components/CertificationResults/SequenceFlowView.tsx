import { ArrowRight } from "lucide-react";

export function SequenceFlowView({ flow }: any) {
  return (
    <div className="space-y-8">
      <div className="border border-border rounded-lg bg-background shadow-sm">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-brand">
            Sequence Flow
          </h3>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-3 justify-center items-center text-sm">
            {flow.nodes.map((node: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <span
                  className="px-4 py-1.5 rounded-md border border-border
                    bg-background-muted text-text font-medium"
                >
                  {node}
                </span>
                {idx < flow.nodes.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="text-text-muted"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {flow.issues?.length > 0 && (
        <div className="border border-red-200 bg-red-50 rounded-lg">
          <div className="px-5 py-3 border-b border-red-200">
            <h3 className="text-sm font-semibold text-red-600">
              Issues Detected
            </h3>
          </div>

          <table className="w-full text-sm">
            <tbody className="divide-y divide-red-100">
              {flow.issues.map((issue: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-5 py-3 font-medium text-red-600 whitespace-nowrap">
                    {issue.type}
                  </td>
                  <td className="px-5 py-3 text-text-muted">
                    {issue.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {flow.insights?.length > 0 && (
        <div className="border border-indigo-200 bg-indigo-50 rounded-lg">
          <div className="px-5 py-3 border-b border-indigo-200">
            <h3 className="text-sm font-semibold text-indigo-700">
              AI Insights
            </h3>
          </div>

          <ul className="px-6 py-4 text-sm space-y-2 text-text">
            {flow.insights.map((insight: string, idx: number) => (
              <li key={idx} className="flex gap-2">
                <span className="text-indigo-600 mt-[3px]">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
