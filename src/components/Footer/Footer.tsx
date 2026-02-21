export function Footer() {
  return (
    <footer className="border-t border-border bg-background-muted">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-brand flex items-center justify-center text-white text-[10px] font-bold">
            IF
          </div>
          <span className="text-sm font-semibold text-text tracking-tight">
            IntelliFIX
          </span>
        </div>

        <span className="text-xs text-text-muted">
          © 2026 IntelliFIX. All rights reserved.
        </span>
      </div>
    </footer>
  );
}