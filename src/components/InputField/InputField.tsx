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
      <label className="block text-xs font-semibold uppercase tracking-wide mb-2 text-text-muted dark:text-darkText-muted">
        {label}
      </label>
      <input
        type={type}
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

          placeholder:text-text-muted dark:placeholder:text-darkText-muted

          focus:ring-1 focus:ring-brand dark:focus:ring-brand-dark
          focus:border-brand dark:focus:border-brand-dark

          ${error
            ? `
              border-error
              focus:ring-error
              dark:focus:ring-error
            `
            : ""
          }
        `}
      />
      {error && (
        <p className="text-xs text-error mt-1">
          {error}
        </p>
      )}
    </div>
  );
}