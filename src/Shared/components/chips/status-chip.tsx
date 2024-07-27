import { FC } from "react";
import { size } from "lodash";
import { classNames } from "Shared/utils/ui";

export const StatusTypes = ["danger", "warning", "info", "success"] as const;
export type StatusType = (typeof StatusTypes)[number];
export interface StatusProps {
  info: string;
  type: StatusType;
  className?: string
}

const sizeMap = {
  xs: "text-xs px-2.5 py-1.5",
  sm: "text-sm px-2.5 py-1.5",
  md: "text-base px-3 py-2",
  lg: "text-lg px-3 py-2",
};

const StatusChip: FC<StatusProps & { size?: "xs" | "sm" | "md" | "lg" }> = ({
  info,
  type,
  size = "xs",
  className
}) => {

  return (
    <span
      className={classNames(
        "w-max",
        type == "success"
          ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-green-50"
          : type == "danger"
          ? "bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100"
          : type == "warning"
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100"
          : type == "info"
          ? "bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-blue-100"
          : "bg-gray-100 text-gray-800",
        "inline-flex rounded  items-center space-x-1",
        sizeMap[size],
        className,
      )}
    >
      {/* Shadow dom element to initialize all color styles */}
   
     {info || "Unknown"}
    </span>
  );
};

export default StatusChip;
