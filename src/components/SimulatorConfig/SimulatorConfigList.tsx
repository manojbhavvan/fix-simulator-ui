import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";
import { Plus, Pencil, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface FixVersion {
  fixVersionId: number;
  fixVersionName: string;
  description: string;
}

interface SimulatorConfig {
  simulatorConfigId: number;
  simulatorConfigName: string;
  simulatorConfigType: "CLIENT" | "BROKER";
  beginString: string;
  senderCompId: string;
  targetCompId: string;
  socketConnectHost: string;
  socketConnectPort: string;
  fixVersion: FixVersion;
  dateCreated: string;
}

const ITEMS_PER_PAGE = 5;

export default function SimulatorConfigListScreen() {
  const [configs, setConfigs] = useState<SimulatorConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchConfigs();
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchTerm("");
      setPage(1);
    }
  }, [searchInput]);

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/rest/simulator/config/all`);
      const data = await res.json();
      setConfigs(Array.isArray(data) ? data : []);
    } catch {
      setConfigs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredConfigs = useMemo(() => {
    if (!searchTerm.trim()) return configs;
    return configs.filter((config) =>
      config.simulatorConfigName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [configs, searchTerm]);

  const totalPages = Math.ceil(filteredConfigs.length / ITEMS_PER_PAGE);

  const paginatedConfigs = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredConfigs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredConfigs, page]);

  const handleSearch = () => {
    const trimmed = searchInput.trim();
    setSearchTerm(trimmed);
    setPage(1);
  };

  return (
    <div className="py-12 px-8 bg-background dark:bg-darkBackground transition-colors duration-300">
      <div
        className="
          max-w-6xl mx-auto
          bg-background dark:bg-darkBackground-muted
          border border-borderColor dark:border-darkBorder
          rounded-xl
          p-10
          shadow-sm dark:shadow-lg dark:shadow-black/20
          transition-colors duration-300
        "
      >

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-text dark:text-darkText">
              Simulator Configurations
            </h1>
            <p className="text-sm text-text-muted dark:text-darkText-muted mt-2">
              Manage client and broker FIX connectivity configurations
            </p>
          </div>

          <button
            onClick={() => navigate("/simulator/config/create")}
            className="
              flex items-center gap-2
              h-10 px-5
              text-sm font-medium
              rounded-md
              border border-borderColor dark:border-darkBorder
              text-text dark:text-darkText
              bg-background dark:bg-darkBackground
              hover:border-brand dark:hover:border-brand-dark
              hover:text-brand dark:hover:text-brand-dark
              transition-all duration-200
            "
          >
            <Plus size={16} />
            Create New
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search by config name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="
                w-full h-10 px-4 pr-10
                text-sm
                border border-borderColor dark:border-darkBorder
                rounded-md
                bg-background dark:bg-darkBackground
                text-text dark:text-darkText
                placeholder:text-text-muted dark:placeholder:text-darkText-muted
                focus:outline-none
                focus:ring-1 focus:ring-brand dark:focus:ring-brand-dark
                transition-all duration-200
              "
            />
            <Search
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted dark:text-darkText-muted"
            />
          </div>

          <button
            onClick={handleSearch}
            className="
              h-10 px-4
              text-sm font-medium
              rounded-md
              border border-borderColor dark:border-darkBorder
              text-text dark:text-darkText
              bg-background dark:bg-darkBackground
              hover:border-brand dark:hover:border-brand-dark
              hover:text-brand dark:hover:text-brand-dark
              transition-all duration-200
            "
          >
            Search
          </button>
        </div>

        <div
          className="
            overflow-hidden
            border border-borderColor dark:border-darkBorder
            rounded-lg
          "
        >
          <table className="min-w-full text-sm">
            <thead
              className="
                bg-background-muted dark:bg-darkBackground-subtle
                border-b border-borderColor dark:border-darkBorder
              "
            >
              <tr className="text-left text-xs uppercase tracking-wide text-text-muted dark:text-darkText-muted">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">FIX Version</th>
                <th className="px-5 py-4">Host</th>
                <th className="px-5 py-4">Port</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-borderColor dark:divide-darkBorder">
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-muted dark:text-darkText-muted">
                    Loading configurations...
                  </td>
                </tr>
              )}

              {!loading &&
                paginatedConfigs.map((config) => (
                  <tr
                    key={config.simulatorConfigId}
                    className="group transition-all duration-200"
                  >
                    <td className="px-5 py-4 font-medium text-text dark:text-darkText">
                      {config.simulatorConfigName}
                    </td>

                    <td className="px-5 py-4 text-text-muted dark:text-darkText-muted">
                      {config.simulatorConfigType}
                    </td>

                    <td className="px-5 py-4 text-text-muted dark:text-darkText-muted">
                      {config.fixVersion?.fixVersionName}
                    </td>

                    <td className="px-5 py-4 text-text-muted dark:text-darkText-muted">
                      {config.socketConnectHost}
                    </td>

                    <td className="px-5 py-4 text-text-muted dark:text-darkText-muted">
                      {config.socketConnectPort}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(
                            `/simulator/config/edit/${config.simulatorConfigId}`
                          )
                        }
                        className="
                          inline-flex items-center gap-2
                          text-sm font-medium
                          text-text dark:text-darkText
                          hover:text-brand dark:hover:text-brand-dark
                          transition-colors duration-200
                        "
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="
                h-8 w-8 flex items-center justify-center rounded-md
                border border-borderColor dark:border-darkBorder
                bg-background dark:bg-darkBackground
                text-text-muted dark:text-darkText-muted
                hover:border-brand dark:hover:border-brand-dark
                hover:text-brand dark:hover:text-brand-dark
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-sm text-text-muted dark:text-darkText-muted">
              Page <span className="font-medium text-text dark:text-darkText">{page}</span> of{" "}
              <span className="font-medium text-text dark:text-darkText">{totalPages}</span>
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="
                h-8 w-8 flex items-center justify-center rounded-md
                border border-borderColor dark:border-darkBorder
                bg-background dark:bg-darkBackground
                text-text-muted dark:text-darkText-muted
                hover:border-brand dark:hover:border-brand-dark
                hover:text-brand dark:hover:text-brand-dark
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}