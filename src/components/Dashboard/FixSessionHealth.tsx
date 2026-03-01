import { FixSessionSummary } from "./FixSessionSummary";
import { FixSessionList } from "./FixSessionList";

export function FixSessionHealth() {
  return (
    <div className="h-full flex flex-col">
      <div
        className="
          p-6
          border-b border-borderColor dark:border-darkBorder
          transition-colors duration-300
        "
      >
        <FixSessionSummary />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <FixSessionList />
      </div>

    </div>
  );
}
