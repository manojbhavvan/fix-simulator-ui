export function MessageDetails({ message }: any) {
    const d = message.details;

    if (!d) {
        return (
            <div className="text-sm text-green-600 font-medium">
                No message-level issues detected.
            </div>
        );
    }

    return (
        <div className="h-full min-h-0 overflow-auto space-y-6">
            <h3 className="text-base font-semibold text-brand">
                Message Details
            </h3>

            <div className="overflow-hidden border border-border rounded-lg bg-background shadow-sm">
                <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                        <tr>
                            <td className="px-5 py-3 w-56 text-text-muted font-medium">
                                FIX Version
                            </td>
                            <td className="px-5 py-3 text-text font-medium">
                                {d.fixVersion}
                            </td>
                        </tr>

                        <tr>
                            <td className="px-5 py-3 text-text-muted font-medium">
                                Message Type
                            </td>
                            <td className="px-5 py-3 text-text font-medium">
                                {d.msgType}
                            </td>
                        </tr>

                        <tr>
                            <td className="px-5 py-3 text-text-muted font-medium">
                                Sequence Number
                            </td>
                            <td className="px-5 py-3 text-text font-medium">
                                {d.sequenceNumber}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {d.missingTags?.length > 0 && (
                <div>
                    <div className="text-sm font-semibold text-red-600 mb-3">
                        Missing Required Tags
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {d.missingTags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium border border-red-500 
                                    text-red-600 bg-red-50 rounded-md"
                            >
                                Tag {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
