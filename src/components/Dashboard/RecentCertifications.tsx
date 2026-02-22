import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FixVersion = {
  fixVersionId?: number;
  fixVersionName?: string;
  description?: string;
} | null;

type UploadLog = {
  uploadId: number;
  fileName: string;
  filePath: string;
  uploadStatus: string;
  dateCreated: string;
} | null;

type Simulation = {
  simId: number;
  fixVersion: FixVersion;
  uploadLog: UploadLog;
  dateCreated: string;
  dateModified: string;
};

const ITEMS_PER_PAGE = 5;

export function RecentCertifications() {
  const [data, setData] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      setLoading(true);

      const response = await axios.get<Simulation[]>(
        `${API_BASE_URL}/rest/simulation/all`
      );

      setData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch simulations", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const emptyRows = ITEMS_PER_PAGE - paginatedData.length;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold tracking-wide text-brand pb-4">
        Recent Certifications
      </h2>

      <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-hidden rounded-lg border border-border bg-background shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-background-muted border-b border-border">
              <tr className="text-left text-xs font-normal text-text-muted tracking-wide">
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Created Date</th>
                <th className="px-4 py-3">Modified Date</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-text-muted">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && paginatedData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-text-muted">
                    No data available
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedData.map((item) => (
                  <Row key={item.simId} item={item} />
                ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-4 mt-4 shrink-0">
            <button
              className="h-8 w-8 flex items-center justify-center rounded-md border border-border bg-background hover:bg-brand hover:text-white transition"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-sm text-text-muted">
              Page <span className="font-medium text-text">{page}</span> of{" "}
              <span className="font-medium text-text">{totalPages}</span>
            </span>

            <button
              className="h-8 w-8 flex items-center justify-center rounded-md border border-border bg-background hover:bg-brand hover:text-white transition"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ item }: { item: Simulation }) {
  const fileName = item.uploadLog?.fileName ?? "-";

  const formatVersion = (version: FixVersion) => {
    if (!version) return "-";
    return version.fixVersionName ?? "-";
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <tr className="border-b border-border hover:bg-background-subtle transition-colors text-xs">
      <td className="px-4 py-3 font-medium text-text">
        {fileName}
      </td>
      <td className="px-4 py-3 text-text-muted">
        {formatVersion(item.fixVersion)}
      </td>
      <td className="px-4 py-3 text-text-muted">
        {formatDate(item.dateCreated)}
      </td>
      <td className="px-4 py-3 text-text-muted">
        {formatDate(item.dateModified)}
      </td>
    </tr>
  );
}
