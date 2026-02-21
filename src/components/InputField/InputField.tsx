interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
}

export function InputField({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2.5 border rounded-md bg-white text-sm text-slate-800 transition focus:outline-none ${
          error
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-slate-300 focus:ring-1 focus:ring-[#465391] focus:border-[#465391]"
        }`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}