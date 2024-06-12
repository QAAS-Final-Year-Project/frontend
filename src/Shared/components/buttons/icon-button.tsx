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
  }
> = ({
  text,
  onClick,
  className,
  icon,
  notificationCount,
  notificationType,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames(
        "w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-300 relative",
        className
      )}
    >
      {icon && <Icon icon={icon} className='w-6 h-6 text-[#333333]' />}
      {text}
      {notificationCount && (
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
      )}
    </button>
  );
};

export default IconButton;
