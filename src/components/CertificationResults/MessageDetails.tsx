export function MessageDetails({ message }: any) {
  if (!message) {
    return (
      <div className="text-text-muted dark:text-darkText-muted text-sm">
        No message selected.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-brand">
        Message Details
      </h3>

      <div className="border border-borderColor dark:border-darkBorder rounded-lg overflow-hidden bg-background dark:bg-darkBackground-subtle transition-colors duration-300">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-borderColor dark:divide-darkBorder">
            <tr>
              <td className="px-5 py-3 font-medium text-text-muted dark:text-darkText-muted">
                Session ID
              </td>
              <td className="px-5 py-3 text-text dark:text-darkText">
                {message.sessionId}
              </td>
            </tr>

            <tr>
              <td className="px-5 py-3 font-medium text-text-muted dark:text-darkText-muted">
                Sequence Number
              </td>
              <td className="px-5 py-3 text-text dark:text-darkText">
                {message.seqNum}
              </td>
            </tr>

            <tr>
              <td className="px-5 py-3 font-medium text-text-muted dark:text-darkText-muted">
                Message Type
              </td>
              <td className="px-5 py-3 text-text dark:text-darkText">
                {message.type}
              </td>
            </tr>

            <tr>
              <td className="px-5 py-3 font-medium text-text-muted dark:text-darkText-muted">
                Status
              </td>
              <td className="px-5 py-3 text-text dark:text-darkText">
                {message.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {message.validationErrors?.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">
            Validation Errors
          </h4>

          <div className="space-y-2">
            {message.validationErrors.map((err: any) => (
              <div
                key={err.errorId}
                className="
                  border border-red-200 dark:border-red-700/40
                  bg-red-50 dark:bg-red-900/20
                  rounded-md p-3 text-sm
                  transition-colors duration-300
                "
              >
                <div className="font-medium text-red-600 dark:text-red-400">
                  {err.errorCode}
                </div>
                <div className="text-text-muted dark:text-darkText-muted">
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