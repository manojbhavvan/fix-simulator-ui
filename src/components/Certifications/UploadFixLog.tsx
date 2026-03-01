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
    <div
      className="
        bg-background dark:bg-darkBackground-muted
        border border-borderColor dark:border-darkBorder
        rounded-lg
        shadow-sm dark:shadow-lg dark:shadow-black/20
        p-8 space-y-8
        w-[900px] max-w-full mx-auto
        transition-colors duration-300
      "
    >
      <h2 className="text-xl font-semibold text-brand dark:text-brand-dark">
        Upload / Parse FIX Log
      </h2>

      <div
        className={`
          h-44 border-2 border-dashed rounded-lg
          flex flex-col items-center justify-center text-center
          transition-all duration-200 cursor-pointer
          ${
            isDragging
              ? "bg-brand/10 border-brand dark:border-brand-dark"
              : `
                bg-background-muted dark:bg-darkBackground
                border-borderColor dark:border-darkBorder
                hover:border-brand dark:hover:border-brand-dark
              `
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
        <p className="text-sm font-medium text-text dark:text-darkText">
          Drop your file here or{" "}
          <span className="text-brand dark:text-brand-dark font-semibold underline">
            browse
          </span>
        </p>

        {selectedFile && (
          <p className="mt-3 text-sm text-brand dark:text-brand-dark font-medium">
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text dark:text-darkText">
            Or Select Existing Log
          </h3>

          <button
            onClick={handleParseLog}
            disabled={!selectedName}
            className="
              px-3 py-1.5 text-xs font-medium rounded-md
              border border-borderColor dark:border-darkBorder
              bg-background dark:bg-darkBackground
              text-text dark:text-darkText
              hover:border-brand dark:hover:border-brand-dark
              hover:text-brand dark:hover:text-brand-dark
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
          >
            Parse Log
          </button>
        </div>

        {loadingLogs ? (
          <p className="text-sm text-text-muted dark:text-darkText-muted">
            Loading logs...
          </p>
        ) : (
          <div className="border border-borderColor dark:border-darkBorder rounded-md overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-background-muted dark:bg-darkBackground-subtle text-xs text-text-muted dark:text-darkText-muted border-b border-borderColor dark:border-darkBorder">
                <tr>
                  <th className="px-4 py-3 text-left">File Name</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor dark:divide-darkBorder">
                {uploadedLogs.map((log) => (
                  <tr
                    key={log.uploadId}
                    onClick={() => {
                      setSelectedExistingLog(log);
                      setSelectedFile(null);
                    }}
                    className={`
                      cursor-pointer transition-colors duration-200
                      ${
                        selectedExistingLog?.uploadId === log.uploadId
                          ? "bg-brand/10 dark:bg-brand-dark/20"
                          : ""
                      }
                    `}
                  >
                    <td className="px-4 py-3 text-text dark:text-darkText">
                      {log.fileName}
                    </td>
                    <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
                      {log.uploadStatus}
                    </td>
                    <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
                      {new Date(log.dateCreated).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {parsedData.length > 0 && (
        <div>
          <h3 className="text-base font-semibold mb-4 text-text dark:text-darkText">
            Parsed Messages
          </h3>

          <div className="overflow-hidden rounded-md border border-borderColor dark:border-darkBorder">
            <table className="min-w-full text-sm">
              <thead className="bg-background-muted dark:bg-darkBackground-subtle text-xs text-text-muted dark:text-darkText-muted border-b border-borderColor dark:border-darkBorder">
                <tr>
                  <th className="px-4 py-3 text-left w-16">Seq</th>
                  <th className="px-4 py-3 text-left w-24">Msg Type</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-right w-24">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor dark:divide-darkBorder">
                {parsedData.map((msg) => (
                  <tr key={msg.seq}>
                    <td className="px-4 py-3 text-text dark:text-darkText">
                      {msg.seq}
                    </td>
                    <td className="px-4 py-3 text-text dark:text-darkText">
                      {msg.type}
                    </td>
                    <td className="px-4 py-3 text-text dark:text-darkText">
                      {msg.description}
                    </td>
                    <td
                      className={`px-4 py-3 text-right ${
                        msg.errors === "OK"
                          ? "text-green-600 dark:text-green-400"
                          : msg.errors
                          ? "text-error"
                          : "text-text-muted dark:text-darkText-muted"
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
          className="
            flex items-center gap-2 px-4 py-2 text-sm font-medium
            border border-borderColor dark:border-darkBorder
            rounded-md
            bg-background dark:bg-darkBackground
            text-text dark:text-darkText
            hover:border-brand dark:hover:border-brand-dark
            hover:text-brand dark:hover:text-brand-dark
            transition-all duration-200
          "
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          onClick={() => onContinue(selectedName)}
          disabled={!selectedName}
          className={`
            px-5 py-2 text-sm font-semibold rounded-md
            transition-all duration-200
            ${
              !selectedName
                ? `
                  border border-borderColor dark:border-darkBorder
                  bg-background dark:bg-darkBackground
                  text-text-muted dark:text-darkText-muted
                  cursor-not-allowed
                `
                : `
                  bg-brand text-white
                  hover:bg-brand-dark
                `
            }
          `}
        >
          Continue to Certification
        </button>
      </div>
    </div>
  );
}