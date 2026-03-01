export function MessageList({
    messages,
    selected,
    onSelect,
}: {
    messages: any[];
    selected: any;
    onSelect: (m: any) => void;
}) {
    return (
        <div className="h-full min-h-0 overflow-auto">
            <div className="border border-border rounded-lg bg-background shadow-sm h-full flex flex-col">
                <div className="px-5 py-4 border-b border-border">
                    <h3 className="text-base font-semibold text-brand">
                        Messages
                    </h3>
                </div>

                <div className="flex-1 overflow-auto">
                    {messages.map((m, index) => {
                        const isActive = selected?.id === m.id;
                        const isLast = index === messages.length - 1;

                        return (
                            <button
                                key={m.id}
                                onClick={() => onSelect(m)}
                                className={`w-full flex items-center gap-3
                                    px-4 py-3 text-sm text-left transition-colors
                                    ${isActive
                                        ? "bg-background-muted border-l-4 border-brand"
                                        : "hover:bg-background-subtle"
                                    }
                                    ${!isLast ? "border-b border-border" : ""}
                                    `}
                            >
                                <div
                                    className="w-6 h-6 flex items-center justify-center border border-border rounded-md
                                        text-xs font-medium text-text-muted shrink-0 bg-background-muted"
                                >
                                    {index + 1}
                                </div>

                                <span className="flex-1 truncate text-text font-medium">
                                    {m.type}
                                </span>
                                <span
                                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${m.status === "PASS"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
