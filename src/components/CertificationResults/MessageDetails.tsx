export function MessageDetails({ message }: any) {
  if (!message) {
    return (
      <div className="text-text-muted text-sm">
        No message selected.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-brand">
        Message Details
      </h3>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-border">
            <tr>
              <td className="px-5 py-3 font-medium text-text-muted">
                Session ID
              </td>
              <td className="px-5 py-3">{message.sessionId}</td>
            </tr>

            <tr>
              <td className="px-5 py-3 font-medium text-text-muted">
                Sequence Number
              </td>
              <td className="px-5 py-3">{message.seqNum}</td>
            </tr>

            <tr>
              <td className="px-5 py-3 font-medium text-text-muted">
                Message Type
              </td>
              <td className="px-5 py-3">{message.type}</td>
            </tr>

            <tr>
              <td className="px-5 py-3 font-medium text-text-muted">
                Status
              </td>
              <td className="px-5 py-3">{message.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {message.validationErrors?.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-600 mb-3">
            Validation Errors
          </h4>

          <div className="space-y-2">
            {message.validationErrors.map((err: any) => (
              <div
                key={err.errorId}
                className="border border-red-200 bg-red-50 rounded-md p-3 text-sm"
              >
                <div className="font-medium text-red-600">
                  {err.errorCode}
                </div>
                <div className="text-text-muted">
                  Tag {err.tagNumber} — {err.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}