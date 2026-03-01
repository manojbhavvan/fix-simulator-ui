type Props = {
  session: any;
};

const getMsgLabel = (type: string) => {
  const map: Record<string, string> = {
    "5": "Logout",
    "A": "Logon",
    "D": "New Order Single",
    "8": "Execution Report",
  };

  return map[type] || `Unknown (${type})`;
};

export function SequenceFlowView({ session }: Props) {
  if (!session?.messages)
    return <div>No messages</div>;

  return (
    <div className="border border-border rounded-lg bg-background shadow-sm">
      <div className="px-5 py-3 border-b border-border">
        <h3 className="text-sm font-semibold text-brand">
          {session.fixSessionId}
        </h3>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-3 items-center text-sm">
          {session.messages.map((msg: any, idx: number) => (
            <div
              key={msg.sessionMsgId}
              className="flex items-center gap-3"
            >
              <span className="px-4 py-1.5 rounded-md border border-border bg-background-muted font-medium">
                {getMsgLabel(msg.msgType)}
              </span>

              {idx < session.messages.length - 1 && (
                <span className="text-text-muted">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}