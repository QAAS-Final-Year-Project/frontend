import { FC } from "react";
import { ButtonProps } from "./index.types";
import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";

const TextButton: FC<
  ButtonProps & {
    size?: "xs" | "sm" | "md" | "lg";
    className?: string;
    icon?: any;
    color?: string;
  }
> = ({ text, onClick, className, icon, color, size = "sm" }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={classNames(
        "text-primary-500 rounded-md px-2  font-medium  flex gap-x-0.5   hover:bg-primary-100  hover:disabled:bg-transparent items-center ",
        size === "xs" && "text-xs",
        size === "sm" && "text-sm",
        size === "md" && "text-md",
        size === "lg" && "text-lg",
        className,
        color
      )}
    >
      {text}
      {icon && <Icon icon={icon} className={classNames("w-4 h-4")} />}
    </button>
  );
};

export default TextButton;
