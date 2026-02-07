import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

type Props = {
  onContinue: (fileName?: string) => void;
  onBack: () => void;
};

export default function UploadFixLog({ onContinue, onBack }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="card bg-base-100 shadow p-6 space-y-4 w-[720px] max-w-full">
      <h2 className="text-lg font-semibold">Upload FIX Log</h2>

      <div
        className={`h-40 border-2 border-dashed rounded-lg 
          flex flex-col items-center justify-center text-center
          transition-colors cursor-pointer
          ${isDragging
            ? "bg-primary/10 border-primary"
            : "bg-primary/5 border-primary/30 hover:bg-primary/10"
          }
      `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);

          const file = e.dataTransfer.files?.[0];
          if (file) {
            setSelectedFile(file);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-sm font-medium text-base-content">
          Drop your file here or{" "}
          <span className="text-primary font-semibold underline">
            browse
          </span>
        </p>

        <p className="mt-1 text-xs text-base-content/60">
          Max. file size: 20MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".log,.txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedFile(file);
            }
          }}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-base-content/70 whitespace-nowrap">
          FIX Version
        </span>

        <select
          className="select select-sm w-28 px-4 text-sm
            border border-black focus:border-base-400
            focus:outline-none"
        >
          <option>FIX 4.2</option>
          <option>FIX 4.4</option>
        </select>
      </div>
      <div className="border-b border-base-400"></div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-semibold text-base-content">
            Parsed Messages
          </span>
          <div className="px-4 py-0.5 rounded text-sm font-semibold 
            hover:bg-base-200 cursor-pointer
            border border-black hover:border-base-300">
            <button className="btn btn-xs btn-outline">
              Parse Log
            </button>
          </div>

        </div>

        <div className="overflow-hidden rounded-md">
          <table className="table table-sm border border-base-300 border-collapse">
            <thead className="bg-base-200 text-xs text-base-content/70">
              <tr>
                <th className="border border-base-300 w-12">Seq</th>
                <th className="border border-base-300 w-20">Msg Type</th>
                <th className="border border-base-300">Description</th>
                <th className="border border-base-300 w-24 text-right">Errors</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              <tr>
                <td className="border border-base-300">1</td>
                <td className="border border-base-300">A</td>
                <td className="border border-base-300">Logon</td>
                <td className="border border-base-300 text-right text-success">OK</td>
              </tr>

              <tr>
                <td className="border border-base-300">2</td>
                <td className="border border-base-300">D</td>
                <td className="border border-base-300">New Order</td>
                <td className="border border-base-300 text-right text-error">
                  2 Errors
                </td>
              </tr>

              <tr>
                <td className="border border-base-300">3</td>
                <td className="border border-base-300">8</td>
                <td className="border border-base-300">Execution Report</td>
                <td className="border border-base-300 text-right text-base-content/60">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="px-3 btn btn-sm bg-primary text-primary-content border border-primary
            hover:bg-transparent hover:text-primary transition-colors
            flex items-center justify-center gap-2 leading-none"
        >
          <ArrowLeft className="mt-[1px]" size={16} />
          <span className="leading-none">Back</span>
        </button>


        <button
          onClick={() => onContinue(selectedFile?.name)}
          className="px-3 btn btn-sm bg-primary text-primary-content
            border border-primary hover:bg-transparent hover:text-primary
            transition-colors"
        >
          Continue to Certification
        </button>
      </div>
    </div>
  );
}