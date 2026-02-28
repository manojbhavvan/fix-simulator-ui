import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "../../config/api";

type UploadLog = {
  uploadId: number;
  fileName: string;
  filePath: string;
  uploadStatus: string;
  dateCreated: string;
};

type ParsedMessage = {
  seq: number;
  type: string;
  description: string;
  errors?: string;
};

type Props = {
  onContinue: (fileName?: string) => void;
  onBack: () => void;
};

export default function UploadFixLog({ onContinue, onBack }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedLogs, setUploadedLogs] = useState<UploadLog[]>([]);
  const [selectedExistingLog, setSelectedExistingLog] =
    useState<UploadLog | null>(null);

  const [parsedData, setParsedData] = useState<ParsedMessage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    fetchUploadedLogs();
  }, []);

  const fetchUploadedLogs = async () => {
    try {
      setLoadingLogs(true);
      const response = await axios.get<UploadLog[]>(
        `${API_BASE_URL}/rest/upload/log/all`
      );
      setUploadedLogs(response.data || []);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleParseLog = () => {
    const dummy: ParsedMessage[] = [
      { seq: 1, type: "A", description: "Logon", errors: "OK" },
      { seq: 2, type: "D", description: "New Order", errors: "2 Errors" },
      { seq: 3, type: "8", description: "Execution Report" },
      { seq: 4, type: "5", description: "Logout", errors: "OK" },
    ];

    setParsedData(dummy);
  };

  const selectedName =
    selectedFile?.name || selectedExistingLog?.fileName;

  return (
    <div className="bg-background border border-border rounded-lg shadow-sm p-8 space-y-8 w-[900px] max-w-full mx-auto">
      <h2 className="text-xl font-semibold text-brand">
        Upload / Parse FIX Log
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
          if (file) {
            setSelectedFile(file);
            setSelectedExistingLog(null);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <p className="text-sm font-medium text-text">
          Drop your file here or{" "}
          <span className="text-brand font-semibold underline">
            browse
          </span>
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
            if (file) {
              setSelectedFile(file);
              setSelectedExistingLog(null);
            }
          }}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">
          Or Select Existing Log
        </h3>

        {loadingLogs ? (
          <p className="text-sm text-text-muted">Loading logs...</p>
        ) : (
          <div className="border rounded-md border-border overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-background-muted text-xs text-text-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left">File Name</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {uploadedLogs.map((log) => (
                  <tr
                    key={log.uploadId}
                    onClick={() => {
                      setSelectedExistingLog(log);
                      setSelectedFile(null);
                    }}
                    className={`cursor-pointer border-b border-border hover:bg-background-subtle ${
                      selectedExistingLog?.uploadId ===
                      log.uploadId
                        ? "bg-brand/10"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      {log.fileName}
                    </td>
                    <td className="px-4 py-3">
                      {log.uploadStatus}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(
                        log.dateCreated
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedName && (
        <div className="flex justify-end">
          <button
            onClick={handleParseLog}
            className="px-4 py-2 text-sm font-medium rounded-md bg-brand text-white hover:bg-brand-dark"
          >
            Parse Log
          </button>
        </div>
      )}

      {parsedData.length > 0 && (
        <div>
          <h3 className="text-base font-semibold mb-4">
            Parsed Messages
          </h3>

          <div className="overflow-hidden rounded-md border border-border">
            <table className="min-w-full text-sm">
              <thead className="bg-background-muted text-xs text-text-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left w-16">Seq</th>
                  <th className="px-4 py-3 text-left w-24">
                    Msg Type
                  </th>
                  <th className="px-4 py-3 text-left">
                    Description
                  </th>
                  <th className="px-4 py-3 text-right w-24">
                    Errors
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsedData.map((msg) => (
                  <tr
                    key={msg.seq}
                    className="border-b border-border"
                  >
                    <td className="px-4 py-3">
                      {msg.seq}
                    </td>
                    <td className="px-4 py-3">
                      {msg.type}
                    </td>
                    <td className="px-4 py-3">
                      {msg.description}
                    </td>
                    <td
                      className={`px-4 py-3 text-right ${
                        msg.errors === "OK"
                          ? "text-green-600"
                          : msg.errors
                          ? "text-red-600"
                          : "text-text-muted"
                      }`}
                    >
                      {msg.errors ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-md bg-background hover:border-brand hover:text-brand"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={() => onContinue(selectedName)}
          disabled={!selectedName}
          className="px-5 py-2 text-sm font-semibold rounded-md bg-brand text-white disabled:opacity-50"
        >
          Continue to Certification
        </button>
      </div>
    </div>
  );
}