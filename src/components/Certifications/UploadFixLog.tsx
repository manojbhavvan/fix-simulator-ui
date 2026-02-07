type Props = {
  onContinue: () => void;
  onBack: () => void;
};

export default function UploadFixLog({ onContinue, onBack }: Props) {
  return (
    <div className="card bg-base-100 shadow p-6 space-y-4 w-[720px] max-w-full">
      <h2 className="text-lg font-semibold">Upload FIX Log</h2>

      {/* Upload box */}
      <div className="border-2 border-dashed rounded-md p-6 text-center">
        Drag & Drop FIX Log Here
        <div className="mt-2">
          <button className="btn btn-xs btn-outline">Browse…</button>
        </div>
      </div>

      {/* FIX version */}
      <div className="flex items-center gap-2">
        <span className="text-sm">FIX Version:</span>
        <select className="select select-sm select-bordered">
          <option>FIX 4.2</option>
          <option>FIX 4.4</option>
        </select>
      </div>

      {/* Parsed Messages */}
      <div className="border rounded-md">
        <div className="flex justify-between items-center px-3 py-2 border-b">
          <span className="text-sm font-medium">Parsed Messages</span>
          <button className="btn btn-xs btn-outline">Parse Log</button>
        </div>

        <table className="table table-sm">
          <thead>
            <tr className="text-xs">
              <th>Seq</th>
              <th>Msg Type</th>
              <th>Description</th>
              <th>Errors</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>A</td>
              <td>Logon</td>
              <td className="text-success">OK</td>
            </tr>
            <tr>
              <td>2</td>
              <td>D</td>
              <td>New Order</td>
              <td className="text-error">2 Errors</td>
            </tr>
            <tr>
              <td>3</td>
              <td>8</td>
              <td>Execution Report</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
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
          onClick={onContinue}
        >
          Continue to Certification
        </button>
      </div>
    </div>
  );
}