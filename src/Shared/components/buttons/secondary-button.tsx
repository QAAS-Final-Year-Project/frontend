import { FC } from "react";
import { ButtonProps } from "./index.types";
import { Icon } from "@iconify/react";
import LoadingIcon from "../icons/loading-icon";
import { classNames } from "Shared/utils/ui";

const sizesMap = {
  xs: "px-3 py-2 text-sm",
  sm: "px-4 py-2 text-sm",
  md: "py-2.5  px-5 text-[15px]",
  lg: "py-3 px-5 text-lg",
};
const loaderSizesMap = {
  xs: 12.5,
  sm: 15,
  md: 30,
  lg: 40,
};
const SecondaryButton: FC<
  ButtonProps & {
    size?: "sm" | "md" | "lg" | "xs";
    iconPosition?: "left" | "right";
    className?: string;
    loading?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: any;
  }
> = ({
  text,
  onClick,
  className,
  icon,
  iconPosition,
  type = "button",
  loading,
  size = "md",
  hideTitle,
  // size = "md",
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      title={text}
      disabled={loading || disabled}
      className={classNames(
        sizesMap[size],
        "bg-[#333] text-white  rounded shadow flex  gap-x-2 items-center justify-center hover:bg-[#444444] disabled:bg-opacity-80 disabled:cursor-not-allowed ",
        iconPosition === "right" ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {loading ? (
        <LoadingIcon
          className={`animate-spin h-5 w-5 mx-2 fill-white ${
            loading ? "block" : "hidden"
          }`}
        />
      ) : (
        <>
          {icon && <Icon icon={icon} color='#fff' className='w-5 h-5' />}
          {!hideTitle && text}
        </>
      )}
    </button>
  );
};

export default SecondaryButton;
