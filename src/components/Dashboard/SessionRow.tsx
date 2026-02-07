import { ChevronRight, ArrowRight } from "lucide-react";

export function SessionRow(props: {
    source: string;
    target: string;
    version: string;
    status: string;
    statusColor: string;
    dotColor: string;
    detail: string;
    seq: string;
    time: string;
}) {
    return (
        <tr className="group hover:bg-base-200 transition-colors cursor-pointer">
            <td className="pl-4">
                <span
                    className={`w-2 h-2 rounded-full inline-block ${props.dotColor}`}
                />
            </td>

            <td className="font-medium">
                <span className="inline-flex items-center gap-1">
                    <span>{props.source}</span>

                    <ArrowRight className="w-3 h-3 text-base-content/50" />

                    <span>{props.target}</span>
                </span>

                <span className="ml-1 text-xs text-base-content/60">
                    ({props.version})
                </span>
            </td>


            <td className={`font-medium ${props.statusColor}`}>
                {props.status}
            </td>

            <td className="text-sm text-base-content/80">
                {props.detail}
            </td>

            <td className="text-xs text-base-content/60">
                Seq# {props.seq}
            </td>

            <td className="text-xs text-base-content/60">
                {props.time}
            </td>

            <td className="pr-4 text-right">
                <ChevronRight className="
          w-4 h-4
          text-base-content/40
          group-hover:text-primary
          transition-colors
        " />
            </td>
        </tr>
    );
}
