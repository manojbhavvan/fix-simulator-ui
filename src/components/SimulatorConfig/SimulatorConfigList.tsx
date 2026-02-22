import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";
import { Plus, Pencil } from "lucide-react";

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

export default function SimulatorConfigListScreen() {
  const [configs, setConfigs] = useState<SimulatorConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConfigs();
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-8">
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

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-slate-500"
                  >
                    Loading configurations...
                  </td>
                </tr>
              )}

              {!loading && configs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-slate-500"
                  >
                    No configurations found.
                  </td>
                </tr>
              )}

              {!loading &&
                configs.map((config) => (
                  <tr
                    key={config.simulatorConfigId}
                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {config.simulatorConfigName}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {config.simulatorConfigType}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {config.fixVersion?.fixVersionName}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {config.socketConnectHost}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {config.socketConnectPort}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(
                            `/simulator/config/edit/${config.simulatorConfigId}`
                          )
                        }
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#465391] hover:text-[#3b457a] transition"
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
      </div>
    </div>
  );
}