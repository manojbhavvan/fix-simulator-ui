interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  options: { value: string | number; label: string }[];
}

export function SelectField({
  label,
  value,
  onChange,
  onBlur,
  error,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
        {label}
      </label>
      <select
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2.5 border rounded-md bg-white text-sm text-slate-800 transition focus:outline-none ${
          error
            ? "border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-slate-300 focus:ring-1 focus:ring-[#465391] focus:border-[#465391]"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value.toString()} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}