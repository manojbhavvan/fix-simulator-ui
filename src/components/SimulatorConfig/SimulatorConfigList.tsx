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
            const res = await fetch(
                `${API_BASE_URL}/rest/simulator/config/all`
            );
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
        <div className="py-12 px-8">
            <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-xl p-10">

                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900">
                            Simulator Configurations
                        </h1>
                        <p className="text-sm text-slate-500 mt-2">
                            Manage client and broker FIX connectivity configurations
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/simulator/config/create")}
                        className="flex items-center gap-2 h-10 px-5 text-sm font-medium rounded-md text-white bg-[#465391] hover:bg-[#3b457a] transition"
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
                            className="w-full h-10 px-4 pr-10 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465391]"
                        />
                        <Search
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </div>

                    <button
                        onClick={handleSearch}
                        className="h-10 px-4 text-sm font-medium rounded-md bg-[#465391] text-white hover:bg-[#3b457a] transition"
                    >
                        Search
                    </button>
                </div>

                <div className="overflow-hidden border border-slate-200 rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                                <th className="px-5 py-4">Name</th>
                                <th className="px-5 py-4">Type</th>
                                <th className="px-5 py-4">FIX Version</th>
                                <th className="px-5 py-4">Host</th>
                                <th className="px-5 py-4">Port</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-slate-500">
                                        Loading configurations...
                                    </td>
                                </tr>
                            )}

                            {!loading &&
                                paginatedConfigs.map((config) => (
                                    <tr
                                        key={config.simulatorConfigId}
                                        className="h-[56px] hover:bg-slate-50 transition"
                                    >
                                        <td className="px-5 align-middle font-medium text-slate-800">
                                            {config.simulatorConfigName}
                                        </td>

                                        <td className="px-5 align-middle text-slate-600">
                                            {config.simulatorConfigType}
                                        </td>

                                        <td className="px-5 align-middle text-slate-600">
                                            {config.fixVersion?.fixVersionName}
                                        </td>

                                        <td className="px-5 align-middle text-slate-600">
                                            {config.socketConnectHost}
                                        </td>

                                        <td className="px-5 align-middle text-slate-600">
                                            {config.socketConnectPort}
                                        </td>

                                        <td className="px-5 align-middle text-right">
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/simulator/config/edit/${config.simulatorConfigId}`
                                                    )
                                                }
                                                className="inline-flex items-center gap-2 text-sm font-medium text-[#465391] hover:text-[#3b457a]"
                                            >
                                                <Pencil size={14} />
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            {!loading &&
                                paginatedConfigs.length < ITEMS_PER_PAGE &&
                                Array.from({
                                    length: ITEMS_PER_PAGE - paginatedConfigs.length,
                                }).map((_, i) => (
                                    <tr key={`empty-${i}`} className="h-[56px]">
                                        <td colSpan={6}></td>
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
                            className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span className="text-sm text-slate-600">
                            Page <span className="font-medium">{page}</span> of{" "}
                            <span className="font-medium">{totalPages}</span>
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="h-8 w-8 flex items-center justify-center rounded-md border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}