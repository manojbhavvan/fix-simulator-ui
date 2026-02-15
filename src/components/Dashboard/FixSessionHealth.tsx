import { FixSessionSummary } from "./FixSessionSummary";
import { FixSessionList } from "./FixSessionList";

export function FixSessionHealth() {
  return (
    <div className="card bg-base-100 border border-base-300 h-full">
      <div className="card-body p-0 flex flex-col h-full">
        
        <div className="p-5 border-b border-base-300">
          <FixSessionSummary />
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <FixSessionList />
        </div>

      </div>
    </div>
  );
}
