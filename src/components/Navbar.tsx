export function Navbar() {
  return (
    <div className="bg-base-100 border-b border-base-300">
      <div className="px-6 py-3 border-b border-base-200">
        <span className="text-lg font-semibold">
          AI FIX Certification Tool
        </span>
      </div>

      <div className="px-6">
        <div className="flex gap-6 text-sm">
          <div className="relative py-3 font-medium text-primary">
            Dashboard
            <span className="absolute left-0 -bottom-px h-[2px] w-full bg-primary rounded" />
          </div>

          <div className="py-3 text-base-content/70 hover:text-base-content cursor-pointer">
            File Upload
          </div>

          <div className="py-3 text-base-content/70 hover:text-base-content cursor-pointer">
            Monitoring
          </div>
        </div>
      </div>
    </div>
  );
}
