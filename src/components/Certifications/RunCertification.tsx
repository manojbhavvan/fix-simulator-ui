type Props = {
  onRun: () => void;
  onBack: () => void;
};

export default function RunCertification({ onRun, onBack }: Props) {
  return (
    <div className="card bg-base-100 shadow p-6 space-y-4 w-[720px] max-w-full">
      <h2 className="text-lg font-semibold">Run Certification</h2>

      {/* Log selection */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="log" className="radio radio-sm" defaultChecked />
          Use previous log
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="radio" name="log" className="radio radio-sm" />
          Upload new log
        </label>
      </div>

      <div className="divider" />

      {/* Rules */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
          FIX Rule Validation
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
          AI Error Analysis
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="checkbox checkbox-sm" defaultChecked />
          Sequence Check
        </label>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4">
        <button
          className="btn btn-sm btn-ghost"
          onClick={onBack}
        >
          ← Back
        </button>

        <button
          className="btn btn-sm btn-primary"
          onClick={onRun}
        >
          Run Certification
        </button>
      </div>
    </div>
  );
}
