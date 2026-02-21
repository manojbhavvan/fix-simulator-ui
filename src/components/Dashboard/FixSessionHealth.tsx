import { FixSessionSummary } from "./FixSessionSummary";
import { FixSessionList } from "./FixSessionList";

export function FixSessionHealth() {
  return (
    <div className="border border-border rounded-lg bg-background shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <FixSessionSummary />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <FixSessionList />
      </div>

    </div>
  );
}
