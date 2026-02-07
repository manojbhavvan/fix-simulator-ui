import { MonitoringSidebar } from "./MonitoringSidebar";
import { MonitoringTable } from "./MonitoringTable";

export function MonitoringSection() {

    return (
        <section id="monitoring" className="mt-10">
            <div className="card bg-base-100 border border-base-300">
                <div className="card-body p-5 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold tracking-wide text-base-content/80">
                            Monitoring
                        </h2>
                        <p className="text-sm text-base-content/60">
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

