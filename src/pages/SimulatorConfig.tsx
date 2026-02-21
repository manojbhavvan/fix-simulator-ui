import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";
import { SelectField } from "@/components/SelectField/SelectField";
import { InputField } from "@/components/InputField/InputField";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

type SimulatorConfigType = "CLIENT" | "BROKER";

interface FixVersion {
  fixVersionId: number;
  fixVersionName: string;
  description: string;
  dateCreated?: string;
  dateModified?: string;
}

interface SimulatorForm {
  simulatorConfigName: string;
  simulatorConfigType: SimulatorConfigType;
  beginString: string;
  senderCompId: string;
  targetCompId: string;
  socketConnectHost: string;
  socketConnectPort: string;
  fixVersion: FixVersion | null;
}

type FormErrors = Partial<Record<keyof SimulatorForm, string>>;

export default function SimulatorConfigScreen() {
  const [form, setForm] = useState<SimulatorForm>({
    simulatorConfigName: "",
    simulatorConfigType: "CLIENT",
    beginString: "",
    senderCompId: "",
    targetCompId: "",
    socketConnectHost: "",
    socketConnectPort: "",
    fixVersion: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof SimulatorForm, boolean>>
  >({});
  const [fixVersions, setFixVersions] = useState<FixVersion[]>([]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/rest/fix/version/all`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFixVersions(data);
        } else {
          setFixVersions([]);
        }
      })
      .catch(() => setFixVersions([]));
  }, []);

  const validate = (values: SimulatorForm): FormErrors => {
    const newErrors: FormErrors = {};

    if (!values.simulatorConfigName.trim())
      newErrors.simulatorConfigName = "Simulator config name is required";

    if (!values.beginString.trim())
      newErrors.beginString = "Begin string is required";

    if (!values.senderCompId.trim())
      newErrors.senderCompId = "Sender Comp ID is required";

    if (!values.targetCompId.trim())
      newErrors.targetCompId = "Target Comp ID is required";

    if (!values.socketConnectHost.trim())
      newErrors.socketConnectHost = "Socket host is required";

    if (!values.socketConnectPort.trim()) {
      newErrors.socketConnectPort = "Port is required";
    } else if (!/^\d+$/.test(values.socketConnectPort)) {
      newErrors.socketConnectPort = "Port must be numeric";
    } else if (
      Number(values.socketConnectPort) < 1 ||
      Number(values.socketConnectPort) > 65535
    ) {
      newErrors.socketConnectPort = "Port must be between 1 and 65535";
    }

    if (!values.fixVersion)
      newErrors.fixVersion = "FIX Version is required";

    return newErrors;
  };

  const handleChange = <K extends keyof SimulatorForm>(
    field: K,
    value: SimulatorForm[K]
  ) => {
    const updated = { ...form, [field]: value };
    setForm(updated);

    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = <K extends keyof SimulatorForm>(field: K) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const isFormValid = Object.keys(validate(form)).length === 0;

  const handleSave = async () => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      simulatorConfigName: true,
      beginString: true,
      senderCompId: true,
      targetCompId: true,
      socketConnectHost: true,
      socketConnectPort: true,
      fixVersion: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/rest/simulator/config`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            simulatorConfigId: null,
            simulatorConfigName: form.simulatorConfigName,
            simulatorConfigType: form.simulatorConfigType,
            beginString: form.beginString,
            senderCompId: form.senderCompId,
            targetCompId: form.targetCompId,
            socketConnectHost: form.socketConnectHost,
            socketConnectPort: form.socketConnectPort,
            fixVersion: form.fixVersion,
          }),
        }
      );

      if (!response.ok) throw new Error();

      setToast({
        type: "success",
        title: "Configuration Saved",
        message: "Simulator configuration saved successfully.",
      });

      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast({
        type: "error",
        title: "Something went wrong",
        message: "Failed to save configuration.",
      });

      setTimeout(() => setToast(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-8 relative">
      <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-xl p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-slate-900">
            Create Simulator Configuration
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Configure client or broker FIX connectivity parameters
          </p>
        </div>

        <Section title="Basic Information">
          <InputField
            label="Simulator Config Name"
            value={form.simulatorConfigName}
            error={errors.simulatorConfigName}
            onBlur={() => handleBlur("simulatorConfigName")}
            onChange={(v) => handleChange("simulatorConfigName", v)}
          />

          <SelectField
            label="Simulator Config Type"
            value={form.simulatorConfigType}
            onChange={(v) =>
              handleChange("simulatorConfigType", v as SimulatorConfigType)
            }
            options={[
              { value: "CLIENT", label: "CLIENT" },
              { value: "BROKER", label: "BROKER" },
            ]}
          />

          <SelectField
            label="FIX Version"
            value={form.fixVersion?.fixVersionId?.toString() ?? ""}
            error={errors.fixVersion}
            onBlur={() => handleBlur("fixVersion")}
            onChange={(v) => {
              const selected = fixVersions.find(
                (f) => f.fixVersionId === Number(v)
              );
              handleChange("fixVersion", selected ?? null);
            }}
            options={[
              { value: "", label: "Select FIX Version" },
              ...fixVersions.map((v) => ({
                value: v.fixVersionId.toString(),
                label: v.fixVersionName,
              })),
            ]}
          />
        </Section>

        <Section title="Connection Information">
          <InputField
            label="Begin String"
            value={form.beginString}
            error={errors.beginString}
            onBlur={() => handleBlur("beginString")}
            onChange={(v) => handleChange("beginString", v)}
          />
          <InputField
            label="Sender Comp ID"
            value={form.senderCompId}
            error={errors.senderCompId}
            onBlur={() => handleBlur("senderCompId")}
            onChange={(v) => handleChange("senderCompId", v)}
          />
          <InputField
            label="Target Comp ID"
            value={form.targetCompId}
            error={errors.targetCompId}
            onBlur={() => handleBlur("targetCompId")}
            onChange={(v) => handleChange("targetCompId", v)}
          />
          <InputField
            label="Socket Connect Host"
            value={form.socketConnectHost}
            error={errors.socketConnectHost}
            onBlur={() => handleBlur("socketConnectHost")}
            onChange={(v) => handleChange("socketConnectHost", v)}
          />
          <InputField
            label="Socket Connect Port"
            type="number"
            value={form.socketConnectPort}
            error={errors.socketConnectPort}
            onBlur={() => handleBlur("socketConnectPort")}
            onChange={(v) => handleChange("socketConnectPort", v)}
          />
        </Section>

        <div className="flex justify-end gap-4 mt-10 border-t border-slate-200 pt-6">
          <button className="h-10 px-6 text-sm font-medium rounded-md border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!isFormValid || loading}
            className={`h-10 px-6 text-sm font-medium rounded-md text-white transition ${
              isFormValid
                ? "bg-[#465391] hover:bg-[#3b457a]"
                : "bg-[#465391]/50 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${
              toast.type === "success"
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <div className="mt-1">
              {toast.type === "success" ? (
                <CheckCircle className="text-green-600 w-5 h-5" />
              ) : (
                <XCircle className="text-red-600 w-5 h-5" />
              )}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">
                {toast.title}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                {toast.message}
              </p>
            </div>

            <button onClick={() => setToast(null)}>
              <X className="w-4 h-4 text-slate-500 hover:text-slate-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-base font-semibold text-slate-800 border-b border-slate-200 pb-3 mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">{children}</div>
    </div>
  );
}