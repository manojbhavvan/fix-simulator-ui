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
    <div className="bg-background border border-border rounded-lg shadow-sm p-8 space-y-8 w-[900px] max-w-full mx-auto">
      <h2 className="text-xl font-semibold text-brand">
        Upload FIX Log
      </h2>

      <div
        className={`
          h-44 border-2 border-dashed rounded-lg
          flex flex-col items-center justify-center text-center
          transition-colors cursor-pointer
          ${isDragging
            ? "bg-brand/10 border-brand"
            : "bg-background-muted border-border hover:border-brand"
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
          if (file) setSelectedFile(file);
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-sm font-medium text-text">
          Drop your file here or{" "}
          <span className="text-brand font-semibold underline">
            browse
          </span>
        </p>

        <p className="mt-1 text-xs text-text-muted">
          Max file size: 20MB
        </p>

        {selectedFile && (
          <p className="mt-3 text-sm text-brand font-medium">
            Selected: {selectedFile.name}
          </p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".log,.txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedFile(file);
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-text">
          FIX Version
        </span>

        <select
          className="
            w-36 px-3 py-2 text-sm
            border border-border rounded-md
            bg-background
            focus:outline-none
            focus:ring-2 focus:ring-brand/40
          "
        >
          <option>FIX 4.2</option>
          <option>FIX 4.4</option>
        </select>
      </div>

      <div className="border-t border-border/70 my-2" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-semibold text-text">
            Parsed Messages
          </span>

          <button
            className="
              px-4 py-1.5 text-sm font-medium
              border border-border rounded-md
              bg-background
              hover:border-brand hover:text-brand
              transition-colors
            "
          >
            Parse Log
          </button>
        </div>

        <div className="overflow-hidden rounded-md border border-border">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-background-muted border-b border-border text-xs text-text-muted">
              <tr>
                <th className="px-4 py-3 text-left w-16">Seq</th>
                <th className="px-4 py-3 text-left w-24">Msg Type</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-right w-24">Errors</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">A</td>
                <td className="px-4 py-3">Logon</td>
                <td className="px-4 py-3 text-right text-green-600">
                  OK
                </td>
              </tr>

              <tr className="border-b border-border">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">D</td>
                <td className="px-4 py-3">New Order</td>
                <td className="px-4 py-3 text-right text-red-600">
                  2 Errors
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">8</td>
                <td className="px-4 py-3">Execution Report</td>
                <td className="px-4 py-3 text-right text-text-muted">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <button
          onClick={onBack}
          className="
            flex items-center gap-2
            px-4 py-2
            text-sm font-medium
            border border-border rounded-md
            bg-background
            hover:border-brand hover:text-brand
            transition-colors
          "
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={() => onContinue(selectedFile?.name)}
          className="
            px-5 py-2
            text-sm font-semibold
            rounded-md
            bg-brand
            text-white
            hover:bg-brand-dark
            transition-colors
          "
        >
          Continue to Certification
        </button>
      </div>
    </div>
  );
}