import type {
  TooltipContentProps,
} from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import styles from "./ChartTooltip.module.css";

type ChartTooltipProps =
  TooltipContentProps<
    ValueType,
    NameType
  >;

export function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={styles.tooltip}
      role="status"
    >
      {label !== undefined &&
        label !== null && (
          <strong>
            {formatTooltipValue(label)}
          </strong>
        )}

      {payload.map((entry, index) => {
        const entryName =
          entry.name ??
          entry.dataKey ??
          "Valor";

        const entryKey =
          entry.dataKey ??
          entry.name ??
          index;

        return (
          <span key={String(entryKey)}>
            {formatTooltipValue(entryName)}
            {": "}
            {formatTooltipValue(
              entry.value,
            )}
          </span>
        );
      })}
    </div>
  );
}

function formatTooltipValue(
  value: unknown,
): string {
  if (value === null || value === undefined) {
    return "0";
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item))
      .join(" - ");
  }

  return String(value);
}