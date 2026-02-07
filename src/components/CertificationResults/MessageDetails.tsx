export function MessageDetails({ message }: any) {
    const d = message.details;

    if (!d) {
        return (
            <div className="text-sm text-success">
                No message-level issues detected.
            </div>
        );
    }

    return (
        <div className="h-full min-h-0 overflow-auto">
            <div className="space-y-4">
                <h3 className="font-semibold text-base">Message Details</h3>

                <div className="overflow-hidden border border-base-300 rounded">
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-base-300">
                            <tr>
                                <td className="px-4 py-2 font-medium text-base-content/70 font-semibold w-48">
                                    FIX Version
                                </td>
                                <td className="px-4 py-2 font-medium">
                                    {d.fixVersion}
                                </td>
                            </tr>

                            <tr>
                                <td className="px-4 py-2 font-medium text-base-content/70 font-semibold">
                                    Message Type
                                </td>
                                <td className="px-4 py-2 font-medium">
                                    {d.msgType}
                                </td>
                            </tr>

                            <tr>
                                <td className="px-4 py-2 font-medium text-base-content/70 font-semibold">
                                    Sequence Number
                                </td>
                                <td className="px-4 py-2 font-medium">
                                    {d.sequenceNumber}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {d.missingTags?.length > 0 && (
                    <div>
                        <div className="font-medium text-error mb-2">
                            Missing Required Tags
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {d.missingTags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="badge badge-error badge-outline"
                                >
                                    Tag {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}
