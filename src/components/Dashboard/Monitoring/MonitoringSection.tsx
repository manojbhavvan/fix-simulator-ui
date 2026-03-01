import { MonitoringSidebar } from "./MonitoringSidebar";
import { MonitoringTable } from "./MonitoringTable";

export function MonitoringSection() {
  return (
    <section id="monitoring">
      <div className="border border-border rounded-lg bg-background shadow-sm">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-brand tracking-tight">
              Monitoring
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Live FIX session status and protocol metrics
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <MonitoringSidebar />
            </div>

            <div className="col-span-9">
              <MonitoringTable />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

