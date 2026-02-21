import { ActionPanel } from "@/components/Dashboard/ActionPanel";
import { RecentCertifications } from "@/components/Dashboard/RecentCertifications";
import { FixSessionHealth } from "@/components/Dashboard/FixSessionHealth";

export default function Dashboard() {
  return (
    <main className="bg-background px-8 py-8 h-full flex flex-col"> 
      <section
        id="dashboard"
        className="
          flex-1
          grid
          grid-cols-1
          xl:grid-cols-12
          gap-8
          w-full
        "
      >
        <div className="xl:col-span-5 flex">
          <div className="flex flex-col flex-1 border border-border rounded-lg bg-background shadow-sm overflow-hidden">

            <div className="border-b border-border px-6 py-5">
              <ActionPanel />
            </div>

            <div className="flex-1 overflow-auto px-6 py-6">
              <RecentCertifications />
            </div>

          </div>
        </div>

        <div className="xl:col-span-7 flex">
          <div className="flex-1 overflow-hidden">
            <FixSessionHealth />
          </div>
        </div>
      </section>
    </main>
  );
}