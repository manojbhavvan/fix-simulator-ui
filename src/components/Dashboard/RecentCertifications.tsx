export function RecentCertifications() {
  return (
    <div>
      <h3 className="text-base font-semibold text-base-content/80 pb-4">
        Recent Certifications
      </h3>

      <div className="overflow-hidden rounded-md border border-base-300">
        <table className="table table-sm">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="text-xs font-semibold text-base-content/70">
                File
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Version
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Status
              </th>
              <th className="text-xs font-semibold text-base-content/70">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            <Row
              file="orderflow.log"
              version="FIX 4.2"
              status="PASS"
              color="text-success"
              date="Jan 22"
            />
            <Row
              file="client1_fix.log"
              version="FIX 4.2"
              status="FAIL"
              color="text-error"
              date="Jan 21"
            />
            <Row
              file="tradeflow_ny.log"
              version="FIX 4.4"
              status="WARN"
              color="text-warning"
              date="Jan 20"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Row(props: {
  file: string;
  version: string;
  status: string;
  color: string;
  date: string;
}) {
  return (
    <tr
      className="
        hover:bg-base-200
        transition-colors
        cursor-pointer
      "
    >
      <td className="font-medium">{props.file}</td>
      <td>{props.version}</td>
      <td>
        <span className={`text-xs font-semibold ${props.color}`}>
          {props.status}
        </span>
      </td>
      <td className="text-base-content/70">
        {props.date}
      </td>
    </tr>
  );
}
