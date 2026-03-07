import { ArrowRight } from "lucide-react";

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
    return (
      <div className="text-sm text-text-muted dark:text-darkText-muted">
        No messages
      </div>
    );

  return (
    <div className="border border-borderColor dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground-subtle shadow-sm transition-colors duration-300">
      
      <div className="px-5 py-3 border-b border-borderColor dark:border-darkBorder">
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
              <span
                className="
                  px-4 py-1.5 rounded-md
                  border border-borderColor dark:border-darkBorder
                  bg-background-muted dark:bg-darkBackground-muted
                  text-text dark:text-darkText
                  font-medium
                  transition-colors duration-300
                "
              >
                {getMsgLabel(msg.msgType)}
              </span>

              {idx < session.messages.length - 1 && (
                <ArrowRight
                  size={16}
                  className="text-text-muted dark:text-darkText-muted shrink-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}