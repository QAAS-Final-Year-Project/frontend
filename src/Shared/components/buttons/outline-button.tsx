import { FC } from "react";
import { ButtonProps } from "./index.types";
import { Icon } from "@iconify/react";
import LoadingIcon from "../icons/loading-icon";
import { classNames } from "Shared/utils/ui";

const sizesMap = {
  xs: "px-2 py-1.5 text-sm",
  sm: "px-4 py-2 text-sm",
  md: "py-2.5  px-4 text-base",
  lg: "py-3 px-5 text-lg",
};
const loaderSizesMap = {
  xs: 12.5,
  sm: 15,
  md: 30,
  lg: 40,
};
const OutlinedButton: FC<
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
        "text-primary-500 bg-white  rounded shadow border border-primary-500 flex  gap-x-2 items-center justify-center hover:bg-primary-600 hover:text-white disabled:bg-opacity-80 disabled:cursor-not-allowed ",
        iconPosition === "right" ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {loading ? (
        <LoadingIcon
          className={`animate-spin h-5 w-5 mx-2 fill-primary-500 ${
            loading ? "block" : "hidden"
          }`}
        />
      ) : (
        <>
          {icon && <Icon icon={icon} color='#fff' className='w-4 h-4' />}
          {!hideTitle && text}
        </>
      )}
    </button>
  );
};

export default OutlinedButton;
