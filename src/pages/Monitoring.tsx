import { MonitoringSection } from "@/components/Dashboard/Monitoring/MonitoringSection";

export default function Monitoring() {
  return (
    <div
      className="
        bg-background dark:bg-darkBackground
        px-6 py-8
        min-h-[calc(100vh-var(--navbar-height))]
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto">
        <section id="monitoring" className="mt-2">
          <MonitoringSection />
        </section>
      </div>
    </div>
  );
}