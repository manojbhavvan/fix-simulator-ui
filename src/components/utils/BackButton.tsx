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
        px-2 py-2
        text-sm font-medium
        bg-base-100 text-base-content
        border border-base-300
        shadow-sm
        hover:bg-base-200
        transition-all
      "
    >
      <ArrowLeft size={16} />
    </button>
  );
}
