import { ActionPanel } from "@/components/Dashboard/ActionPanel";
import { RecentCertifications } from "@/components/Dashboard/RecentCertifications";
import { FixSessionHealth } from "@/components/Dashboard/FixSessionHealth";

export default function Dashboard() {
  return (
    <main className="
      bg-background dark:bg-darkBackground
      px-8 py-8
      h-full flex flex-col
      transition-colors duration-300
    ">
      <section
        id="dashboard"
        className="
          grid
          grid-cols-1
          xl:grid-cols-12
          gap-8
          w-full
          items-stretch
        "
      >
        <div className="xl:col-span-5 flex">
          <div className="
            flex flex-col flex-1
            border border-borderColor dark:border-darkBorder
            rounded-lg
            bg-background dark:bg-darkBackground-muted
            shadow-sm
            h-[600px]
            transition-colors duration-300
          ">
            {/* <div className="border-b border-border px-6 py-5">
              <ActionPanel />
            </div> */}

            <div className="flex-1 overflow-auto px-6 py-6">
              <RecentCertifications />
            </div>
          </div>
        </div>

        <div className="xl:col-span-7 flex">
          <div className="
            flex-1
            border border-borderColor dark:border-darkBorder
            rounded-lg
            bg-background dark:bg-darkBackground-muted
            shadow-sm
            h-[600px]
            transition-colors duration-300
          ">
            <FixSessionHealth />
          </div>
        </div>
      </section>
    </main>
  );
}