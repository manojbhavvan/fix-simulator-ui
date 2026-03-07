import { useState, useEffect } from "react";
import axios from "axios";
import { useCertificationResultsStore } from "@/store/certificationResultsStore";

export function AdvancedReplayView({ sessions }: any) {
    const {
        messages,
        selectedMessage,
        selectedSessionId,
        loadingMessages,
        setSelectedSessionId,
        setSelectedMessage,
        loadSessionMessages,
    } = useCertificationResultsStore();

    useEffect(() => {
        if (sessions?.length > 0 && !selectedSessionId) {
            const first = Number(sessions[0].sessionId);
            setSelectedSessionId(first);
            loadSessionMessages(first);
        }
    }, [sessions]);

    return (
        <div className="grid grid-cols-12 gap-6 px-6 py-6 h-full">

            <div className="col-span-3 border border-borderColor dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground-subtle p-4">
                <h3 className="text-sm font-semibold mb-4 text-text dark:text-darkText">
                    Sessions
                </h3>

                <div className="space-y-2">
                    {sessions?.map((s: any) => (
                        <button
                            key={s.sessionId}
                            onClick={() => {
                                const id = Number(s.sessionId);
                                setSelectedSessionId(id);
                                loadSessionMessages(id);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                ${selectedSessionId === Number(s.sessionId)
                                    ? "bg-brand text-white"
                                    : "bg-background-muted dark:bg-darkBackground-muted text-text dark:text-darkText hover:bg-background-subtle dark:hover:bg-darkBackground-subtle"
                                }
              `}
                        >
                            {s.sessionName}
                        </button>
                    ))}
                </div>
            </div>

            <div className="col-span-5 border border-borderColor dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground-subtle p-4 overflow-auto">
                <h3 className="text-sm font-semibold mb-4 text-text dark:text-darkText">
                    Message Replay
                </h3>

                {loadingMessages ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-2">
                        {messages.map((msg: any) => (
                            <button
                                key={msg.sessionMsgId}
                                onClick={() => setSelectedMessage(msg)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors
                  ${selectedMessage?.sessionMsgId === msg.sessionMsgId
                                        ? "bg-brand text-white"
                                        : "bg-background-muted dark:bg-darkBackground-muted text-text dark:text-darkText hover:bg-background-subtle dark:hover:bg-darkBackground-subtle"
                                    }
                `}
                            >
                                {msg.seqNum} | {msg.msgName}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="col-span-4 border border-borderColor dark:border-darkBorder rounded-lg bg-background dark:bg-darkBackground-subtle p-4 overflow-auto">
                <h3 className="text-sm font-semibold mb-4 text-text dark:text-darkText">
                    Message Details
                </h3>

                {loadingMessages ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    selectedMessage && (
                        <>
                            <div className="mb-6">
                                <h4 className="text-xs font-semibold mb-2 text-text-muted dark:text-darkText-muted">
                                    Raw FIX Message
                                </h4>

                                <pre
                                    className="
                    text-xs font-mono
                    bg-background-muted dark:bg-darkBackground-muted
                    border border-borderColor dark:border-darkBorder
                    text-text dark:text-darkText
                    p-4 rounded-md
                    overflow-x-auto
                  "
                                >
                                    {Object.entries(selectedMessage.rawFixMsg || {})
                                        .map(([tag, value]) => `${tag}=${value}`)
                                        .join("|")}
                                </pre>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold mb-2 text-text-muted dark:text-darkText-muted">
                                    Detail View
                                </h4>

                                <table className="w-full text-xs border border-borderColor dark:border-darkBorder rounded-md overflow-hidden">

                                    <thead className="bg-background-muted dark:bg-darkBackground-muted">
                                        <tr>
                                            <th className="text-left px-3 py-2 text-text-muted dark:text-darkText-muted">
                                                Tag
                                            </th>
                                            <th className="text-left px-3 py-2 text-text-muted dark:text-darkText-muted">
                                                Value
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-borderColor dark:divide-darkBorder">
                                        {Object.entries(selectedMessage.rawFixMsg || {}).map(
                                            ([tag, value]: any) => (
                                                <tr key={tag}>
                                                    <td className="px-3 py-2 font-medium text-text dark:text-darkText">
                                                        {tag}
                                                    </td>
                                                    <td className="px-3 py-2 text-text dark:text-darkText">
                                                        {value}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
}