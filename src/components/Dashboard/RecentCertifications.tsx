import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold tracking-wide text-brand dark:text-brand-dark pb-4">
        Recent Certifications
      </h2>

      <div className="flex flex-col">
        <div
          className="
            overflow-hidden rounded-lg
            border border-borderColor dark:border-darkBorder
            bg-background dark:bg-darkBackground-muted
            shadow-sm
            transition-colors duration-300
          "
        >
          <table className="min-w-full text-sm">
            <thead
              className="
                bg-background-muted dark:bg-darkBackground-subtle dark:shadow-inner
                border-b border-borderColor dark:border-darkBorder
              "
            >
              <tr className="text-left text-xs font-medium text-text-muted dark:text-darkText-muted tracking-wide">
                <th className="px-4 py-3">Simulation ID</th>
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Created Date</th>
                <th className="px-4 py-3">Modified Date</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-text-muted dark:text-darkText-muted"
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {!loading && paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-text-muted dark:text-darkText-muted"
                  >
                    No data available
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedData.map((item) => (
                  <Row
                    key={item.simId}
                    item={item}
                    onClick={() =>
                      navigate(`/certifications/results/${item.simId}`)
                    }
                  />
                ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-4 mt-4 shrink-0">
            <button
              className="
                h-8 w-8 flex items-center justify-center rounded-md
                border border-borderColor dark:border-darkBorder
                bg-background dark:bg-darkBackground-muted
                hover:bg-brand hover:text-white
                transition-colors duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
              "
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-sm text-text-muted dark:text-darkText-muted">
              Page{" "}
              <span className="font-medium text-text dark:text-darkText">
                {page}
              </span>{" "}
              of{" "}
              <span className="font-medium text-text dark:text-darkText">
                {totalPages}
              </span>
            </span>

            <button
              className="
                h-8 w-8 flex items-center justify-center rounded-md
                border border-borderColor dark:border-darkBorder
                bg-background dark:bg-darkBackground-muted
                hover:bg-brand hover:text-white
                transition-colors duration-200
                disabled:opacity-40 disabled:cursor-not-allowed
              "
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

function Row({
  item,
  onClick,
}: {
  item: Simulation;
  onClick: () => void;
}) {
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
    <tr
      onClick={onClick}
      className="
        border-b border-borderColor dark:border-darkBorder
        hover:bg-background-subtle 
        dark:hover:bg-[#1B2A45]
        transition-colors duration-200
        text-xs cursor-pointer
      "
    >
      <td className="px-4 py-3 font-semibold text-brand dark:text-brand-dark">
        {item.simId}
      </td>

      <td className="px-4 py-3 font-medium text-text dark:text-darkText">
        {fileName}
      </td>

      <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
        {formatVersion(item.fixVersion)}
      </td>

      <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
        {formatDate(item.dateCreated)}
      </td>

      <td className="px-4 py-3 text-text-muted dark:text-darkText-muted">
        {formatDate(item.dateModified)}
      </td>
    </tr>
  );
}