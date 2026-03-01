import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  onBack?: () => void;
};

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      onClick={onBack ?? (() => window.history.back())}
      className="
        inline-flex items-center gap-2
        rounded-md
        px-3 py-2
        text-sm font-medium

        border border-borderColor dark:border-darkBorder
        bg-background dark:bg-darkBackground
        text-text dark:text-darkText

        hover:border-brand dark:hover:border-brand-dark
        hover:text-brand dark:hover:text-brand-dark

        transition-all duration-200
      "
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}