import { Navbar } from "@/components/Navbar/Navbar";
import { ActionPanel } from "@/components/Dashboard/ActionPanel";
import { RecentCertifications } from "@/components/Dashboard/RecentCertifications";
import { FixSessionHealth } from "@/components/Dashboard/FixSessionHealth";
import { MonitoringSection } from "@/components/Dashboard/Monitoring/MonitoringSection";

export default function Dashboard() {
  return (
    <>
      <main className="p-6">
        <section
          className="grid grid-cols-12 gap-6 items-stretch"
          id="dashboard"
        >
          <div className="col-span-5">
            <div className="card bg-base-100 border border-base-300 h-[500px]">
              <div className="card-body p-0 flex flex-col h-full">

                <div className="p-4 border-b border-base-300">
                  <ActionPanel />
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <RecentCertifications />
                </div>

              </div>
            </div>
          </div>

          <div className="col-span-7 h-[500px]">
            <div className="h-full">
              <FixSessionHealth />
            </div>
          </div>
        </section>

        <section id="monitoring" className="mt-6">
          <MonitoringSection />
        </section>
      </main>
    </>
  );
}