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
    <tr
      className="
        group
        border-b border-borderColor dark:border-darkBorder
        transition-all duration-200
        cursor-pointer
        text-sm
      "
    >
      <td className="pl-4 py-3">
        <span
          className={`w-2 h-2 rounded-full inline-block ${props.dotColor}`}
        />
      </td>

      <td className="py-3 font-medium text-text dark:text-darkText">
        <span className="inline-flex items-center gap-1">
          <span>{props.source}</span>

          <ArrowRight className="w-3 h-3 text-text-muted dark:text-darkText-muted" />

          <span>{props.target}</span>
        </span>

        <span className="ml-2 text-[11px] text-text-muted dark:text-darkText-muted">
          ({props.version})
        </span>
      </td>

      <td className={`py-3 font-medium ${props.statusColor}`}>
        {props.status}
      </td>

      <td className="py-3 text-text-muted dark:text-darkText-muted">
        {props.detail}
      </td>

      <td className="py-3 text-text-muted dark:text-darkText-muted">
        Seq# {props.seq}
      </td>

      <td className="py-3 text-text-muted dark:text-darkText-muted">
        {props.time}
      </td>

      <td className="pr-4 py-3 text-right">
        <ChevronRight
          className="
            w-4 h-4
            text-text-muted dark:text-darkText-muted
            transition-all duration-200
            group-hover:translate-x-1
            group-hover:text-brand dark:group-hover:text-brand-dark
          "
        />
      </td>
    </tr>
  );
}