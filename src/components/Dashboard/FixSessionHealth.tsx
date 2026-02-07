
import { FixSessionSummary } from "./FixSessionSummary";
import { FixSessionList } from "./FixSessionList";
export function FixSessionHealth() {
    return (
        <div className="card bg-base-100 border border-base-300">
            <div className="card-body p-5 ">
                <div className="border-b border-base-300 pb-4">
                    <FixSessionSummary />
                </div>
                <FixSessionList />
            </div>
        </div>
    );
}
