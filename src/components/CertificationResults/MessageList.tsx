export function MessageList({
    messages,
    selected,
    onSelect
}: {
    messages: any[];
    selected: any;
    onSelect: (m: any) => void;
}) {
    return (
        <div className="h-full overflow-auto min-h-0">
            <div className="card bg-base-100 border h-full">
                <div className="card-body p-4 h-full flex flex-col">
                    <h3 className="font-semibold text-base-content/80 mb-3">
                        Messages
                    </h3>

                    {/* List */}
                    <div className="flex-1">
                        {messages.map((m, index) => {
                            const isActive = selected?.id === m.id;
                            const isLast = index === messages.length - 1;

                            return (
                                <button
                                    key={m.id}
                                    onClick={() => onSelect(m)}
                                    className={`
                  w-full flex items-center gap-3
                  px-2 py-2
                  text-sm text-left
                  transition-colors
                  ${isActive ? "bg-base-200" : "hover:bg-base-200"}
                  ${!isLast ? "border-b border-base-300" : ""}
                `}
                                >
                                    {/* Number box */}
                                    <div
                                        className="
                    w-6 h-6
                    flex items-center justify-center
                    border border-base-300
                    rounded text-xs font-medium
                    shrink-0
                  "
                                    >
                                        {index + 1}
                                    </div>

                                    {/* Message name */}
                                    <span className="flex-1 truncate">
                                        {m.type}
                                    </span>

                                    {/* Status dot */}
                                    <span
                                        className={`w-3 h-3 rounded-full shrink-0 ${m.status === "PASS"
                                                ? "bg-success"
                                                : "bg-error"
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
