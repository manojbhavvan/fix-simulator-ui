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
      <label className="block text-xs font-semibold uppercase tracking-wide mb-2 text-text-muted dark:text-darkText-muted">
        {label}
      </label>
      <select
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-3 py-2.5
          border rounded-md
          text-sm
          transition-all duration-200
          outline-none

          bg-background dark:bg-darkBackground
          text-text dark:text-darkText
          border-borderColor dark:border-darkBorder

          focus:ring-1 focus:ring-brand dark:focus:ring-brand-dark
          focus:border-brand dark:focus:border-brand-dark

          appearance-none

          ${error
            ? `
              border-error
              focus:ring-error
              dark:focus:ring-error
            `
            : ""
          }
        `}
      >
        {options.map((opt) => (
          <option key={opt.value.toString()} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-error mt-1">
          {error}
        </p>
      )}
    </div>
  );
}