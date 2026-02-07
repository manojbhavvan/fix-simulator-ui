export function FixSessionSummary() {
    return (
        <div>
            <div className="border-b border-color-gray pb-2">
                <h3 className="text-lg font-semibold text-base-content/70">
                    FIX Session Health
                </h3>
            </div>

            <div className="flex gap-2 pt-3">
                <StatusBlock label="Active" value={4} variant="success" />
                <StatusBlock label="Good" value={2} variant="info" />
                <StatusBlock label="Degraded" value={1} variant="warning" />
                <StatusBlock label="Down" value={1} variant="error" />
            </div>
        </div>
    );
}


function StatusBlock({
    label,
    value,
    variant,
}: {
    label: string;
    value: number;
    variant: "success" | "info" | "warning" | "error";
}) {
    const styles = {
        success: "bg-success text-success-content border-success/40",
        info: "bg-info text-info-content border-info/40",
        warning: "bg-warning text-warning-content border-warning/40",
        error: "bg-error text-error-content border-error/40",
    };

    return (
        <div
            className={`
        flex-1
        flex items-center justify-center
        px-3 py-2.5
        border
        rounded-sm
        text-base font-semibold
        shadow-sm
        ${styles[variant]}
      `}
        >
            {value} {label}
        </div>
    );
}


