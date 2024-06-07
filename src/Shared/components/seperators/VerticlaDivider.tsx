import { classNames } from "Shared/utils/ui";
import { FC } from "react";

const VerticalDivider: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames("h-full w-0.5   bg-neutral-200", className)}></div>
  );
};

export default VerticalDivider;
