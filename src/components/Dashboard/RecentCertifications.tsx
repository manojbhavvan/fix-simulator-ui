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
  const paginatedData = data.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <h3 className="text-base font-semibold text-base-content/80 pb-4">
        Recent Certifications
      </h3>

      <div className="overflow-hidden rounded-md border border-base-300">
        <table className="table table-sm">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="text-xs font-semibold text-base-content/70">
                File
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Version
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Created
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Modified
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && paginatedData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
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
        <div className="flex justify-end items-center gap-3 mt-4">
          <button
            className="h-8 w-8 flex items-center justify-center rounded-md border border-base-300 bg-base-100 shadow-sm hover:bg-base-200 transition"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-sm font-medium leading-none">
            Page {page} of {totalPages}
          </span>

          <button
            className="h-8 w-8 flex items-center justify-center rounded-md border border-base-300 bg-base-100 shadow-sm hover:bg-base-200 transition"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
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
    <tr className="hover:bg-base-200 transition-colors cursor-pointer">
      <td className="font-medium">{fileName}</td>
      <td>{formatVersion(item.fixVersion)}</td>
      <td className="text-base-content/70">
        {formatDate(item.dateCreated)}
      </td>
      <td className="text-base-content/70">
        {formatDate(item.dateModified)}
      </td>
    </tr>
  );
}
