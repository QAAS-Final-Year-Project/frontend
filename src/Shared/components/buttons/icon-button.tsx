import { FC } from "react";
import { ButtonProps } from "./index.types";
import { Icon } from "@iconify/react";
import { classNames } from "Shared/utils/ui";

const IconButton: FC<
  ButtonProps & {
    size?: "sm" | "md" | "lg";
    className?: string;
    icon?: any;
    notificationCount?: number;
    notificationType?: "info" | "danger";
    iconClassName?: string;
  }
> = ({
  text,
  onClick,
  className,
  icon,
  notificationCount,
  disabled,
  notificationType,
  size = "md",
  iconClassName,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        " flex items-center justify-center rounded-full  relative",
        size === "md" ? "w-7 h-7" : "",
        size === "lg" ? "w-10 h-10" : "",
        size === "sm" ? "w-8 h-8" : "",
        !disabled ? "hover:bg-gray-300 cursor-pointer" : "",
        className
      )}
    >
      {icon && (
        <Icon
          icon={icon}
          className={classNames("w-6 h-6 text-[#333333]", iconClassName)}
        />
      )}
      {text}
      {notificationCount ? (
        <div
          className={classNames(
            "rounded-full px-1 flex items-center justify-center absolute -right-1.5 -top-1.5  w-[20px] h-[20px] text-center text-white text-xs font-bold ",
            notificationCount && notificationType === "info"
              ? "bg-primary-500  "
              : "bg-red-500 "
          )}
        >
          {notificationCount}
        </div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default IconButton;
