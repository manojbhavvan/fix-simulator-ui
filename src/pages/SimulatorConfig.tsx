import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";
import { SelectField } from "@/components/SelectField/SelectField";
import { InputField } from "@/components/InputField/InputField";
import { CheckCircle, XCircle, X } from "lucide-react";

type SimulatorConfigType = "CLIENT" | "BROKER";

interface FixVersion {
  fixVersionId: number;
  fixVersionName: string;
  description: string;
  dateCreated?: string;
  dateModified?: string;
}

interface SimulatorForm {
  simulatorConfigId: number | null;
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
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState<SimulatorForm>({
    simulatorConfigId: null,
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
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/rest/fix/version/all`)
      .then((res) => res.json())
      .then((data) => setFixVersions(Array.isArray(data) ? data : []))
      .catch(() => setFixVersions([]));
  }, []);

  useEffect(() => {
    if (!id) {
      setInitialLoading(false);
      return;
    }

    setInitialLoading(true);

    fetch(`${API_BASE_URL}/rest/simulator/config/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setForm({
          simulatorConfigId: data.simulatorConfigId ?? null,
          simulatorConfigName: data.simulatorConfigName ?? "",
          simulatorConfigType: data.simulatorConfigType ?? "CLIENT",
          beginString: data.beginString ?? "",
          senderCompId: data.senderCompId ?? "",
          targetCompId: data.targetCompId ?? "",
          socketConnectHost: data.socketConnectHost ?? "",
          socketConnectPort: data.socketConnectPort ?? "",
          fixVersion: data.fixVersion ?? null,
        });
      })
      .catch(() => {
        setToast({
          type: "error",
          title: "Load Failed",
          message: "Unable to load simulator configuration.",
        });
      })
      .finally(() => {
        setInitialLoading(false);
      });
  }, [id]);

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
      newErrors.socketConnectPort =
        "Port must be between 1 and 65535";
    }

    if (!values.fixVersion)
      newErrors.fixVersion = "FIX Version is required";

    return newErrors;
  };

  const isFormValid = Object.keys(validate(form)).length === 0;

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

  const handleSave = async () => {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/rest/simulator/config`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            simulatorConfigId: isEditMode
              ? form.simulatorConfigId
              : null,
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
        title: isEditMode
          ? "Configuration Updated"
          : "Configuration Created",
        message: isEditMode
          ? "Simulator configuration updated successfully."
          : "Simulator configuration created successfully.",
      });

      setTimeout(() => navigate("/simulator/config"), 1500);
    } catch {
      setToast({
        type: "error",
        title: "Save Failed",
        message: "Failed to save configuration.",
      });

      setTimeout(() => setToast(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-[calc(100vh-var(--navbar-height))] bg-background dark:bg-darkBackground flex items-center justify-center transition-colors duration-300">
        <div className="h-10 w-10 border-4 border-borderColor dark:border-darkBorder border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height))] bg-background dark:bg-darkBackground py-10 px-8 transition-colors duration-300 relative">
      <div className="max-w-6xl mx-auto bg-background dark:bg-darkBackground-muted border border-borderColor dark:border-darkBorder rounded-xl p-10 shadow-sm dark:shadow-lg dark:shadow-black/20 transition-colors duration-300">

        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-text dark:text-darkText">
            {isEditMode
              ? "Edit Simulator Configuration"
              : "Create Simulator Configuration"}
          </h1>
          <p className="text-sm text-text-muted dark:text-darkText-muted mt-2">
            Configure client or broker FIX connectivity parameters
          </p>
        </div>

        <Section title="Basic Information">
          <InputField
            label="Config Name"
            value={form.simulatorConfigName}
            error={errors.simulatorConfigName}
            onBlur={() => handleBlur("simulatorConfigName")}
            onChange={(v) => handleChange("simulatorConfigName", v)}
          />

          <SelectField
            label="Config Type"
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
          <InputField label="Begin String" value={form.beginString} error={errors.beginString}
            onBlur={() => handleBlur("beginString")}
            onChange={(v) => handleChange("beginString", v)} />

          <InputField label="Sender Comp ID" value={form.senderCompId} error={errors.senderCompId}
            onBlur={() => handleBlur("senderCompId")}
            onChange={(v) => handleChange("senderCompId", v)} />

          <InputField label="Target Comp ID" value={form.targetCompId} error={errors.targetCompId}
            onBlur={() => handleBlur("targetCompId")}
            onChange={(v) => handleChange("targetCompId", v)} />

          <InputField label="Socket Connect Host" value={form.socketConnectHost} error={errors.socketConnectHost}
            onBlur={() => handleBlur("socketConnectHost")}
            onChange={(v) => handleChange("socketConnectHost", v)} />

          <InputField label="Socket Connect Port" value={form.socketConnectPort} error={errors.socketConnectPort}
            onBlur={() => handleBlur("socketConnectPort")}
            onChange={(v) => handleChange("socketConnectPort", v)} />
        </Section>

        <div className="flex justify-end gap-4 mt-10 border-t border-borderColor dark:border-darkBorder pt-6">
          <button
            onClick={() => navigate("/simulator/config")}
            className="h-10 px-6 text-sm font-medium rounded-md border border-borderColor dark:border-darkBorder text-text dark:text-darkText bg-background dark:bg-darkBackground-subtle"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!isFormValid || loading}
            className={`h-10 px-6 text-sm font-semibold rounded-md text-white transition-colors ${
              isFormValid
                ? "bg-brand hover:bg-brand-dark"
                : "bg-brand/50 cursor-not-allowed"
            }`}
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Configuration"
              : "Save Configuration"}
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700/40"
              : "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700/40"
          }`}>
            {toast.type === "success"
              ? <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              : <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
            <div className="flex-1">
              <p className="font-semibold text-text dark:text-darkText text-sm">
                {toast.title}
              </p>
              <p className="text-xs text-text-muted dark:text-darkText-muted mt-1">
                {toast.message}
              </p>
            </div>
            <button onClick={() => setToast(null)}>
              <X className="w-4 h-4 text-text-muted dark:text-darkText-muted" />
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
      <h2 className="text-base font-semibold text-text dark:text-darkText border-b border-borderColor dark:border-darkBorder pb-3 mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-x-10 gap-y-8">
        {children}
      </div>
    </div>
  );
}