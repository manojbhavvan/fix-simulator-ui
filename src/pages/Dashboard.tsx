import { Navbar } from "@/components/Navbar/Navbar";
import { ActionPanel } from "@/components/Dashboard/ActionPanel";
import { RecentCertifications } from "@/components/Dashboard/RecentCertifications";
import { FixSessionHealth } from "@/components/Dashboard/FixSessionHealth";
import { MonitoringSection } from "@/components/Dashboard/Monitoring/MonitoringSection";

export default function Dashboard() {
  return (
    <>
      <main className="p-6">
        <section className="grid grid-cols-12 gap-6 items-stretch" id="dashboard">
          <div className="col-span-5">
            <div className="card bg-base-100 border border-base-300 h-full">
              <div className="card-body p-0 flex flex-col">
                <div className="p-5">
                  <div className="pb-4 border-b border-base-300">
                    <ActionPanel />
                  </div>
                </div>
                <div className="px-5 flex-1">
                  <RecentCertifications />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-7 space-y-6">
            <FixSessionHealth />
          </div>
        </section>

        <section id="monitoring">
          <MonitoringSection />
        </section>
      </main>
    </>
  );
}
